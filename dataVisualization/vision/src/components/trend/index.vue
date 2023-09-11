<template>
  <div class="com-container">
    <el-select v-model="selectValue" @change="change">
      <el-option
        v-for="item in option"
        :key="item.value"
        :label="item.text"
        :value="item.key"
      >
      </el-option>
    </el-select>
    <div class="chart" ref="trendRef"></div>
  </div>
</template>

<script>
// import { getTrend } from '@/api/data'
// import SellerCharts from '@/mixins/charts.vue'
export default {
  name: 'Trend',
  // mixins: [SellerCharts],
  data() {
    return {
      timer: null,
      allData: [],
      selectValue: 'map',
      option: []
    }
  },
  created() {
    // 注册回调函数
    this.$socket.registerCallback('trendData', this.getChartData)
  },
  beforeDestroy() {
    this.$socket.unRegisterCallback('trendData')
    clearInterval(this.timer)
    window.removeEventListener('resize', this.screenUpdate)
  },
  mounted() {
    this.initChart()
    // this.getChartData()
    // 发送数据与 服务端进行连接
    this.$socket.send({
      action: 'getData',
      socketType: 'trendData',
      chartName: 'trend', // 根据这个获取数据并返回数据
      value: ''
    })
    // 处理自适应 根据不同尺寸大小实现
    window.addEventListener('resize', this.screenUpdate)
  },
  methods: {
    change(value) {
      this.selectValue = value
      this.updateData()
    },
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.trendRef, 'chalk') // 第二个参数可以自定义主题
      // 这里就是细节处理 进行数据的拆分处理 更方便维护 setOption是合并的过程
      const initOption = {
        legend: {
          left: 10,
          top: 80,
          icon: 'circle' // 设置图例项的图标
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '28%',
          left: '6%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
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
    async getChartData(res) {
      // const res = await getTrend() //不用axios 改为 websocket
      console.log(res)
      this.allData = res
      this.option = res.type
      this.updateData()
      // this.setInterval()
    },
    updateData() {
      const numberArr = this.allData.common.month
      const trendArr = this.allData[this.selectValue].data.map(item => {
        return {
          name: item.name,
          type: 'line',
          stack: 'map',
          data: item.data
        }
      })
      const legendArr = this.allData[this.selectValue].data.map(item => item.name)
      const option = {
        xAxis: {
          data: numberArr
        },
        series: trendArr,
        legend: {
          data: legendArr
        }
      }
      this.myChart.setOption(option)
    },
    setInterval() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.updateData()
      }, 2000)
    },
    screenUpdate() {
      const titleWidth = this.$refs.trendRef.offsetWidth / 100 * 3.75 // 相当于 rem 基于这个值进行变化
      const updateOption = {
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
    }
  }
}
</script>

<style lang="less">
.el-select {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 100;
  .el-input__inner {
    background: transparent;
  }
}
</style>
