import * as TYPES from '../action_types'
import { queryUserInfo } from '@/api'
const perosonAction ={
     // 异步获取登录者信息,完成派发
     async queryUserInfoAsync() {
        let info = null;
        try {
            let { code, data } = await queryUserInfo();
            if (+code === 0) {
                info = data;
                // console.log(info)
            }
        } catch (_) { }
        return {
            type: TYPES.BASE_INFO,
            info
        };
    },
    // 清除存储的登录者信息
    clearUserInfo() {
        return {
            type: TYPES.BASE_INFO,
            info: null
        };
    }
}


/*
{
   suppose(){
    return {
        action:TYPES.xxx
    }
   }
}这样写法 经过react-redux的bindActionCreators处理成

(dispatch)=>{
   return {
    suppose(){
        dispatch(action.xxx.suppose())
    },
    xxxx...
   }
}

*/
export default perosonAction