<template>
  <el-form ref="form" :model="form" v-bind="$attrs" label-width="80px">
    <el-form-item
      :label="item.label"
      :prop="
        Array.isArray(item.value)
          ? `${item.value[0]}.${item.value[1]}`
          : item.value
      "
      v-for="(item, index) in formOptions"
      :key="index"
    >
      <component
        v-if="!Array.isArray(item.value)"
        :is="item.type"
        v-bind="item.attrs"
        :options="item.options"
        :url="item.url"
        v-model="form[item.value]"
      />
      <el-rate
        v-else
        v-bind="item.attrs"
        v-model="form[item.value[0]][item.value[1]]"
      ></el-rate>
    </el-form-item>
    <slot />
    <div style="text-align: center">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </el-form>
</template>

<script>
import { handleItem } from './handle'
import ISelect from '../baseComponent/lSelect'
import myUpload from '../baseComponent/my_upload.vue'
import editor from '../editor.vue'
export default {
  props: {
    formFields: {
      type: [Array, String],
      default: () => ([])
    },
    form: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    formOptions() {
      return this.formFields && this.formFields.map(formItem => handleItem(formItem))
    }
  },
  components: {
    ISelect,
    myUpload,
    editor
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit')
    },
    reset() {
      if (this.form?.skills?.length) {
        this.form.skills = []
      }
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
</style>