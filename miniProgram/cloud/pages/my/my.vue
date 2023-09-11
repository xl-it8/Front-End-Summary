<template>
  <view class="my">
    <view class="top">
      <h3>tiantuan</h3>
      <view class="box">
        <view class="box-1" v-for="item in 3" :key="item">
          <view>
            关注
          </view>
          <view>
            2
          </view>
        </view>
      </view>
    </view>
    <view class="myArticle">
      文档温州
    </view>
    <view class="advice">
      文档温州
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      confirm() {

      }
    }
  }
</script>

<style lang="scss">
  .my {

    .myArticle {
      height: 40px;
      background-color: #fff;
    }

    .advice {
      height: 40px;
      background-color: #fff;
    }

    .top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      // align-items: center;
      height: 200px;
      background: url('@/static/my.png') 0 0 no-repeat;


      h3 {
        text-align: center;
        margin-bottom: 10px;
      }

      .box {
        display: flex;
        justify-content: space-around;

        .box-1 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
