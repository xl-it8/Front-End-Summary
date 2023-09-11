<template>
  <view class="navTop">
    <view :style="{height:statusHeight + 'px'}">
    </view>
    <view class="navBar" :style="{paddingRight:pr + 'px', height:navBarHeight+'px'}">
      <view class="navBar-btn">
        <uni-icons type="search" size="20" class="uni-icons"></uni-icons>
        <view class="content">
          搜索
        </view>
      </view>
      <!--    <view class="placeHolder">
   
     </view> -->
    </view>
  </view>
</template>

<script>
  export default {
    name: "navBar",
    data() {
      return {
        statusHeight: '',
        pr: 40,
        navBarHeight: 45
      };
    },
    created() {
      const device = uni.getSystemInfoSync()
      this.statusHeight = device.statusBarHeight
      // #ifndef H5
      const deviceWidth = 375
      let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
      this.pr = deviceWidth - menuButtonInfo.left + 4
      this.navBarHeight = (menuButtonInfo.bottom - this.statusHeight) + (menuButtonInfo.top - this.statusHeight)
      console.log(menuButtonInfo)
      // #endif

    }
  }
</script>

<style lang="scss">
  .navTop {
    background-color: #E2566D;

    .navBar {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 20px;

      .navBar-btn {
        flex: 1;
        display: flex;
        height: 35px;
        justify-content: flex-start;
        align-items: center;
        background-color: #FFFFFF;
        border-radius: 40px;

        .uni-icons {
          padding: 0 10px;
        }
      }
    }
  }
</style>
