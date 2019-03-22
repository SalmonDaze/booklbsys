<template>
  <div class="set-up">
    <div class="set-up1">
      <v-recordtitle title="7天内借阅的书籍"
        input_txt="请输入书名"
        v-on:doRenewal="do_renewal"
        v-on:doReturn="do_return"></v-recordtitle>
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
          <el-table-column prop="reader"
            label="借阅人"
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
import { remainTime, formatTime } from '../utils/formatDate.js';
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
         * borrowTime：借出时间
         * borrowCycle：可借天数
         * isLending：是否借出
         * returnTime:剩余时间
         */
        let { title, borrowTime, borrowUser, borrowCycle, isLending, returnTime, _id } = book
        this.tableData3.push({
          date: formatTime(borrowTime),
          bookname: title,
          bookid: _id,
          can_days: borrowCycle,
          remainder_days: remainTime(returnTime),
          yn: isLending ? '否' : '是'
        })
      }
    });
  },
  data() {
    return {
      // 输入书名
      input_bookname: '',
      // 选择借书时间
      value_borrowtime: '',
      // 表单
      tableData3: [],
      multipleSelection: [],
      pageNum: 1,//默认开始页面
      pagesize: 10,//每页的数据条数
    }
  },
  methods: {
    // 续借书籍
    do_renewal(renewal_time) {
      for (const gx of this.multipleSelection) {
        this.$ajax({
          url: '/api/bookBorrowContinue',
          method: 'post',
          data: {
            time: renewal_time,
            _id: gx.bookid
          }
        }).then(res => console.log(res))
      }
    },
    // 还书
    do_return() {
      for (const gx of this.multipleSelection) {
        this.$ajax({
          url: '/api/returnBook',
          method: 'post',
          data: {
            _id:gx.bookid,
          }
        }).then(res => console.log(res))
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
      return this.tableData3.filter(x => x).length
    }
  }
}
</script>
<style>
.set-up {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 900px;
}
.set-up1 {
  width: 1600px;
}
.set-up .table {
  position: absolute;
  top: 220px;
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
