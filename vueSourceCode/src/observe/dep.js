let id = 0
class Dep {
    constructor() {
        this.id = id++ //属性dep要收集的watcher
        this.subs = [] //存放当前属性对应的watcher有哪些
    }
    depend() {
        Dep.target.addDep(this) //让watcher记住dep
        //dep 和watcher 是一个多对多的关系 (一个属性可以在多个组件中使用 dep->多个watcher)
        //一个组件中由多个属性组成(一个watcher 对应多个 dep)
    }
    addSub(watcher) {
        this.subs.push(watcher)
    }
    notify() {
        this.subs.forEach(watcher => watcher.update())  //告诉watcher要跟新了
    }
}
Dep.target = null //准备一个Dep的静态属性 只会有
let stack = []; //栈的结构
export function pushTarget(watcher) {
    stack.push(watcher)
    Dep.target = watcher
}
export function popTarget() {
    stack.pop()
    Dep.target = stack[stack.length - 1]
}
export default Dep