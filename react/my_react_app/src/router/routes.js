import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import A from '../views/A'
import A1 from '../views/A/a1.jsx'
// const aa =lazy(() =>
// import(/*webpackChunkName:"AChild"*/ '../views/A/a1')
// )
// console.log(lazy(() =>
// import(/*webpackChunkName:"AChild"*/ '../views/A/a1')
// ))
// console.log(A1)
// console.log(<A1></A1>)

// console.log(<aa/>)
const childRoutes = [
  {
    path: '/a',
    component: () => <Navigate to="/a/a1" />,
  },
  {
    path: '/a/a1',
    component: lazy(() =>
      import(/*webpackChunkName:"AChild"*/ '../views/A/a1')
    ),
    name: 'a1',
    meta: {},
  },
  {
    path: '/a/a2',
    component: lazy(() =>
      import(/*webpackChunkName:"AChild"*/ '../views/A/a2')
    ),
    name: 'a2',
    meta: {},
  },
]
const routes = [
  {
    path: '/',
    component: () => <Navigate to="/a" />,
  },
  {
    path: '/a',
    component: A,
    name: 'a',
    children: childRoutes,
    meta: {},
  },
  {
    path: '/b', //动态参数
    component: lazy(() => import('../views/B')),
    name: 'b',
    meta: {},
  },
  {
    path: '/c',
    component: lazy(() => import('../views/C')),
    name: 'c',
    meta: {},
  },
  {
    path: '*',
    component: () => {
      return (
        <Navigate
          to={{
            pathname: '/a',
            search: '?from=404',
          }}
        />
      )
    },
  },
]

export default routes
