<template>
  <div class="allbooks">
    <div class="allbooks1">
      <h3>所有书籍</h3>
      <ul class="allbooks-book">
        <li class="book"
          v-for="book in books.slice((pageNum-1)*pagesize,pageNum*pagesize)"
          :key='book._id'>
          <v-booklist :title="book.title"
            :author="book.author"
            :booklist_img="book.cover"
            :synopsis="book.bookInfo"
            books.length="books.slice((pageNum-1)*pagesize,pageNum*pagesize)"
            v-on:doborrowbook="do_borrowbook(book)"></v-booklist>
        </li>
      </ul>
    </div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="books.length">
      </el-pagination>
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
      url: '/api/getAllBook',
      method: 'post',
    }).then(res => {
      for (const book of res.data.data) {
        /**
         * title：书名
         * author：作者
         * cover：图片
         * bookInfo：简介
         */
        let { author, title, cover, bookInfo, borrowCycle } = book
        // 图片路径
        this.books.push({
          author: author,
          title: title,
          cover: cover,
          bookInfo: bookInfo,
          borrowCycle: borrowCycle
        })
      }
    })
  },
  data() {
    return {
      books: [],
      pageNum: 1,//默认开始页面
      pagesize: 12,//每页的数据条数
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
          borrowCycle: book.borrowCycle
        }
      })
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
  }
}
</script>

<style>
.allbooks {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
@media screen and (max-width: 1220px) {
  .allbooks .allbooks-book {
    width: 800px;
  }
}
.allbooks .book {
  display: inline-block;
}
.allbooks .allbooks-book {
  margin-top: 20px;
}
.allbooks .page{
  position: absolute;
  top: 680px;
  left: 500px;
}
</style>
