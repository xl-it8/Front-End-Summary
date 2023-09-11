
import axios from 'axios'
import { Message } from 'element-ui';
import router from '@/router/index'
// console.log(process.env.VUE_APP_BASE_URL)
const instance = axios.create({
    timeout: 5000,
    baseURL: process.env.VUE_APP_BASE_URL || '/'
})


instance.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token')
    }
    return config;
}, (err) => {
    return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
    return response.data
}, (err) => {
    // err是个对象
    if (err.response?.status === 401) {
        Message({
            message: err.response.statusText,
            type: 'warning'
        })
        router.push('/login')
    }
    if (err.response?.data?.message) {
        Message({
            message: err.response.data.message,
            type: 'warning'
        })
    }
    return Promise.reject(err)
})

export default instance