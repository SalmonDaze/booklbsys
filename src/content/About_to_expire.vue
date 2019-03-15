<template>
<div class="abouttoexpire">
  <div class="abouttoexpire1">
    <h3>借阅即将到期人员名单</h3>
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
</div>
</template>

<script>
export default {

}
</script>

<style>
.abouttoexpire{
  position: absolute;
  top: 140px;
  left: 230px;
  height: 900px;
}
.abouttoexpire h3 {
  color: #2c3e50;
}
.abouttoexpire .el-input {
  width: 180px;
}
.abouttoexpire .operate {
  margin-top: 30px;
  margin-left: 20px;
}
.abouttoexpire .el-input--suffix {
  margin-left: 30px;
}
.abouttoexpire .el-button {
  margin-left: 30px;
}
</style>
