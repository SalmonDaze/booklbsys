<template>
  <div class="giveback">
    <div class="giveback1">
      <v-recordtitle title="已归还书籍" :return_show="false" input_txt="请输入书名"></v-recordtitle>
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
          :page-sizes="[1, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="vals">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import vRecordtitle from "../content/record_title.vue";
export default {
  components: {
    vRecordtitle
  },
  props: {
    title: String
  },
  created(){
    this.$ajax.post('http://192.168.2.73:3000/admin/sevenDaysBorrow').then((res) => {
      console.log(res)
      for( const book of res.data.data) {
        // 判断已归还
        if( book.isLending ) {
          console.log(book)
          let { title, borrowTime, borrowUser, borrowCycle, isLending} = book
          this.tableData3.push({
            date: borrowTime,
            bookname: title,
            reader: borrowUser.username,
            can_days: borrowCycle,
            yn: isLending ? '是' : '否'
          })
        }
      }
    })
  },
  data() {
    return {
      // 输入书名
      input_bookname: '',
      // 选择借书时间
      value_borrowtime: '',
      tableData3: [
        {
          date: '2016-05-03',
          bookname: 'C语言设计',
          can_days: '30',
          remainder_days: '10',
          reader: '王江',
          yn: true
        },
        {
          date: '2016-05-03',
          bookname: 'JAVA语言设计',
          can_days: '30',
          remainder_days: '10',
          reader: '王力',
          yn: true
        }, ],
      multipleSelection: [],
      pageNum: 1,//默认开始页面
      pagesize: 1,//每页的数据条数
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
  computed:{
    vals() {
      /**
       * 数组过滤
       * es6
       * 得到tableData3里面yn为true的数组的长度
       *  */ 
      return this.tableData3.filter( x =>  x.yn ).length
    }
  }
}
</script>
<style>
.giveback {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 900px;
}
.giveback1 {
  width: 1200px;
}
.giveback .table{
  position: absolute;
  top: 160px;
  width: 1200px;
}
.giveback .el-button {
  margin-left: 30px;
}
.giveback .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
