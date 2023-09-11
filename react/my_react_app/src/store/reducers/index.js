import {combineReducers} from 'redux'
import person_reducer from './person_reducer'
export default combineReducers({
    person: person_reducer
})