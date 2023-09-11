import { delay, put, takeLatest } from 'redux-saga/effects'
import * as TYPES from '../store/action_types'
function * workingDo(action){
    console.log(action)
  yield delay(1000)
  yield put({
    type: TYPES.ADD_PERSON,
    payload: action.payload
  })
}


export default function* gen() {
  yield takeLatest(`${TYPES.ADD_PERSON}@saga@`, workingDo) //自动会把action传递给workingDo 并且while(true){}循环监听
}
