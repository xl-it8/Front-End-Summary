import * as TYPES from '../action_types/index'
const initialValue = {
  count: 0,
}
const personReducer = function (state = initialValue, action) {
  //纯函数 参数不和外界联系
  state = { ...state }
  switch (action.type) {
    case TYPES.ADD_PERSON:
      state.count += action.payload
      break
  }

  return state
}
export default personReducer
