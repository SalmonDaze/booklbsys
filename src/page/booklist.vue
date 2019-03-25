<template>
  <div class="booklist">
    <div class="book-cover">
      <img :alt="title"
        :src="bookCover"
        class='book_cover' />
    </div>
    <div class="mask">
      <p class="author"
        :title="author">{{author}}</p>
      <p class="synopsis">{{synopsis}}</p>
      <el-button plain
        @click="borrowbook()"
        v-if="borrow_show">去借阅</el-button>
    </div>
    <h4 :title="title">{{title}}</h4>
    <h5>{{author}}</h5>
  </div>
</template>

<script>
import { formatPath } from '../utils/formatDate'
export default {
  props: {
    // 书名
    title: String,
    // 作者
    author: String,
    // 封面
    booklist_img: String,
    // 简介
    synopsis: String,
    borrow_show: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {

    }
  },
  computed: {
    bookCover() {
      return `http://192.168.2.73:3000/${formatPath(this.booklist_img)}`
    }
  },
  methods: {
    borrowbook() {
      this.$emit('doborrowbook', '')
    }
  },
}
</script>

<style>
.booklist {
  display: inline-block;
  width: 160px;
  height: 280px;
  margin: 20px 40px 0px 40px;
  overflow: hidden;
}
.booklist .book-cover {
  width: 150px;
  height: 200px;
  border-radius: 5px;
  overflow: hidden;
  /* 阴影边框 */
  -webkit-box-shadow: 0 3px 5px #b0b0b0;
  -moz-box-shadow: 0 3px 5px #b0b0b0;
  box-shadow: 0 3px 5px #b0b0b0;
  margin-top: 10px;
  margin-left: 10px;
}
.booklist .book-cover .book_cover {
  width: 100%;
  height: 100%;
}
.booklist .mask {
  position: relative;
  bottom: 220px;
  width: 170px;
  height: 250px;
  background-color: #ffffff;
  opacity: 0;
  text-align: center;
}
.booklist .mask .author {
  padding-top: 15px;
  visibility: hidden;
  cursor: pointer;
  opacity: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  -webkit-transform: translateY(175px);
  -moz-transform: translateY(175px);
  -ms-transform: translateY(175px);
  transform: translateY(175px);
  -webkit-transition: all 105ms ease 100ms;
  -moz-transition: all 105ms ease 100ms;
  -ms-transition: all 105ms ease 100ms;
  transition: all 100ms ease 100ms;
}
.booklist .mask .synopsis {
  position: relative;
  top: 30px;
  left: 0px;
  right: 0px;
  width: 120px;
  margin: auto;
  line-height: 20px;
  font-size: 14px;
  /* 多行文本显示省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  opacity: 0;
  -webkit-transform: translateY(139px);
  -moz-transform: translateY(139px);
  -ms-transform: translateY(139px);
  transform: translateY(139px);
  -webkit-transition: all 100ms ease 105ms;
  -moz-transition: all 100ms ease 105ms;
  -ms-transition: all 100ms ease 105ms;
  transition: all 100ms ease 105ms;
}
.booklist .mask .el-button {
  margin-top: 50px;
  border-color: #409eff;
  color: #409eff;
}
.booklist .mask .el-button:hover {
  margin-top: 52px;
}
.booklist .mask:hover {
  opacity: 0.9;
  /* 延迟执行 */
  -webkit-transition: all 300ms ease-out 0ms;
  -moz-transition: all 300ms ease-out 0ms;
  -ms-transition: all 300ms ease-out 0ms;
  transition: all 300ms ease-out 0ms;
}
.booklist .mask:hover .author {
  margin-top: 20px;
  opacity: 1;
  visibility: visible;
  -webkit-transform: translateY(0px);
  -moz-transform: translateY(0px);
  -ms-transform: translateY(0px);
  transform: translateY(0px);
  -webkit-transition: all 345ms ease 250ms;
  -moz-transition: all 345ms ease 250ms;
  -ms-transition: all 345ms ease 250ms;
  transition: all 345ms ease 250ms;
}
.mask:hover .synopsis {
  opacity: 1;
  -webkit-transform: translateY(0px);
  -moz-transform: translateY(0px);
  -ms-transform: translateY(0px);
  transform: translateY(0px);
  -webkit-transition: all 440ms ease 345ms;
  -moz-transition: all 440ms ease 345ms;
  -ms-transition: all 440ms ease 345ms;
  transition: all 440ms ease 345ms;
}
.booklist h4 {
  position: relative;
  bottom: 230px;
  text-align: center;
  cursor: pointer;
  /* 超出部分省略号 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.booklist h5 {
  position: relative;
  bottom: 220px;
  text-align: center;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
