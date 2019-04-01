<template>
  <div class="blacklist">
    <div class="blacklist1">
      <v-recordtitle title="逾期名单"
        :return_show="false"
        :renewal_show="false"
        v-on:doSearchbook="do_searchbook"
        v-on:doSearchreader="do_searchreader"
        v-on:doSearchtime="do_searchtime"></v-recordtitle>
      <div class="table">
        <!-- 表格 -->
        <el-table ref="multipleTable"
          :data="tableData1.slice((pageNum-1)*pagesize,pageNum*pagesize)"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :default-sort="{prop: 'date', order: 'descending'}">
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
            label="逾期天数（天）"
            sortable
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
import { remainTime, formatTime, calendarTime } from '../../utils/formatDate'
export default {
  components: {
    vRecordtitle
  },
  props: {
    title: String
  },
  data() {
    return {
      // 输入书名
      input_bookname: '',
      // 选择借书时间
      value_borrowtime: '',
      tableData: [],
      tableData1: [],
      multipleSelection: [],
      pageNum: 1,//默认开始页面
      pagesize: 10,//每页的数据条数
    }
  },
  created() {
    this.$ajax({
      url: '/admin/getDelayList',
      method: 'post',

    }).then(res => {
      console.log(res)
      for (const book of res.data.data) {
        // 判断未归还
        let { title, borrowTime, borrowUser, borrowCycle, isLending, returnTime, _id } = book
        this.tableData.push({
          date: formatTime(borrowTime),
          bookname: title,
          reader: borrowUser.username,
          can_days: borrowCycle,
          bookid: _id,
          remainder_days: remainTime(returnTime),
          yn: isLending ? '否' : '是',
          phone: borrowUser.phone
        })
      }
    });
    this.tableData1 = this.tableData;
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
    // 搜索人名
    do_searchreader(input_reader){
      if (!input_reader) {
        this.tableData1 = this.tableData;
        this.$message.warning("请输入要查询的书名");
        return false;
      } else {
        //逻辑-->根据input的value值筛选books中的数据
        var arrByZM = []; //声明一个空数组来存放数据
        for (var i = 0; i < this.tableData.length; i++) {
          //for循环数据中的每一项（根据name值）
          if (this.tableData[i].reader.search(input_reader) != -1) {
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
      console.log(value_borrowtime)
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
    // 勾选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
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
       * 得到tableData1里面yn为true的数组的长度
       *  */
      return this.tableData.length
    }
  }
}
</script>
<style>
.blacklist {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.blacklist1 {
  width: 1200px;
}
.blacklist .table {
  position: absolute;
  top: 160px;
  width: 1500px;
}
.blacklist .el-button {
  margin-left: 30px;
}
.blacklist .el-pagination {
  margin-top: 10px;
  text-align: center;
}
.blacklist .el-table td,
.blacklist .el-table th {
  text-align: center;
}
</style>
