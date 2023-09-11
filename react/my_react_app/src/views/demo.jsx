import {useState,useEffect} from 'react'
import {flushSync} from 'react-dom'
const demo = function(props){
    let [num, setNum]=useState(0),
        [x, setX]=useState(100)

     const handleNum =()=>{
        // ++num相当于直接改了全局的num 这样是有问题的
        setNum(num + 1)
     }

    //  componentDidMount 和更新 调用
     useEffect(()=>{
        console.log(num)
     })
    // 只会在初次挂载之后调用一次 更新不调用
     useEffect(()=>{
        console.log(num)
     },[])

    // 初次挂载调用一次 以及依赖项变化就调用
     useEffect(()=>{
        console.log(num)
     },[num])

    //返回的函数会等下一次更新时调用获取上一次旧的值
     useEffect(()=>{
        // console.log(num)
        return ()=>{
            console.log(num) 
        }
     })
     console.log('render')
    return (
        <div>
            <div>num:{num}</div>
            <div>x:{x}</div>
            <div>
                <button onClick={handleNum}>增加</button>
            </div>
        </div>
    )
}

export default demo