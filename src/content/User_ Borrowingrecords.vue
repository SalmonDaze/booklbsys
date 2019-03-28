<template>
  <div class="userborrow">
    <div class="userborrow1">
      <v-recordtitle title="借阅的书籍"
        input_txt="请输入书名，回车"
        :return_show="false"
        v-on:doSearchbook="do_searchbook"
        v-on:doSearchtime="do_searchtime"
        v-on:doRenewal="do_renewal"></v-recordtitle>
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
          <el-table-column label="借出日期"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="归还日期"
            width="120">
            <template slot-scope="scope">{{ scope.row.return_data }}</template>
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
          <el-table-column prop="yn"
            label="是否归还"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                type="danger"
                @click="do_return(scope.$index, scope.row)"
                v-if="scope.row.yn === '否'">归还</el-button>
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
    </div>
  </div>
</template>
<script>
import vRecordtitle from "../page/record_title.vue";
import { remainTime, formatTime, calendarTime } from '../utils/formatDate.js';
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
    this.$ajax({
      url: '/admin/getOneUserInfo',
      method: 'post',
      data: {
        phone: this.$store.state.user.phone
      }
    }).then((res) => {
      let borrow_history = res.data.data[0].borrow_history
      for (const book of borrow_history) {
        /**
         * data：借出时间
         * return_data：归还时间
         * title：书名
         * borrowTime：借出时间
         * borrowCycle：可借天数
         * isReturn：是否借出
         * returnTime:剩余时间
         */
        let { title, borrowCycle, _id } = book.book;
        let { borrowTime, returnTime, isReturn } = book;
        if (isReturn) {
          this.tableData.push({
            date: formatTime(borrowTime),
            return_data: formatTime(returnTime),
            bookname: title,
            bookid: _id,
            can_days: borrowCycle,
            remainder_days: '已归还',
            yn: isReturn ? '是' : '否',
          })
        } else {
          this.tableData.push({
            date: formatTime(borrowTime),
            return_data: formatTime(returnTime),
            bookname: title,
            bookid: _id,
            can_days: borrowCycle,
            remainder_days: remainTime(returnTime),
            yn: isReturn ? '是' : '否',
          })
        }
      }
    });
    this.tableData1 = this.tableData;
  },
  data() {
    return {
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
                    _id: gx.bookid,
                    _userId: this.$store.state.user._id
                  }
                }).then(res => {
                  if (res.data.code === 200) {
                    gx.remainder_days += parseInt(renewal_time);
                    this.$message.success(res.data.msg);
                  } else {
                    this.$message.error(res.data.msg)
                  }
                })
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
    do_return(index, row) {
      // 将勾选内容的长度赋值在select，判断是否勾选书籍
      var select = this.multipleSelection.length;
      if (row.yn === "是") {
        this.$message.warning("书籍已归还，请勿重复操作！");
      } else {
        this.$ajax({
          url: '/api/returnBook',
          method: 'post',
          data: {
            _id: row.bookid,
            _userId: this.$store.state.user._id
          }
        }).then(res => {
          if (res.data.code === 200) {
            row.remainder_days = "已归还";
            row.yn = "是";
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg)
          }
        })
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
       * 得到tableData里面yn为true的数组的长度
       *  */
      return this.tableData1.length
    }
  }
}
</script>
<style>
.userborrow {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.userborrow1 {
  width: 1600px;
}
.userborrow .table {
  position: absolute;
  top: 220px;
  width: 1500px;
}
.userborrow .el-button {
  margin-left: 30px;
}
.userborrow .el-table td,
.userborrow .el-table th {
  text-align: center;
}
.userborrow .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
