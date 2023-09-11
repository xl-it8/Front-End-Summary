import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'
import './styles/common.scss'
import 'lib-flexible'
import 'vant/lib/index.css'
import '@/assets/fonts/iconfont.css'
import dayjs from 'dayjs'
import { Swipe, SwipeItem } from 'vant'
const app = createApp(App)

app.directive('time', {
  updated (el, binding) {
    el.innerHTML = dayjs(binding.value).format('YYYY-MM-DD')
  }
})
// 3. 注册你需要的组件
app.use(Swipe)
app.use(SwipeItem)
app.use(router).mount('#app')
