/*
 开发过程重点注意事项 
   1. 组件的开头要大写字母 否则报错
*/
// React.createElement(
//     "h3", 
//     {
//      className: "contaniner",
//      style: {
//      background: 'red',
//      fontSzie: '16px'
//           }
//     },
// "\u5F00\u59CB"
// ) 
export const createElement = (type, props , ...children)=>{
  
    const virtualDom  = {
        $$typeof: Symbol('react.element'), //指定类型
        key: null,
        ref:null,
        type: Symbol('react.fragment'), //类型 可能是标签可能是组件
        props: null //可能是属性可能是数组儿子
    }
    if(typeof type === "string"){ //标签
        virtualDom.type = type
    }
    virtualDom.props = { ...props} //拷贝一份
    const len = children.length

    if(len <=1){
        virtualDom.props.children = children[0] //非数组
    }else {
        virtualDom.props.children = children
    }
   
    return virtualDom
}


export const render = (dom , root)=>{
  const { props, type } = dom 
  let ele = null
  if(typeof type === 'string'){ //处理非组件的
    ele = document.createElement(type)
    each(props,(value,key)=>{
       if(key === 'className'){
        ele.className = value
        return
       }

       if(key === 'style'){
        each(value,(value,key)=>{
           ele.style[key] = value
        })
        return
       }

       if(key === 'children'){
        let children = value
        if(!Array.isArray(children)) children =[children] //是文本也搞成数组
        children.forEach(child=>{
            if(/^(number|string)$/.test(typeof child)) {  
               ele.appendChild(document.createTextNode(child)) //创建文本节点
                return
            }
            render(child, ele)
        })
        return
       }
       ele.setAttribute(key,value) // 自定义属性
    })


      //内置对象 对象.属性 = 值 添加属性样式可以在标签看到 自定义看不到（并且会在对象堆内存中） 需要用setAttribute 不会出现在堆内
     root.appendChild(ele)
  }

}

// let a =[3,4,Symbol()]
// for in 效率不高可遍历私有和共有的 枚举的不能遍历 Symbol的也不行
// Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr)) 获取私有的所有属性 包括Symbol和不可枚举的
//更新的方式 Reflect.ownKeys()



function each(obj,callBack){
 if(typeof obj === null || typeof obj !== 'object') throw new TypeError('should Be Object') //Uncaught TypeError: dd
 if(typeof callBack !== 'function') throw new TypeError('should Be Function')
 Reflect.ownKeys(obj).forEach(key=>{
    let value = obj[key]
    //遍历获取所有属性的key 和value值
    callBack(value ,key)
 })
}



//useState 大概源码如下  注意 hooks函数与静态函数不同是拥有hooks能够改变状态多次重复渲染页面  还有他底层使用闭包有自己的函数作用域 对于视图更新函数每一次都会重新调用创建函数上下文

//useState注意点:   如果有多个useState 如果是同步会只更新一次视图 如果是遇到flushSync 会强制更新  如果是异步回调中使用setState会异步更新

// Object.is(null,null) true 比较是否相等
let _state;//全局属性
/*
 let [num,setNum] = useState(0)或者
 //作用就是函数里面可以写一些重复的代码来处理初始值 提高性能 只会初始的时候执行一次
 let [num,setNum] = useState((preValue)=> {})

 function useState(value){
   if(typeof _state ==='undefinded'){//保证只有第一次初始赋值的有用的
     if(typeof value === "function"){ 
       _state = value()  //传递的函数调用并返回最新值
     }else {
      _state = value
    }
   }
   const handleState = (newValue)=>{ //这里注意修改的值是直接覆盖以前的值
      if(Object.is(_state,newValue)) return
      if(typeof newValue === "function"){
       _state = newValue(_state)
     }else {
      _state = newValue
    }
    //会做异步更新的处理
      //以下内容就是处理视图更新的逻辑
      。。。。。视图更新
   }
   return [_state, handleState]
 }


useState的升级版 =》 useReducer() 语法类似 redux
什么时候使用？ 如果一个组件管理的状态数据非常多可以考虑useReducer来管理
语法大致：
   function reducer(state,action){
        const state = {...state} //拷贝一份新对象没问题
       switch(action.type){
          case xxx:
              state.age = state.age+1 //错误
             return state //注意 State is read-only. Don’t modify any objects or arrays in state:
       }
   }
   const [状态值, dispatch] = useReducer(reducer, 初始值)

   dispatch({type:xxx})

useEffect 类似生命周期 componentDidMount compoentWillUpadte 

useEffect的回调函数会通过MountEffect函数放在链表中管理(只会更新一次如果多个useEffect) 当页面更新挂载完毕后调用updateEffect函数 按要求执行链表的回调函数 


注意:  useEffect里面只能返回函数 返回其他会报错 同时不能出现在判断 循环语句中


useLayoutEffect 和useEffect区别

页面执行流程
1. 根据babel-preset-react-app 把jsx编译为 React.createElement格式
2. React.createElement格式执行处理成virtual dom
3. 通过react.render把虚拟dom转换为真实的dom对象 (更新会有diff算法比较)
   这里 如果使用useEffect会异步操作 useEffect的回调函数会和第四步一起处理 不会堵塞第三步页面渲染
   而useLayoutEffect 的回调函数会先执行 会堵塞第四步
   注意 这两个方法都可以获取到dom对象
   当然 useLayoutEffect会把链表中的callback统一执行后再去处理第4步
4. 浏览器根据dom对象绘制并呈现到页面上
*/



