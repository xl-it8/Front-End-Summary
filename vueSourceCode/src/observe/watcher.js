import Dep from "./dep"
import { pushTarget, popTarget } from "./dep"

let id = 0
// 有渲染watcher 和计算属性watcher
//每个属性都有一个dep (属性就是被观察者) ，watcher 就是观察者(属性变化了就会通知观察者更新)
class Watcher { //不同组件有不同的watcher 
    constructor(vm, expOrFn, options, cb) {
        this.id = id++ //标识唯一的watcher
        this.renderWatcher = options
        //监听属性可能是字符串
        if (typeof expOrFn === 'string') {
            this.getter = function () {
                return vm[expOrFn]
            }
        } else {
            this.getter = expOrFn //渲染函数
        }
        this.cb = cb
        this.deps = []//收集dep
        this.depsId = new Set() //方便去重
        this.lazy = options && options.lazy
        this.vm = vm
        this.dirty = this.lazy //计算属性核心 缓存值
        this.user = options?.user //标识是用户自己的watcher
        this.value = this.lazy ? undefined : this.get()

    }
    addDep(dep) {
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.deps.push(dep) //收集dep
            this.depsId.add(id) //通过new Set 的add 方法添加属性 还有delete has方法
            dep.addSub(this) //watcher记住dep而且去重了
        }
    }
    evaluate() {
        this.value = this.get()  //可以获取用户函数的返回值并且表示为脏
        this.dirty = false //目的就是让他只执行一次 缓存
    }
    get() {
        pushTarget(this)
        // Dep.target = this
        let value = this.getter.call(this.vm) //修改this指向为vm 保证在用户那边的计算属性this为vm
        popTarget()
        return value
        // Dep.target = null
    }
    depend() {
        let i = this.deps.length
        while (i--) {
            this.deps[i].depend() //让计算属性也记住渲染watcher
        }
    }
    update() {
        if (this.lazy) {
            this.dirty = true
        } else {
            queueWatcher(this) //把当前的watcher暂存起来  
        }
        // this.get() //重新渲染
    }
    run() {
        let oldValue = this.value //老的值 ()=>{vm.fullName}
        let newValue = this.get() //新的值
        if (this.user) {
            this.cb.call(this.vm, newValue, oldValue)
        }
    }
}

let queue = []
let has = {}
let pending = false // 节流\

function flushSchedulerQueue() {
    let flushQueue = queue.slice(0) //浅拷贝
    queue = []
    has = {}
    pending = false
    flushQueue.forEach(q => q.run()) //让watcher按一定顺序执行
}

function queueWatcher(watcher) {
    const id = watcher.id
    if (!has[id]) {
        queue.push(watcher) //异步队列 更新视图
        has[id] = true
        //不管我们的watcher执行多少次,但是最终只执行一轮刷新操作
        if (!pending) {
            nextTick(flushSchedulerQueue, 0)
            pending = true
        }
    } 
}

let callbacks = []
let waiting = false
function flushCallbacks() {
    let cbs = callbacks.slice(0) //数组的拷贝 拷贝一份
    waiting = false
    callbacks = []
    cbs.forEach(cb => cb()) //异步执行
}
let timerFunc //主要目的是优雅降级 为了兼容性考虑
if (Promise) {  //版本高兼容性不好
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks)
    }
} else if (MutationObserver) {
    let observer = new MutationObserver(flushCallbacks)
    let textNode = document.createTextNode(1)
    observer.observe(textNode, {
        characterData: true
    })
    timerFunc = () => {
        textNode.textContent = 2
    }
} else if (setImmediate) {
    timerFunc = () => {
        setImmediate(flushCallbacks) //兼容ie游览器
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks)
    }
}


export function nextTick(cb) {
    callbacks.push(cb) //要更新的回调函数 收集起来 异步去更新
    if (!waiting) {
        setTimeout(() => {
            timerFunc()
        }, 0)
        waiting = true
    }
}






export default Watcher