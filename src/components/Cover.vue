<template>
  <div class="cover">
    <div class="header">
      <router-link class='login'
        :to="{path:'/login'}">登录</router-link>
      <router-link class='register'
        :to="{path:'/register'}">注册</router-link>
    </div>
    <div class="title">图书借阅系统</div>
  </div>
</template>
<script>
export default {

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
  float: right;
  padding-top: 20px;
  font-size: 20px;
}
.cover .login,.cover .register{
  margin-right: 40px;
  color: black;
  text-decoration: none;
}
.cover .title{
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 600px;
  height: 100px;
  margin: auto;
  font-family: "华文行楷";
  font-size: 90px;

}
</style>

