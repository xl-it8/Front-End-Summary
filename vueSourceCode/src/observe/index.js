import { newArrayProto } from './array'
import Dep from './dep'
class Observe { //类
  constructor(data) {
    // data 要么数组 要么对象
    //数组的数据视图更新 //给每个对象添加dep收集
    this.dep = new Dep()



    Object.defineProperty(data, '_ob_', { //数组操作的核心 给data添加自定义属性——ob——
      value: this,
      enumerable: false, //不可以枚举 意味着不可以遍历（循环）和改值
    })
    if (Array.isArray(data)) {  //data数据如果是数组要对数组进行二次封装
      data.__proto__ = newArrayProto //让数组的实例对象原型指向我们自己搞的原型对象 (this谁调用就指向谁  会有个原型链查找 隐式原型一层一层往上查找 this指向最开始的对象)
      this.observeArray(data)
    } else {
      this.walk(data) //只对一开始定义的对象有响应式处理 后来添加的对象没有
    }

  }
  walk(data) {
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
  observeArray(data) {
    data.forEach(item => observe(item)) //数组里面如果还有对象 [{a:1}]进行再次劫持
  }
}

//数组进行再次递归处理 就是在new Vue 中的数据可能是 array:[1,3,[2,3],{a:1}]
function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    let current = value[i]
    current._ob_ && current._ob_.dep.depend()
    if (Array.isArray(current)) {
      dependArray(current) //递归处理
    }
  }
}


function defineReactive(target, key, value) { //数据劫持核心代码
  let childOb = observe(value)  //递归处理 如果对象里还有对象 childOb身上有dep收集依赖的
  let dep = new Dep() //给每个属性添加dep为被观察者
  Object.defineProperty(target, key, {
    get() {  //当有人访问的时候调用
      if (Dep.target) {
        dep.depend() //让属性收集器记住当前的watcher
        if (childOb) {
          childOb.dep.depend() //让数组或者对象实现依赖收集
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set(newVal) { //当有人修改时调用
      if (newVal === value) return //如果值一样不做处理
      observe(newVal) //修改的值是对象 也要对他进行数据劫持
      value = newVal
      dep.notify() //通知更新
    }

  })
}

function observe(data) {
  //array object 都是对象
  if (typeof data !== 'object' || data === null) { //只对对象进行劫持
    return
  }
  if (data._ob_ instanceof Observe) { //已经实例化过了就不需要再实例化
    return data._ob_
  }
  return new Observe(data) //返回一个实例对象
}
export default observe