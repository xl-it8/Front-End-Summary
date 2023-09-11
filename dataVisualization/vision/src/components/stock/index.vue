<template>
  <div class="com-container">
    <div class="chart" ref="stockRef"></div>
  </div>
</template>

<script>
import { getStock } from '@/api/data'
// import SellerCharts from '@/mixins/charts.vue'
export default {
  name: 'Stock',
  // mixins: [SellerCharts],
  data() {
    return {
      currentPage: 0,
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
    this.screenUpdate()
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.stockRef, 'chalk') // 第二个参数可以自定义主题
      // 这里就是细节处理 进行数据的拆分处理 更方便维护 setOption是合并的过程
      const initOption = {
        title: {
          text: '▎库存和销量分析',
          left: 20,
          top: 20
        }
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
      const { data: res } = await getStock()
      this.allData = res
      this.updateData()
      this.setInterval()
    },
    updateData() {
      const centerArr = [
        ['18%', '40%'],
        ['50%', '40%'],
        ['82%', '40%'],
        ['34%', '75%'],
        ['66%', '75%']
      ]
      const colorArr = [
        ['#4FF778', '#0BA82C'],
        ['#E5DD45', '#E8B11C'],
        ['#E8821C', '#E55445'],
        ['#5052EE', '#AB6EE5'],
        ['#23E5E5', '#2E72BF']
      ]
      const start = this.currentPage * 5
      const end = (this.currentPage + 1) * 5
      const dataArr = this.allData.slice(start, end)
      const newArr = dataArr.map((item, index) => {
        return {
          animation: false,
          type: 'pie',
          center: [centerArr[index][0], centerArr[index][1]],
          label: {
            show: true,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: [ // 有几段就有几个对象
            {
              value: item.sales,
              name: item.name + '\n' + item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0]
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1]
                  }
                ])
              }
            },
            {
              value: item.stock,
              itemStyle: {
                color: '#333843'
              }
            }
          ]
        }
      })
      const option = {
        series: newArr
      }
      this.myChart.setOption(option)
    },
    setInterval() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.currentPage++
        if (this.currentPage > 1) {
          this.currentPage = 0
        }
        this.updateData()
      }, 2000)
    },
    screenUpdate() {
      const titleWidth = this.$refs.stockRef.offsetWidth / 100 * 3.75 // 相当于 rem 基于这个值进行变化
      const outterRadius = titleWidth * 2
      const innerRadius = titleWidth * 1.125
      const updateOption = {
        title: {
          textStyle: {
            fontSize: titleWidth
          }
        },
        series: [
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleWidth / 2
            }
          },
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleWidth / 2
            }
          },
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleWidth / 2
            }
          },
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleWidth / 2
            }
          },
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleWidth / 2
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
</style>
