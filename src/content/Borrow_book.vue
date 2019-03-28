<template>
  <div class="borrowbook">
    <div class="borrowbook1">
      <div style="height:200px;">
        <p class="borrowcycle">可借阅周期：<a>{{bookInfo.borrowCycle}}</a></p>
        <p class="borrowcycle"
          :style="{color: bookInfo.isLending? 'red':'black'}">{{bookInfo.isLending ? '该书已被借出' : '未借出'}}</p>
        <div class="book-cover">
          <img class='book_cover'
            :src="bookCover" />
        </div>
        <div class="borrowbook-content">
          <h1>{{bookInfo.title}}</h1>
          <p>作者：{{bookInfo.author}}</p>
          <p class="synopsis">{{bookInfo.bookInfo}}</p>
        </div>
        <div class="operate">
          <el-button type="primary"
            plain
            @click='applyBorrow'
            :disabled="bookInfo.isLending">申请借阅</el-button>
          <el-button type="info"
            :disabled="returnbook"
            @click='show_history = true'>借阅历史</el-button>
        </div>
      </div>
    </div>
    <div class="shade"
      v-show='show_history'
      @click='show_history = false'></div>
    <div class="book_history"
      v-show='show_history'>
      <div class='history_top'>
        <h3 class='history_title'>借阅历史</h3>
        <span class='close_history'
          @click='show_history = false'>X</span>
      </div>
      <div class="history_container">
        <el-table :data="bookInfo.borrow_history"
          style="width: 100%" height="290">
          <el-table-column prop="borrowTime"
            label="借阅日期"
            width="180">
          </el-table-column>
          <el-table-column prop="returnTime"
            label="归还日期"
            width="180">
          </el-table-column>
          <el-table-column prop="borrowUser.username"
            label="借阅人">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPath } from '../utils/formatDate'
export default {
  data() {
    return {
      // false可用，true禁用
      bookInfo: {},
      show_history: false,
      borrowbook: false,
      returnbook: false,
      img: '',
    }
  },
  computed: {
    bookCover() {
      if (this.bookInfo.cover) {
        return `http://192.168.2.73:3000/${formatPath(this.bookInfo.cover)}`
      }

    }
  },
  methods: {
    applyBorrow() {
      this.$ajax({
        url: '/api/applyBorrowBook',
        method: 'post',
        data: {
          _id: this.$router.currentRoute.params.bookid,
          _userId: this.$store.state.user._id
        }
      }).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  created() {
    this.$ajax({
      url: '/api/getOneBookInfo',
      method: 'post',
      data: {
        _id: this.$router.currentRoute.params.bookid
      }
    }).then(res => {
      console.log(res)
      this.bookInfo = res.data.data
    })
  }
}
</script>

<style>
.borrowbook {
  position: absolute;
  top: 160px;
  left: 280px;
  height: 830px;
}
.borrowbook1 {
  width: 1200px;
  width: 1000px;
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.borrowbook .borrowcycle {
  float: right;
  margin: 20px 60px 0px 0px;
  font-size: 18px;
}
.borrowbook .borrowcycle a {
  color: red;
}
.borrowbook .book-cover {
  width: 190px;
  height: 280px;
  display: inline-block;
  border-radius: 5px;
  overflow: hidden;
  /* 阴影边框 */
  -webkit-box-shadow: 0 3px 5px #b0b0b0;
  -moz-box-shadow: 0 3px 5px #b0b0b0;
  box-shadow: 0 3px 5px #b0b0b0;
  margin-top: 70px;
  margin-left: 80px;
}
.borrowbook .book-cover .book_cover {
  width: 100%;
  height: 100%;
}
.borrowbook .borrowbook-content {
  position: absolute;
  top: 65px;
  left: 330px;
  display: inline-block;
}
.borrowbook .borrowbook-content p {
  margin-top: 30px;
  font-size: 20px;
}
.borrowbook .borrowbook-content .synopsis {
  width: 630px;
  height: 30px;
  text-indent: 2em;
  letter-spacing: 1px;
  margin-top: 40px;
  word-wrap: break-word;
  word-break: break-all;
}
.borrowbook .operate {
  margin: 45px 0px 0px 280px;
}
.borrowbook .el-button {
  width: 190px;
}
.borrowbook .el-button + .el-button {
  margin-left: 50px;
}
.book_history {
  width: 600px;
  height: 400px;
  background: white;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  text-align: center;
  z-index: 10;
}
.history_top {
  margin-top: 10px;
  margin-bottom: 20px;
}
.history_title {
  display: inline-block;
  text-align: center;
  margin-top: 15px;
}
.close_history {
  float: right;
  margin-right: 10px;
  margin-top: 0px;
  font-size: 1.2rem;
}
.close_history:hover {
  cursor: pointer;
}
.shade {
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
.borrowbook .history_container{
  width: 500px;
  margin-left: 50px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
