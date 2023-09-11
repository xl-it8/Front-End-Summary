<template>
  <view class="container">
    <view v-for="item in goodsList" :key="item.goods_id" @click="gotoDetail(item)">
      <myGoodsItem :item="item" />
    </view>
  </view>
  </view>
</template>

<script>
  import myGoodsItem from '../../components/my-goodsItem/my-goodsItem.vue'
  export default {
    data() {
      return {
        // 是否正在请求数据
        isloading: false,
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0
      };
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || '',
        this.getGoodsList()
    },

    onReachBottom() {
      //还要判断数据是否为空 为空提示没有数据
      console.log(this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
      if ((this.queryObj.pagenum * this.queryObj.pagesize) >= this.total) return uni.$showMsg('数据已经为空')
      //节流阀 就是保证一段时间事件触发的频率 
      if (this.isloading) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []

      // 2. 重新发起请求 关闭下拉刷新
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    components: {
      myGoodsItem
    },
    methods: {
      // ** 打开节流阀
      async getGoodsList(cb) {
        this.isloading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        console.log(this.goodsList)
      }, // 点击跳转到商品详情页面
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods_list {
    padding: 5px 5px;
    display: flex;
    // justify-content: space-between;
    // align-items: center;

    .goods_list_left {
      width: 100px;

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

      .price {
        color: red;
        font-size: 16px;
      }
    }

  }
</style>