/*
类式组件 ref 相关的有三种和方法 
  1. ref='xxx' this.refs.xxx 严格模式React.strictMode报错
  2. (x) => b =x  this.b hooks组件也可以使用 但不推荐
  3. const xx = createRef(null) ref={xx} xx.current获取 hooks组件也可以使用 但不推荐 因为会导致性能浪费 每次函数更新重新调用函数都会创建新的ref对象

  而hooks函数式组件 推荐使用 useRef 更新不会重新创建ref对象


  ref 用在元素上 获取dom元素
      用在组件上获取组件实例
        注意: 
           1. 如果子组件是类式组件 用 useRef获取组件实例没问题
           2. 但是是函数式组件 会报错需要结合   React.forwardRef来获取子组件的某个dom对象 但是如果要获取里面的属性和方法需要结合useImperativeHandle获取  看demo3案例
*/

/*
useCallback 和React.memo
useCallback(()=>{},[])
函数引用缓存 如果针对子组件传入缓存的函数 如果函数不变化子组件就不重新渲染 但要结合React.memo(针对函数式组件) 类式组件用pureComponent会在shouldComponentUpdate勾子比较属性是否一样 一样不重新渲染 浅比较

useMemo 类似计算属性 就是对如果依赖项没有变化就不重新计算代码



自定义hook 二次封装 复用相同逻辑的代码


类式组件和函数组件 父传子 props


HOC(higher order component)高阶组件
引入BB页面
function AA (){  一个页面
  return 
   <div>
     <div>你好</div>
     <B/ x={true} y={"你好"}>
    </div>
}

function BB (props){  另一个页面
  接受数据
  return 
   <div>
     <div>你好</div>
    </div>
}

export default BB 这种方式外面传递的数据是死的 利用高阶组件形式 利用闭包 保存组件同时利用代理的组件对数据特殊处理最后统一传入BB组件 做法如下

function BB (props){  另一个页面
  接受数据
  return 
   <div>
     <div>你好</div>
    </div>
}
let style ={}
function CC(component){
    //。。。这里做特殊处理
  return function(props){ //这里是AA组件传递的数据
  
     return <component {...props} {...style}/>//这里是真正的组件BB 并且传入AA的数据
  }
}
export default CC(BB) //调用BB 函数 传入真正要渲染的组件

各组件通信
1. 了解 const xxx =  React.createContext 创建上下文对象 可以在单独的文件
    然后在父组件 包裹 <xxx.Provider value={{要传递的值 是个对象}}>
   类式组件
     两种用法
       @ <xxx.Consumer>
         {(context)=>{}}
       </xxx.Consumer>
       @ 子组件加一个静态属性contextType(只能是这个属性) 值为创建的上下文对象 然后利用this.context 获取传递的值
   函数式组件
     两种用法
      @ <xxx.Consumer>
         {(context)=>{}}
       </xxx.Consumer>
      @ 利用const xxx = useContext(创建的上下文对象) xxx就是传递的值内容

2. redux
实现redux部分源码
const fn1 =()=>{}
// const fn2 =()=>{}
// const fn3 =()=>{}
// const arr = [fn1,fn2,fn3]
// console.log(arr.indexOf(fn1)) //比较地址值



大致过程有5步

第一步 createStore(这里是reducer)创建store容器  容器有两大部分 一部分是 状态数据 一部分是事件池   状态一改变事件池的事件执行让对应的组件更新 也就是视图更新获取最新状态

第二步 组件页面通过store.getState()获取最新状态从store中

第三步 给store事件池订阅改变状态的事件 const unsubscribe = store.subscribe(()=>{}) unsubscribe会删除事件池的事件
(()=> 对应的事件 setxxx(Date.now()))

第四步 创建容器的时候需要传入reducer
       const initial ={}
       const reducer = function(state=initial,action){
        state ={...state}//这里重点注意要克隆一份 因为初始化时 store会第一次内部自己派发 使状态更新 就立马更新视图 不建议这样操作
        switch(action.type){
          case xxx:
             xxx
             break;
          case xxx:
             xxx
             break;
         default:
       }

        return state
       } 


第五步 改变状态  store.dispatch({type:xxx}) {}就是reducer里的action 必须要有type属性

注意：1. 改变状态只能用 dispatch触发  2.更新视图需要事件池事件调用  3. 要想每个组件都获取创建的store对象 不一个一个引入的解决方案是 利用createContext创建上下文对象 引入全局

reducer工程化开发
  第一步 先把reducer进行拆分 模块化 利用combineReducers进行结合 生成结合的reducer
  第二步  派发行为标识宏管理 其实就是统一管理action.type 避免命名冲突
         创建一个action_types文件夹 里面管理action.type
             比如 export const VOTE_SUP = 'VOTE_SUP' 模块名+标识名
             然后在使用标识的页面 利用 import * as TYPES from 'action_types' 导入 
    
  第三步 把派发的行为对象 按照模块化统一管理 actionCreator
3. react-redux
 看如下部分源码

4. @reduxjs/toolkit 是在redux和react-redux基础上的升级 不过好像用的少
  configureStore() 和createReudcers() 
  就是利用切片机制 对以前的reducers和actionCreators进行合并处理

4.mobx
   装饰器

5. redux-saga 解决redux异步处理方案 可以集中管理异步处理的方法 代替 redux-thunk和redux-promise
   redux-saga可以设置监听器对某个标识监听 但是无论监听不监听都会走redux方法 但是被监听的会先走saga的特殊处理方法 之后再触发reducer执行更改状态
   redux-saga是redux中间件
   采用 redux-saga之后就不需要connect用useDispatch和useSelector替代 以及 不需要定义actionCreators

   redux-saga/effects 包暴露了许多方法 比如 
       put 触发reducer执行
       take 对某个action标识进行监听
       takeLatest take升级版 可以对执行方法有防抖的效果
       all 所有异步状态方法成功后返回成功结果 并发
       call 串行 需要等上一个执行完毕
   saga index.js文件模板
          import { createStore,applyMiddleware } from 'redux'
          import createSagaMiddleware from 'redux-saga' //设置saga中间件
          import reducers from './reducers/index'
          import saga from './saga'
          const sagaMiddleware = createSagaMiddleware()
          const store = createStore(reducers,applyMiddleware(sagaMiddleware))
          sagaMiddleware.run(saga)
          export default store
         两步骤 创建中间件  调用run方法开启监听


Dva 框架 采用底层使用生成器和redux-saga 集合了路由 状态管理 路由是v4版本  Dva用的版本会比较低
  Dva的model状态管理 类似 vue中的vuex
      Model 在页面connect函数中会给函数props传入dispatch派发 要么走模块的reducers方法要么走effects的方法处理异步后派发更新reducers
      models文件夹下不同的模块 xxx.js yyy.js 
        xxx.js 模块示例：
          export default {
             namespace: 'xxx'
             state:{
               sumNum: 9,
               oppNum: 5
             },
             reducers:{ //类似mutations
              support(state, 传递的参数){
                 return {
                    ...state,
                    sumNum： state.sumNum + 1
                 }
              },
              oppose(state){
                 return {
                    ...state,
                    oppNum： state.oppNum + 1
                 }
              }

             },
             effects:{ //类似actions
                supportAsync：[ //可以是数组 第二个参数决定监听类型对象
                  function *(页面dispatch的action对象, {call,put}){ //方法的第二个参数是saga/effects提供的api
                    yield call(delay) //异步执行完
                    yield put({type:'support}) //派发更新reducers
                  },
                  {type:'takeLatest'} //指定监听器有防抖功能
                ],
                *opposeAsync(_,{call,put}){ //也可以是直接写生成器函数
                  yield call(delay,2000)
                  yield put({type:'oppose'})
                }
             },
             subscriptions: { //这里的函数不能是生成器 只能是普通函数  模块初次加载 页面一刷新就会执行里面定义的方法
                init(({dispatch, history}){ //提供dispatch, history
                     console.log('刷新加载，路由切换不会执行')
                }

                setup({dispatch, history}){ //提供dispatch, history
                    history.listen((location)=>{ //提供路由监听器 路由变化就会执行
                        console.log('路由变化就执行')
                        const {pathname} = location
                        if(pathname === '/model'){ //判断指定的model页面执行
                            异步执行。。。。
                            dispatch({ type: 'xxx', payload: xxx }) //派发 执行reducers
                        }
                    })
                }
                
             }
          }
          注意 effects和 reducers的方法名不要一样 异步一般以async结尾
              页面触发dispatch({type:'xxx/supposeAsync'})

          const delay =(delay=1000)=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve(23456)
                },delay)
            })
          }

fetch接口请求封装 h5新api

react-router-dom针对web端  还有react-router针对原生app native
 history和hash模式

 HashRouter和 BrowserRouter

router5

Link: 
   to属性 页面展示地址
   replace属性 跳转会替换之前的路径
NavLink: 可以修改a标签的样式 匹配成功会默认添加active类 我们可以利用activeClassName来修改匹配成功的类名
Route: 路由匹配规则 
   path属性 匹配的路径
   exact属性 精准匹配  
   component={组件} 属性 是展示组件  
   render={()=>{}} render可以在匹配成功后灵活处理展示的组件
Switch 组件 代表匹配到就不再往下匹配
Redirect组件 
   from属性 从什么地址来
   to属性 重定向到的地址

多级路由 可以使用路由表方式管理
自己定义路标表维护路由规则
{
  redirect:
  from:
  to:
  exact:
  path:
  component:
  meta:
  name:
  children:[{}]

}
和vue路由类似
routes = [{
  redirect: true,
  from:'/',
  to:'/a'
  path:'xx',
  exact: true
},
{
  path:'/a'
  name:'a',
  component: import('/A'),
  meta:{}
}
]
然后在router文件夹下的index文件中 统一处理路由返回组件

// 路由封装
import {Switch, Route, Redirect} from 'react-router-dom'
const RouterView = function(props){
  const { routes } = props
  retun <Switch>
     {
      routes.map((item,index)=>{
        let {redirect, form, to, exact,path,component:Component} = item,
            config = {}
            if(exact) config.exact = true
        if(redirect){
          config = {to}
          if(from) = config.from = from
          return <Redirect key={index} {...config}></Redirect>
        }
        config = {path}
        return <Route key={index} {...config} render={(props)=>{
          后期可能会做一些特殊处理
          return <Suspense fallback={loading组件}><Component {...props}/></Suspense>
        }}></Route>
      })
      }
  </Switch>

  //路由懒加载状态
    由于如果都是同步导入 那么在一个大项目 所有文件都导入最后打包成一个资源文件 那这时候体积特别大 加载请求时间长导致可能页面会有白屏现象
    所以引入懒加载 那些组件可以利用懒加载的机制 对异步导入单独打包成一个js当页面匹配到的时候导入对应的js文件 大大减少请求时间
    利用 import {lazy} from 'react' 并且要结合Suspense组件 
    如 import A from './A' ==> Lazy(()=> import('./A'))
    也可以通过魔法注释 指定哪些文件打包到一起
      webpackChunkName：'xxx' => Lazy(()=> import(/webpackChunkName：'xxx'/'./A')) 
  //在组件内获取路由信息

  在HashRouter或者BrowserRouter中包裹的就可以用hooks提供的函数获取 history，match，location
  只有基于<Route>匹配渲染的可以在props里获取 history location match信息

  比如 如果是<Route path='/xx' component={xx}> //会在组件props接受到history,match,location信息

  如果是<Route path='/xx' render={(props)=>{
   props有history,match,location信息
    return <xxx {...props}></xxx>
  }}> 


  // 问题: 当前组件是类组件,在<HashRouter>中 当没有基于Route组件渲染？ 如何获取
  基于函数的高阶组件，自己包裹一层处理 或者利用react-router-dom提供的组件withRouter组件  其实以下利用高阶组件封装的方式 就是withRouter的原理 withRouter = handle

    class HomeHead extends React.Component {
      render(){
        return 
        <div>
            <Link to='/'>首页</Link>
        </div>
      }
    }

    const handle =  function(Component){

      return function HOC(props){
         //props
         //这里可以利用hooks获取 再传递给真正要渲染的组件
         const history =useHistory()
         const match =useMatch()
         const location =useLocation()
         retutn <Component {...props} history={history} match={match} location={location} />
      }
    }

    export default Handle(HomeHead)

  //路由跳转和传参数
    1.利用Link组件进行跳转
    2. history方法跳转
   
    
[传递参数的三种方式]

    1.查询字符串的方式
     history({
       pathname: 'xx',路径
       search:'xxx' 格式必须是 ?xx=yy&xx=yy 有长度限制 
     })
     获取查询字符串的方式
      const {search} =  useLocation()勾子获取
               search就是传递的参数但是urlencoded格式 可以借助qs.parse()处理成对象
  2.动态参数的格式
     path: '/a/:id?/:parmas?'
     history.push('/a/333/33')
     获取动态参数的值方法
       1.  const params = useParams()hook方法获取
       2.  const match = useRouteMatch()
     match里面会有动态参数的内容 比如{id:xxx,parmas:xxx}
  3.隐式参数
  history({
       pathname: 'xx',路径
       state:{
         id：xxx
       } 
     })
    获取隐式参数方法
      const {state} =  useLocation() //有个问题就是在获取参数的页面一旦刷新state数据就没有了
}
  
router6版本
  相对于routerv5区别
    Switch组件没有了  代替方案 Routes组件
    withRouter没有了  代替方案 自己利用高阶函数封装
    Redirect组件没有了  代替方法 <Navigate to={xxx}></Navigate> 这里的to可是是对象 pathname 和 search 没有state对象
    路由匹配规则中 默认都采用精准匹配 意味着exact没必要了
    默认匹配到组件不再继续往下匹配
    useListory勾子没有   代替方法 useNavigate()
    获取查询字符串方法 useLocation中的search  代替方法  useSearchParams() 方便了
    useRouteMatch改成  useMatch(pathname)用的少


    所有的路由匹配规则 写在Routes组件中
     <Routes>
        <Route path='xxx' element={必须写出<xxx/> 不能写成xxx}> 没有component和render方法实现
     </Routes>
  
    二级路由不在分散到别的页面去 直接统一写在某个页面 比如
       <Routes>
        <Route path='/a' element={<xxx/>}>

          //而注意二级路由匹配后要放到那个位置 Outlet来占位 相当于vue2的router-view
             <Route path='/a/a1' element={<xxx/>} />
             <Route path='/a/a2' element={<xxx/>} />
        </Route>
     </Routes>

     //也可以自己封装路由表 和router5类似
     也可以使用const routes = useRoutes([]) 视图{routes} 但是不灵活
*/







