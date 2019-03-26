<template>
  <div class="userlist">
    <div class="userlist1">
      <h3>用户信息管理</h3>
      <div class="operate">
        <el-input v-model="phoneNumber"
          prefix-icon="el-icon-search"
          placeholder="请输入用户手机号"></el-input>
        <el-button type="primary"
          plain
          @click='getUserInfo'>查询</el-button>
        <h3 v-if='!user'
          style='margin-left: 400px;margin-top: 100px;'>暂无数据</h3>
      </div>
    </div>
    <v-user v-if='user'
      :username="user.username"
      :phone="user.phone"
      :isAdmin='user.isAdmin'
      :isBanned='user.isBanned'
      :UID='user.UID'
      :create_at='user.create_at'
      :borrow_list='user.borrow_list'
      :length='user.borrow_list.length'></v-user>

  </div>
</template>

<script>
import vUser from '../page/user.vue'
export default {
  components: {
    vUser
  },
  data() {
    return {
      phoneNumber: '',
      user: '',
    }
  },
  methods: {
    getUserInfo() {
      this.$ajax({
        url: '/admin/getOneUserInfo',
        method: 'post',
        data: {
          phone: this.phoneNumber
        }
      }).then(res => {
        this.user = res.data.data[0]
      })
    }
  }
}
</script>

<style>
.userlist {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.userlist1 {
  width: 1600px;
}
.userlist .operate {
  margin-top: 20px;
}
.userlist .el-input {
  width: 180px;
  margin-right: 20px;
}
</style>
