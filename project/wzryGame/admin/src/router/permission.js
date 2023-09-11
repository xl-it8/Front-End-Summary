
import router from './index'
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token')) {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})

