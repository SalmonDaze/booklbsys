<template>
  <div class="login">
    <div class="form-login">
      <h1>登录</h1>
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
        <a class='jump-register'
          @click="jump_register">立即注册</a>
        <el-form-item>
          <el-button type="primary"
            @click="login">登录</el-button>
        </el-form-item>

      </el-form>
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
  // 从首页后退时，清空token，重新登录
  mounted() {
    this.$store.dispatch('logout');
  },
  methods: {
    login_close() {
      this.$emit('loginClose', '子组件的参数内容');
    },
    jump_register() {
      this.$emit('jumpRegister', '');
    },
    // 登录
    login() {
      console.log(this.ruleForm2.phone, this.ruleForm2.pass)
      const reg = /^1[0-9]{10}$/;
        if (!reg.test(this.ruleForm2.phone)||!this.ruleForm2.phone||!this.ruleForm2.pass) {
          return false
        }else{
          this.$ajax({
            method: 'post',
            url: '/api/login',
            data: {
              phone: this.ruleForm2.phone,
              password: this.ruleForm2.pass
            }
          }).then((res) => {
            let { success, user, token } = res.data
            console.log(res)
            if (success) {
              // 更新store.js里loginAsync方法的token
              this.$store.dispatch('loginAsync', {
                token,
                data: user
              });
              // 跳转首页
              this.$router.push('/homepage')
            } else {
              alert(res.data.msg);
            }
          })
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  text-align: center;
}
.form-login {
  position: fixed;
  z-index: 999;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 400px;
  height: 300px;
  margin: auto;
  padding: 30px 60px 0px 10px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.login h1 {
  margin-bottom: 20px;
  margin-left: 50px;
  font-size: 28px;
  line-height: 60px;
}
.login .jump-register {
  position: relative;
  bottom: 20px;
  left: 180px;
  color: rgb(199, 192, 192);
  font-size: 13px;
  text-decoration: none;
}
.login .el-button {
  position: relative;
  right: 20px;
  width: 240px;
  letter-spacing: 10px;
}
</style>
