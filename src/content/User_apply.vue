<template>
  <div class="userapply">
    <div class="userapply1">
      <h3>我的申请</h3>
      <div class="table">
        <el-table :data="tableData"
          style="width: 100%">
          <el-table-column label="日期"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名"
            width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover"
                placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>书名: {{ scope.row.bookname }}</p>
                <div slot="reference"
                  class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="书名"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.bookname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图书识别码"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.bookid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">撤销申请</el-button>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        bookname: '刷刷刷',
        bookid:'1234234543543'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        bookname: '说的绝对是',
        bookid:'121324353'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        bookname: '艾萨克'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        bookname: '为切尔克'
      }]
    }
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style>
.userapply {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.userapply1 {
  width: 1600px;
}
.userapply .table{
  width: 1100px;
  margin: 30px 0px 0px 30px;
}
.userapply .el-table td,
.userapply .el-table th {
  text-align: center;
}
</style>
