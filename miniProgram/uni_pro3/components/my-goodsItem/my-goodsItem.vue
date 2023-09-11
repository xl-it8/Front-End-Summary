<template>
  <view class="goods_list">
    <view class="goods_list_left">
      <radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="changeStatus"></radio>
      <image :src="item.goods_small_logo" mode="widthFix"></image>
    </view>
    <view class="goods_list_right">
      <view class="content">
        {{item.goods_name}}
      </view>
      <view class="price_box">
        <view class="price">
          ￥ {{item.goods_price}}
        </view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" :value="item.goods_count" @change="numChangeHandler" v-if="showNum"></uni-number-box>

      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
        default: false,
      },
      // 是否展示价格右侧的 NumberBox 组件
      showNum: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {}
    },
    methods: {
      changeStatus() {
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id: this.item.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.item.goods_state
        })
      },
      // NumberBox 组件的 change 事件处理函数
      numChangeHandler(val) {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
        this.$emit('num-change', {
          // 商品的 Id
          goods_id: this.item.goods_id,
          // 商品的最新数量
          goods_count: +val //转为数字型
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods_list {
    padding: 5px 5px;
    display: flex;
    // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    // justify-content: space-between;
    // align-items: center;

    .goods_list_left {
      width: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      image {
        width: 100px;
        display: block;
        background-color: red;
      }
    }

    .goods_list_right {
      margin-left: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .content {
        font-size: 14px;
      }

      .price_box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        color: red;
        font-size: 16px;
      }
    }

  }
</style>
