<template>
  <div class="tabTop">
    <!-- v-model="form[block.queryFileds]" 也有针对组件 -->
    <component
      v-bind="block.props"
      :options="block.options"
      v-model="form[block.queryFileds]"
      :is="block.name"
      v-for="(block, index) in newTopData"
      :key="index"
    />
    <el-button-group>
      <el-button
        v-if="btn.hasSearch"
        type="primary"
        size="medium"
        @click="search"
        >搜索</el-button
      >
      <el-button
        v-bind="btnItem.attrs || { type: 'primary', size: 'medium' }"
        v-for="(btnItem, index) in btn.btnAll"
        :key="index"
        >{{ btnItem.btnName }}</el-button
      >
    </el-button-group>
  </div>
</template> 

<script>
import mySel from '../baseCompo/mySel/index.vue'
import myDate from '../baseCompo/myDate/index.vue'
import { handleTopData } from './handle'
export default {
  components: {
    mySel,
    myDate
  },
  props: {
    topData: {
      type: Array,
      default: () => []
    },
    btn: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    newTopData() {
      return this.topData.map(topItem => handleTopData(topItem))
    },
  },
  methods: {
    search() {
      this.$emit('search', this.form)
    }
  }
}
</script>

<style>
.tabTop {
  border-bottom: 2px solid blue;
  margin-bottom: 2px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>