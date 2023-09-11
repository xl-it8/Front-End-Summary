<template>
  <div class="com-container">
    <div class="chart" ref="businessEnvRef"></div>
  </div>
</template>

<script>
export default {
  name: 'businessEnv',
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
      this.myChart = this.$echarts.init(this.$refs.businessEnvRef, 'chalk')
      const initOption = {
        title: {
          text: '信用指数排名',
          left: '50%',
          top: 10,
          textStyle: {
            color: 'rgb(139,236,255)',
            fontSize: 24
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            splitLine: {
              show: true, // 显示网格线
              lineStyle: {
                color: 'yellow'
              }
            },
            axisLabel: { // 这里的设置是保证隔代标签显示
              interval: 1
            },
            axisLine: { onZero: false },
            position: 'bottom'
          }
        ],
        yAxis: [
          {
            type: 'value',
            max: 60, // 最大值
            min: 0, // 最小值
            inverse: true,
            interval: 15, //
            splitLine: {
              show: true, // 显示网格线
              lineStyle: {
                color: 'yellow'
              }
            }
          }
        ],
        series: [
          {
            name: '浙江',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            showSymbol: true,
            symbolSize: 6,
            lineStyle: {
              color: 'rgba(255,165,62)'
            },
            areaStyle: {
              opacity: 0.9,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255,165,62)'
                },
                {
                  offset: 1,
                  color: 'rgb(234,252,255)'
                }
              ])
            }
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
      const option = {
        xAxis: [
          {
            data: ['2021年1月', '2月', '2月', '2月', '2月', '2月', '2月', '2月', '2月', '2月', '2月']
          }
        ],
        series: [
          {
            data: [11, 22, 10, 2, 9, 3, 2, 3, 3, 4, 2]
          }
        ]
      }
      this.myChart.setOption(option)
    },
    screenUpdate() {
      // 实现适配
      // const sizeRem = this.$refs.businessEnvRef.offsetWidth / 100 * 3.75
      const updateOption = {
      }
      this.myChart.setOption(updateOption)
      this.myChart.resize() // 适配处理
    }
  }

}
</script>

<style lang="less" scoped>
</style>
