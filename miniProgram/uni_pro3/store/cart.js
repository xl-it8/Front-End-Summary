export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),

  // 模块的 mutations 方法
  mutations: {
    // 将购物车中的数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    deleteGoodsItem(state, goods) {
      state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id)
      this.commit('m_cart/saveToStorage')
    },
    // 更新购物车中商品的数量
    updateGoodsCount(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        // 更新对应商品的数量
        findResult.goods_count = goods.goods_count
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    changeSeleStatus(state, goodsItem) {
      state.cart.forEach(item => {
        if (item.goods_id === goodsItem.goods_id) {
          item.goods_state = goodsItem.goods_state
        }
      })
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    addToCart(state, goods_info) {
      const findResult = state.cart.find(item => item.goods_id === goods_info.goods_id) //没找到就是undefinded
      if (!findResult) {
        state.cart.push(goods_info)
      } else {

        findResult.goods_count++ //如果已经存在就增加商品的数量
      }
      this.commit('m_cart/saveToStorage')
    },
    changeAllStatus(state, status) {
      state.cart.forEach(item => {
        item.goods_state = status
      })
      this.commit('m_cart/saveToStorage')
    }
  },

  // 模块的 getters 属性
  getters: {
    totalPrice(state) {
      return state.cart.filter(x => x.goods_state)
        .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
        .toFixed(2)
    },
    allStatus(state) {
      return state.cart.every(item => item.goods_state === true)
    },
    total(state) {
      if (state.cart.length === 0) {
        return 0
      } else {
        return state.cart.reduce((p, c) => {
          return p + c.goods_count
        }, 0)
      }
    }
  },
}
