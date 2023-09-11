
import { Message } from 'element-ui';
export default {
    install(Vue) {
        Vue.prototype.$mes = (res = true) => {
            res ? Message({
                message: '成功',
                type: 'success'
            }) : Message({
                message: '失败',
                type: 'warning'
            })
        }
    }
}