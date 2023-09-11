import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/fonts/iconfont.css' 
import './styles/font.css'
import 'normalize.css'
import './styles/common.scss'
import plugin from './plugin'
const pinia = createPinia()

createApp(App).use(pinia).use(router).use(plugin).mount('#app')
