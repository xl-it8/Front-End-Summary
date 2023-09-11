import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screenPage'
  },
  {
    path: '/screenPage',
    component: () => import('@/views/screenPage')
  },
  {
    path: '/gdp',
    component: () => import('@/views/gdp')
  },
  {
    path: '/threeIndustry',
    component: () => import('@/views/threeIndustry')
  },
  {
    path: '/digitalEconomy',
    component: () => import('@/views/digitalEconomy')
  },
  {
    path: '/threeDemands',
    component: () => import('@/views/threeDemands')
  },
  {
    path: '/threeIncomes',
    component: () => import('@/views/threeIncomes')
  },
  {
    path: '/financialRun',
    component: () => import('@/views/financialRun')
  },
  {
    path: '/businessEnv',
    component: () => import('@/views/businessEnv')
  }
  // {BusinessEnv
  //   path: '/',
  //   component: () => import('@/views/trendPage')
  // },
  // {
  //   path: '/map',
  //   component: () => import('@/views/mapPage')
  // },
  // {
  //   path: '/rank',
  //   component: () => import('@/views/rankPage')
  // },
  // {
  //   path: '/hot',
  //   component: () => import('@/views/hotPage')
  // },
  // {
  //   path: '/stock',
  //   component: () => import('@/views/stockPage')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
