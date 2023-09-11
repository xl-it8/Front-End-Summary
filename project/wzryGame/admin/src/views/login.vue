<template>
  <div class="login_container">
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span>请先登录</span>
      </div>
      <IForm
        :formFields="formFields"
        :form="form"
        @onSubmit="submit"
        label-position="right"
      />
    </el-card>
  </div>
</template>

<script>
import IForm from '@/components/pro_form/index.vue'
import { login } from '@/api/login'
export default {
  components: {
    IForm
  },
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      formFields: [
        {
          type: 'input',
          label: '用户名',
          value: 'username',
          attrs: {
            placeholder: "请输入内容",
          },
        },
        {
          type: 'input',
          label: '密码',
          value: 'password',
          attrs: {
            placeholder: "请输入内容",
          },
        },
      ]
    }
  },
  methods: {
    async submit() {
      try {
        const res = await login(this.form)
        localStorage.setItem('token', res.token)
        this.$message.success('登录成功')
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }

    }
  }
}
</script>

<style>
.login_container {
  width: 400px;
  margin: 100px auto;
}
</style>