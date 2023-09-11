<template>
  <div class="main-container">
    <h3>{{ id ? "编辑" : "新建" }}英雄分类</h3>
    <IForm
      :formFields="formFields"
      :form="form"
      @onSubmit="submit"
      :inline="true"
      label-position="right"
    >
      <Skill :form="form" />
      <Partner :form="form" />
    </IForm>
  </div>
</template>
<script>
import IForm from '@/components/pro_form/index.vue'
import categories from '@/mixins/categories.vue'
import formFields from './data'
import Skill from './skill'
import Partner from './partner.vue'
export default {
  props: ['id'], //与路由的参数解耦
  data() {
    return {
      form: {
        name: '',
        avatar: undefined,
        scopes: {
          difficult: 0,
          skills: 0,
          attach: 0,
          dead: 0
        },
        skills: [],
        partners: [],
      },
      formFields: []
    }
  },
  components: {
    IForm,
    Skill,
    Partner
  },
  mixins: [categories],
  created() {
    this.formFields = formFields //不具有响应式 提高性能
    this.id && this.fetchId('hero/list/').then(() => {
    })
    this.findCategoryList('category/list', false)
    this.findCategoryList('items/list', false)
    this.findCategoryList('items/list', false)
  },
  methods: {
    submit() {
      const url = this.id ? 'hero/edit' : 'hero/create'
      this.onSubmit(url, '/heros/list')
    }
  }
}
  </script> 