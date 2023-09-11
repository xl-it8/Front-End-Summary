<template>
  <div>
    <hr />
    <div>
      <el-button
        type="primary"
        size="mini"
        style="margin: 10px 0"
        @click="form.partners.push({})"
        >添加英雄关系</el-button
      >
    </div>
    <el-row>
      <el-col v-for="(item, index) in form.partners" :key="index">
        <el-form-item label="英雄" prop="hero">
          <el-select v-model="item.hero" filterable>
            <el-option v-for="hero in tableData" :key="hero._id" :label="hero.name" :value="hero._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="item.description" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="form.partners.splice(index, 1)"
            >删除</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import myUpload from '@/components/baseComponent/my_upload.vue'
import categories from '@/mixins/categories.vue'
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return {
      tableData: [],
    }
  },
  components: {
    myUpload
  },
  mixins: [categories],
  created() {
    this.findCategoryList('hero/list', false)
  },
}
</script>

<style>
</style>