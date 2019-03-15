import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user:{}
  },
  /* localStorage.getItem(key):获取指定key本地存储的值
  localStorage.setItem(key,value)：将value存储到key字段
  localStorage.removeItem(key):删除指定key本地存储的值 */
  mutations: {
    // 进行状态更改
    login: (state, payload) => {
      // localStorage.setItem('token', token)：将token存储到token字符串
      localStorage.setItem('token', payload.token);
      state.token = payload.token;
      state.user = payload.data
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    }
  },
  actions: {
    // 异步操作
    loginAsync({ commit }, payload) {
      console.log(payload)
      commit("login", payload);
    },
    logout({ commit }) {
      commit("logout");
    }
  }
});
