// 按需导入 mapGetters 这个辅助方法
import {
  mapGetters
} from 'vuex'
export default {
  computed: { //vuex跨组件使用
    // 将 m_cart 模块中的 total 映射为当前页面的计算属性
    ...mapGetters('m_cart', ['total']),
  },
  watch: {
    total: {
      handler() {
        this.setBadge()
      },
      immediate: true
    }
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({
        index: 2, // 索引
        text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
      })
    }
  }
}
