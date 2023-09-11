<template>
  <el-table :data="tableData" v-bind="$attrs">
    <el-table-column
      :prop="item.prop"
      :label="item.label"
      v-bind="item.props"
      v-for="(item, index) in tableFields"
      :key="index"
    >
      <template v-slot="scope" v-if="item.isDefine">
        <img :src="scope.row[item.prop]" alt="" style="width:45px">
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="
            $router.push({
              path: editUrl,
              query: {
                id: scope.row._id,
              },
            })
          "
          >编辑</el-button
        >
        <el-button type="primary" size="mini" @click="remove(scope.row._id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ISelect from './baseComponent/lSelect.vue'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    editUrl: {
      type: String,
      default: null
    },
    tableFields: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ISelect
  },
  methods: {
    remove(value) {
      this.$emit('remove', value)
    }
  }
}
</script>

<style>
</style>