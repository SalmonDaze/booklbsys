<template>
  <div class="aweek">
    <h3>借阅7天内人员名单</h3>
    <div class="operate">
      <el-input placeholder="请输入书名"
        prefix-icon="el-icon-search"
        v-model="input21">
      </el-input>
      <el-date-picker type="dates"
        v-model="value14"
        placeholder="请选择借书时间">
      </el-date-picker>
      <el-button type="primary"
        plain>查询</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">续借</el-button>
      <el-button @click="toggleSelection()">归还</el-button>
    </div>
    <el-pagination @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    <el-table ref="multipleTable"
      :data="tableData3"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      input21: '',
      value14: '',
      tableData3: [
        {
          date: '2016-05-03',
          bookname: 'C语言设计',
          can_days: '30',
          remainder_days: '10',
          reader: '王江',
          yn: '是'
        }, {
          date: '2016-05-02',
          bookname: 'Windows程序设计',
          can_days: '60',
          remainder_days: '8',
          reader: '珞珈',
          yn: '否'
        }, {
          date: '2016-05-04',
          bookname: 'Java编程语言',
          can_days: '30',
          remainder_days: '12',
          reader: '周敏',
          yn: '否'
        }, {
          date: '2016-05-03',
          bookname: 'C语言设计',
          can_days: '30',
          remainder_days: '10',
          reader: '珞珈',
          yn: '否'
        }, {
          date: '2016-05-02',
          bookname: 'Windows程序设计',
          can_days: '60',
          remainder_days: '8',
          reader: '周敏',
          yn: '否'
        }, {
          date: '2016-05-04',
          bookname: 'Java编程语言',
          can_days: '30',
          remainder_days: '12',
          reader: '周敏',
          yn: '否'
        },],
      multipleSelection: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
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
  }
}
</script>
<style>
.aweek{
  position: absolute;
  top: 140px;
  left: 230px;;
  height: 900px;
}
.aweek h3 {
  color: #2c3e50;
}
.aweek .el-input {
  width: 180px;
}
.aweek .operate {
  margin-top: 30px;
  margin-left: 20px;
}
.aweek .el-input--suffix {
  margin-left: 30px;
}
.aweek .el-button {
  margin-left: 30px;
}
</style>
