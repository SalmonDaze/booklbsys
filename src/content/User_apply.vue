<template>
  <div class="userapply">
    <div class="userapply1">
      <h3>我的申请</h3>
      <el-tabs v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane label="借阅申请"
          name="first">
          <div class="table">
            <el-table :data="tableData.slice((pageNum-1)*pagesize,pageNum*pagesize)"
              style="width: 100%">
              <el-table-column label="日期"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名"
                width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover"
                    placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>书名: {{ scope.row.bookname }}</p>
                    <div slot="reference"
                      class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="书名"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.bookname }}</span>
                </template>
              </el-table-column>
              <el-table-column label="图书识别码"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.bookid }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">撤销申请</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="vals">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="归还申请"
          name="second">
          <div class="table">
            <el-table :data="tableData2.slice((pageNum-1)*pagesize,pageNum*pagesize)"
              style="width: 100%">
              <el-table-column label="日期"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名"
                width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover"
                    placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>书名: {{ scope.row.bookname }}</p>
                    <div slot="reference"
                      class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="书名"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.bookname }}</span>
                </template>
              </el-table-column>
              <el-table-column label="图书识别码"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.bookid }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">撤销申请</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="vals2">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        bookname: '刷刷刷',
        bookid: '1234234543543'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        bookname: '说的绝对是',
        bookid: '121324353'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        bookname: '艾萨克'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        bookname: '为切尔克'
      }],
      tableData2: [{
        date: '2016-05-02',
        name: '王虎',
        bookname: '刷刷刷',
        bookid: '1234234543543'
      }, {
        date: '2016-05-04',
        name: '小虎',
        bookname: '说的绝对是',
        bookid: '121324353'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        bookname: '艾萨克'
      }, {
        date: '2016-05-03',
        name: '虎',
        bookname: '为切尔克'
      }],
      pageNum: 1,//默认开始页面
      pagesize: 10,//每页的数据条数
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
    // 撤销申请
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  computed: {
    vals() {
      /**
       * 数组过滤
       * es6
       * 得到tableData里面yn为true的数组的长度
       *  */
      return this.tableData.length;
    },
    vals2(){
      return this.tableData2.length;
    }
  }
}
</script>

<style>
.userapply {
  position: absolute;
  top: 120px;
  left: 230px;
  height: 830px;
}
.userapply1 {
  width: 1600px;
}
.userapply .el-tabs {
  margin: 50px 0px 0px 30px;
}
.userapply .el-tabs__nav-wrap {
  width: 185px;
}
.userapply .el-tabs__item {
  font-size: 18px;
}
.userapply .table {
  width: 1100px;
  margin-top: 30px;
}
.userapply .el-table td,
.userapply .el-table th {
  text-align: center;
}
.userapply .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
