<template>
  <div class="user">
    <div class="user1">
      <table border="0">
        <tr>
          <td colspan="2" class="table-title"><h4>用户信息</h4></td>
        </tr>
        <tr class="h1">
          <td>姓名</td>
          <td>{{username}}</td>
        </tr>
        <tr class="h1">
          <td>手机号</td>
          <td>{{phone}}</td>
        </tr>
        <tr class="h1">
          <td>是否是管理员</td>
          <td>是</td>
        </tr>
        <tr class="h1">
          <td>借阅书籍</td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    username:String,
    phone:String
  }
}
</script>

<style>
.user {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 900px;
}
.user1 {
  width: 1600px;
}
.user table {
  width: 700px;
}
.user td{
  padding: 10px;
}
.user .table-title{
  height: 50px;
  text-align: center;
}
.user .h1{
  text-align: center;
}
</style>
