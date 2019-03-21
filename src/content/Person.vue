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
      url: '/admin/getUserInfo',
      method: 'post',
      data: {
        _id: this.$store.state.user._id
      }
    }).then(res => {
      console.log(res)
      for (const person of res.data.data.borrow_list) {
        /**
         * title：书名
         * borrowTime：借出时间
         * borrowCycle：可借天数
         * isLending：是否借出
         * returnTime:剩余时间
         */
        let { title, borrowTime, borrowUser, borrowCycle, isLending, returnTime } = person
        this.tableData3.push({
          date: unixTranstoDate(borrowTime).slice(0, 10),
          bookname: title,
          can_days: borrowCycle,
          remainder_days: Math.ceil(remainTime(returnTime, getDate())),
          yn: isLending ? '否' : '是'
        })
      }
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
