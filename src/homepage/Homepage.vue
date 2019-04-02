<template>
  <div class="homepage">
    <div class="header">
      <div class="header-content">
        <span class="title"><img src="../../public/logo.png"
            class="logo" /><strong> 图书管理</strong></span>
        <div class="username">
          <a>{{user}}</a>
          <el-button type="primary"
            plain
            @click="loginout">退出登录</el-button>
        </div>
      </div>
    </div>
    <div class="navigation-bar">
      <el-menu :default-active="activedMenu($route.path)"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <router-link to="/homepage/Userborrowingrecords">
          <el-menu-item index="Userborrowingrecords">
            <i class="el-icon-location"></i>
            <span slot="title">借阅记录</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage/hot">
          <el-menu-item index="hot">
            <i class="el-icon-menu"></i>
            <span slot="title">热门书籍</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage/newbooks">
          <el-menu-item index="newbooks">
            <i class="el-icon-document"></i>
            <span slot="title">最新上架</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage/allbooks">
          <el-menu-item index="allbooks">
            <i class="el-icon-search"></i>
            <span slot="title">所有书籍</span>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'userPhone', params:{userPhone: this.$store.state.user.phone}}">
          <el-menu-item index="userlist/:userPhone">
            <i class="el-icon-info"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage/userapply">
          <el-menu-item index="userapply">
            <i class="el-icon-loading"></i>
            <span slot="title">我的申请</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage/userMsg">
          <el-menu-item index="userMsg">
            <i class="el-icon-bell"></i>
            <span slot="title">消息中心<div class='badget'
                v-if='unreadMsg'><span>{{unreadMsg > 99 ? '99+' : unreadMsg}}</span></div></span>
          </el-menu-item>
        </router-link>
        <!-- 管理员 -->
        <el-submenu index="7"
          v-if="$store.state.user.isAdmin">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>管理员</span>
          </template>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>借阅记录</span>
            </template>
            <router-link to="/homepage/admin/aweek">
              <el-menu-item index="admin/aweek">7天内</el-menu-item>
            </router-link>
            <router-link to="/homepage/admin/abouttoexpire">
              <el-menu-item index="admin/abouttoexpire">即将到期</el-menu-item>
            </router-link>
            <router-link to="/homepage/admin/giveback">
              <el-menu-item index="admin/giveback">管内书籍</el-menu-item>
            </router-link>
            <el-submenu index="1-4">
              <template slot="title">未归还书籍</template>
              <router-link to="/homepage/admin/ungiveback">
                <el-menu-item index="admin/ungiveback">未归还</el-menu-item>
              </router-link>
              <router-link to="/homepage/admin/blacklist">
                <el-menu-item index="admin/blacklist">逾期</el-menu-item>
              </router-link>
            </el-submenu>
          </el-submenu>
          <router-link to="/homepage/admin/userlist">
            <el-menu-item index="5">
              <i class="el-icon-view"></i>
              <span slot="title">用户信息</span>
            </el-menu-item>
          </router-link>
          <router-link to="/homepage/admin/setup">
            <el-menu-item index="4"
              v-if="$store.state.user.isAdmin">
              <i class="el-icon-setting"></i>
              <span slot="title">书籍管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/homepage/admin/uploadBook'}">
            <el-menu-item index="7">
              <i class="el-icon-upload2"></i>
              <span slot="title">书籍上架</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/homepage/admin/check'}">
            <el-menu-item index="8">
              <i class="el-icon-edit"></i>
              <span slot="title">管理审核</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { bus } from '../main.js'
export default {
  components: {
  },
  data() {
    return {
      unreadMsg: 0,
    }
  },
  methods: {
    // 根据路由绑定导航栏样式
    activedMenu(val) {
      if (val.indexOf('/homepage/Userborrowingrecords') == 0) {
        return 'Userborrowingrecords'
      } else if (val.indexOf('/homepage/hot') == 0) {
        return 'hot'
      } else if (val.indexOf('/homepage/newbooks') == 0) {
        return 'newbooks'
      } else if (val.indexOf('/homepage/allbooks') == 0) {
        return 'allbooks'
      } else if (val.indexOf('/homepage/userlist') == 0) {
        return 'userlist/:userPhone'
      } else if (val.indexOf('/homepage/userapply') == 0) {
        return 'userapply'
      } else if (val.indexOf('/homepage/userMsg') == 0) {
        return 'userMsg'
      } else {
        return val
      }
    },

    loginout() {
      this.$router.push('/')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getUserMsg() {
      this.$ajax({
        url: '/api/getUserMsg',
        method: 'post',
        data: {
          _id: this.$store.state.user._id
        }
      }).then(res => {
        this.unreadMsg = res.data.data.filter(item => !item.isRead).length
      })
    }
  },
  computed: mapState({
    // 获取用户名
    user: state => state.user.username
  }),
  created() {
  },
  mounted() {

    this.$socket.on('refresh', (recipient) => {
      if (this.$store.state.user && this.$store.state.user.phone === recipient)
        this.getUserMsg()
    })
    this.$socket.on('relogin', (phone) => {
      if (this.$store.state.user && this.$store.state.user.phone === phone) {
        console.log('relogin')
      }
    })
    bus.$on('recheck', () => {
      this.unreadMsg -= 1
    })
    if (this.$store.state.user) {
      this.getUserMsg()
    }
  }
}
</script>
<style>
.homepage .logo {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.homepage .header {
  height: 100px;
  width: 1900px;
  border-bottom: 1px solid rgb(214, 214, 214);
}
.homepage .header-content {
  height: 100px;
  width: 1900px;
}
@media screen and (max-width: 1520px) {
  .homepage .header-content {
    width: 1500px;
  }
}
@media screen and (max-width: 1320px) {
  .homepage .header-content {
    width: 1300px;
  }
}
.homepage .header-content .el-button {
  width: 70px;
  height: 30px;
  padding: 2px !important;
}
.homepage .navigation-bar {
  width: 200px;
  height: 850px;
  border-right: 1px solid #e0e0e0;
}
.homepage .header .title {
  position: relative;
  top: 30px;
  left: 60px;
  font-family: "宋体";
  font-size: 30px;
  letter-spacing: 10px;
}
.homepage .username {
  float: right;
  margin-top: 60px;
  margin-right: 30px;
}
.homepage .username a {
  margin-right: 20px;
}
.el-menu {
  border-right: none !important;
}
.tac {
  padding-top: 20px;
  padding-left: 20px;
}
.el-col-12 {
  width: 30%;
  z-index: 999;
}
.homepage .content {
  position: fixed;
  bottom: 980px;
  left: 250px;
}
.homepage .tab-box {
  position: relative;
  width: 1000px;
  height: 900px;
  overflow: hidden;
}
.badget {
  width: 30px;
  height: 20px;
  background: rgb(255, 129, 129);
  position: relative;
  top: -39px;
  left: 90px;
  border-radius: 30px;
  text-align: center;
}
.badget span {
  position: relative;
  top: -17px;
  color: white;
}
</style>
