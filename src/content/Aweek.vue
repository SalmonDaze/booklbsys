<template>
  <div class="aweek">
    <h3>借阅7天内人员名单</h3>
    <div class="operate">
      <el-input placeholder="请输入书名"
        prefix-icon="el-icon-search"
        v-model="input21">
      </el-input>
      <el-input placeholder="上架时间"
        suffix-icon="el-icon-date"
        v-model="input2">
      </el-input>
      <el-button type="primary" plain>查询</el-button>
    </div>
    <div class="table">
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input21:'',
      input2:''
    }
  },
}
</script>
<style>
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
.aweek .el-input--suffix{
  margin-left: 30px;
}
.aweek .el-button{
  margin-left: 30px;
}
</style>
