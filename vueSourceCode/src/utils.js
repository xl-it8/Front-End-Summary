
//静态方法
const strats = {}
const LIFECYCLE = [
    'beforeCreate',
    'created'
]
LIFECYCLE.forEach(hook => {
    // { } {create:function(){}}  ==> {create:[fn]}
    // {create:[fn]} {create:function(){}}  ==> {create:[fn,fn]}
    strats[hook] = function (p, c) {
        if (c) { //如果有儿子 父亲有 让父亲和儿子拼在一起
            if (p) {
                return p.concat(c) //[fn1,fn2] 先执行父亲的
            } else {
                return [c]  //儿子有父亲没有则儿子包装成数组
            }
        } else {
            return p //如果儿子没有则直接用父亲的即可
        }
    }
})

strats.components = function (parentVal, childVal) {
    const res = Object.create(parentVal) //创建新对象原型对象指向parentVal
    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key] //返回的是构造的对象，可以拿到父级的构造函数 
        }

    }
    return res //通过这个调用就维护了一个链 components:{组件名}.__proto__ = 父级的相同组件名  就是自己有就用自己的 自己没有就用全局定义的组件
}



//   parent, child 都是对象
export function mergeOptions(parent, child) { //child用户传入的对象
    const options = {}
    for (let key in parent) {
        mergeField(key) //可能是  data computed watch mixins create methods生命周期等等
    }
    for (let key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }
    function mergeField(key) {
        if (strats[key]) { //声明周期相关的在strats对象中
            options[key] = strats[key](parent[key], child[key]) //而生命周期mixin会优先于用户定义的 面试题会考
        } else {
            options[key] = child[key] || parent[key] //就是用户的属性或者方法会优先于mixin定义的
        }
    }
    return options
}


//全局的选项和 局部的选项就行合并出完整的选项   会有覆盖情况