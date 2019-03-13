import Vue from 'vue'
import Router from 'vue-router'
import Cover from '@/components/Cover.vue'
import Login from './components/Login.vue'
import Register from "./components/Register.vue";
import Homepage from "./homepage/Homepage.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'cover',
      component: Cover
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    },
  ]
})
