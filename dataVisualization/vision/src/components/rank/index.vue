<!-- eslint-disable no-unused-vars -->
<template>
  <div class="com-container">
    <div class="chart" ref="rankRef"></div>
  </div>
</template>

<script>
import { getRank } from '@/api/data'
export default {
  name: 'Rank',
  data() {
    return {
      allData: [],
      timer: null,
      myChart: null,
      startValue: 0,
      endValue: 9
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    window.removeEventListener('resize', this.screenUpdate)
  },
  mounted() {
    this.initChart() // 初始化图表
    this.getChartData() // 获取动态数据
    // 处理自适应 根据不同尺寸大小实现
    window.addEventListener('resize', this.screenUpdate)
    this.myChart.on('mouseover', () => {
      clearInterval(this.timer)
    })
    this.myChart.on('mouseout', () => {
      this.setInterval()
    })
  },
  methods: {
    async initChart() {
      this.myChart = this.$echarts.init(this.$refs.rankRef, 'chalk') // 第二个参数可以自定义主题
      const initOption = {
        title: {
          text: '| 销售地区分布',
          left: 10,
          top: 20
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category'
        },
        grid: {
          left: '5%',
          top: '40%',
          bottom: '5%',
          containLabel: true // 包含底部的内容
        },
        tooltip: {

        }
      }
      this.myChart.setOption(initOption)
    },
    async getChartData() {
      const { data: res } = await getRank()
      this.allData = res
      this.allData.sort((a, b) => {
        return b.value - a.value
      })
      this.updateData()
      this.setInterval()
    },
    updateData() {
      const colorArr = [
        ['#0BA82C', '#4FF778'],
        ['#2E72BF', '#23E5E5'],
        ['#5052EE', '#AB6EE5']
      ]
      let changeColor = null
      const ProvinceArr = this.allData.map(item => item.name)
      const seriesArr = this.allData.map(item => item.value)
      const option = {
        xAxis: {
          data: ProvinceArr
        },
        dataZoom: { // 可以做到动态滚动 水平方向移动
          type: 'slider',
          show: false,
          startValue: this.startValue,
          endValue: this.endValue
        },
        series: [
          {
            data: seriesArr,
            type: 'bar',
            itemStyle: { // 这块比较特殊 可以自定义渐变颜色 函数形式
              color: (arg) => {
                if (arg.value > 300) {
                  changeColor = colorArr[0]
                } else if (arg.value > 200) {
                  changeColor = colorArr[1]
                } else {
                  changeColor = colorArr[2]
                }

                // 返回一个渐变实例对象的颜色 this.$echarts.graphic.LinearGradient
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: changeColor[0]
                  },
                  {
                    offset: 1,
                    color: changeColor[1]
                  }
                ])
              }
            }
          }
        ]
      }
      this.myChart.setOption(option)
    },
    setInterval() {
      if (this.timer) { // 防抖
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0
          this.endValue = 9
        }
        this.updateData()
      }, 2000)
    },
    screenUpdate() {
      const titleWidth = this.$refs.rankRef.offsetWidth / 100 * 3.75 // 相当于 rem 基于这个值进行变化
      const updateOption = {
        title: {
          textStyle: {
            fontSize: titleWidth
          }
        },
        itemStyle: {
          borderWidth: titleWidth,
          barBorderRadius: [titleWidth / 2, titleWidth / 2, 0, 0]
        }
      }
      this.myChart.setOption(updateOption) // 再次数据的合并
      this.myChart.resize() // 图标实现自适应
    }
  }
}
</script>

<style>
</style>
