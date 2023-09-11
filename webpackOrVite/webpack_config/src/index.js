// import { add } from './js/add.js' //浏览器不支持import模块的方式 模快化
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// import { insertImg } from './js/insertImg';
import './css/index.css'
import './title.js'
import Vue from 'vue'
import App from './app.vue'
// const element = document.createElement('div')
// element.textContent = '你好'
// element.classList.add('hello');
// document.body.appendChild(element)
// document.body.appendChild(insertImg())
// const a = '34567'
// console.log(a)
if (module.hot) {
    module.hot.accept(['./title.js'], () => {
        console.log('hmr开启')
    })
}

// new Promise((resolve) => {
//     resolve(2)
// }).then((res) => {
//     console.log(res)
// })

console.log('q')
new Vue({
    render: h => h(App)
}).$mount('#app')
// console.log(add(2,3))
