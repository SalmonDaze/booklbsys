<template>
  <div class="giveback">
    <div class="giveback1">
      <v-recordtitle title="管内书籍"
        :return_show="false"
        :renewal_show="false"
        input_txt="请输入书名，回车"
        v-on:doSearchbook="do_searchbook"
        v-on:doSearchtime="do_searchtime"></v-recordtitle>
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
            label="图书识别码"></el-table-column>
          <el-table-column prop="can_days"
            label="可借天数（天）"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="borrowCount"
            label="借阅次数（天）"
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
  created() {
    this.$ajax.post('/admin/getUnlendingList').then((res) => {
      console.log(res)
      for (const book of res.data.data) {
        // 判断已归还
        /**
         * title：书名
         * create_time：上架时间
         * borrowCycle：可借天数
         * borrowCount：借阅次数
         * isLending：是否借出
         * returnTime:剩余时间
         */
        console.log(book)
        let { title,_id, create_time, borrowUser, borrowCycle, borrowCount, isLending } = book
        this.tableData.push({
          date: formatTime(create_time),
          bookname: title,
          bookid: _id,
          borrowCount: borrowCount,
          can_days: borrowCycle,
          yn: isLending ? '否' : '是'
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
      tableData: [],
      tableData1:[],
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
        this.tableData1 = this.tableData;
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
      return this.tableData1.length
    }
  }
}
</script>
<style>
.giveback {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.giveback1 {
  width: 1200px;
}
.giveback .table {
  position: absolute;
  top: 160px;
  width: 1500px;
}
.giveback .el-pagination {
  margin-top: 10px;
  text-align: center;
}
.giveback .el-table td,
.giveback .el-table th {
  text-align: center;
}
</style>
