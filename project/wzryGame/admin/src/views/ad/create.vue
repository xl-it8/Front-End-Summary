<template>
  <div class="main-container">
    <h3>{{ id ? "编辑" : "新建" }}文章</h3>
    <IForm
      :formFields="formFields"
      :form="form"
      @onSubmit="submit"
      :inline="true"
      label-position="right"
    >
      <ad :form="form" />
    </IForm>
  </div>
</template>
<script>
import IForm from '@/components/pro_form/index.vue'
import categories from '@/mixins/categories.vue'
import ad from './ad.vue'
export default {
  props: ['id'], //与路由的参数解耦
  data() {
    return {
      form: {
        name: '',
        items: []
      },
      formFields: [
        {
          type: 'input',
          label: '标题',
          value: 'title',
          attrs: {
            placeholder: "请输入内容",
          },
        },
      ]
    }
  },
  components: {
    IForm,
    ad
  },
  mixins: [categories],
  created() {
    this.id && this.fetchId('ad/list/')
    this.findCategoryList('category/list', false)
  },
  methods: {
    submit() {
      const url = this.id ? 'ad/edit' : 'ad/create'
      this.onSubmit(url, '/ad/list')
    }
  }
}
  </script> 