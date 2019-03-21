<template>
  <div class="person">
    <div class="person1">
      <v-user :username="user" :phone="phone"></v-user>
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
    this.$ajax({
      url: '/api/getUserInfo',
      method: 'post',
      data: {
        _id: this.$store.state.user._id
      }
    }).then(res => {
      console.log(res)
    })
  },
  data () {
    return {
    }
  },
  mounted () {
    
  },
  computed: mapState({
    // 获取用户名
    user: state => state.user.username,
    phone: state => state.user.phone
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
