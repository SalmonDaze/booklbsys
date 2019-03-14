<template>
  <div class="homepage">
    <div class="header">
      <p><strong>图书管理</strong></p>
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
          <el-menu-item index="1-1">7天内</el-menu-item>
          <el-menu-item index="1-2">30天内</el-menu-item>
          <el-menu-item index="1-3">即将到期</el-menu-item>
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
      </el-menu>
    </div>
    <div class="content">
      <v-aweek></v-aweek>
    </div>
  </div>
</template>

<script>
import vAweek from "../content/Aweek.vue"
export default {
  components: {
    vAweek
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style>
.homepage .header {
  width: 100%;
  height: 100px;
  background: linear-gradient(to top right, #accff4, #edf4fd);
}
.homepage .navigation-bar {
  width: 200px;
  height: 1000px;
  border-right: 1px solid #e0e0e0;
}
.homepage .header p {
  position: relative;
  top: 30px;
  left: 60px;
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
.homepage .content{
  position: absolute;
  
}
</style>
