// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import './utils/request.js'
import './utils/tip.js'
// 1. 导入 store 的实例对象
import store from './store/store.js'
import mySearch from './components/my-search/my-search'
Vue.component("mySearch", mySearch)
Vue.config.productionTip = false
// console.log(__wxConfig.envVersion) //获取当前的环境
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
