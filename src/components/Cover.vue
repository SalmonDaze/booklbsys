<template>
  <div class="cover">
    <v-login ref="login"
      v-if='show1'
      v-on:jumpRegister="closeLogin(),showRegister()"></v-login>
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
      show1: true,   // 是否显示模态框
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
      this.show1 = true;
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
.cover .login,
.cover .register {
  margin-left: 30px;
}
.cover .title {
  position: absolute;
  z-index: 0;
  top: 200px;
  right: 0px;
  left: 0px;
  width: 360px;
  height: 300px;
  margin: auto;
  font-family: "微软雅黑";
  font-size: 60px;
}
</style>

