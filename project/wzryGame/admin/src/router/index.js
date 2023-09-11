
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: 'categories/create',
        component: () => import('@/layout/home.vue'),
        children: [
            {
                name: 'create',
                path: 'categories/create',
                component: () => import('@/views/category/create'),
                props: (route) => ({ id: route.query.id })

            },
            {
                path: 'categories/list',
                component: () => import('@/views/category/list'),
            },
            {
                path: 'items/create',
                component: () => import('@/views/item/create'),
                props: (route) => ({ id: route.query.id })

            },
            {
                path: 'items/list',
                component: () => import('@/views/item/list'),
            },
            {
                path: 'heros/create',
                component: () => import('@/views/hero/create'),
                props: (route) => ({ id: route.query.id })

            },
            {
                path: 'heros/list',
                component: () => import('@/views/hero/list'),
            },
            {
                path: 'article/create',
                component: () => import('@/views/article/create'),
                props: (route) => ({ id: route.query.id })

            },
            {
                path: 'article/list',
                component: () => import('@/views/article/list'),
            },
            {
                path: 'ad/create',
                component: () => import('@/views/ad/create'),
                props: (route) => ({ id: route.query.id })

            },
            {
                path: 'ad/list',
                component: () => import('@/views/ad/list'),
            },
            {
                path: 'admin/create',
                component: () => import('@/views/admin/create'),
                props: (route) => ({ id: route.query.id })

            },
            {
                path: 'admin/list',
                component: () => import('@/views/admin/list'),
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
    }
]

const router = new VueRouter({
    mode:'hash',
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes
})


export default router