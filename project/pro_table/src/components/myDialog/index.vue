<template>
  <!-- 要么是弹窗 要么是新页面 -->
  <el-dialog
    v-bind="{
      width: '50%',
      title: '提示',
      ...$attrs,
    }"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <slot />
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {

    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(newVal) {
        this.$emit('update:visible', newVal)
      }
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.reset()
    },
    submit() {
      this.$emit('submit')
      //   this.dialogVisible = false
      //   this.reset()
    },
    reset() {
       console.log('清理')
    }
  }
}
</script>

<style>
</style>