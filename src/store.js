import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// 根据http状态码渲染404页面，500页面
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.withCredentials = true;

Vue.prototype.$http.interceptors.response.use(
  response => {
    console.log(response);
    if (response.data.resCode == "1000") {
      localStorage.clear();
      alert(response.data.resMsg);
      router.push({
        name: "login"
      });
    }
    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 404:
          router.push({ name: "error-404" });
          // error.message = '请求出错(404)'
          break;

        case 500:
          router.push({ name: "error-500" });
          //  error.message = '服务器错误(500)';
          break;

        default:
          error.message = `连接出错(${error.response.status})!`;
      }
    }
    return Promise.reject(error);
  }
);

export default new Vuex.Store({
  state: {
    token: "",
    user: {}
  },
  /* localStorage.getItem(key):获取指定key本地存储的值
  localStorage.setItem(key,value)：将value存储到key字段
  localStorage.removeItem(key):删除指定key本地存储的值 */
  mutations: {
    // 进行状态更改
    login: (state, payload) => {
      // localStorage.setItem('token', token)：将token存储到token字符串
      localStorage.setItem("token", payload.token);
      axios.defaults.headers.post["accessToken"] = payload.token;
      state.token = payload.token;
      state.user = payload.data;
    },
    logout: state => {
      localStorage.removeItem("token");
      state.token = null;
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("phone");
    },
    loginByToken: (state, payload) => {
      axios.defaults.headers.post["accessToken"] = payload.token;
      axios({
        url: "/api/loginByToken",
        method: "post",
        data: {
          phone: payload.phone,
          token: payload.token
        }
      }).then(res => {
        state.user = res.data.data;
        state.token = res.data.data.token;
      });
    }
  },
  actions: {
    // 异步操作
    loginAsync({ commit }, payload) {
      commit("login", payload);
    },
    logout({ commit }) {
      commit("logout");
    },
    loginByToken({ commit }, payload) {
      commit("loginByToken", payload);
    }
  }
});
