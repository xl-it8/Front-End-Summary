import observe from './observe/index'
import Watcher from './observe/watcher'
import Dep from './observe/dep'
export function initState(vm) {
    const opts = vm.$options
    //对data处理
    if (opts.data) {
        initData(vm)
    }
    //对计算属性处理
    if (opts.computed) {
        initComputed(vm)
    }
    //对监听属性处理
    if (opts.watch) {
        initWatch(vm)
    }
}
function proxy(vm, target, key) {
    Object.defineProperty(vm, key, { //这个目的是在vm添加_data的属性 方便直接用vm.获取
        get() {
            return vm[target][key]
        },
        set(newVal) {
            vm[target][key] = newVal
        }
    })
}
function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data //判断是否是函数 函数的话修改this指向为vm
    // console.log(this) .js 文件采用严格模式 this指向undefined
    vm._data = data
    observe(data) //对对象进行劫持
    for (var key in data) { //做代理
        proxy(vm, '_data', key)
    }
}

function initComputed(vm) {
    const computed = vm.$options.computed
    const watchers = vm._computedWatchers = {} //把watcher添加到vm上
    for (let key in computed) {
        let userDef = computed[key]
        const fn = typeof userDef === 'function' ? userDef : userDef.get
        //创建计算属性的渲染watcher  //{ lazy: true } 做缓存 目的不让初始化就开始渲染watcher 一上来不更新
        watchers[key] = new Watcher(vm, fn, { lazy: true })
        defineComputed(vm, key, userDef)
    }
}
function defineComputed(target, key, userDef) {
    //可能是对象也可能是函数
    // const getter = typeof userDef === 'function' ? userDef : userDef.get
    const setter = userDef.set || (() => { })
    //给计算属性也添加get set 方法
    Object.defineProperty(target, key, {
        get: createComputedGetter(key),
        set: setter
    })
}
function createComputedGetter(key) {
    return function () {
        const watcher = this._computedWatchers[key] //获取到计算属性对应的watcher
        if (watcher.dirty) { //第一次取值为true
            watcher.evaluate()
        }
        if (Dep.target) {
            watcher.depend() //就是让dep记录渲染watcher 去更新页面
        }
        return watcher.value
    }
}

function initWatch(vm) {
    let watch = vm.$options.watch
    for (let key in watch) {
        const handler = watch[key] //可能是字符串 函数 或数组
        if (Array.isArray(handler)) { //可能是数组的形式 如 fullName:[()=>{},()=>{}]
            for (let i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i])
            }
        } else {
            createWatcher(vm, key, handler)
        }
    }
}
function createWatcher(vm, key, handler) {
    if (typeof handler === 'string') { //可能是字符串
        handler = vm[handler]
    }
    return vm.$watch(key, handler)
}