<template>
  <div class="main-container">
    <ITable
      :tableData="tableData"
      :editUrl="'/heros/create'"
      @remove="remove($event, 'hero/delete/')"
      :tableFields="tableFields"
      style="width: 100%"
    ></ITable>
  </div>
</template>

<script>
import ITable from '@/components/lTable.vue'
import categories from '@/mixins/categories.vue'
export default {
  data() {
    return {
      listUrl: '',
      tableData: [],
      tableFields: [
        {
          prop: '_id',
          label: 'id',
          props: {
            width: "220"
          }
        },
        {
          prop: 'name',
          label: '英雄名称',
          props: {
            width: "220"
          }
        },
        {
          prop: 'title',
          label: '称号',
          props: {
            width: "220"
          }
        },
        {
          prop: 'avatar',
          label: '头像',
          isDefine: true, //自定义列表
          props: {
            width: "220"
          }
        },
      ]
    }
  },
  components: { ITable },
  created() {
    this.listUrl = 'hero/list'
    this.findCategoryList(this.listUrl, false)
  },
  mixins: [categories],
  methods: {
  },

}
</script>