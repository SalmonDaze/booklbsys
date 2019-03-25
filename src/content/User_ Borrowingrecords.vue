<template>
  <div class="userborrow">
    <div class="userborrow1">
      <v-recordtitle title="借阅的书籍"
        input_txt="请输入书名"
        :input_bookname="input_bookname"
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
    this.$ajax({
      url: '/admin/getUserInfo',
      method:'post',
      data:{
        _id:this.$store.state.user._id
        }
      }).then((res) => {
        console.log(res)
      let borrow_list = res.data.data[0].borrow_list
      for (const book of borrow_list) {
        /**
         * data：借出时间
         * return_data：归还时间
         * title：书名
         * borrowTime：借出时间
         * borrowCycle：可借天数
         * isLending：是否借出
         * returnTime:剩余时间
         */
        let { title, borrowTime, borrowCycle, isLending, returnTime, _id } = book
        this.tableData3.push({
          date: formatTime(borrowTime),
          return_data:formatTime(returnTime),
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
.userborrow {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 900px;
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
