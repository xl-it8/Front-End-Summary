
let oldArrayProto = Array.prototype //获取数组的原型
export let newArrayProto = Object.create(oldArrayProto) //创建一个对象 原型指向旧的Array原型 主要是两个原型对象不相互干扰
let methods = [  //找到数组变异方法 影响原数组
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice'
]

methods.forEach(method => {
    newArrayProto[method] = function (...args) { //对数组重写
        const result = oldArrayProto[method].call(this, ...args)

        //对新增的数组元素 数据进行劫持
        let inserted;
        let ob = this._ob_; //值是Observe类的实例对象 //核心
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':  //如 arr.splice(0,0,4) 0,0,4==> ...[0,0,4]
                inserted = args.slice(2) //splice也有添加属性的功能
                break;
            default:
                break;
        }
        if (inserted) {
            ob.observeArray(inserted) //插入的值继续进行观测
        }
        ob.dep.notify() //数组方生变化则通知变化 代表对数组进行操作了 这时候就要进行 改变视图了
        return result //返回结果
    }
})