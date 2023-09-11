import { initState } from "./initState"
import { compileToFunction } from './compiler/index'
import { mountComponent, callHook } from './lifecyle'
import { mergeOptions } from './utils'
export function initMixin(Vue) {
  Vue.prototype._init = function (options) { //初始化vue的配置项
    const vm = this
    vm.$options = mergeOptions(this.constructor.options, options)//这里就是全局的和用户的进行合并（因为会使用混入对象这个方法 就需要合并数据）

    callHook(vm, 'beforeCreate') //调用beforeCreate的钩子函数
    //初始化状态
    initState(vm)
    callHook(vm, 'created') //调用created钩子

    if (options.el) {
      vm.$mount(options.el) //实现数据的挂载
    }
  }
  Vue.prototype.$mount = function (el) {
    const vm = this
    el = document.querySelector(el) //获取到真实的元素
    let ops = vm.$options
    if (!ops.render) { //先查找是否有render属性
      let template;
      if (!ops.template && el) {  //没有 就看配置里面是否有template模板 没有但是写了el
        template = el.outerHTML
      } else {
        template = ops.template //配置里面有template模板
      }
      if (template) {
        const render = compileToFunction(template)
        ops.render = render //没有render 生成自己的render 
      }
    }
    mountComponent(vm, el) //组件挂载

  }
}


//vue3 一切全部是函数

//  npm create vite 项目名 --template vue-ts
// createApp
// createStore
// createRouter createWebHistory createWebHashHistory


// 组件通信
// defineProps(对象 有返回值) defineEmits provide inject  函数

// 路由
// useRouter useRoute 函数

//vuex
// useStore函数 返回 store
//pinia 对比
// createPinia definePinia(标识, 对象) 返回函数 在actions getters 没有了mutations 可以用this  state用函数形式
//storeToRefs 用于解构的时候也具有响应式  模块化处理

//无过滤器
// setup(语法糖) 无this 在beforeCreate之前调用

//computed(对象或函数) watch(三个参数 )  watchEffect setup(语法糖) ref(需要点value) reactive toRefs(解构赋值失去响应式) ref(ref.value)->如果是组件就要用defineExpose

//生命周期函数 加onUnMounted 卸载

//ts (js+ 类型检查) 是js的超集 类型都不需要大写小写即可
// 静态语言 编译时就进行类型检查
// 类型注解 简单类型 复杂数据类型

// 简单类型  number string Boolean null undefinded
// 复杂数据类型 Array<类型> string[] 对象 函数
//  普通函数
//  function fn(num:number):void {
//   console.log(num)
//  }
//  箭头函数 两种写法
//  const fn = (num:number):void {
//   console.log(num)
//  }
//  type fn1 = (num:number) => number
//  const fn:fn1=(num)=>{
//   return num
//  }
// 类型推断 类型断言

// 可选参数 ? 后面不能再有必选参数了

// interface 接口继承 extends
// interface obj {
//   name: string
//   sayHello():void
// }

// defineProps({
//   name:String
// })
// defineProps<{
//   name:string
//   age?:number
// }>()

// defineEmits(['change']) //vue3提供的
// defineEmits<
// {
//   (e:'change',name:number):void //函数形式
//   (e:'change2',age:string): string
// }
// >()

// defineEmits<{
//   (e:"change",name:[]):void

// }>()

// type data {
//   name:string
//   age:number
//   open:boolean
// }

// const list = ref<data[]>([])

// setTimeout(()=>{
//   list.value =[
//     {name:"宋亚轩",age:25,open:true}
//   ]
// })

// 类型声明文件
// .ts 可以实现代码编写        .d.ts 文件 只能用类型声明
// 如果有的第三方库没有ts文件 就npm i  @types/* 下载
// declare 对类型宣称 主要是与js区分
// let count = 10   declare let count:number
// let songName = '痴心绝对' declare let songName:string
// let position = {
//   x: 0,
//   y: 0
// }

// type Position {
//   x:number
//   y:number
// }
// export declare let position:Position



// function add(x, y) {
//   return x + y
// }

// export declare function add(x:number,y:number):number



// function changeDirection(direction) {
//   console.log(direction)
// }

// type Direction ='top'|'left'|'right'
// declare function changeDirection(direction: Direction):void

// const fomartPoint = point => {
//   console.log('当前坐标：', point)
// }


// webSocket 就是双向数据的一种协议 常用与 聊天客户 股票等 服务器会主动向客户端发起数据  解决http主动请求服务器 轮询 导致性能差的问题

// io('地址',{
//   transports:['websocket'],
//   query:{
//     token: getToken
//   }
// })