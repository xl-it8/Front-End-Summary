import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import './router/permission'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import plugin from './plugin'

Vue.use(plugin);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
