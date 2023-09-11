<template>
  <div class="main-container">
    <ITable
      :tableData="tableData"
      :editUrl="'/categories/create'"
      @remove="remove($event, 'category/delete/')"
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
          prop: 'parent.name',
          label: '父类名称',
          props: {
            width: "220"
          }
        },
        {
          prop: 'name',
          label: '分类名称',
          props: {
            width: "220"
          }
        },
      ]
    }
  },
  components: { ITable },
  created() {
    this.listUrl = 'category/list'
    this.findCategoryList(this.listUrl, false)
  },
  mixins: [categories],
  methods: {
  },

}
</script>