import * as TYPES from '../action_types'
let initial = {
  info: null
};
export default function reducer(state:any = initial, action:any) {
     state = {...state}
    switch(action.type){
        case TYPES.BASE_INFO:
          // console.log(2)
          state.info = action.info
          break;
    }
    return state
}
