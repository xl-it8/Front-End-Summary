<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="chart" ref="MapRef"></div>
  </div>
</template>

<script>
import { getProvinceMapInfo } from '@/utils/map_utils'
import { getMap } from '@/api/data'
import axios from 'axios' // 目的是为了获取本地的地图矢量数据 是在本地服务器上
export default {
  name: 'Map',
  // mixins: [SellerCharts],
  data() {
    return {
      currentPage: 1,
      totalPage: '',
      allData: [],
      timer: null,
      myChart: null,
      cacheData: {}
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
    async initChart() {
      this.myChart = this.$echarts.init(this.$refs.MapRef, 'chalk') // 第二个参数可以自定义主题
      this.myChart.on('click', async (arg) => {
        const provinceObj = getProvinceMapInfo(arg.name)
        if (!provinceObj.key) return
        // 获取某个城市的矢量数据
        if (!this.cacheData[provinceObj.key]) {
          const res = await axios.get('http://localhost:8081' + provinceObj.path)
          this.cacheData[provinceObj.key] = res.data
          this.$echarts.registerMap(provinceObj.key, res.data) // 注册一次即可
        }
        const initOption = {
          geo: {
            map: provinceObj.key // 注册地图的名字
          }
        }
        // 第四步设置数据
        this.myChart.setOption(initOption)
      })
      // 这里就是细节处理 进行数据的拆分处理 更方便维护 setOption是合并的过程
      // 第一步拿到地图矢量数据
      const res = await axios.get('http://localhost:8081/static/map/china.json')
      // 第二部注册地图
      this.$echarts.registerMap('china', res.data)
      // 第三步配置数据
      const initOption = {
        title: {
          text: '| 商家分布',
          left: 10,
          top: 20
        },
        legend: {
          left: 10,
          bottom: 20,
          orient: 'vertical' // 布局朝向
        },
        geo: {
          itemStyle: {
            areaColor: 'pink'
          },
          top: '5%',
          bottom: '5%',
          type: 'map', // 类型
          map: 'china' // 注册地图的名字
        }
      }
      // 第四步设置数据
      this.myChart.setOption(initOption)
    },
    async getChartData() {
      const { data: res } = await getMap()
      this.allData = res
      this.updateData()
    },
    updateData() {
      const legendArr = this.allData.map(item => item.name)
      const seriesArr = this.allData.map(item => {
        return {
          type: 'effectScatter',
          name: item.name,
          data: item.children,
          rippleEffect: { // 涟漪相关配置
            number: 5,
            brushType: 'stroke' // 空心 圆环
          },
          coordinateSystem: 'geo' // 这里要是没有地图就不会显示散点图
        }
      })
      const option = {
        legend: {
          data: legendArr
        },
        series: seriesArr
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
        this.updateData()
      }, 2000)
    },
    screenUpdate() {
      const titleWidth = this.$refs.MapRef.offsetWidth / 100 * 3.75 // 相当于 rem 基于这个值进行变化
      const updateOption = {
        title: {
          textStyle: {
            fontSize: titleWidth
          }
        },
        legend: {
          itemWidth: titleWidth,
          itemHeight: titleWidth,
          textStyle: {
            fontStyle: titleWidth / 2
          }
        }
      }
      this.myChart.setOption(updateOption) // 再次数据的合并
      this.myChart.resize() // 图标实现自适应
    },
    revertMap() {
      // 注册过一次就可以
      const option = {
        geo: {
          map: 'china' // 以及在初始化的时候做过配置
        }
      }
      this.myChart.setOption(option)
    }
  }
}
</script>

<style>
</style>
