<template>
  <div class="userapply">
    <div class="userapply1">
      <h3>我的申请</h3>
      <el-tabs v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane label="借阅申请"
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
              <el-table-column label="书名"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.apply_book.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="图书识别码"
                width="280">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.apply_book._id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ stateLabel[scope.row.status] }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini"
                    type="danger" v-if="scope.row.status === 'applying'"
                    @click="handleDelete(scope.$index, scope.row)">撤销申请</el-button>
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
        <el-tab-pane label="归还申请"
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
              <el-table-column label="书名"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.apply_book.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="图书识别码"
                width="280">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.apply_book._id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ stateLabel[scope.row.status] }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini"
                    type="danger"  v-if="scope.row.status === 'applying'"
                    @click="handleDelete2(scope.$index, scope.row)">撤销申请</el-button>
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
  inject: ['reload'],
  data() {
    return {
      // 控制初始显示第一个选项卡
      activeName: 'first',
      tableData: [],
      tableData2: [],
      pageNum: 1,//默认开始页面
      pagesize: 10,//每页的数据条数
      stateLabel: {
        applying: '申请中',
        success: '已同意',
        fail: '已拒绝'
      }
    }
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
    // 撤销申请
    handleDelete(index, row) {
      console.log(row)
      this.$ajax({
        url: '/api/cancelApply',
        method: 'post',
        data: {
          _id: row.apply_item
        }
      }).then(res => {this.reload();})
    },
    handleDelete2(index, row) {
      this.$ajax({
        url: '/api/cancelApplyReturn',
        method: 'post',
        data: {
          _id: row.apply_item
        }
      }).then(res => {this.reload();})
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
  mounted() {
    this.$ajax({
      url: '/admin/getOneUserInfo',
      method: 'post',
      data: {
        phone: this.$store.state.user.phone
      }
    }).then( res => {
      console.log(res)
      this.tableData = res.data.data[0].apply_borrow_list
      this.tableData2 = res.data.data[0].apply_return_list
    })
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
.userapply .el-tabs {
  margin: 20px 0px 0px 30px;
}
.userapply .el-tabs__nav-wrap {
  width: 153px;
}
.userapply .table {
  width: 1100px;
  margin-top: 30px;
}
.userapply .el-table td,
.userapply .el-table th {
  text-align: center;
}
.userapply .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
