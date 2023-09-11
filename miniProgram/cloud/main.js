import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import http from './common/http/index.js'
import store from './store/index.js'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$http = http
const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
