import React from 'react'
import * as TYPES from '../store/action_types'
import {useDispatch, useSelector} from 'react-redux'
const SagaDemo = function(){
    const dispatch = useDispatch(),
          {count} = useSelector(state=> state.person)
    return <div>
        <div>公务员报名</div>
        <div>报名总人数：{ count }</div>
        <div>
        <button onClick={()=>dispatch({
    type: TYPES.ADD_PERSON,
    payload: 5
  })}>同步添加</button>
        <button onClick={()=>dispatch({type:`${TYPES.ADD_PERSON}@saga@` ,payload: 10})}>异步添加</button>
        </div>
    </div>
}

export default SagaDemo