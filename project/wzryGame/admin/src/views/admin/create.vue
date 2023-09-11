<template>
  <div class="main-container">
    <h3>{{ id ? "编辑" : "新建" }}账号</h3>
    <IForm :formFields="formFields" :form="form" @onSubmit="submit" />
  </div>
</template>
<script>
import IForm from '@/components/pro_form/index.vue'
import categories from '@/mixins/categories.vue'
export default {
  props: ['id'], //与路由的参数解耦
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      formFields: [
        {
          type: 'input',
          label: '用户名',
          value: 'username',
          attrs: {
            placeholder: "请输入内容"
          },
        },
        {
          type: 'input',
          label: '密码',
          value: 'password',
          attrs: {
            placeholder: "请输入内容",
            // type: 'password',
          },
        },
      ]
    }
  },
  components: {
    IForm
  },
  mixins: [categories],
  created() {
    this.id && this.fetchId('admin/list/')
  },
  methods: {
    submit() {
      const url = this.id ? 'admin/edit' : 'admin/create'
      this.onSubmit(url, '/admin/list')
    }
  }
}
  </script> 