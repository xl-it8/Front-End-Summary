<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <swiper class="swiper-view" scroll-x="true" indicator-dots autoplay circular>
      <swiper-item class="swiper-item" v-for="item in swiperList " :key="item.goods_id">
        <navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <img :src="item.image_src" alt="">
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航区域 -->
    <view class="header-nav">
      <view class="header-nav-item" v-for="item in navList" :key="item.name">
        <img :src="item.image_src" alt="" @click="navClickHandler(item)">
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <navigator :url="item.product_list[0].navigator_url">
              <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
                mode="widthFix"></image>
            </navigator>

          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
              <navigator :url="item2.navigator_url">
                <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
              </navigator>

            </view>
          </view>
        </view>
      </view>
    </view>
    <button @click="open">获取小程序的账号信息</button>
    <button @click="login" open-type="getPhoneNumber">一键登录</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      login() {
        uni.login({
          provider: 'weixin', //使用微信登录
          success: function(loginRes) {
            console.log(loginRes.authResult);
          }
        });
      },
      open() {
        const info = uni.getAccountInfoSync()
        console.log(info)
      },
      async getSwiperList() {
        const {
          data
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (data.meta.status !== 200) return uni.$showMsg()
        this.swiperList = data.message
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
        console.log(res)
      },
      // 3. 定义获取楼层列表数据的方法
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        // 通过双层 forEach 循环，处理 URL 地址
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.navigator_url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top: 0;
    // 提高层级，防止被轮播图覆盖
    z-index: 999;
  }

  .swiper-view {
    width: 100%;
    height: 330rpx;

    .swiper-item {
      width: 100%;
      heigth: 100%;

      img {
        width: 100%;
        heigth: 100%;
      }
    }
  }

  .header-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 15px 0;

    .header-nav-item {
      img {
        width: 128rpx; //1rpx = 0.5px
        height: 140rpx;
      }
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
</style>
