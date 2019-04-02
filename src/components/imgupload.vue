<template>
  <div class="form-group">
    <label class="control-label">上传图片</label>
    <div class="control-form">
      <p class="help-block">(建议图片格式为：JPEG/PNG，大小不超过2M，最多可上传4张)</p>
      <ul class="upload-imgs">
        <li v-if="imgLen>=4 ? false : true">
          <input type="file"
            class="upload"
            @change="addImg"
            ref="inputer"
            accept="image/png,image/jpeg,image/jpg" />
          <a class="add"><i class="iconfont icon-plus"></i>
            <p>点击上传</p>
              <p class="img"><img :src="getObjectURL(imgs.value)"><a class="close"
                  @click="delImg(imgs.key)">×</a></p>
          </a>
        </li>
        
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: new FormData(),
      imgs: {},
      imgLen: 0,
    }
  },
  methods: {
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 4) {
        alert('最多可上传4张，您还可以上传' + (4 - oldLen) + '张');
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 2 * 1024 * 1024) {
          alert('请选择2M以内的图片！');
          return false
        }
        this.imgLen++;
        this.$set(this.imgs, this.fil[i].name + '?' + new Date().getTime() + i, this.fil[i]);
      }
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    delImg(key) {
      this.$delete(this.imgs, key);
      this.imgLen--;
    },
    submit() {
      for (let key in this.imgs) {
        let name = key.split('?')[0];
        this.formData.append('multipartFiles', this.imgs[key], name);
      }
      this.$http.post('/opinion/feedback', this.formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        this.alertShow = true;
      });
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.upload-imgs {
  margin: 10px 0 30px 0;
  overflow: hidden;
  font-size: 0;
}
.upload-imgs li {
  position: relative;
  width: 118px;
  height: 118px;
  font-size: 14px;
  display: inline-block;
  padding: 10px;
  margin-right: 25px;
  border: 2px dashed #ccc;
  text-align: center;
  vertical-align: middle;
}
.upload-imgs .add {
  display: block;
  background-color: #ccc;
  color: #ffffff;
  height: 94px;
  padding: 8px 0;
}
.upload-imgs .add .iconfont {
  padding: 10px 0;
  font-size: 40px;
}
.upload-imgs li .upload {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 118px;
  height: 118px;
  opacity: 0;
}
.upload-imgs .img {
  position: relative;
  width: 94px;
  height: 94px;
  line-height: 94px;
}
.upload-imgs .img img {
  position: relative;
  bottom: 15px;
  width: 120px;
  height: 120px;
}
.upload-imgs .img .close {
  display: none;
}
.upload-imgs li:hover .img .close {
  display: block;
  position: absolute;
  right: -6px;
  top: -10px;
  line-height: 1;
  font-size: 22px;
  color: #aaa;
}
</style>
