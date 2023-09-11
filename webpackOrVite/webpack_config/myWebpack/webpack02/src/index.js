import './style/index.css' //处理css
import './style/hello.less' //处理less
import name from './package2.json' //处理package.json
console.log(name)

// import('./title').then((res) => {
//   console.log(res)
// })

//处理图片 用asset/resources处理
import img from './img/logo.png'
const imgs = new Image()
imgs.src = img
document.getElementById('app').appendChild(imgs)

//处理js 高级语法es6
//1.箭头函数 prset-env预设可以处理
const sum = (a, b) => a + b
console.log(sum(2, 4))

//2. promise
new Promise((resolve) => {
  resolve(2)
}).then((res) => console.log(res))

//3. 装饰器
// function namexx(target, key, descriptor) {
//   descriptor.writable = false
// }
// class Dec {
//   @namexx
//   name2 = 'lj'
// }
// const d = new Dec()
// d.name2 = 'ss'

console.log(process.env.NODE_ENV) //模拟nodeprocess进程的浏览器process webpack中mode配置

import _ from 'lodash'
console.log(_.add(2, 3))

//错误的source-map 映射
// console.log(a)

console.log($('#app'))

//definePlugin
console.log(VERSION)
