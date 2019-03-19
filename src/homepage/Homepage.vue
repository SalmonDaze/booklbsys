<template>
  <div class="homepage">
    <div class="header">
      <div class="header-content">
        <span class="title"><img src="../../public/logo.png"
            class="logo" /><strong> 图书管理</strong></span>
        <div class="user">
          <a>{{username}}</a>
          <el-button type="primary"
            plain>退出登录</el-button>
        </div>
      </div>
    </div>
    <div class="navigation-bar">
      <el-menu default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1"
          v-if="$store.state.user.isAdmin">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>借阅记录（admin）</span>
          </template>
          <router-link to="/homepage/aweek">
            <el-menu-item index="1-1">7天内</el-menu-item>
          </router-link>
          <router-link to="/homepage/abouttoexpire">
            <el-menu-item index="1-2">即将到期</el-menu-item>
          </router-link>
          <router-link to="/homepage/giveback">
            <el-menu-item index="1-3">已归还</el-menu-item>
          </router-link>
          <el-submenu index="1-4">
            <template slot="title">未归还</template>
            <router-link to="/homepage/ungiveback">
              <el-menu-item index="1-4-1">未归还名单</el-menu-item>
            </router-link>
            <router-link to="/homepage/blacklist">
              <el-menu-item index="1-4-2">逾期</el-menu-item>
            </router-link>
          </el-submenu>
        </el-submenu>
        <router-link to="/homepage/Userborrowingrecords">
          <el-menu-item index="1"
            v-if="!$store.state.user.isAdmin">
            <i class="el-icon-location"></i>
            <span slot="title">借阅记录</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage/hot">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">热门书籍</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage/newbooks">
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">最新上架</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage/usersetup">
          <el-menu-item index="4"
            v-if="!$store.state.user.isAdmin">
            <i class="el-icon-setting"></i>
            <span slot="title">书籍管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage/setup">
          <el-menu-item index="4"
            v-if="$store.state.user.isAdmin">
            <i class="el-icon-setting"></i>
            <span slot="title">书籍管理（admin）</span>
          </el-menu-item>
        </router-link>
        <router-link :to="{path:'/homepage/uploadBook'}">
          <el-menu-item index="5"
            v-if="$store.state.user.isAdmin">
            <i class="el-icon-upload2"></i>
            <span slot="title">书籍上架</span>
          </el-menu-item>
        </router-link>

      </el-menu>
    </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  created() {
  },
  data() {
    return {
      username: ''
    }
  },
  mounted() {
    this.username = this.user
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: mapState({
    // 获取用户名
    user: state => state.user.username
  })
}
</script>
<style>
.homepage .logo {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.homepage .header {
  height: 100px;
  border-bottom: 1px solid rgb(214, 214, 214);
}
.homepage .header-content{
  height: 100px;
  max-width: 1900px;
  min-width: 1450px;
}
.homepage .header-content .el-button{
  width: 70px;
  height: 30px;
  padding: 2px !important;
}
.homepage .navigation-bar {
  width: 200px;
  height: 960px;
  border-right: 1px solid #e0e0e0;
}
.homepage .header .title {
  position: relative;
  top: 30px;
  left: 60px;
  font-family: "宋体";
  font-size: 30px;
  letter-spacing: 10px;
}
.homepage .user {
  float: right;
  margin-top: 60px;
  margin-right: 30px;
}
.homepage .user a {
  margin-right: 20px;
}
.el-menu {
  border-right: none !important;
}
.tac {
  padding-top: 20px;
  padding-left: 20px;
}
.el-col-12 {
  width: 30%;
  z-index: 999;
}
.homepage .content {
  position: fixed;
  bottom: 980px;
  left: 250px;
}
.homepage .tab-box {
  position: relative;
  width: 1000px;
  height: 900px;
  overflow: hidden;
}
</style>
