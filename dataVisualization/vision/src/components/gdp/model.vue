<template>
  <div class="com-container">
    <div class="chart" ref="gdpRef"></div>
  </div>
</template>

<script>
export default {
  name: 'Gdp',
  data() {
    return {
      myChart: null
    }
  },
  mounted() {
    this.initChart()
    this.getChartData()
    window.addEventListener('resize', this.screenUpdate)
  },
  beforeDestroy() {

  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.gdpRef, 'chalk')
      const initOption = {}
      this.myChart.setOption(initOption)
    },
    getChartData() {
      // 发起ajax请求
      this.updateData()
    },
    updateData() {
      // 对数据的处理
      const option = {}
      this.myChart.setOption(option)
    },
    screenUpdate() {
      // 实现适配
      // const sizeRem = this.$refs.gdpRef.offsetWidth / 100 * 3.75
      const updateOption = {

      }
      this.myChart.setOption(updateOption)
      this.myChart.resize() // 适配处理
    }
  }

}
</script>

<style>
</style>
