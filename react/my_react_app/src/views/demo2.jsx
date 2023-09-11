import {useState} from 'react'
import {flushSync} from 'react-dom'
const demo = function(props){
    let [num, setNum] =useState(0)

     const handleNum =()=>{
        //批处理只执行一次 在update队列中一次性执行 页面只更新一次
        setNum(++num)
  flushSync(()=>{ //遇到这个就是强制更新
            setNum(++num)
          })

      
     }

     console.log('render')
    return (
        <div>
            <div>x:{num}</div>
            <div>
                <button onClick={handleNum}>增加</button>
                <button onClick={()=> {setNum(num)}}>减少</button>
            </div>
        </div>
    )
}

export default demo