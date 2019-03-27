<template>
  <div class="register">
    <div class="form-register">
      <p class="register-close"
        @click="register_close">X</p>
      <h1>注册</h1>
      <el-form :model="ruleForm1"
        status-icon
        :rules="rules2"
        ref="ruleForm1"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="用户名"
          prop="username"
          ref="name">
          <el-input v-model.number="ruleForm1.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          prop="phone">
          <el-input v-model.number="ruleForm1.phone"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="密码"
          prop="pass">
          <el-input type="password"
            v-model="ruleForm1.pass"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
          prop="checkPass">
          <el-input type="password"
            v-model="ruleForm1.checkPass"
            autocomplete="off"></el-input>
        </el-form-item>
        <a class='return-login'
          @click="return_login">已有账号，立即登录</a>
        <el-form-item>
          <el-button type="primary"
            @click="registry()"
            :disabled="pro">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkuserName = (rule, value, callback) => {
      if (value) {
        this.prohibit = true;
      } else {
        this.prohibit = true;
        return callback(new Error('用户名不能为空'));
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        this.prohibit = true;
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          this.prohibit = true;
          callback(new Error('请输入数字值'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          if (!reg.test(value)) {
            this.prohibit = true;
            return callback(new Error('请输入正确的手机号'));
          } else {
            this.prohibit = false;
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        this.prohibit = true;
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm1.checkPass !== '') {
          this.prohibit = true;
          this.$refs.ruleForm1.validateField('checkPass');
        }
        this.prohibit = false;
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        this.prohibit = true;
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm1.pass) {
        this.prohibit = true;
        callback(new Error('两次输入密码不一致!'));
      } else {
        this.prohibit = false;
        callback();
      }
    };
    return {
      ruleForm1: {
        // 用户名
        username: '',
        // 手机号
        phone: '',
        // 密码
        pass: '',
        // 确认密码
        checkPass: '',
      },
      rules2: {
        username: [
          { validator: checkuserName, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' },
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
      // 记录输入是否正确，控制按钮禁用
      prohibit: true,
    };
  },
  computed: {
    pro() {
      return this.prohibit;
    }
  },
  methods: {
    register_close() {
      this.$emit('loginClose', '子组件的参数内容');
    },
    return_login() {
      this.$emit('returnLogin', '');
    },
    registry() {
      const reg = /^1[0-9]{10}$/;
      if (!this.ruleForm1.username && !reg.test(this.ruleForm1.phone) && !this.ruleForm1.pass && !this.ruleForm1.checkPass) {
        this.$message({ message: "请确认信息输入完整", type: 'warning' });
        return false;
      } else if (!this.ruleForm1.username || !this.ruleForm1.phone) {
        this.$message({ message: "用户名和手机号不能为空", type: 'warning' });
        return false;
      } else if (!reg.test(this.ruleForm1.phone)) {
        this.$message({ message: "请输入正确手机号", type: "warning" });
        return false;
      } else if (!this.ruleForm1.pass || !this.ruleForm1.checkPass) {
        this.$message("请输入密码");
        return false;
      } else if (this.ruleForm1.pass !== this.ruleForm1.checkPass) {
        this.$message.error("两次输入密码不一致");
        return false;
      } else {
        this.$ajax({
          method: 'post',
          url: '/api/register',
          data: {
            phone: this.ruleForm1.phone,
            password: this.ruleForm1.pass,
            username: this.ruleForm1.username
          }
        }).then((res) => {
          console.log(res)
          let { success, token } = res.data
          if (success) {
            // 跳转首页
            this.register_close();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
  text-align: center;
}
.register .register-close {
  position: absolute;
  left: 475px;
  top: 20px;
  font-size: 19px;
  color: rgb(202, 199, 199);
  cursor: pointer;
}
.register .register-close:hover {
  position: absolute;
  left: 477px;
  color: red;
}
.form-register {
  position: fixed;
  z-index: 999;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 400px;
  height: 440px;
  margin: auto;
  padding: 30px 80px 0px 30px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.register h1 {
  padding-bottom: 10px;
  margin-left: 50px;
  font-size: 28px;
  line-height: 60px;
}
.return-login {
  position: relative;
  bottom: 15px;
  left: 140px;
  color: rgb(199, 192, 192);
  font-size: 13px;
  text-decoration: none;
}
.register .el-form-item {
  margin-top: 10px;
}
.register .el-button {
  position: relative;
  right: 30px;
  width: 240px;
  letter-spacing: 10px;
}
</style>
