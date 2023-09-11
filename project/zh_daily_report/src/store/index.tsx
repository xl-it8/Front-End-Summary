import {createStore,applyMiddleware} from 'redux'
import reduxPromise from 'redux-promise' //需要我下载@types/redux-promise ts文件
import reducer from './reducer'
const store = createStore(reducer,applyMiddleware(reduxPromise))

export default store