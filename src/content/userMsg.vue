<template>
  <div class="userMsg">
    <div class="userMsg1">
      <h3 style='float: left;'>我的消息</h3>
      <router-link :to="{name:'sendMessage'}">
        <el-button plain
          class='send_msg'>发送消息</el-button>
      </router-link>
      <ul class='msg_list'>
        <li v-for='msg in msgList.slice((pageNum-1)*pagesize,pageNum*pagesize)'
          :key='msg._id'
          @click='recheck(msg.isRead)'>
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
    <!-- 加载 -->
    <div class="loading"
      v-loading="loading"
      v-if='loading'></div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="msgList.length">
      </el-pagination>
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
      pageNum: 1,//默认开始页面
      pagesize: 5,//每页的数据条数
      // 加载
      loading: true,
    }
  },
  methods: {
    recheck(isRead) {
      if (!isRead) {
        bus.$emit('recheck')
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val
      console.log(`当前页: ${val}`);
    },
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
    this.loading = false
  }
}
</script>

<style scope>
.userMsg {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.userMsg1 {
  width: 1600px;
}
.userMsg .msg_list li a {
  color: black;
}
.userMsg .send_msg {
  position: relative;
  left: 425px;
}
.userMsg .msg_container {
  position: relative;
  width: 600px;
  height: 100px;
  padding-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.userMsg .msg_container:hover {
  cursor: pointer;
  transform: translateY(-5px);
  transition: all 0.2s;
}
.userMsg .msg_list li {
  margin-top: 10px;
}
.userMsg .msg_from {
  margin-left: 20px;
}
.userMsg .msg_content {
  margin-left: 20px;
  margin-top: 10px;
  height: 30px;
  width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.userMsg .msg_footer {
  margin-left: 20px;
  font-size: 0.8rem;
}
.userMsg .msg_footer > span:first-child {
  margin-right: 20px;
}
.userMsg .page{
  margin-left: 20px;
  margin-top: 20px;
}
</style>
