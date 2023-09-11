
<script>
import { createCategory, findById, findCategoryList, editCategory, deleteCategory } from '@/api/category'
export default {
  data() {
    return {

    }
  },
  methods: {
    async onSubmit(url, path) {
      if (this.id) { //
        console.log(this.form)
        await editCategory(url, this.form)
        this.$mes()
      } else {
        await createCategory(url, this.form)
        this.$mes()
      }
      this.$router.push({
        path //绝对路径
      })

    },
    async fetchId(url) {
      //查找对应的id数据
      return new Promise(async (resolve) => {
        const res = await findById(url, this.id)
        this.form = res
        resolve(res)
      })
    },
    async findCategoryList(url, bol = true) {
      const res = await findCategoryList(url, {
        isOnlyParent: bol
      })
      if (this.tableData) {
        this.tableData = res
        return
      }
      if (this.formFields) {
        for (let index in this.formFields) {  //for of for in 或for循环用 break或者continue 或者return直接停止循环 forEach用try catch抛出错误    同时注意for in  的每一项是key值 for of 是value值
          const item = this.formFields[index]
          if (item.hasOwnProperty('options') && (!item.options)) {
            item.options = res
            break
          }
        }
      }
    },
    async remove(id, url) {
      await deleteCategory(id, url)
      this.findCategoryList(this.listUrl, false)
      this.$mes()
    }
  }
}
</script>