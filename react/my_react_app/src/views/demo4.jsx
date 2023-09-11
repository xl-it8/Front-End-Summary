
import React,{useState,useEffect,useRef, useImperativeHandle, useMemo, useCallback
} from 'react'

const Child = React.memo(React.forwardRef(function(props, ref){
    const [name, setName] = useState('lijing')
    console.log('子组件也渲染了')
    return <div>
        <div>{name}</div>
        {/*获取内部dom的方式 */}
        <div ref={ref}>哈哈</div>
    </div>
}))
let prv;
let ratioPrv;

const usePartialState = (initValue)=>{
   const [obj, setObj] = useState(initValue)
     const setObj2 =(newValue)=>{
        setObj({
           ...obj,
           ...newValue
        })
     }
    return [obj, setObj2]
}
const demo = function(props){
    let [data, setObj] =usePartialState({
        zc:20, //支持
        fd:80, //反对
       num: 0
    })


     const x = useRef(null)

    //  const zcRatio =Math.floor(data.zc / (data.zc + data.fd)*100) + '%'  逻辑一样 但没必要每次都重新计算新的 浪费性能
    const zcRatio = useMemo(()=>{
        console.log('binhua')
        return Math.floor(data.zc / (data.zc + data.fd)*100) + '%'
    },[data.zc, data.fd])
     if(!ratioPrv){
        ratioPrv = zcRatio
     }else {
        console.log(ratioPrv === zcRatio)
     }
     const handle =useCallback(()=>{},[]) 
     if(!prv){
        prv =  handle
     }else {
        console.log(prv === handle) //false 每次重新调用函数会新生成地址
     }
    //  useEffect(()=>{
    //     console.log(x)
    //  })

    return (
        <div>
            <div>num:{data.num}</div>
            <div>
                <div>支持: {data.zc}人</div>
                <div>反对: {data.fd}人</div>
                <div>总人数: {data.zc + data.fd}人</div>
                <div>支持占比:{zcRatio}</div>
            </div>
            <div>
                <button onClick={()=> {setObj({
                    zc: data.zc+ 1
                })}}>增加</button>
                <button onClick={()=> {setObj({
                    num: data.num + 1
                })}}>增加num</button>
            </div>
            <div>
                <Child ref={handle}></Child>
            </div>
        </div>
    )
}

export default demo