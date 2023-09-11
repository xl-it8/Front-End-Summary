import { initMixin } from './init'
import { initLifeCycle } from './lifecyle'
import { globalAPI } from './globalAPI'
import Watcher, { nextTick } from './observe/watcher'
//构造函数的this指向实例对象
function Vue(options) {
    //new Vue时初始化数据
    this._init(options) //挂到Vue原型对象上
}
Vue.prototype.$nextTick = nextTick
Vue.prototype.$watch = function (expOrFn, cb, options = {}) {
    //创建watcher 用user进行标识
    new Watcher(this, expOrFn, { user: true }, cb)
}

initMixin(Vue) //把Vue传过去
initLifeCycle(Vue) //把Vue传过去
globalAPI(Vue)
export default Vue //暴露出一个Vue构造函数



//总结 vue核心
// 1 创造响应式数据
// 2 模板转化成ast语法树
// 3 将ast语法树转化为render函数
// 4 后续每次数据更新只需要执行render函数(无需再次执行ast转化的过程)
