<template>
  <div class="table">
    <!-- 头部搜索 -->
    <tab-top :topData="query.top" :btn="query.btn" @search="find"></tab-top>
    <!-- 中间部分 -->
    <controls />
    <el-card class="table_card">
      <el-table
        v-loading="loading"
        :header-cell-style="{ background: '#f5f7fa' }"
        border
        align="center"
        size="small"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-bind="{
            showOverflowTooltip: true,
            ...item.attrs,
          }"
          v-for="(item, index) in tableFields"
          :key="index"
        >
          <template v-slot="scope" v-if="item.isSlot === 'zd'">
            <div v-for="(item2, index) in dictMap[item.prop]" :key="index">
              <div v-if="scope.row[item.prop] === item2.value">
                {{ item2.label }}
              </div>
            </div>
          </template>
          <template v-slot="scope" v-else-if="!item.prop">
            <el-button
              v-for="(btns, index) in item.operateBtns"
              :key="index"
              v-loading="btnLoading"
              v-bind="{
                size: 'mini',
                type: 'primary',
                ...item.attrs,
              }"
              v-on="{ click: () => open(scope.row, btns) }"
              >{{ btns.name }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page + 1"
      :page-sizes="pageSizes"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <myDialog
      :visible.sync="visible"
      v-bind="attrs"
      @submit="submit"
      ref="dialog"
    >
      <slot></slot>
    </myDialog>
  </div>
</template>

<script>
import myDialog from '../myDialog/index.vue'
import tabTop from '../tabTop/index.vue'
import controls from '../controls/index.vue'
import initData from '../../mixins/search.vue'
export default {
  props: {
    query: {
      type: Object,
      default: () => ({})
    },
    tableFields: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      visible: false,
      btnLoading: false,
      dialogRes: false,
      attrs: {},
      dictMap: {
        age: [
          {
            label: '年龄1',
            value: 24
          },
          {
            label: '年龄2',
            value: 23
          }
        ]
      }
    }
  },
  created() {
    // this.getdictMap()//获取字典
    this.init('id,desc', 'custser/findPage')
  },
  mixins: [initData],
  components: {
    tabTop,
    controls,
    myDialog
  },
  methods: {
    find(form) {
      this.params = { ...this.params, ...form }
      this.search()
    },
    async open(row, btns) {
      const { eventName, attrs } = btns
      if (eventName) { //去的新的页面
        const res = await this.$parent[eventName](row)
        this.dialogRes = res
      } else { //就是打开弹窗
        this.attrs = attrs
        this.visible = true
      }
    },
    submit() {
      this.open(null, { eventName: 'submit' })
      if (this.dialogRes) {
        this.$refs.dialog.reset()
        this.visible = false
      }
    }
  }
}
</script>

<style>
.table {
  width: 100%;
}
.table_card {
  margin: 10px 0;
}
</style>