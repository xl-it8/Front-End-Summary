<template>
  <div class="screen-container">
    <header class="screen-header">
      <div>
        <!-- <img  alt="" /> -->
      </div>
      <span class="logo">
        <!-- <img :src="logoSrc" alt="" /> -->
      </span>
      <span class="title">电商平台实时监控系统</span>
      <div class="title-right">
        <!-- <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme" /> -->
        <span class="datetime">2049-01-01 00:00:00</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div
          id="left-top"
          :class="[fullScreenStatus.Trend ? 'fullscreen' : '']"
        >
          <!-- 销量趋势图表 -->
          <Trend ref="Trend"></Trend>
          <div class="resize">
            <span @click="changSize('Trend')">></span>
          </div>
        </div>
        <div
          id="left-bottom"
          :class="[fullScreenStatus.Seller ? 'fullscreen' : '']"
        >
          <!-- 商家销售金额图表 -->
          <Seller ref="Seller"></Seller>
          <div class="resize">
            <span @click="changSize('Seller')">></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div
          id="middle-top"
          :class="[fullScreenStatus.Map ? 'fullscreen' : '']"
        >
          <!-- 商家分布图表 -->
          <Map ref="Map"></Map>
          <div class="resize">
            <span @click="changSize('Map')">></span>
          </div>
        </div>
        <div
          id="middle-bottom"
          :class="[fullScreenStatus.Rank ? 'fullscreen' : '']"
        >
          <!-- 地区销量排行图表 -->
          <Rank ref="Rank"></Rank>
          <div class="resize">
            <span @click="changSize('Rank')">></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.Hot ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <Hot ref="Hot"></Hot>
          <div class="resize">
            <span @click="changSize('Hot')">></span>
          </div>
        </div>
        <div
          id="right-bottom"
          :class="[fullScreenStatus.Stock ? 'fullscreen' : '']"
        >
          <!-- 库存销量分析图表 -->
          <Stock ref="Stock"></Stock>
          <div class="resize">
            <span @click="changSize('Stock')">></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Hot from '@/components/hot'
import Map from '@/components/map'
import Rank from '@/components/rank'
import Seller from '@/components/seller'
import Trend from '@/components/trend'
import Stock from '@/components/stock'
export default {
  data() {
    return {
      fullScreenStatus: {
        Hot: false,
        Map: false,
        Rank: false,
        Seller: false,
        Stock: false,
        Trend: false
      }
    }
  },
  created() {
    this.$socket.registerCallback('fullScreen', this.reciData)
  },
  methods: {
    reciData(data) {
      // const str = data.chartAt(0).lowerCaseUpper()
      // console.log(str)
      this.fullScreenStatus[data.chartName] = data.value
      this.$nextTick(() => {
        this.$refs[data.chartName].screenUpdate()
      })
    },
    changSize(chartName) {
      const status = !this.fullScreenStatus[chartName]
      this.$socket.send({
        action: 'fullScreen',
        socketType: 'fullScreen',
        chartName: chartName,
        value: status
      })
      // this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
      // this.$nextTick(() => {
      //   this.$refs[chartName].screenUpdate()
      // })
    }
  },
  components: {
    Hot,
    Map,
    Rank,
    Seller,
    Stock,
    Trend
  }
}
</script>
<style lang="less" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important; //
  height: 100% !important; //
  margin: 0 !important;
  z-index: 100;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
