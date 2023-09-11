<template>
  <div>
    <hr />
    <div>
      <el-button
        type="primary"
        size="mini"
        style="margin: 10px 0"
        @click="form.skills.push({})"
        >添加技能</el-button
      >
    </div>
    <el-row>
      <el-col v-for="(item, index) in form.skills" :key="index">
        <el-form-item label="名称" prop="name">
          <el-input v-model="item.name" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <myUpload
            v-model="item.icon"
            url="http://localhost:803/hero/upload"
          />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="item.description" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="form.skills.splice(index, 1)"
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