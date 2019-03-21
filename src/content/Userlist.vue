<template>
  <div class="userlist">
    <div class="userlist1">
      <h3>用户信息管理</h3>
      <div class="operate">
        <el-input v-model="phoneNumber"
          prefix-icon="el-icon-search"
          placeholder="请输入用户手机号"></el-input>
        <router-link to="/homepage/userlist/user">
          <el-button type="primary"
            plain>查询</el-button>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$ajax.post('/admin/getUserInfo').then((res) => {
      console.log(res)
    });
  },
  data() {
    return {
      phoneNumber: ''
    }
  },
}
</script>

<style>
.userlist {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 900px;
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
