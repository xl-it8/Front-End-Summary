import { createStore,applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga' //设置saga中间件
import reducers from './reducers/index'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(saga)
export default store
// import createStore from '../utils/jsHandler.jsx'

// const initial = {
//   supNum: 3,
//   oppNum: 4,
// }
// function reducer(state = initial, action) {
//   state = { ...state }
//   switch (action.type) {
//     case 'SUP':
//       state.supNum += 1
//       break
//     case 'OPP':
//       state.oppNum -= 1
//       break
//     default:
//   }

//   return state
// }