<template>
  <div class="allbooks">
    <div class="allbooks1">
      <h3>所有书籍</h3>
      <div class="operate">
        <el-input v-model="vbookname"
          style='width: 300px;'
          prefix-icon="el-icon-search"
          placeholder="请输入书名"></el-input>
        <el-button type="primary" plain icon="el-icon-sort-up"
          @click='do_up()'></el-button>
          <el-button type="primary"
          plain icon="el-icon-sort-down"
          @click='do_up()'></el-button>
      </div>
      <ul class="allbooks-book">
        <li class="book"
          v-for="book in list.slice((pageNum-1)*pagesize,pageNum*pagesize)"
          :key='book._id'>
          <v-booklist :title="book.title"
            :author="book.author"
            :booklist_img="book.cover"
            :synopsis="book.bookInfo"
            :bookid='book._id'
            books.length="books.slice((pageNum-1)*pagesize,pageNum*pagesize)"
            v-on:doborrowbook="do_borrowbook(book)"></v-booklist>
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
      // 书名
      vbookname: '',
      books: [],
      pageNum: 1,//默认开始页面
      pagesize: 12,//每页的数据条数
      // 加载
      loading: true,
    }
  },
  //通过计算属性过滤数据
    computed: {
      list: function() {
        var _this = this;
        //逻辑-->根据input的value值筛选books中的数据
        var arrByZM = []; //声明一个空数组来存放数据
        for (var i = 0; i < this.books.length; i++) {
          //for循环数据中的每一项（根据name值）
          if (this.books[i].title.search(this.vbookname) != -1) {
            //判断输入框中的值是否可以匹配到数据，如果匹配成功
            arrByZM.push(this.books[i]);
            //向空数组中添加数据
          }
        }
        
        //一定要记得返回筛选后的数据
        return arrByZM;
      }
    },
  methods: {
    // 搜索书名
    do_searchbook() {

    },
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
.allbooks .operate {
  margin-top: 30px;
  margin-left: 20px;
}
.allbooks .el-button--primary.is-plain {
  margin-left: 20px;
}
.allbooks .book {
  display: inline-block;
}
.allbooks .loading {
  position: absolute;
  top: 200px;
  left: 600px;
}
.allbooks .allbooks-book {
  width: 1500px;
}
.allbooks .page {
  position: absolute;
  top: 680px;
  left: 500px;
}
</style>
