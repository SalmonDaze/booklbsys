<template>
  <div class="abouttoexpire">
    <div class="abouttoexpire1">
      <v-recordtitle title="即将到期的书籍"
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
          @selection-change="handleSelectionChange"
          :default-sort="{prop: 'date', order: 'descending'}">
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
import { remainTime, formatTime, calendarTime } from '../../utils/formatDate.js';
import { do_searchbook, do_searchtime, do_renewal, do_return } from '../../utils/operationBook.js';
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
    this.$ajax.post('/admin/delayingBookList').then((res) => {
      console.log(res)
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
          bookid: _id,
          reader: borrowUser.username,
          can_days: borrowCycle,
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
    // 搜索书名(部分搜索)
    do_searchbook,
    // 搜索日期
    do_searchtime,
    // 续借书籍
    do_renewal,
    // 还书
    do_return,
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
       * 得到tableData1里面yn为true的数组的长度
       *  */
      return this.tableData1.length
    },
  }
}
</script>
<style>
.abouttoexpire {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.abouttoexpire1 {
  width: 1600px;
}
.abouttoexpire .table {
  position: absolute;
  top: 220px;
  width: 1500px;
}
.abouttoexpire .el-table td,
.abouttoexpire .el-table th {
  text-align: center;
}
.abouttoexpire .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
