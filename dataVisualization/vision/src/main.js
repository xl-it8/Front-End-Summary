import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/common.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import WebSocketService from './utils/websocket_service'
// WebSocketService.getInstance().connect() // 创建连接
Vue.config.productionTip = false
Vue.prototype.$echarts = window.echarts
// 把websocket服务器挂载到原型对象上vue 方便调用
Vue.prototype.$socket = WebSocketService.instance // 实例
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
