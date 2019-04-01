<template>
  <div class="ungive-back">
    <div class="ungive-back1">
      <v-recordtitle title="未归还的书籍"
        :searchreader_show="false"
        v-on:doSearchbook="do_searchbook"
        v-on:doSearchtime="do_searchtime"
        v-on:doRenewal="do_renewal"
        v-on:doReturn="do_return"></v-recordtitle>
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
          <el-table-column label="书名"
            width="120">
            <template slot-scope="scope">
              <div @click='borrowbook(scope.$index, scope.row)'
                class="hover">
                {{ scope.row.bookname }}
              </div>
            </template>
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
          <el-table-column label="借阅人"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <div @click='userlist(scope.$index, scope.row)'
                class="hover">
                {{ scope.row.reader }}
              </div>
            </template>
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
  created() {
    this.$ajax.post('http://192.168.2.73:3000/admin/unReturnBookList').then((res) => {
      for (const book of res.data.data) {
        /**
           * title：书名
           * borrowTime：借出时间
           * borrowCycle：可借天数
           * isLending：是否借出
           * returnTime:剩余时间
           * userid：借阅人id
           * phone：借阅人手机号
           */
        let { title, borrowTime, borrowUser, borrowCycle, isLending, returnTime, _id } = book
        this.tableData.push({
          date: formatTime(borrowTime),
          bookname: title,
          reader: borrowUser.username,
          can_days: borrowCycle,
          bookid: _id,
          remainder_days: remainTime(returnTime),
          yn: isLending ? '否' : '是',
          userid: borrowUser._id,
          phone: borrowUser.phone
        })
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
    // 搜索书名（部分搜索）
    do_searchbook(input_bookname) {
      if (!input_bookname) {
        this.tableData1 = this.tableData;
        this.$message.warning("请输入要查询的书名");
        return false;
      } else {
        //逻辑-->根据input的value值筛选books中的数据
        var arrByZM = []; //声明一个空数组来存放数据
        for (var i = 0; i < this.tableData.length; i++) {
          //for循环数据中的每一项（根据name值）
          if (this.tableData[i].bookname.search(input_bookname) != -1) {
            //判断输入框中的值是否可以匹配到数据，如果匹配成功
            arrByZM.push(this.tableData[i]);
            //向空数组中添加数据
          }
        }
        //一定要记得返回筛选后的数据
        return this.tableData1 = arrByZM;
      }
    },
    // 搜索日期
    do_searchtime(value_borrowtime) {
      var NewItemtimes = [];
      if (!value_borrowtime) {
        this.tableData1 = this.tableData;
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
                    _userId: gx.userid
                  }
                }).then(res => {
                  if (res.data.code === 200) {
                    gx.remainder_days += parseInt(renewal_time);
                    this.$message.success(res.data.msg);
                  } else {
                    this.$message.error(res.data.msg)
                  }
                });
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
            this.$confirm('是否确定归还该书？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 确定
              this.$ajax({
                url: '/api/returnBook',
                method: 'post',
                data: {
                  _id: gx.bookid,
                  _userId: gx.userid
                }
              }).then(res => {
                this.$message.success(res.data.msg)
                for (const item in this.tableData) {
                  if (this.tableData[item].bookid === gx.bookid) {
                    this.tableData.splice(item, 1)
                  }
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消归还'
              });
            });
          }
        }
      }
    },
    // 点击书名跳转书籍详情借阅页
    borrowbook(index, row) {
      this.$router.push({
        name: 'borrowbook',
        params: {
          bookid: row.bookid
        }
      });
    },
    // 点击借阅人跳转该用户个人信息页
    userlist(index, row) {
      this.$router.push({
        name: 'userPhone',
        params: {
          userPhone: row.phone
        }
      })
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
.ungive-back {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.ungive-back1 {
  width: 1600px;
}
.ungive-back .table {
  position: absolute;
  top: 220px;
  width: 1500px;
}
.ungive-back .el-table td,
.ungive-back .el-table th {
  text-align: center;
}
.ungive-back .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
