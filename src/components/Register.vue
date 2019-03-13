<template>
  <div class="register">
    <div class="form-register">
      <p class="register-close"
        @click="register_close">X</p>
      <h1>REGISTER</h1>
      <el-form :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="用户名"
          prop="username">
          <el-input v-model.number="ruleForm2.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          prop="phone">
          <el-input v-model.number="ruleForm2.phone"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="密码"
          prop="pass">
          <el-input type="password"
            v-model="ruleForm2.pass"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
          prop="checkPass">
          <el-input type="password"
            v-model="ruleForm2.checkPass"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="registry">注册</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkuserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
    };
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
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
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
      }
    };
  },
  methods: {
    register_close(){
      this.$emit('loginClose', '子组件的参数内容');
    },
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
    registry() {
      this.$ajax({
        method: 'post',
        url: 'http://192.168.2.73:3000/api/register',
        data: {
          username: '123',
          password: '123'
        }
      }).then(res => console.log(res))
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
  height: 390px;
  margin: auto;
  padding: 30px 80px 0px 30px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
}
.register h1 {
  padding-bottom: 10px;
  font-family: "宋体";
  font-size: 28px;
  line-height: 60px;
}
.el-button + .el-button {
  margin-left: 50px;
}
</style>
