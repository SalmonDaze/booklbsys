<template>
  <div class="user">
    <div class='user_name'>
      <h3>{{userInfo.username}}</h3>
      <ul class='user_info'>
        <li>UID: {{userInfo.UID}}</li>
        <li>用户组: {{userInfo.isAdmin ? '管理员' : '普通用户'}}</li>
        <li>手机号码: {{userInfo.phone}}</li>
        <li>账号状态: {{userInfo.isBanned ? '封禁' : '正常'}}</li>
        <li>创建日期: {{userInfo.create_at.slice(0, 10)}}</li>
        <li v-if='auth'>
          <el-button type='danger'
            style='width: 150px;'
            @click='banUser'>封禁用户</el-button>
        </li>
        <li v-if='unBan'>
          <el-button type='warning'
            style='width: 150px'
            @click='unBanUser'>解除封禁</el-button>
        </li>
      </ul>
    </div>
    <div class="borrow_list">
      <h2 class='borrow_title'
        style="margin-top:10px;">借阅记录</h2>
      <h3 v-if='!userInfo.borrow_list.length'
        style='margin-left: 400px;margin-top: 100px;'>无借阅记录</h3>
      <div v-else
        style="margin-top:30px;">
        <v-booklist v-for='book in userInfo.borrow_list.slice((pageNum-1)*pagesize,pageNum*pagesize)'
          :key='book._id'
          :title="book.title"
          :author="book.author"
          :booklist_img="book.cover"
          :synopsis="book.bookInfo"
          :borrow_show="false"
          borrow_list.length="borrow_list.slice((pageNum-1)*pagesize,pageNum*pagesize)"></v-booklist>
      </div>
      <!-- 分页 -->
      <div class="page">
        <el-pagination @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="userInfo.borrow_list.length">
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
  inject: ['reload'],
  components: {
    vBooklist
  },
  data() {
    return {
      pageNum: 1,//默认开始页面
      pagesize: 4,//每页的数据条数
      userInfo: {
        UID: 123456,
        username: 'default',
        phone: '1234567890',
        isBanned: false,
        isAdmin: false,
        create_at: '1970-01-01T00:00:00Z',
        borrow_list: [],
      },
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
    getDate() {
      this.$ajax({
        url: '/admin/getOneUserInfo',
        method: 'post',
        data: {
          phone: this.$router.currentRoute.params.userPhone
        }
      }).then(res => {
        this.userInfo = res.data.data[0]
      })
    },
    banUser() {
      this.$confirm('确认封禁该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax({
          url: '/admin/banUser',
          method: 'post',
          data: {
            phone: this.userInfo.phone
          }
        }).then(() => {
          this.$message.success('封禁成功')
          this.reload();
        })
      })
    },
    unBanUser() {
      this.$confirm('确认解封该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax({
          url: '/admin/unBanUser',
          method: 'post',
          data: {
            phone: this.userInfo.phone
          }
        }).then(() => {
          this.$message.success('解封成功')
          this.reload();
        })
      })
    }
  },
  computed: mapState({
    // 获取用户名
    user: state => state.user,
  }),
  computed: {
    auth() {
      return this.$store.state.user.isAdmin && !this.userInfo.isBanned
        && this.userInfo._id !== this.$store.state.user._id
    },
    unBan() {
      return this.$store.state.user.isAdmin && this.userInfo.isBanned
    }
  },
  mounted() {
    this.getDate()
  }
}
</script>

<style>
.user {
  position: absolute;
  top: 150px;
  left: 250px;
  height: 550px;
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
.user .page {
  position: absolute;
  top: 430px;
  left: 280px;
}
</style>
