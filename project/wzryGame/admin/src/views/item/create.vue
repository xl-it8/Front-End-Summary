<template>
  <div class="main-container">
    <h3>{{ id ? "编辑" : "新建" }}物品分类</h3>
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
        icon: undefined
      },
      formFields: [
        {
          type: 'input',
          label: '名称',
          value: 'name',
          attrs: {
            placeholder: "请输入内容"
          },
        },
        {
          type: 'upload',
          label: '图标',
          value: 'icon',
          attrs: {
            placeholder: "请输入内容",
          },
          url: 'http://localhost:803/items/upload'
        },
      ]
    }
  },
  components: {
    IForm
  },
  mixins: [categories],
  created() {
    this.id && this.fetchId('items/list/')
    this.findCategoryList('items/list')
  },
  methods: {
    submit() {
      const url = this.id ? 'items/edit' : 'items/create'
      this.onSubmit(url, '/items/list')
    }
  }
}
  </script> 