/*
样式私有化的处理  防止冲突
  1.通过内联样式写 不推荐
  2.css样式表 就是给最外层的定义特殊名字(路径 + 组件) 以后就在这里面写css代码
    .component-abd {
        .abc {}
    }
  3.CSSModules 只适用于css文件 scss/less失效  xxx.module.css import style from './xxx.module.css'经过webpack编译 混淆处理后变成如下格式
   style =  {
        类名:'新的类名'
     }
   注意:
      添加多个类名 需要用到模板字符串 `${style.xxx} ${style.xxx}`
      css模块中如果不想让某个类名被处理 用:global(类名) {}

  4.不想用这个方式 插件 ReactJSS  解构出 const useStyle = createUseStyles({})
      

  5.插件 styled-components  是个js文件里写样式  可以结合插件完成rem适配 利用babel-plugin-styled-components-px2rem插件
   语法 const xxx = styled.div`
      样式如：
      display： flex；
      .xx {
        .xxx {

        }
      }
   `
   <xxx></xxx> 应用到页面中



*/

  

//创建store
function createStore(reducer){
  //传进来的必须是函数
  if(typeof reducer !=='function') throw new TypeError('reducer should be function!')

  let state; //初始状态undefinded 之后如果有模块化就是存放模块化的状态
  let listeners = [] //事件池 触发视图更新
  
  //获取状态
  function getState(){
     return state
  }


  //派发修改状态
  function dispatch(action){
    //判断是一个纯对象{}
    if(Object.prototype.toString.call(action) !== '[object Object]') throw new TypeError('listener should be pure Object!')
 //必须传type类型
    if(typeof action.type === 'undefined'){
      throw new TypeError('type should be required!')
    }

    //执行reducer(如果是模块化reducer就是combineReducers调用返回的) 返回state最新状态 初次state是undefinded
    state = reducer(state,action)

    //通知事件池事件更新
    if(listeners.length){
      listeners.forEach(listener => listener())
    }
    

    return action //返回action

  }
  //处理随机字符
  function randomString(){ 
    return Math.random().toString(36).substring(7).split('').join('.')
  }
  
  //内部首次会调用dispatch使state获取初始值
  dispatch({
    type: "@@redux/INIT" + randomString()
  })
  //订阅事件池
  function subscribe(listener){
    if(typeof listener !=='function') throw new TypeError('listener should be function!')
    if(!listeners.includes(listener)){ //去重
      listeners.push(listener)
    }
    
    //删除对应的listener
    return function(){
      const index = listeners.indexOf(listener) //闭包
      listeners.splice(index,1)
    }
  }

  return {
    getState,
    dispatch,
    subscribe
  }

}

