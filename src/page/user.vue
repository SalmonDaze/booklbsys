<template>
  <div class="user">
    <div class='user_name'>
      <h3>{{username}}</h3>
      <ul class='user_info'>
        <li>UID: {{UID}}</li>
        <li>用户组: {{isAdmin ? '管理员' : '普通用户'}}</li>
        <li>手机号码: {{phone}}</li>
        <li>账号状态: {{isBanned ? '封禁' : '正常'}}</li>
        <li>创建日期: {{create_date}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatTime } from '../utils/formatDate'
export default {
  props:{
    username:String,
    phone:String,
    isAdmin: Boolean,
    isBanned: Boolean,
    borrow_list: Array,
    UID: Number,
    create_at: String,
  },
  computed:{
    create_date(){
      return this.create_at.slice(0, 10)
    }
  }
}
</script>

<style>
.user {
  position: absolute;
  top: 80px;
  left: 100px;
  height: 500px;
  width: 500px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0 , 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-top: 30px;
}
.user_name {
  font-size: 2rem;
  text-align: center;
}
.user_info {
  margin-top: 20px;
}
.user_info li {
  margin-top: 15px;
}
</style>
