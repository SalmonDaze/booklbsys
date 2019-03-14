import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';

// 调用element-ui封装组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

