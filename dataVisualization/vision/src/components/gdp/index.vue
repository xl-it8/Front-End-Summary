<template>
  <div class="com-container">
    <div class="chart" ref="gdpRef"></div>
    <div class="chart" ref="gsgyRef"></div>
  </div>
</template>

<script>
export default {
  name: 'Gdp',
  data() {
    return {
      myChart: null,
      myChart2: null
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
      this.myChart2 = this.$echarts.init(this.$refs.gsgyRef, 'chalk')
      const initOption = {
        color: ['rgba(240,50,58)', 'rgb(3,173,194)'], // 控制图例的颜色
        title: {
          text: 'GDP增速',
          left: '50%',
          top: 10,
          textStyle: {
            color: 'rgb(3,173,194)',
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
          left: '49%',
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
            max: 25, // 最大值
            min: 0, // 最小值
            interval: 5, //
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
              color: 'rgba(240,50,58)'
            },
            areaStyle: {
              opacity: 0
            },
            data: [11, 22, 10, 2, 9, 3, 2, 3]
          },
          {
            name: '温州',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            showSymbol: true,
            symbolSize: 6, // 设置折线标记的大小
            lineStyle: {
              color: 'rgb(3,173,194)'
            },
            areaStyle: {
              opacity: 0.5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(3,173,194)'
                },
                {
                  offset: 1,
                  color: 'rgb(234,252,255)'
                }
              ])
            },
            data: [10, 22, 11, 24, 20, 20, 10, 20]
          }
        ]
      }
      const initOption2 = {
        title: {
          text: '规上工业增速',
          left: '50%',
          top: 10,
          textStyle: {
            color: 'rgb(3,173,194)',
            fontSize: 24
          }
        },
        xAxis: {
          type: 'category',
          data: ['杭州市', '宁波市', '北京市', '天津市'],
          axisLabel: {
            interval: 0,
            formatter: function (value) {
              return value.split('').join('\n') // 实现标签文字垂直排布
            }
          },
          splitLine: {
            show: true, // 显示网格线
            interval: 0,
            lineStyle: {
              color: 'yellow'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          boundaryGap: true
        },
        yAxis: [
          {
            type: 'value',
            max: 10, // 最大值
            min: 0, // 最小值
            interval: 2, //
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        series: [
          {
            data: [1, 2, 7, 8],
            type: 'bar',
            itemStyle: {
              color: 'rgba(255,116,100)'
            },
            barWidth: 24
          }
        ]
      }
      this.myChart.setOption(initOption)
      this.myChart2.setOption(initOption2)
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
            data: ['2020前三季度', '2021第一季度', '2021前三季度', '2022第一季度', '2021第一季度', '2021前三季度', '2022第一季度']
          }
        ],
        series: [
          {
            data: [11, 22, 10, 2, 9, 3, 2, 3]
          },
          {
            data: [10, 22, 11, 24, 20, 20, 10, 20]
          }
        ]
      }
      const option2 = {
      }
      this.myChart.setOption(option)
      this.myChart2.setOption(option2)
    },
    screenUpdate() {
      // 实现适配
      // const sizeRem = this.$refs.gdpRef.offsetWidth / 100 * 3.75
      const updateOption = {
      }
      const updateOption2 = {

      }
      this.myChart.setOption(updateOption)
      this.myChart2.setOption(updateOption2)
      this.myChart.resize() // 适配处理
      this.myChart2.resize() // 适配处理
    }
  }

}
</script>

<style lang="less" scoped>
.com-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>
