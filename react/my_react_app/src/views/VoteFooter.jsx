import React,{useContext} from 'react'
import themeContext from '../store/context'
const VoteFooter =()=>{
     const store = useContext(themeContext)
        return <div>
           <button onClick={()=>{
             store.dispatch({
                type:'SUP' //这里可以使用action统一的标识
             })
           }}>支持</button>
           <button onClick={()=>{
            store.dispatch({
                type:'OPP'
             })
        }}>反对</button>
        </div>
  }

export default VoteFooter