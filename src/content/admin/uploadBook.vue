 <template>
  <div class='upload_container'>
    <h3>书籍上架</h3>
    <div class="table">
      <div class='title'>
      <span>书名：</span>
      <el-input v-model="title"
        placeholder="请输入书名"
        class='input_box'></el-input>
    </div>
    <div class='title'>
      <span>作者：</span>
      <el-input v-model="author"
        placeholder="请输入作者"
        class='input_box'></el-input>
    </div>
    <div class='title'>
      <span>简介：</span>
      <el-input v-model="bookInfo" maxlength="180"
        placeholder="请输入书本简介"
        class='input_box'></el-input>
    </div>
    <div class='title'>
      <span>可借阅周期：</span>
      <el-input v-model="borrowCycle"
        placeholder="请输入周期时间"
        class='input_box'></el-input>
    </div>
    <input type="file"
      @change='uploadCover'
      ref='upload'
      class="uploadfile" />
      <div class='upload_select'>
        <img class='preview' ref='preview' v-if='file_value'/>
      </div>
    <el-button type="primary"
      @click='uploadBook'
      class="unload">上传</el-button>
    </div>
  </div>
</template>
 <script>
 import uploadImg from '../../components/imgupload.vue'
export default {
  data() {
    return {
      //  书名
      title: '',
      //  作者
      author: '',
      //  借阅周期
      borrowCycle: '',
      //  上传数据
      data: null,
      //  图片路径
      path: '',
      //  简介
      bookInfo: '',
      file_value:''
    }
  },
  methods: {
    handleAvatarSuccess(e) {
      console.log(e)
    },
    async uploadBook() {
      if (!this.title || !this.author || !this.borrowCycle || !this.bookInfo||!this.file_value) {
        this.$message({
          showClose: true,
          message: '请确认信息输入完整',
          type: 'error'
        });
        return false
      } else {
        let _this = this
        let anext = async () => {
          return new Promise((resolve, reject) => {
            this.$ajax({
              url: 'http://192.168.2.73:3000/admin/uploadCover',
              method: 'POST',
              data: this.data
            }).then(res => {
              _this.path = res.data.path
              resolve(res.data.path)
            })
          })
        }
        let path = await anext()
        this.$ajax({
          method: 'POST',
          url: '/admin/uploadBook',
          data: {
            title: this.title,
            author: this.author,
            borrowCycle: this.borrowCycle,
            cover: path,
            bookInfo: this.bookInfo
          }
        }).then(res => {
          console.log(res)
          this.bookInfo = this.file_value = this.title = this.author = this.borrowCycle = this.path = ''
          this.data = null
        })
        this.$message({
          message: '上传书籍成功！',
          type: 'success'
        });
      }
    },
    async uploadCover(e) {
      let _this = this
      this.file_value=e.target.value;
      let file = this.$refs.upload.files[0]
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('只能上传jpeg格式图片')
        return false
      }

      if (!isLt2M) {
        this.$message.error('图片大小不能超过2MB')
        return false
      }
      this.data = new FormData()
      this.data.append('file', file)
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = function(){
        _this.$refs.preview.src = this.result
      }
    }
  }
}
</script>
 <style>
 .preview {
   width: 200px;
   height: 200px;
   position: relative;
   top: -13px;
 }
.upload_container {
  width: 800px;
  height: 600px;
  position: absolute;
  top: 120px;
  left: 230px;
}
.upload_container .table{
  margin-top: 80px;
  margin-left: 20px;
}
.uploadfile {
  opacity: 0;
  width: 200px;
  height: 200px;
  position: absolute;
  z-index: 1;
  left: 300px;
  top: 400px;
}
.uploadfile:hover {
  cursor: pointer;
}
.uploadfile:hover ~ .upload_select {
  border-color: rgb(115, 142, 216);
}
.upload_select {
  width: 200px;
  height: 200px;
  border: dashed 2px skyblue;
  position: relative;
  left: 280px;
  top: 45px;
}
.input_box {
  float: right;
  width: 80%;
}
.title {
  text-align: right;
  font-size: 1.1rem;
  padding-top: 10px;
}
.title > span {
  margin-right: 10px;
  margin-top: 5px;
}
.title:not(:first-child) {
  margin-top: 35px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.unload {
  position: relative;
  top: 80px;
  left: 350px;
}
</style>
 