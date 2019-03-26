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
import Userborrowingrecords from "./content/User_ Borrowingrecords.vue";
import Hot from "./content/Hot.vue";
import Newbooks from "./content/Newbooks.vue";
import Setup from "./content/Set_up.vue";
import Usersetup from "./content/User_set_up.vue";
import store from "./store";
import axios from "axios";

Vue.use(Router);

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
          path: "giveback",
          name: "giveback",
          component: Giveback
        },
        {
          path: "userborrowingrecords",
          name: "userborrowingrecords",
          component: Userborrowingrecords
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
          path: "allbooks",
          name: "allbooks",
          component: () => import("./content/Allbooks.vue")
        },
        {
          path: "setup",
          name: "setup",
          component: Setup
        },
        {
          path: "usersetup",
          name: "usersetup",
          component: Usersetup
        },
        {
          path: "userlist",
          name: "userlist",
          component: () => import("./content/Userlist.vue"),
          children: [
            {
              path: "user",
              name: "user",
              component: () => import("./page/user.vue")
            }
          ]
        },
        {
          path: "person",
          name: "person",
          component: () => import("./content/Person.vue")
        },
        {
          path: "uploadBook",
          name: "uploadBook",
          component: () => import("./content/uploadBook.vue")
        },
        {
          path: "check",
          name: "check",
          component: () => import("./content/Check.vue")
        },
        {
          path: "borrowbook/:bookid",
          name: "borrowbook",
          component: () => import("./content/Borrow_book.vue")
        }
      ]
    }
  ]
});



// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if( window.sessionStorage.getItem('token') && !store.state.token ) {
      store.dispatch('loginByToken', {
        phone: window.sessionStorage.getItem('phone'),
        token: window.sessionStorage.getItem('token')
      })
    }
    if (!window.sessionStorage.getItem('token')) {
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
