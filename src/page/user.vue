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
    <div class="borrow_list">
      <h2 class='borrow_title'>借阅记录</h2>
      <v-booklist v-for='book in borrow_list' :key='book._id' :title="book.title"
            :author="book.author"
            :booklist_img="book.cover"
            :synopsis="book.bookInfo"></v-booklist>
            <div class='pagination'>
              <el-pagination 
                layout='prev, pager, next'
                :page-size='5'
                :total='pages'>
                </el-pagination>
            </div>
    </div>
  </div>
</template>

<script>
import { formatTime, formatPath } from '../utils/formatDate'
import vBooklist from './booklist.vue'
export default {
  components:{
    vBooklist
  },
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
    },
    pages() {
      return this.borrow_list.length
    }
  }
}
</script>

<style>
.user {
  position: relative;
  top: 40px;
  left: 50px;
  height: 500px;
  width: 400px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0 , 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-top: 50px;
}
.user_name {
  font-size: 3rem;
  text-align: center;
}
.user_info {
  margin-top: 20px;
  font-size: 1.3rem;
}
.user_info li {
  margin-top: 40px;
}
.borrow_list {
  position: relative;
  width: 1000px;
  height: 530px;
  box-shadow: 0 2px 4px rgba(0, 0, 0 , 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  left: 450px;
  top: -450px;
  padding-top: 20px;
}
.borrow_title {
  margin-left: 50px;
}
.pagination {
  position: absolute;
  left: 35%;
  top: 430px;
}
</style>
