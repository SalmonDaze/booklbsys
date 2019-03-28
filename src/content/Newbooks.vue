<template>
  <div class="newbooks">
    <div class="newbooks1">
      <h3>最新上架</h3>
      <ul class="newbooks-book">
        <li class="book"
          v-for="book in books" :key='book._id'>
          <v-booklist :title="book.title"
            :author="book.author"
            :booklist_img="book.cover"
            :bookid='book._id'
            :synopsis="book.bookInfo" v-on:doborrowbook="do_borrowbook(book)"></v-booklist>
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
      url: '/api/getNewBook',
      method: 'post',
    }).then(res => {
      console.log(res)
      for (const book of res.data.data) {
        /**
         * title：书名
         * author：作者
         * cover：图片
         * bookInfo：简介
         */
        let { author, title, cover, bookInfo,borrowCycle, _id } = book
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
          author:book.author,
          cover:book.cover,
          bookInfo:book.bookInfo,
          borrowCycle:book.borrowCycle
        }
      })
    },
  }
}
</script>

<style>
.newbooks {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
@media screen and (max-width: 1220px){
  .newbooks .newbooks-book{
    width: 800px;
  }
}
.newbooks .loading {
  position: absolute;
  top: 200px;
  left: 600px;
}
.newbooks .book {
  display: inline-block;
}
.newbooks .newbooks-book {
  margin-top: 20px;
}
</style>
