import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    login: (state, token) => {
      console.log(token)
      localStorage.setItem('token', token);
      state.token = token;
    },
    logout: (state, data) => {
      localStorage.removeItem("token");
      state.token = null;
    }
  },
  actions: {
    loginAsync({ commit }, token) {
      commit("login", token);
    },
    logout({ commit }) {
      commit("logout");
    }
  }
});
