<script>
export default {
  data() {
    return {
      loading: false,
      pageSizes: [10, 20, 30, 50],
      params: {
        page: 0,
        pageSize: 10,
        sort: "",
      },
      url: "",
      tableData: [], //获取表格数据
      total: 20
    }
  },
  methods: {
    //先初始化再搜索
    init(fenlei, jiekou) { //页面初始化
      this.loading = true
      if (fenlei) {
        this.params = { ...this.params, sort: fenlei }
        this.url = jiekou
      }
      console.log(this.params)
      return new Promise((resolve) => {
        this.tableData = [{ id: '1', name: "李静", age: 24, height: 45 }, { id: '2', name: "小明", age: 34, height: 75 }, { id: '4', name: "小帐", age: 26, height: 64 }, { id: '5', name: "宋雅秀", age: 86, height: 34 }, { id: '7', name: "刘耀文", age: 24, height: 22 }, { id: '7', name: "独创性", age: 33, height: 244 }]
        setTimeout(() => {
          this.loading = false
        }, 1000)
        resolve(this.tableData)
      })
    },
    search() { //点击搜索时 
      this.init()
    },
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize
      this.init()
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.init()
    }
  }
}
</script>