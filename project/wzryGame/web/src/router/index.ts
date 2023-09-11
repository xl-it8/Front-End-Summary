import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/main.vue'),
    children: [
      {
        path: "home",
        component: () => import('@/views/home.vue')
      },
      {
        path: "newsDetail/:id",
        component: () => import('@/views/newsDetail.vue'),
        props: true
      }
    ]
  },
  {
    path: '/hero/:id',
    component: () => import('@/views/hero.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
