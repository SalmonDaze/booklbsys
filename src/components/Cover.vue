<template>
  <div class="cover">
    <div class="header">
      <a class="login"
        @click="showLogin">登录</a>
      <a class="register"
        @click="showRegister">注册</a>
    </div>
    <v-login ref="login"
      v-if='show1'
      v-on:loginClose="closeLogin"></v-login>
    <v-register ref="register"
      v-if='show2'
      v-on:loginClose="closeRegister"></v-register>
    <div class="title">图书借阅系统</div>
  </div>
</template>
<script>
import vLogin from '../components/Login.vue';
import vRegister from '../components/Register.vue'
export default {
  components: {
    vLogin,
    vRegister
  },
  data() {
    return {
      show1: false,   // 是否显示模态框
      show2: false
    }
  },
  methods: {
    closeLogin: function () {
      this.show1 = false;
    },
    showLogin: function () {
      this.show1 = true;
    },
    showRegister: function () {
      this.show2 = true;
    },
    closeRegister: function () {
      this.show2 = false;
    },
  }
}
</script>
<style>
.cover {
  width: 100%;
  height: 940px;
  background: url("./../assets/bg_cover.jpg") no-repeat 0;
  /* ie8兼容background-size属性 */
  filter: progid:DXImusernameTransform.Microsoft.AlphaImusernameLoader(
    src="./../assets/bg_cover.jpg",
    sizingMethod='scale');
  background-size: 100% 100%;
}
.cover .header {
  position: absolute;
  z-index: 1;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 350px;
  width: 200px;
  height: 20px;
  padding-top: 20px;
  margin: auto;
  font-size: 20px;
}
.cover .login,
.cover .register {
  margin-left: 40px;
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.cover .title {
  position: absolute;
  z-index: 0;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 600px;
  height: 300px;
  margin: auto;
  font-family: "华文行楷";
  font-size: 100px;
}
</style>

