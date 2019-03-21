<template>
  <div class="person">
    <div class="person1">
      <v-user :username="user.username" :phone="user.phone" :isAdmin='user.isAdmin'
      :isBanned='user.isBanned' :UID='user.UID' :create_at='user.create_at' :borrow_list='user.borrow_list'></v-user>
      {{user}}
    </div>
  </div>
</template>

<script>
import vUser from "./../page/user"
import { mapState } from 'vuex'
export default {
  components: {
    vUser
  },
  created() {
    console.log(this.user)
  },
  data () {
    return {
    }
  },
  mounted () {
    
  },
  computed: mapState({
    // 获取用户名
    user: state => state.user,
  })
}
</script>

<style>
.person {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 900px;
}
.person1 {
  width: 1600px;
}
</style>
