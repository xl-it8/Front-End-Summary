<template>
  <el-select v-model="currenVal" v-bind="$attrs">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String],
      default: null
    }
  },
  computed: {
    currenVal: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue) //双向数据
      }
    }
  }
}
</script>

<style>
</style>