<template>
  <div class="main-container">
    <h3>{{ id ? "编辑" : "新建" }}分类</h3>
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
        name: '',
        parent: undefined
      },
      formFields: [
        {
          type: 'select',
          label: '父级分类',
          value: 'parent',
          attrs: {
            placeholder: "请选择"
          },
          options: ''
        },
        {
          type: 'input',
          label: '分类名称',
          value: 'name',
          attrs: {
            placeholder: "请输入内容"
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
    this.id && this.fetchId('category/list/')
    this.findCategoryList('category/list')
  },
  methods: {
    submit() {
      const url = this.id ? 'category/edit' : 'category/create'
      this.onSubmit(url, '/categories/list')
    }
  }
}
  </script> 