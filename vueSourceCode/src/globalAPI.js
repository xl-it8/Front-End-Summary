import { mergeOptions } from './utils'

export function globalAPI(Vue) {
    Vue.options = {
        _base:Vue //方便在判断组件Ctor类型的时候获取vm.$options的选项
    }
    Vue.mixin = function (mixin) {   //Vue.mixin(shop) 全局注册混入对象
        // console.log(this)  指向Vue
        this.options = mergeOptions(this.options, mixin) //全局的选项总和起来
        return this //返回实例
    }


    //可以手动创造组件进行挂载
    Vue.extend = function (options) {
        //就是实现根据用户的参数 返回一个构造函数而已
        function Sub(options = {}) { //最终使用一个组件 就说new一个实例 options局部的 作用域
            this._init(options)//就是默认的对子类进行初始化操作 this指向sub实例对象
        }
        Sub.prototype = Object.create(Vue.prototype) //继承Vue原型对象
        Sub.prototype.constructor = Sub //原型对象的Constructor改回来
        Sub.options = mergeOptions(Vue.options,options) //保存用户传递的选项 //这个是全局对象和extend里面传入对象合并
        return Sub
    }
    Vue.options.components = {} //全局指令 Vue.options.directives
    Vue.component = function (id, definition) {
        //如果definition已经是一个函数 说明用户自己调用了Vue.extend
        definition = typeof definition === 'function' ? definition : Vue.extend(definition)
        Vue.options.components[id] = definition
    }

}