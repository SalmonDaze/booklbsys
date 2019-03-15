<template>
<div class="record-title">
  <div class="record-title1">
    <h3>{{title}}</h3>
    <div class="operate">
      <el-input placeholder="请输入书名"
        prefix-icon="el-icon-search"
        v-model="input_bookname">
      </el-input>
      <el-date-picker type="dates"
        v-model="value_borrowtime"
        placeholder="请选择借书时间">
      </el-date-picker>
      <el-button type="primary"
        plain>查询</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">续借</el-button>
      <el-button @click="toggleSelection()">归还</el-button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props:{
    title:String
  },
  data() {
    return {
      // 输入书名
      input_bookname: '',
      // 选择借书时间
      value_borrowtime: '',
    }
  },
  methods: {
    
  }
}
</script>
<style>
.record-title{
  position: absolute;
}
.record-title h3 {
  color: #2c3e50;
}
.record-title .el-input {
  width: 180px;
}
.record-title .operate {
  margin-top: 30px;
  margin-left: 20px;
}
.record-title .el-input--suffix {
  margin-left: 30px;
}
.record-title .el-button {
  margin-left: 30px;
}
.record-title .el-pagination{
  margin-top: 10px;
  text-align: center;
}
</style>
