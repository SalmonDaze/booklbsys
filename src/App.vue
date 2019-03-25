<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import store from './store'
export default {
  mounted() {
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
ol,
ul {
  list-style: none;
}
</style>
