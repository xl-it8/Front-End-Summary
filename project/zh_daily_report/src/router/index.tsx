import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
  type Params
} from 'react-router-dom'
import React,{ Suspense, useState, useEffect } from 'react'
import {  Mask, DotLoading, Toast } from 'antd-mobile'
import routes from './routes'
import store from '../store';
import action from "../store/actions";
// 条件判断格式 a extends b ? xxx : xxx  extends两种用法 一种是接口继承 一种是类似条件表达式   如果 extends 前面的类型能够赋值给 extends 后面的类型，那么表达式判断为真，否则为假 

const isCheckLogin = (path:string)=>{
  const {base:{info}} = store.getState(),
  checkList = ['/personal', '/store', '/update'];
  return !info && checkList.includes(path) //路径是检查列表里面的并且没有获取用户信息
}

const Element = function (props:any) {
  const { component: Component, meta, path} = props
  const  { title = '知乎日报'} =  meta || {}
  document.title  = title
  //把路由信息先获取到 最后传递给要展示的组件
  const navigate = useNavigate(),
    location = useLocation(), //获取隐式参数
    params = useParams(), //获取动态参数
    [usp] = useSearchParams() //获取查询字符串参数

    let isShow = !isCheckLogin(path);
    let [_, setRandom] = useState(0);
  
    useEffect(()=>{
      if(isShow) return
      (async()=>{
        let infoAction = await action.base.queryUserInfoAsync()
        let info =infoAction.info
        if(!info){
// 如果获取后还是不存在:没有登录
            Toast.show({
              icon: 'fail',
              content: '请先登录'
            });
            navigate({
              pathname: '/login',
              search: `?to=${path}`
          },{replace: true})

          return

        }
        store.dispatch(infoAction) //登录直接派发
        setRandom(+new Date())
      })()
    })

  return <>
    { //如果是要校验页面先展示loading 因为获取请求是异步的
      isShow ? <Component
      navigate={navigate}
      location={location}
      params={params}
      usp={usp}
    /> :  <Mask visible={true}>
    <DotLoading color="white" />
</Mask>
    }
  </>
}

const createRoute = function (routes:any) {
  //一个函数
  return (
    <>
      {routes.map((route:any, index:number) => {
        const { path, children } = route
        return (
          <Route key={index} path={path} element={<Element {...route} />}>
            {Array.isArray(children) ? createRoute(children) : null}
          </Route>
        )
      })}
    </>
  )
}

const RouterView = function () {
  return (
    <Suspense fallback={<>
      <Mask visible={true}>
           <DotLoading />
      </Mask>
    </>}>
    <Routes>
      {createRoute(routes)}
    </Routes>
      
    {/* <Routes>
            {routes.map((item,index)=> {
                let { name, path } = item;
                return <Route key={index}
                    path={path}
                    element={
                        <Element {...item} />
                    } />;
            })}
        </Routes> */}
    </Suspense>
  )
}

/* 创建withRouter */
export const withRouter = function withRouter(Component:React.FC<{}>) {
  // Component:真实要渲染的组件
  return function HOC(props:any) {
    // 提前获取路由信息，作为属性传递给Component
    const navigate = useNavigate(),
      location = useLocation(),
      params = useParams(),
      [usp] = useSearchParams()
    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
        usp={usp}
      />
    )
  }
}
export default RouterView
