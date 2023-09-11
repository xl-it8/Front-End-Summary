<template>
  <view class="cart-container">
    <myAddress />
    <view class="cartTitle">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <view class="cart-title-text">购物车</view>
    </view>
    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler($event,goods)">
          <myGoodsItem :item="goods" :show-radio="true" @radio-change="handleChange" :show-num="true"
            @num-change="numberChangeHandler"></myGoodsItem>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <mySettle />
  </view>
</template>

<script>
  import mySettle from '../../components/my-settle/my-settle.vue'
  import myAddress from '../../components/my_adress/my_adress.vue'
  import myGoodsItem from '../../components/my-goodsItem/my-goodsItem.vue'
  import tabbarBrage from '../../mixins/tabbar_brage.js'
  // 按需导入 mapState 这个辅助函数
  import {
    mapState,
    mapMutations,
  } from 'vuex'
  export default {
    mixins: [tabbarBrage],
    components: {
      myGoodsItem,
      myAddress,
      mySettle
    },
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      }
    },
    methods: {
      ...mapMutations('m_cart', ['changeSeleStatus', 'updateGoodsCount', 'deleteGoodsItem']),
      handleChange(e) {
        this.changeSeleStatus(e)
      },
      // 商品的数量发生了变化
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(e, goods) {
        this.deleteGoodsItem(goods)
      },

    }
  }
</script>

<style lang="scss">
  .cartTitle {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .cart-container {
    .cart-container {
      padding-bottom: 50px;
    }
  }
</style>
