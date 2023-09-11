<script>
export default {
  data() {
    return {
      myChart: null,
      option: null
    }
  },
  methods: {
    initChart(dom) {
      this.myChart = this.$echarts.init(dom)
    },
    async getChartData(cb) {
      this.option = await cb()
      this.myChart.setOption(this.option)
    }
  }

}
</script>
