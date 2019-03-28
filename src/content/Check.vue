<template>
  <div class="check">
    <div class="check1">
      <h3>管理审核</h3>
      <el-tabs v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane label="借阅审核"
          name="first">
          <div class="table">
            <el-table :data="tableData.slice((pageNum-1)*pagesize,pageNum*pagesize)"
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
                  <div slot="reference"
                    class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.borrowUser.username }}</el-tag>
                  </div>
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
                    @click="handlepass(scope.$index, scope.row)">通过</el-button>
                  <el-button size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="vals">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="归还审核"
          name="second">
          <div class="table">
            <el-table :data="tableData2.slice((pageNum-1)*pagesize,pageNum*pagesize)"
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
                  <div slot="reference"
                    class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.borrowUser.username }}</el-tag>
                  </div>
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
                    @click="handlepass(scope.$index, scope.row)">通过</el-button>
                  <el-button size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="vals2">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制初始显示第一个选项卡
      activeName: 'first',
      tableData: [],
      tableData2:[],
      pageNum: 1,//默认开始页面
      pagesize: 10,//每页的数据条数
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleClick(tab, event) {
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    handlepass(index, row) {
      this.$ajax({
        url: '/admin/applySuccess',
        method: 'post',
        data: {
          _id: row._id
        }
      }).then(res => {
        this.$message.success("已通过审核")
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
      }).then(res => {
        this.$message.success("已驳回")
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
  computed: {
    vals() {
      /**
       * 数组过滤
       * es6
       * 得到tableData里面yn为true的数组的长度
       *  */
      return this.tableData.length;
    },
    vals2(){
      return this.tableData2.length;
    }
  },
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
.check .table .el-table td,
.check .table .el-table th {
  text-align: center;
}
.check .el-tabs {
  margin: 20px 0px 0px 30px;
}
.check .el-tabs__nav-wrap {
  width: 153px;
}
.check .table {
  width: 1100px;
  margin-top: 30px;
}
.check .el-table td,
.check .el-table th {
  text-align: center;
}
.check .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
