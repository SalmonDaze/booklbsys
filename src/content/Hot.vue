<template>
  <div class="hot">
    <div class="hot1">
      <h3>热门书籍</h3>
      <ul class="hot-book">
        <li class="book"
          v-for="book in books" :key='book._id'>
          <v-booklist :title="book.title"
            :author="book.author"
            :booklist_img="book.cover"
            :synopsis="book.bookInfo"></v-booklist>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import vBooklist from "../page/booklist.vue"
import { formatPath } from '../utils/formatDate.js'
export default {
  components: {
    vBooklist
  },
  created() {
    this.$ajax({
      url: '/api/getHotBook',
      method: 'post',
    }).then(res => {
      for (const book of res.data.data) {
        /**
         * title：书名
         * author：作者
         * cover：图片
         * bookInfo：简介
         */
        let { author, title, cover, bookInfo } = book
        // 图片路径
        this.books.push({
          author: author,
          title: title,
          cover: cover,
          bookInfo: bookInfo
        })
      }
    })
  },
  data() {
    return {
      books: []
    }
  }
}
</script>

<style>
.hot {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 900px;
}
.hot1 {
  width: 1200px;
}
.hot .book {
  display: inline-block;
}
.hot .hot-book {
  margin-top: 20px;
}
</style>
