import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import io from 'socket.io-client'

// 调用element-ui封装组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.response.use((response) => {
  if( response.data.code === 40001) {
    router.push({
      path: '/'
    })
  }
  return response
})

Vue.use(ElementUI);
let socket = io()
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
Vue.prototype.$socket = socket

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

