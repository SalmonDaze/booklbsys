<template>
  <div class="record-title">
    <div class="record-title1">
      <h3>{{title}}</h3>
      <div class="operate">
        <el-input :placeholder="input_txt"
          prefix-icon="el-icon-search"
          v-model="input_bookname">
        </el-input>
        <el-date-picker v-model="value_borrowtime"
          type="date"
          placeholder="请选择借书时间">
        </el-date-picker>
        <el-button type="primary"
          plain>查询</el-button>
      </div>
      <div style="margin-top: 20px;margin-left:20px;">
        <el-input v-model="renewal_time"
          placeholder="请输入续借天数"></el-input>
        </el-date-picker>
        <el-button @click="renewal()">续借</el-button>
        <el-button @click="return_show()"
          v-if="return_show">归还</el-button>
        <p>
          <a>*请输入数字1-30</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    title: String,
    input_txt: String,
    return_show: {
      type: Boolean,
      default: true
    }
  },
  data() {

    return {
      // 输入书名
      input_bookname: '',
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
    renewal() {
      if (this.renewal_time > 30) {
        this.renewal_time = 30
      }
      console.log(this.renewal_time)
      this.$emit('doRenewal', this.renewal_time);
    },
    toggleSelection(){
      this.$emit('doClear','');
    }
  },
  computed: {
    // days() {
    //   return moment(moment(this.renewal_time).format('YYYY-MM-DD')).diff(moment().format('YYYY-MM-DD'), 'day')
    // }
  }
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
}
.record-title .operate {
  margin-top: 30px;
  margin-left: 20px;
}
.record-title .el-input--suffix {
  margin-left: 30px;
}
.record-title .el-button {
  margin-left: 30px;
}
.record-title p {
  color: red;
  font-size: 12px;
  line-height: 30px;
  padding-left: 10px;
}
.record-title .toggleSelection{
  margin-top: 10px;
  margin-left: 120px!important;
  padding: 10px 30px 10px 30px;
  letter-spacing: 2px;
  text-align: center;
}
.record-title .el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
