<template>
  <div class="homepage">
    <div class="header">
      <p><img src="../../public/logo.png"
          class="logo" /><strong> 图书管理</strong></p>
    </div>
    <div class="navigation-bar">
      <el-menu default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>借阅记录</span>
          </template>
          <router-link to="/homepage/Aweek">
            <el-menu-item index="1-1">7天内</el-menu-item>
          </router-link>
          <router-link to="/homepage/Abouttoexpire">
            <el-menu-item index="1-2">即将到期</el-menu-item>
          </router-link>
          <el-menu-item index="1-3"
            @click="giveback_show">已归还</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">未归还</template>
            <el-menu-item index="1-4-1">未归还名单</el-menu-item>
            <el-menu-item index="1-4-2">黑名单</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">热门书籍</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">最新上架</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">书籍管理</span>
        </el-menu-item>
        <el-menu-item index="5" v-if="!$store.state.user.isAdmin">
          <i class="el-icon-upload2"></i>
          <span slot="title">书籍上架</span>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import vRecordtitle from "../content/record_title.vue"
import vAweek from "../content/Aweek.vue"
export default {
  components: {
    vRecordtitle,
    vAweek,
  },
  data() {
    return {
      show: false,
      show1: false,
      show2: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 7天内
    aweek_show() {
      this.show = true;
      this.show1 = false;
      this.show2 = false;
    },
    // 即将到期
    abouttoexpire_show() {
      this.show = false;
      this.show1 = true;
      this.show2 = false;
    },
    // 已归还
    giveback_show() {
      this.show = false;
      this.show1 = false;
      this.show2 = true;
    }
  }
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
.homepage .navigation-bar {
  width: 200px;
  height: 960px;
  border-right: 1px solid #e0e0e0;
}
.homepage .header p {
  padding-top: 30px;
  padding-left: 60px;
  font-family: "宋体";
  font-size: 30px;
  letter-spacing: 10px;
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
