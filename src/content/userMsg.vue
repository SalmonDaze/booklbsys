<template>
  <div class="userapply">
    <div class="userapply1">
      <h3 style='float: left;'>我的消息</h3>
      <router-link :to="{name:'sendMessage'}">
          <el-button plain class='send_msg'>发送消息</el-button>
      </router-link>
      <ul class='msg_list'>
          <li v-for='msg in msgList' :key='msg._id' @click='recheck(msg.isRead)'>
              <router-link :to="{name: 'msgContent', params: {msgid: msg._id}}">
                  <div class='msg_container'>
                    <div class='msg_from'>
                        <h5>来自用户 <span>{{msg.sendBy.username}}</span></h5>
                    </div>
                    <div class='msg_content'>
                        {{msg.title}}
                    </div>
                    <div class='msg_footer'>
                        <span>发送于:{{msg.create_at}}</span><span :style="{color: msg.isRead? 'black': 'red'}">{{msg.isRead ? '已读' : '未读'}}</span>
                    </div>
                </div>
              </router-link>
            </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatTime } from '../utils/formatDate.js'
import { bus } from '../main.js'
export default {
  data() {
    return {
        msgList: [],
    }
  },
  methods: {
    recheck(isRead) {
        if( !isRead) {
            bus.$emit('recheck')
        }
    }
  },
  computed: {
    
  },
  mounted() {
    this.$ajax({
      url: '/api/getUserMsg',
      method: 'post',
      data: {
        _id: this.$store.state.user._id
      }
    }).then(res => {
        console.log(res)
      this.msgList = res.data.data
    })
  }
}
</script>

<style scope>
a {
    color: black;
}
.send_msg {
    position: relative;
    left: 425px;
}
.msg_container{
    position: relative;
    width: 600px;
    height: 100px;
    padding-top: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.msg_container:hover {
    cursor: pointer;
    transform: translateY(-5px);
    transition: all .2s;
}
.msg_list {
}
.msg_list li {
    margin-top: 10px;
}
.msg_from {
    margin-left: 20px;
}
.msg_content {
    margin-left: 20px;
    margin-top: 10px;
    height: 30px;
    width: 500px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.msg_footer {
    margin-left: 20px;
    font-size: 0.8rem;
}
.msg_footer > span:first-child {
    margin-right: 20px;
}
</style>
