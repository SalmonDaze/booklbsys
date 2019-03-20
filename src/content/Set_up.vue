<template>
  <div class="set-up">
    <div class="set-up1">
      <h3>书籍管理（admin）</h3>
      <div class="setup-content">
        <el-input placeholder="请输入书名"
          prefix-icon="el-icon-search"
          v-model="input_bookname">
        </el-input>
        <el-button type="primary"
          plain>查询</el-button>
        <div style="margin-top:20px;margin-left:20px;">
          <el-button @click="toggleSelection()">下架</el-button>
        </div>
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
            <el-table-column prop="bookname"
              label="书名">
            </el-table-column>
            <el-table-column label="借出日期"
              width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
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
  </div>
</template>

<script>
import { msToDate, getDate, remainTime, unixTranstoDate } from '../utils/formatDate.js'
export default {
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
        let { title, borrowTime, borrowUser, borrowCycle, isLending, returnTime } = book
        if (borrowTime === '') {
          this.tableData3.push({
            bookname: title,
            can_days: borrowCycle,
            remainder_days: '无借阅历史',
            yn: isLending ? '否' : '是'
          })
        } else {
          this.tableData3.push({
            date: unixTranstoDate(borrowTime).slice(0, 10),
            bookname: title,
            // reader: borrowUser.username,
            can_days: borrowCycle,
            remainder_days: Math.ceil(remainTime(returnTime, getDate())),
            yn: isLending ? '否' : '是'
          })
        }
      }
    })
  },
  data() {
    return {
      // 输入书名
      input_bookname: '',
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
.set-up {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 900px;
}
.set-up1 {
  width: 1200px;
}
.set-up .el-input {
  width: 180px;
  margin-right: 30px;
}
.set-up .setup-content {
  margin-top: 30px;
  margin-left: 20px;
}
.set-up .el-pagination {
  margin-top: 10px;
  text-align: center;
}
.set-up .el-table td,.set-up .el-table th{
  text-align: center;
}
</style>
