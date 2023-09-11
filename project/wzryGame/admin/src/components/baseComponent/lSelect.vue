<template>
  <el-select v-model="currentValue" v-bind="$attrs">
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item.name"
      :value="item._id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: [Array, String],
      default: null
    },
    value: {
      type: [String, Object,Array],
      default: null
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style>
</style>