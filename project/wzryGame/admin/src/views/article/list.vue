<template>
  <div class="main-container">
    <ITable
      :tableData="tableData"
      :editUrl="'/article/create'"
      @remove="remove($event, 'article/delete/')"
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
          prop: 'title',
          label: '标题',
          props: {
            width: "220"
          }
        }
      ]
    }
  },
  components: { ITable },
  created() {
    this.listUrl = 'article/list'
    this.findCategoryList(this.listUrl, false)
  },
  mixins: [categories],
  methods: {
  },

}
</script>