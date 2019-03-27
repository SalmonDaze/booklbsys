<template>
  <div class="check">
    <div class="check1">
      <h3>借阅审核</h3>
      <div class="table">
        <el-table :data="tableData"
          style="width: 100%">
          <el-table-column label="日期"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.applyTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名"
            width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover"
                placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>书籍: {{ scope.row.bookname }}</p>
                <div slot="reference"
                  class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.borrowUser.username }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="书名"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.borrowBook.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图书识别码"
            width="280">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.borrowBook._id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                @click="handleEdit(scope.$index, scope.row)">通过</el-button>
              <el-button size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    handleEdit(index, row) {
      this.$ajax({
        url: '/admin/applySuccess',
        method: 'post',
        data: {
          _id: row._id
        }
      }).then( res => {
        this.getData()
      })
    },
    handleDelete(index, row) {
      this.$ajax({
        url: '/admin/applyFail',
        method: 'post',
        data: {
          _id: row._id
        }
      }).then( res => {
        this.getData()
      })
    },
    getData() {
      this.$ajax({
        url: '/admin/getApplyList',
        method: 'post'
      }).then(res => {
        this.tableData = res.data.data;
        console.log(this.tableData)
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style>
.check {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.check1 {
  width: 1600px;
}
.check .table {
  width: 1100px;
  margin: 30px 0px 0px 30px;
}
.check .table .el-table td,.check .table .el-table th{
  text-align: center;
}
</style>
