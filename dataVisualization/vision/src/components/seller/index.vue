<template>
  <div class="com-container">
    <div class="chart" ref="sellerRef"></div>
  </div>
</template>

<script>
import { getSeller } from '@/api/data'
// import SellerCharts from '@/mixins/charts.vue'
export default {
  name: 'Seller',
  // mixins: [SellerCharts],
  data() {
    return {
      currentPage: 1,
      totalPage: '',
      allData: [],
      timer: null,
      myChart: null
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    window.removeEventListener('resize', this.screenUpdate)
  },
  mounted() {
    this.initChart()
    this.getChartData()
    // 处理自适应 根据不同尺寸大小实现
    window.addEventListener('resize', this.screenUpdate)
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.sellerRef, 'chalk') // 第二个参数可以自定义主题
      // 这里就是细节处理 进行数据的拆分处理 更方便维护 setOption是合并的过程
      const initOption = {
        title: {
          text: '| 商家销售统计',
          textStyle: {
            fontSize: 40
          },
          left: 30,
          top: 20
        },
        tooltip: { // 鼠标经过的时候的提示
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: { // 对于网格的布局
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true // 包含文字
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        series: [
          {
            barWidth: 66,
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              barBorderRadius: [0, 40, 40, 0], // 这里文档有点问题
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: 'red' // 0% 处的颜色
                }, {
                  offset: 1, color: 'blue' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            type: 'bar'
          }
        ]
      }
      this.myChart.setOption(initOption)
      this.myChart.on('mouseover', () => {
        clearInterval(this.timer)
      })
      this.myChart.on('mouseout', () => {
        this.setInterval()
      })
    },
    async getChartData() {
      const { data: res } = await getSeller()
      this.allData = res
      this.allData.sort((a, b) => a.value - b.value) // 从小到大的排序
      this.totalPage = this.allData.length % 5 === 0 ? this.allData.length / 5 : Math.ceil(this.allData.length / 5)
      this.updateData()
      this.setInterval()
    },
    updateData() {
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5 // 隐式转换
      const newData = this.allData.slice(start, end)
      const option = {
        yAxis: {
          data: newData.map((item) => item.name)
        },
        series: [
          {
            data: newData.map(item => item.value)
          }
        ]
      }
      this.myChart.setOption(option)
    },
    setInterval() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.currentPage++
        if (this.currentPage > (this.totalPage - 0)) {
          this.currentPage = 1
        }
        console.log(this.currentPage)
        this.updateData()
      }, 2000)
    },
    screenUpdate() {
      const titleWidth = this.$refs.sellerRef.offsetWidth / 100 * 3.75 // 相当于 rem 基于这个值进行变化
      const updateOption = {
        title: {
          textStyle: {
            fontSize: titleWidth
          }
        },
        series: [
          {
            barWidth: titleWidth,
            itemStyle: {
              barBorderRadius: [0, titleWidth / 2, titleWidth / 2, 0] // 这里文档有
            }
          }
        ]
      }
      this.myChart.setOption(updateOption) // 再次数据的合并
      this.myChart.resize() // 图标实现自适应
    }
  }
}
</script>

<style>
画布
150 / 100  == 2
屏幕
200 / 200 == 1.5



</style>
