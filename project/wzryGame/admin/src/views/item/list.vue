<template>
  <div class="main-container">
    <ITable
      :tableData="tableData"
      :editUrl="'/items/create'"
      @remove="remove($event, 'items/delete/')"
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
          label: '物品名称',
          props: {
            width: "220"
          }
        },
        {
          prop: 'icon',
          label: '图标',
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
    this.listUrl = 'items/list'
    this.findCategoryList(this.listUrl, false)
  },
  mixins: [categories],
  methods: {
  },

}
</script>