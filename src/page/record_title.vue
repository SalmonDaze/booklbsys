<template>
  <div class="record-title">
    <div class="record-title1">
      <h3>{{title}}</h3>
      <div class="operate">
        <el-input placeholder="请输入书名，回车"
          prefix-icon="el-icon-search"
          v-model="input_bookname"
          @keyup.enter.native="searchEnterFunbook">
        </el-input>
        <el-input placeholder="请输入人名，回车"
          prefix-icon="el-icon-search"
          v-model="input_reader"
          v-if="searchreader_show"
          @keyup.enter.native="searchEnterFunreader">
        </el-input>
        <el-date-picker v-model="value_borrowtime"
          type="date"
          placeholder="请选择借出日期">
        </el-date-picker>
        <el-button type="primary"
          plain
          @click="seek()">查询</el-button>
      </div>
      <div style="margin-top: 20px;margin-left:20px;">
        <el-input v-model="renewal_time"
          placeholder="请输入续借天数"
          v-if="renewal_show"></el-input>
        <el-button @click="renewal()"
          v-if="renewal_show">续借</el-button>
        <el-button @click="returnbook()"
          v-if="return_show">归还</el-button>
        <p v-if="renewal_show">
          <a>*请输入数字1-30</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { calendarTime } from '../utils/formatDate.js';
export default {
  props: {
    title: String,
    searchreader_show: {
      type: Boolean,
      default: true
    },
    return_show: {
      type: Boolean,
      default: true
    },
    renewal_show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 书名查询
      input_bookname: '',
      // 人名查询
      input_reader: '',
      // 选择借书时间
      value_borrowtime: '',
      // 续借时间
      renewal_time: '',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value2: '',
    };
  },
  methods: {
    // 书名查询
    searchEnterFunbook() {
      console.log(this.input_bookname)
      this.$emit('doSearchbook', this.input_bookname);
    },
    // 人名查询
    searchEnterFunreader() {
      console.log(this.input_reader)
      this.$emit('doSearchreader', this.input_reader);
    },
    // 时间查询
    seek() {
      this.$emit('doSearchtime', this.value_borrowtime);
    },
    // 续借
    renewal() {
      if (this.renewal_time > 30) {
        this.renewal_time = 30;
      }
      console.log(this.renewal_time)
      this.$emit('doRenewal', this.renewal_time);
    },
    // 归还
    returnbook() {
      this.$emit('doReturn', '');
    },
  },
}
</script>
<style>
.record-title {
  position: absolute;
}
.record-title h3 {
  color: #2c3e50;
}
.record-title .el-input {
  width: 180px;
  margin-right: 20px;
}
.record-title .el-button {
  margin-left: 10px;
}
.record-title .operate {
  margin-top: 30px;
  margin-left: 20px;
}
.record-title .el-input--suffix {
  margin-left: 10px;
}
.record-title p {
  color: red;
  font-size: 12px;
  line-height: 30px;
  padding-left: 10px;
}
.record-title .toggleSelection {
  margin-top: 10px;
  margin-left: 120px !important;
  padding: 10px 30px 10px 30px;
  letter-spacing: 2px;
  text-align: center;
}
.record-title .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
