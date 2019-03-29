<template>
  <div class="userapply">
    <div class="userapply1">
      <h3 style='float: left;'>我的消息</h3>
      <el-button plain class='send_msg'>发送消息</el-button>
      <ul class='msg_list'>
          <li>
              <router-link :to="{name: 'msgContent', params: {msgid: 'sadsad'}}">
                  <div class='msg_container'>
                    <div class='msg_from'>
                        <h5>来自用户 <span>salmon</span></h5>
                    </div>
                    <div class='msg_content'>
                        额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额
                        额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额
                        额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额
                        额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额
                    </div>
                    <div class='msg_footer'>
                        <span>发送于:2019-03-29</span><span>未读</span>
                    </div>
                </div>
              </router-link>
            </li>
            <li>
              <div class='msg_container'>
                  <div class='msg_from'>
                      <h5>来自用户 <span>salmon</span></h5>
                  </div>
                  <div class='msg_content'>
                      额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额
                      额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额
                      额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额
                      额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额额
                  </div>
                  <div class='msg_footer'>
                    <span>未读</span><span>发送于:2019-03-29</span>
                  </div>
              </div>
            </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    }
  },
  methods: {
    
  },
  computed: {
    
  },
  mounted() {
    
  }
}
</script>

<style scope>
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
