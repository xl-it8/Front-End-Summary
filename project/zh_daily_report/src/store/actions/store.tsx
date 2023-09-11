import * as TYPES from '../action_types'
import { storeList } from '@/api'
const storeAction ={
   async queryStoreListAsync(){
    let list =null
      try{
        let { code, data } = await storeList();
        if (+code === 0) {
            list = data;
        }
      }catch(e){
        console.log(e)
      }
      return {
        type:TYPES.STORE_LIST,
        list
      }
   },
   clearStore(){
    return {
        type:TYPES.STORE_LIST,
        list: null
      }
   },
      // 移除某一项收藏
    removeStoreListById(id: string) {
        return {
            type: TYPES.STORE_REMOVE,
            id
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
export default storeAction