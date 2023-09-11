<template>
  <div>
    <hr />
    <div>
      <el-button
        type="primary"
        size="mini"
        style="margin: 10px 0"
        @click="form.items.push({})"
        >添加广告位</el-button
      >
    </div>
    <el-row>
      <el-col v-for="(item, index) in form.items" :key="index">
        <el-form-item label="跳转地址" prop="url">
          <el-input v-model="item.url" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <myUpload
            v-model="item.image"
            url="http://localhost:8080/ad/upload"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="form.items.splice(index, 1)"
            >删除</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import myUpload from '@/components/baseComponent/my_upload.vue'
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    myUpload
  }
}
</script>

<style>
</style>