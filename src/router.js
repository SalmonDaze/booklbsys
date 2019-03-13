import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Register from "./components/Register.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
  ]
})
