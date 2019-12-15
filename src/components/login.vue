<template>
  <div>
    <div class="wrap">

    
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="user">
          <el-input v-model.number="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import asyncAPI from '../API'
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        console.log(/^[A-Z]{1}[a-zA-Z0-9]{5,15}$/.test(value))
        if (!/^[A-Z]{1}[a-zA-Z0-9]{5,15}$/.test(value)) {
          callback(new Error('首字母大写, 长度6-16个字符'));
        } else {
          callback();
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
      ruleForm: {
        pass: '',
        user: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = '/api/login'
          let {pass, user} = this.ruleForm
          let datas = `user=${user}&pass=${pass}`
          asyncAPI.doFormPostDatas(url, datas, (data) => {
            console.log(data)
            if (data.code === 10000) {
              const token = data.token
              localStorage.setItem('token', token)
              this.$router.push('/')
              this.$message({
                message: '登录成功',
                type: 'success'
              });
            }else {
              this.$message({
                message: '密码错误',
                type: 'error'
              });
            }
            console.log(data)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
  
}
</script>

<style lang="stylus" scoped>
.wrap{
  width 500px
  margin 100px auto 
}
</style>