<template>
  <div class="set-up">
    <div class="set-up1">
      <v-recordtitle title="书籍管理"
        :searchreader_show="false"
        v-on:doSearchbook="do_searchbook"
        v-on:doSearchtime="do_searchtime"
        v-on:doRenewal="do_renewal"
        v-on:doReturn="do_return"></v-recordtitle>
      <div class="delete">
        <el-button type="danger"
          plain
          @click="deletebooks()">下架</el-button>
      </div>
      <div class="table">
        <!-- 表格 -->
        <el-table ref="multipleTable"
          :data="tableData1.slice((pageNum-1)*pagesize,pageNum*pagesize)"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="上架日期"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="bookname"
            label="书名">
          </el-table-column>
          <el-table-column prop="bookid"
            label="图书识别码">
          </el-table-column>
          <el-table-column prop="can_days"
            label="可借天数（天）"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="remainder_days"
            label="剩余天数（天）"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="borrowCount"
            label="借阅次数"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="yn"
            label="是否归还"
            show-overflow-tooltip>
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
    </div>
  </div>
</template>
<script>
import vRecordtitle from "../../page/record_title.vue";
import { remainTime, formatTime, calendarTime } from '../../utils/formatDate.js';
export default {
  components: {
    vRecordtitle
  },
  props: {
    title: String
  },
  /** 
   * created模板渲染成HTML前调用
   * mounted模板渲染成HTML后调用
   */
  created() {
    this.$ajax.post('/admin/getAllBook').then((res) => {
      console.log(res)
      for (const book of res.data.data) {
        /**
         * title：书名
         * create_time：上架时间
         * borrowCycle：可借天数
         * isLending：是否借出
         * returnTime:剩余时间
         * borrowCount：借阅次数
         */
        let { title, create_time, borrowUser, borrowCycle, isLending, returnTime, _id, borrowCount } = book
        if (!isLending) {
          this.tableData.push({
            date: formatTime(create_time),
            bookname: title,
            bookid: _id,
            can_days: borrowCycle,
            borrowCount: borrowCount,
            remainder_days: '无人借阅',
            yn: isLending ? '否' : '是'
          })
        } else {
          this.tableData.push({
            date: formatTime(create_time),
            bookname: title,
            bookid: _id,
            can_days: borrowCycle,
            borrowCount: borrowCount,
            remainder_days: remainTime(returnTime),
            yn: isLending ? '否' : '是'
          })
        }
      }
    });
    this.tableData1 = this.tableData;
  },
  data() {
    return {
      // 输入书名
      input_bookname: '',
      // 选择借书时间
      value_borrowtime: '',
      // 表单
      tableData: [],
      tableData1: [],
      multipleSelection: [],
      pageNum: 1,//默认开始页面
      pagesize: 10,//每页的数据条数
    }
  },
  methods: {
    // 搜索书名
    do_searchbook(input_bookname) {
      var NewItems = [];
      if (!input_bookname) {
        this.$message.warning("请输入要查询的书名");
        return false;
      } else {
        this.tableData.map(function (item) {
          // 数组里的书名和输入框书名一致
          if (item.bookname === input_bookname) {
            NewItems.push(item);
          } else {
            return false;
          }
        });
        return this.tableData1 = NewItems;
      }
    },
    // 搜索日期
    do_searchtime(value_borrowtime) {
      var NewItemtimes = [];
      console.log(value_borrowtime)
      if (!value_borrowtime) {
        this.$message.warning("请输入要查询的借出日期");
        return false;
      } else {
        var date_value = calendarTime(value_borrowtime);
        NewItemtimes = this.tableData.filter(function (item1) {
          return item1.date === date_value
        });
        return this.tableData1 = NewItemtimes;
      }
    },
    // 续借书籍
    do_renewal(renewal_time) {
      // 将勾选内容的长度赋值在select，判断是否勾选书籍
      var select = this.multipleSelection.length;
      // 校验输入是否是数字
      let reg = /^[1-9]\d*$/
      if (renewal_time) {
        if (!reg.test(renewal_time)) {
          this.$message.error("输入框只能输入1-30的数字！");
          return false;
        } else {
          if (select === 0) {
            this.$message.error("请勾选需要续借的书籍！");
            return false;
          } else {
            for (const gx of this.multipleSelection) {
              if (gx.yn === "是") {
                this.$message.error("请借阅后再操作！");
                return false;
              } else {
                this.$ajax({
                  url: '/api/bookBorrowContinue',
                  method: 'post',
                  data: {
                    time: renewal_time,
                    _id: gx.bookid
                  }
                }).then(res => console.log(res))
                this.$message.error("续借成功！");
              }
            }
          }
        }
      } else {
        this.$message.warning("请输入续借时间！");
        return false;
      }
    },
    // 还书
    do_return() {
      // 将勾选内容的长度赋值在select，判断是否勾选书籍
      var select = this.multipleSelection.length;
      if (select === 0) {
        this.$message.error("请勾选需要归还的书籍！");
        return false;
      } else {
        for (const gx of this.multipleSelection) {
          if (gx.yn === "是") {
            this.$message.warning("书籍已归还，请勿重复操作！");
          } else {
            this.$ajax({
              url: '/api/returnBook',
              method: 'post',
              data: {
                _id: gx.bookid,
                _userId: this.$store.state.user._id
              }
            }).then(res => console.log(res))
          }
        }
      }
    },
    // 下架
    deletebooks() {
      // 将勾选内容的长度赋值在select，判断是否勾选书籍
      var select = this.multipleSelection.length;
      if (select === 0) {
        this.$message.error("请勾选需要下架的书籍！");
        return false;
      } else {
        for (const gx of this.multipleSelection) {
          if (gx.yn === "否") {
            this.$message.error("该书暂未归还，无法下架！");
          } else {
            if (gx.borrowCount > 3) {
              this.$confirm('该书多次被借阅，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$ajax({
                  url: '/admin/deleteBook',
                  method: 'post',
                  data: {
                    _id: gx.bookid,
                  }
                }).then(res => console.log(res))
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            } else {
              this.$ajax({
                url: '/admin/deleteBook',
                method: 'post',
                data: {
                  _id: gx.bookid,
                }
              }).then(res => console.log(res))
              this.$message({
                type: 'success',
                message: '删除成功！'
              });
            }
          }
        }
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val
      console.log(`当前页: ${val}`);
    },
    // 保存勾选数据，type必须是selection
    // 把勾选数据传到后台
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  computed: {
    vals() {
      /**
       * 数组过滤
       * es6
       * 得到tableData3里面yn为true的数组的长度
       *  */
      return this.tableData1.length
    }
  }
}
</script>
<style>
.set-up {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.set-up1 {
  width: 1600px;
}
.set-up .delete {
  position: relative;
  top: 190px;
}
.set-up .table {
  position: absolute;
  top: 240px;
  width: 1500px;
}
.set-up .el-button {
  margin-left: 30px;
}
.set-up .el-table td,
.set-up .el-table th {
  text-align: center;
}
.set-up .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