export function combineReducers(reducers){
    const reducersKeys = Reflect.ownKeys(reducers) //获取所有的reducers模块名 比如 ['vote','person']
  

//返回最终的reducer函数
//难点在这 state ={}是保存着所有模块下的状态 比如 
// state={
//   vote:{
//     sup:2,
//   },
//   person:{
//      name:'xx'
//   }
// }
  return function reducer(state ={}, action){ //内部初次会调用一次 传进来的是undefinded
      let nextState = {}

      //利用闭包
      reducersKeys.forEach(key =>{
       let reducer = reducers[key]
       nextState[key] = reducer(state[key],action) //这里调用我们自己写的reducer 初次内部执行时state[key]是undefinded所以会获取自己外部写的状态
      })

      return nextState
  }
}


//react-redux 提供的Provider和connect部分源码
// import {Provider,connect} from 'react-redux'
//使用方式 <Provider store={{store}}><xxx/></Provider>
import {createContext,useContext,useEffect,useMemo,useState} from 'react'
import {bindActionCreators} from 'redux'
const themeContext = createContext()
export const Provider = (props)=>{
  const {store, children} = props
 return <themeContext.Provider value={{store}}>
      {children}
  </themeContext.Provider>
}

/* connect: 获取上下文中的store 然后把公共状态，要派发的的方法等都基于属性传递给需要渲染的组件 把让组件更新的方法放在redux事件池中 */
//使用方式 connect((state)=>{state.vote},(dispatch)=>{return{suppot(){return dispatch(action.vote.support())}}})(组件)
//使用方式 connect((state)=>{state.vote},action.vote)(组件)  connect的新参可以是
//可以省略派发 获取状态和订阅事件池这些操作
export function connect(mapStateToProps, mapDispatchToProps){
  //处理默认值
   if(!mapStateToProps){
    mapStateToProps= ()=>{return {}}
   }

   if(!mapDispatchToProps){ //没写的情况 默认是函数
    mapDispatchToProps= (dispatch)=>{return {dispatch}} //肯定需要传递dispatch
   }

  return function curring(Component){ //curring加工处理
      //返回函数并且暴露出去之后导入可使用组件方式处理<xxx/>
      // return Component
      return function HOC(props){ //高阶组件 与上面（return Component）的区别是可以再进一步处理数据
       let {store} = useContext(themeContext),
           {dispatch, getState, subscribe} = store
      let [_, forceUpadte] = useState(0)
      useEffect(()=>{
       const unSubscribe = subscribe(()=>{forceUpadte(Date.now())})
        return unSubscribe()
      },[])

      let state = getState(),
      nextState = useMemo(()=>{return mapStateToProps(state)},[state]) //传递进来的connect第一个参数必须是函数

      let dispatchProps = {}
      if(typeof mapDispatchToProps === 'function'){
        dispatchProps = mapDispatchToProps(dispatch)
      }else {
        dispatchProps = bindActionCreators(mapDispatchToProps,dispatch)
      }


        return <Component {...props} {...nextState} {...dispatchProps}/>
      }

  }
}
//react-redux中间件
   //1. redux-thunk   2.redux-promise 3. redux-logging

/*
Generator生成器基础和await原理



组件缓存 可以使用"keepalive-react-component插件
*/




export default createStore