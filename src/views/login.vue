<template>
  <div class="login">
    <div class="login-model">
      <div class="login-title">智汇魔方后台管理系统 v3.0</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="userName">
          <el-input
            v-model="ruleForm.userName"
            placeholder="请输入工号或手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即登录</el-button
          >
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$ajax({
            context: this,
            url: this.$api.user.login,
            method: "post",
            query: {
              a: 1
            },
            body: {
              b: 2
            },
            callback: data => {
              //result:true
              this.$localStore.set("token", data.token); //将token存储到本地
              this.$router.push({
                path: "/"
              });
            },
            failback: () => {
              //result:false
            },
            errorback: () => {
              //404,500
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  position: relative;
  background-color: #1c1f21;
}
.login-model {
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 4px;
}
@media (max-width: 768px) {
  .login-model {
    width: 90%;
  }
}
.login-title {
  text-align: center;
  font-size: 20px;
}
.demo-ruleForm {
  margin-top: 40px;
}
</style>
