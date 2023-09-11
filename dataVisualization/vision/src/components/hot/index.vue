<template>
  <div class="com-container">
    <div class="chart" ref="HotRef"></div>
    <span class="icon-left" @click="leftClick" :style="fontSt"><</span>
    <span class="icon-right" @click="rightClick" :style="fontSt">></span>
    <span class="title" :style="fontSt">{{ titleName }}</span>
  </div>
</template>

<script>
import { getHot } from '@/api/data'
export default {
  name: 'Hot',
  // mixins: [SellerCharts],
  data() {
    return {
      allData: [],
      timer: null,
      myChart: null,
      currentIndex: 0,
      titleWidth: undefined
    }
  },
  computed: {
    titleName() {
      return this.allData[this.currentIndex]?.name
    },
    fontSt() {
      return {
        fontSize: this.titleWidth + 'px'// 注意单位
      }
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
    async initChart() {
      this.myChart = this.$echarts.init(this.$refs.HotRef, 'chalk') // 第二个参数可以自定义主题
      const initOption = {
        legend: {
          icon: 'circle'
        },
        title: {
          text: '| 商家发布',
          left: '5',
          top: '10%'
        },
        tooltip: {
          trigger: 'item',
          formatter: (arg) => { // 自定义饼图的提示信息
            const data = arg.data.children
            const total = data.reduce((p, c) => {
              return p + c.value
            }, 0)
            let str = ''
            data.forEach(item => {
              str += `${item.name}:${parseInt(item.value / total * 100)}% </br>
              `
            })
            return str
          }
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            }
          }
        ]
      }
      // 第四步设置数据
      this.myChart.setOption(initOption)
    },
    async getChartData() {
      const { data: res } = await getHot()
      this.allData = res
      this.updateData()
    },
    updateData() {
      const seriesArr = this.allData[this.currentIndex].children.map(item => {
        return {
          value: item.value,
          name: item.name,
          children: item.children
        }
      })
      const legendArr = this.allData[this.currentIndex].children.map(item => item.name)

      const option = {
        legend: {
          data: legendArr
        },
        series: [
          {
            type: 'pie',
            data: seriesArr
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
        // this.currentPage++
        // if (this.currentPage > (this.totalPage - 0)) {
        //   this.currentPage = 1
        // }
        // this.updateData()
      }, 2000)
    },
    screenUpdate() {
      this.titleWidth = this.$refs.HotRef.offsetWidth / 100 * 3// 相当于 rem 基于这个值进行变化
      const updateOption = {
        title: {
          textStyle: {
            fontSize: this.titleWidth
          }
        },
        legend: {
          textStyle: {
            fontSize: this.titleWidth
          },
          itemGap: this.titleWidth,
          itemWidth: this.titleWidth,
          itemHeight: this.titleWidth
        },
        series: [
          {
            radius: this.titleWidth * 4
          }
        ]

      }
      this.myChart.setOption(updateOption) // 再次数据的合并
      this.myChart.resize() // 图标实现自适应
    },
    leftClick() {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1
      }
      this.updateData()
    },
    rightClick() {
      this.currentIndex++
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0
      }
      this.updateData()
    }
  }
}
</script>

<style>
.icon-left {
  color: white;
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.icon-right {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.title {
  position: absolute;
  right: 20%;
  bottom: 20%;
  color: white;
}
</style>
