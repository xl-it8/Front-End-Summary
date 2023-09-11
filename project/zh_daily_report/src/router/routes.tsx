import { lazy } from 'react'
import Home from '@/views/Home'
import {  withKeepAlive } from "keepalive-react-component";
//缓存有三种方式 一种缓存数据 一种缓存组件dom 一种display:none
//1.就后期字典配置 权限配置 可能没有及时沟通好 导致页面有些选项不能展示
//2. 新增的页面 都基本是复用 方便后期修改
//3. 配合测试人员 快速响应 及时沟通解决问题
const routes = [
  {
    path:'/',
    component: withKeepAlive(Home, { cacheId: "home", scroll: true }), //代表首页进行缓存 设置缓存唯一id以及记录滚动位置
    meta:{
      title: '首页-知乎日报'
    }
  },
  {
    path:'/personal',
    component: lazy(()=>import('@/views/Personal')),
    meta:{
      title: '个人中心-知乎日报'
    }
  },
  {
    path:'/detail/:id?',
    component: lazy(()=>import('@/views/Detail')),
    meta:{
      title: '详情-知乎日报'
    }
  },
  {
    path:'/store',
    component: lazy(()=>import('@/views/Store')),
    meta:{
      title: '我的收藏-知乎日报'
    }
  },
  {
    path:'/update',
    component: lazy(()=>import('@/views/Update')),
    meta:{
      title: '更新个人中心-知乎日报'
    }
  },
  {
    path:'/login',
    component: lazy(()=>import('@/views/Login')),
    meta:{
      title: '登录/注册-知乎日报'
    }
  },
  {
    path: '*',
    name: '404',
    component: lazy(() => import('../views/Page404')),
    meta: {
        title: '404页面-知乎日报'
    }
  }
]

export default routes
