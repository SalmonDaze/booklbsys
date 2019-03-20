<template>
  <div class="aweek">
    <div class="aweek1">
      <v-recordtitle title="借阅的书籍"
        input_txt="请输入书名"></v-recordtitle>
      <div class="table">
        <!-- 表格 -->
        <el-table ref="multipleTable"
          :data="tableData3.slice((pageNum-1)*pagesize,pageNum*pagesize)"
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
          <el-table-column prop="bookname"
            label="书名">
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
import { msToDate, getDate, remainTime, unixTranstoDate } from '../utils/formatDate.js'
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
      url: '/api/getUserBorrowList',
      method: 'post',
      data: {
        _id: this.$store.state.user._id
      }
    }).then(res => {
      for (const book of res.data.data.borrow_list) {
        /**
         * title：书名
         * borrowTime：借出时间
         * borrowCycle：可借天数
         * isLending：是否借出
         * returnTime:剩余时间
         */
        let { title, borrowTime, borrowUser, borrowCycle, isLending, returnTime } = book
        this.tableData3.push({
          date: unixTranstoDate(borrowTime).slice(0, 10),
          bookname: title,
          can_days: borrowCycle,
          remainder_days: Math.ceil(remainTime(returnTime, getDate())),
          yn: isLending ? '否' : '是'
        })
      }
    })
  },
  data() {
    return {
      // 输入书名
      input_bookname: '',
      // 选择借书时间
      value_borrowtime: '',
      tableData3: [],
      multipleSelection: [],
      pageNum: 1,//默认开始页面
      pagesize: 10,//每页的数据条数
    }
  },
  methods: {
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
       * 得到tableData3里面yn为true的数组的长度
       *  */
      return this.tableData3.filter(x => x).length
    }
  }
}
</script>
<style>
.aweek {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 900px;
}
.aweek1 {
  width: 1200px;
}
.aweek .table {
  position: absolute;
  top: 160px;
  width: 1200px;
}
.aweek .el-button {
  margin-left: 30px;
}
.aweek .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
