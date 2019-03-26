<template>
  <div class="person">
    <div class="person1">
      <v-user v-if='user' :username="user.username" :phone="user.phone" :isAdmin='user.isAdmin'
      :isBanned='user.isBanned' :UID='user.UID' :create_at='user.create_at' :borrow_list='user.borrow_list' :length='user.borrow_list.length'></v-user>
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
  data() {
    return {
      user: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate()
    })
    
  },
  computed: {
  },
  methods: {
    getDate() {
      this.$ajax({
        url: '/admin/getOneUserInfo',
        method: 'post',
        data: {
          phone: this.$store.state.user.phone
        }
      }).then( res => {
        this.user = res.data.data[0]
        console.log(this.user.borrow_list.length)
      })
    }
  }
}
</script>

<style>
.person {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.person1 {
  width: 1600px;
}
</style>
