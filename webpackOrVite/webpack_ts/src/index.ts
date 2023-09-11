import Vue from 'vue'
import App from './views/Hpage'
import './style/index.css'

// new Promise((resolve)=>{

// })
// Vue.prototype.$translate = function (n) {
//   console.log(n)
// }
const vm = new Vue({
  el: '#app',
  render: (h) => h(App),
})
// vm.$translate
console.log(vm) // 将会顺利编译通过
