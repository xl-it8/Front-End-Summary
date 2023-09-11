<template>
  <el-date-picker v-model="currentValue" v-bind="$attrs"> </el-date-picker>
</template>

<script>
export default { 
  props: {
    value: {
      type: [String, Number, Date],
      default: null
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      }
    }
  }
}
</script>

<style>
</style>