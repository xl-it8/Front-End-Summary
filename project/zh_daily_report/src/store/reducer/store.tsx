import * as TYPES from '../action_types'
const initialValue ={
  list: null
}
export default function reducer(state:any =initialValue, action:any) {
     state = {...state}
    switch(action.type){
        case TYPES.STORE_LIST:
          state.list = action.list;
          break;
        case TYPES.STORE_REMOVE:
          state.list = state.list.filter((item:any)=>{
               return item.id !== action.id
          })
          break;
          default:
    }
    return state
}
