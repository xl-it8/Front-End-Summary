<template>
  <div class="main-container">
    <ITable
      :tableData="tableData"
      :editUrl="'/admin/create'"
      @remove="remove($event, 'admin/delete/')"
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
          prop: 'username',
          label: '用户名',
          props: {
            width: "220"
          }
        },
      ]
    }
  },
  components: { ITable },
  created() {
    this.listUrl = 'admin/list'
    this.findCategoryList(this.listUrl, false)
  },
  mixins: [categories],
  methods: {
  },

}
</script>