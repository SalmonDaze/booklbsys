import Vue from "vue";
import Router from "vue-router";
import Cover from "@/components/Cover.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Homepage from "./homepage/Homepage.vue";
import Aweek from "./content/Aweek.vue";
import Abouttoexpire from "./content/About_to_expire.vue";
import Giveback from "./content/Give_back.vue";
import Ungiveback from "./content/Ungive_back.vue";
import Blacklist from "./content/Blacklist.vue";
import Hot from "./content/Hot.vue";
import Newbooks from "./content/Newbooks.vue";
import Setup from "./content/Set_up.vue";
import store from "./store";

Vue.use(Router);

// 异步操作
// localStorage持久化本地储存
// localStorage.getItem(key) 获取指定key本地存储的值
if (localStorage.getItem("token")) {
  store.dispatch("loginAsync", localStorage.getItem("token"));
}

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "cover",
      component: Cover
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/homepage",
      name: "homepage",
      component: Homepage,
      meta: { requiresAuth: true },
      children: [
        {
          path: "aweek",
          name: "aweek",
          component: Aweek
        },
        {
          path: "abouttoexpire",
          name: "abouttoexpire",
          component: Abouttoexpire
        },
        {
<<<<<<< HEAD
          path: 'uploadBook',
          name: 'uploadBook',
          component: () => import('./content/uploadBook.vue')
        }
=======
          path: "giveback",
          name: "giveback",
          component: Giveback
        },
        {
          path: "hot",
          name: "hot",
          component: Hot
        },
        {
          path: "ungiveback",
          name: "ungiveback",
          component: Ungiveback
        },
        {
          path: "blacklist",
          name: "blacklist",
          component: Blacklist
        },
        {
          path: "newbooks",
          name: "newbooks",
          component: Newbooks
        },
        {
          path: "setup",
          name: "setup",
          component: Setup
        },
>>>>>>> 78797433d74446b81faa31270f51a9c709516f55
      ]
    }
  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    if (!store.state.token) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});

// 使用export default 向外暴露的成员
export default router;
