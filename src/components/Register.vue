<template>
  <div class="register">
    <div class="bg-register">
      <div class="form-register">
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
              @click="registry">提交</el-button>
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
    var checkuserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
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
        pass: '',
        checkPass: '',
        username: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkuserName, trigger: 'blur' }
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
.bg-register {
  width: 100%;
  height: 940px;
  background: url("./../assets/bg_register.jpg") no-repeat 0;
  /* ie8兼容background-size属性 */
  filter: progid:DXImusernameTransform.Microsoft.AlphaImusernameLoader(
    src="./../assets/bg_register.jpg",
    sizingMethod='scale');
  background-size: 100% 100%;
}
.form-register::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(10px) contrast(0.8);
  z-index: -1;
}
.bg-register,
.form-register::before {
  background: url("./../assets/bg_register.jpg") 0 / cover fixed;
}
.form-register {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 400px;
  height: 360px;
  margin: auto;
  padding: 30px 80px 0px 30px;
  background: #ffffff;
  border-radius: 15px;
}
.register h1{
  font-family: "华文行楷";
  font-size: 28px;
  line-height: 60px;
}
.el-button+.el-button {
    margin-left: 50px;
}
</style>
