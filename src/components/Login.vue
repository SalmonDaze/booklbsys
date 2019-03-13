<template>
  <div class="login">
    <div class="bg-login">
      <div class="form-login">
        <h1>LOGIN</h1>
        <el-form :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="手机号"
            prop="phone">
            <el-input v-model.number="ruleForm2.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码"
            prop="pass">
            <el-input type="password"
              v-model="ruleForm2.pass"
              autocomplete="off"></el-input>
          </el-form-item>
          <router-link class='register'
            :to="{path:'/register'}">立即注册</router-link>
          <router-link
            :to="{path:'/homepage'}">首页</router-link>
          <el-form-item>
            <el-button type="primary"
              @click="login">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        // 手机号
        phone: '',
        // 密码
        pass: '',
      },
      rules2: {
        phone: [
          { validator: checkPhone, trigger: 'blur' },
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 登录
    login() {
      this.$ajax({
        method: 'post',
        url: 'http://192.168.2.73:3000/api/login',
        data: {
          username: this.ruleForm2.username,
          password: this.ruleForm2.pass
        }
      }).then(res => console.log(res))
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  text-align: center;
}
.bg-login {
  width: 100%;
  height: 940px;
  background: url("./../assets/bg_login.jpg") no-repeat 0;
  /* ie8兼容background-size属性 */
  filter: progid:DXImusernameTransform.Microsoft.AlphaImusernameLoader(
    src="./../assets/bg_login.jpg",
    sizingMethod='scale');
  background-size: 100% 100%;
}
.form-login {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 400px;
  height: 300px;
  margin: auto;
  padding: 30px 60px 0px 10px;
  background: #ffffff;
  border-radius: 15px;
}
.login h1 {
  margin-bottom: 20px;
  font-family: "宋体";
  font-size: 28px;
  line-height: 60px;
}
.login .register {
  position: relative;
  bottom: 20px;
  left: 180px;
  color: rgb(199, 192, 192);
  font-size: 13px;
  text-decoration: none;
}
.el-button + .el-button {
  margin-left: 50px;
}
</style>
