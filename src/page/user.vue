<template>
  <div class="user">
    <div class='user_name'>
      <h3>{{username}}</h3>
      <ul class='user_info'>
        <li>UID: {{UID}}</li>
        <li>用户组: {{isAdmin ? '管理员' : '普通用户'}}</li>
        <li>手机号码: {{phone}}</li>
        <li>账号状态: {{isBanned ? '封禁' : '正常'}}</li>
        <li>创建日期: {{create_at.slice(0, 10)}}</li>
      </ul>
    </div>
    <div class="borrow_list">
      <h2 class='borrow_title' style="margin-top:10px;">借阅记录</h2>
      <h3 v-if='!borrow_list.length' style='margin-left: 400px;margin-top: 100px;'>无借阅记录</h3>
      <div v-else style="margin-top:30px;">
        <v-booklist v-for='book in borrow_list.slice((pageNum-1)*pagesize,pageNum*pagesize)'
        :key='book._id'
        :title="book.title"
        :author="book.author"
        :booklist_img="book.cover"
        :synopsis="book.bookInfo"
<<<<<<< HEAD
        ></v-booklist>
=======
        :borrow_show="false"
        borrow_list.length="borrow_list.slice((pageNum-1)*pagesize,pageNum*pagesize)"></v-booklist>
>>>>>>> d3e324109f2bef58caea870fd5b593ea8d5f730e
      </div>
      <!-- 分页 -->
      <div class="page">
        <el-pagination @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime, formatPath } from '../utils/formatDate'
import vBooklist from './booklist.vue'
import { mapState } from 'vuex'
export default {
  components: {
    vBooklist
  },
  props: {
    username: String,
    phone: String,
    isAdmin: Boolean,
    isBanned: Boolean,
    borrow_list: Array,
    UID: Number,
    create_at: String,
    length: Number
  },
  computed: {
  },
  data() {
    return {
      pageNum: 1,//默认开始页面
      pagesize: 4,//每页的数据条数
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
  },
  computed: mapState({
    // 获取用户名
    user: state => state.user,
  })
}
</script>

<style>
.user {
  position: relative;
  top: 80px;
  left: 50px;
  height: 500px;
  width: 400px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  left: 450px;
  top: -450px;
  padding-top: 20px;
}
.borrow_title {
  margin-left: 50px;
}
.user .page{
  position: absolute;
  top: 430px;
  left: 280px;
}
</style>
