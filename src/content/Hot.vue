<template>
  <div class="hot">
    <div class="hot1">
      <h3>热门书籍</h3>
      <ul class="hot-book">
        <li class="book"
          v-for="book in books"
          :key='book._id'>
          <v-booklist :title="book.title"
            :author="book.author"
            :booklist_img="book.cover"
            :synopsis="book.bookInfo"
            :bookid='book._id'
            v-on:doborrowbook="do_borrowbook(book)"></v-booklist>
        </li>
      </ul>
    </div>
    <!-- 加载 -->
    <div class="loading"
      v-loading="loading"
      v-if='loading'></div>
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
        let { author, title, cover, bookInfo, borrowCycle, _id } = book
        // 图片路径
        this.books.push({
          author: author,
          title: title,
          cover: cover,
          bookInfo: bookInfo,
          borrowCycle: borrowCycle,
          _id: _id
        })
        this.loading = false
      }
    })
  },
  data() {
    return {
      books: [],
      // 加载
      loading: true,
    }
  },
  methods: {
    do_borrowbook(book) {
      // 跳转借书页
      // this.$router.push('/homepage/borrowbook')
      this.$router.push({
        path: '/homepage/borrowbook',
        query: {
          title: book.title,
          author: book.author,
          cover: book.cover,
          bookInfo: book.bookInfo,
          borrowCycle:book.borrowCycle
        }
      })
    },
  }
}
</script>

<style>
.hot {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
@media screen and (max-width: 1220px){
  .hot .hot-book{
    width: 800px;
  }
}
.hot .loading{
  position: absolute;
  top: 200px;
  left: 600px;
}
.hot .book {
  display: inline-block;
}
.hot .hot-book {
  margin-top: 20px;
}
</style>
