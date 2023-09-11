import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from 'react-router-dom'
import { Suspense } from 'react'
import routes from './routes'

const Element = function (props) {
  const { component: Component } = props
  //把路由信息先获取到 最后传递给要展示的组件
  const navigate = useNavigate(),
    location = useLocation(), //获取隐式参数
    params = useParams(), //获取动态参数
    [usp] = useSearchParams() //获取查询字符串参数
  return (
    <Component
      navigate={navigate}
      location={location}
      params={params}
      usp={usp}
    />
  )
}

const createRoute = function (routes) {
  //一个函数
  return (
    <>
      {routes.map((route, index) => {
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
    <Suspense fallback={<>正在加载中。。。</>}>
      <Routes>{createRoute(routes)}</Routes>
    </Suspense>
  )
}

/* 创建withRouter */
export const withRouter = function withRouter(Component) {
  // Component:真实要渲染的组件
  return function HOC(props) {
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
