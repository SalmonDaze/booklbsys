<template>
  <div class="borrowbook">
    <div class="borrowbook1">
      <div style="height:200px;">
        <p class="borrowcycle">可借阅周期：<a>{{bookInfo.borrowCycle}}</a></p>
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
            plain @click='applyBorrow'
            :disabled="borrowbook">申请借阅</el-button>
          <el-button type="primary"
            :disabled="returnbook">归还</el-button>
        </div>
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
      borrowbook: false,
      returnbook: false,
      img: ''
    }
  },
  computed: {
    bookCover() {
      return `http://192.168.2.73:3000/${formatPath(this.bookInfo.cover)}`
    }
  },
  methods:{
    applyBorrow() {
      this.$ajax({
        url: '/api/applyBorrowBook',
        method: 'post',
        data: {
          _id: this.$router.currentRoute.params.bookid,
          _userId: this.$store.state.user._id
        }
      }).then( res => console.log(res))
    }
  },
  created() {
    this.$ajax({
      url: '/api/getOneBookInfo',
      method: 'post',
      data: {
        _id: this.$router.currentRoute.params.bookid
      }
    }).then( res => this.bookInfo = res.data.data)
  }
}
</script>

<style>
.borrowbook {
  position: absolute;
  top: 160px;
  left: 280px;
  height: 900px;
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
</style>
