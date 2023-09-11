<template>
  <div class="com-container">
    <div class="chart" ref="threeIndustryRef"></div>
  </div>
</template>

<script>
export default {
  name: 'threeIndustryRef',
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
      this.myChart = this.$echarts.init(this.$refs.threeIndustryRef, 'chalk')
      const initOption = {
        color: ['rgba(76,46,188)', 'rgb(242,237,188)'], // 控制图例的颜色
        title: {
          text: '一般公共预算收入增速',
          left: '45%',
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
        legend: {
          left: '50%',
          top: 40
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
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            max: 20, // 最大值
            min: -30, // 最小值
            interval: 10, //
            splitLine: {
              show: true, // 显示网格线
              lineStyle: {
                color: 'yellow'
              }
            },
            axisLabel: {
              formatter: '{value} %'
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
              color: 'rgba(76,46,188)'
            },
            areaStyle: {
              opacity: 0.9,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(76,46,188)'
                },
                {
                  offset: 1,
                  color: 'rgb(234,252,255)'
                }
              ])
            }
          },
          {
            name: '温州',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            showSymbol: true,
            symbolSize: 6, // 设置折线标记的大小
            lineStyle: {
              color: 'rgb(242,237,188)'
            },
            areaStyle: {
              opacity: 0.5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(242,237,188)'
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
            data: [-11, 22, 10, -2, 9, 3, -2, -3, 3, 4, 2]
          },
          {
            data: [-10, 22, 11, 24, -20, 20, -10, 20, 5, 6, 3]
          }
        ]
      }
      this.myChart.setOption(option)
    },
    screenUpdate() {
      // 实现适配
      // const sizeRem = this.$refs.threeIndustryRef.offsetWidth / 100 * 3.75
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
