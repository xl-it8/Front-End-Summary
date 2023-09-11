<template>
  <div class="main-container">
    <h3>{{ id ? "编辑" : "新建" }}文章</h3>
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
        title: '',
        categories: undefined,
        description: ''
      },
      formFields: [
        {
          type: 'select',
          label: '所属分类',
          value: 'categories',
          attrs: {
            placeholder: "请选择",
            multiple: true
          },
          options: ''
        },
        {
          type: 'input',
          label: '标题',
          value: 'title',
          attrs: {
            placeholder: "请输入内容"
          },
        },
        {
          type: 'editor',
          label: '详情',
          value: 'detail',
          attrs: {
            
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
    this.id && this.fetchId('article/list/')
    this.findCategoryList('category/list', false)
  },
  methods: {
    submit() {
      const url = this.id ? 'article/edit' : 'article/create'
      this.onSubmit(url, '/article/list')
    }
  }
}
  </script> 