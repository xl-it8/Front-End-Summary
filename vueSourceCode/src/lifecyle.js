import Watcher from './observe/watcher'
import { createElementVNode, createTextVNode } from './vnode/index'
//虚拟dom 和真实dom 区别就是虚拟dom上面挂载的属性比真实的少 真实的有很多 比如 getElementById 等等
import { patch } from './vnode/patch'




export function initLifeCycle(Vue) {
    Vue.prototype._update = function (vnode) { //负责转为真实dom
        const vm = this
        const el = vm.$el
        //patch函数具有初始化功能也有 更新功能
        const prevVnode = vm._vnode
        vm._vnode = vnode //把组件第一次产生的虚拟节点保存到_vnode上
        if (prevVnode) { //之前渲染过了
            vm.$el = patch(prevVnode, vnode) //diff算法比较
        } else {
            vm.$el = patch(el, vnode)  //如果是组件 el为null
        }
        // vm.$el = patch(el, vnode)
    }

    Vue.prototype._c = function () { //处理render 
        return createElementVNode(this, ...arguments)
    }
    Vue.prototype._v = function () { //处理的是儿子部分 就是文本
        return createTextVNode(this, ...arguments)
    }
    Vue.prototype._s = function (value) { //负责把变量转为字符串
        if (typeof value !== 'object') return value
        return JSON.stringify(value)
    }
    Vue.prototype._render = function () { //负责转为虚拟dom
        return this.$options.render.call(this); //通过ast语法转为虚拟dom
    }
}
export function mountComponent(vm, el) {
    vm.$el = el  //这里的el是处理过的 就是真实的id=app 的dom
    //调用render方法产生虚拟节点，虚拟dom
    const updateComponent = () => {
        vm._update(vm._render()) //始终操作的是虚拟dom  不是去操作页面的真实dom 大大提高效率问题(不需要一直匹配正则)
    }
    new Watcher(vm, updateComponent) //观察者模式 （初始化的时候会更新页面）
}

export function callHook(vm, hook) { //调用生命周期钩子函数
    const handlers = vm.$options[hook]
    if (handlers) {
        handlers.forEach(handler => handler.call(vm)) //调用钩子并且修改this指向
    }

}