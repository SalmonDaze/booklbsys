 <template>
     <div class='upload_container'>
         <div class='title'>
             <span>书名：</span><el-input v-model="title" placeholder="请输入书名" class='input_box'></el-input>
         </div>
        <div class='title'>
            <span>作者：</span><el-input v-model="author" placeholder="请输入作者" class='input_box'></el-input>
        </div>
        <div class='title'>
            <span>简介：</span><el-input v-model="bookInfo" placeholder="请输入书本简介" class='input_box'></el-input>
        </div>
        <div class='title'>
            <span>可借阅周期：</span><el-input v-model="borrowCycle" placeholder="请输入周期时间" class='input_box'></el-input>
        </div>
        <input type="file" @change='uploadCover' ref='upload' class="uploadfile"/>
        <el-button type="primary" @click='uploadBook' class="unload">上传</el-button>
     </div>
 </template>
 <script>
 export default {
     data() {
         return{
             title: '',
             author: '',
             borrowCycle: '',
             data:null,
             path: '',
             bookInfo:''
         }
     },
     methods:{
         handleAvatarSuccess(e) {
             console.log(e)
         },
         async uploadBook() {
             let _this = this   
             let anext = async () => {
                 return new Promise((resolve, reject) => {
                    this.$ajax({
                    url: 'http://192.168.2.73:3000/admin/uploadCover',
                    method:'POST',
                    data: this.data
                    }).then( res => {
                        resolve(res.data.path)
                    })
                 })
             }
             let path = await anext()
             this.$ajax({
                 method: 'POST',
                 url: 'http://192.168.2.73:3000/admin/uploadBook',
                 data: {
                     title: this.title,
                     author: this.author,
                     borrowCycle: this.borrowCycle,
                     cover: path,
                     bookInfo: this.bookInfo
                 }
             }).then(res => {
                 console.log(res)
             })
         },
        async uploadCover(e) {
             let _this = this
             let file = this.$refs.upload.files[0]
             const isJPG = file.type === 'image/jpeg'
             const isLt2M = file.size / 1024 / 1024 < 2

             if(!isJPG) {
                 this.$message.error('只能上传jpeg格式图片')
                 return false
             }

             if(!isLt2M) {
                 this.$message.error('图片大小不能超过2MB')
                 return false
             }

            this.data = new FormData()
            this.data.append('file', file)
            
         }
     }
 }
 </script>
 <style>
 .upload_container {
    width: 800px;
    height: 600px;
    position: absolute;
    top: 180px;
    left: 260px;
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
    border-color: #409EFF;
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
  .uploadfile{
      position: relative;
      top: 20px;
      left: 200px;
  }
  .unload{
      position: relative;
      top: 80px
  }
 </style>
 