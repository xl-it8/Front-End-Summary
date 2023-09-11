<template>
  <div class="com-container">
    <div class="chart" ref="financialRunRef"></div>
  </div>
</template>

<script>
export default {
  name: 'FinancialRun',
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
      this.myChart = this.$echarts.init(this.$refs.financialRunRef, 'chalk')
      const initOption = {
        series: [
          {
            name: 'pie1',
            type: 'pie',
            radius: ['20%', '30%'],
            center: ['50%', '25%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              fontSize: 25
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: 'rgba(246,109,73)'
            },
            data: [
              { value: 57, name: '新三板'}
            ]
          },
          {
            name: 'pie2',
            type: 'pie',
            radius: ['20%', '30%'],
            center: ['35%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              fontSize: 25
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: 'rgba(0,156,229)'
            },
            data: [
              { value: 57, name: '27'}
            ]
          },
          {
            name: 'pie3',
            type: 'pie',
            radius: ['20%', '30%'],
            center: ['65%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              fontSize: 25
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: 'rgba(254,207,144)'
            },
            data: [
              { value: 57, name: '44'}
            ]
          }
        ]

      }
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
      // const sizeRem = this.$refs.financialRunRef.offsetWidth / 100 * 3.75
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
