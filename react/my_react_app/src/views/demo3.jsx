
import React,{useState,useEffect,useRef, useImperativeHandle
} from 'react'

const Child = React.forwardRef(function(props, ref){
    const [name, setName] = useState('lijing')
    console.log(React)
    // useImperativeHandler(ref,()=>{
    //     return {
    //         name
    //     }
    // })
    return <div>
        <div>{name}</div>
        {/*获取内部dom的方式 */}
        <div ref={ref}>哈哈</div>
    </div>
})

const demo = function(props){
    let [num, setNum] =useState(0)
     const x = useRef(null)
     useEffect(()=>{
        console.log(x)
     })

    return (
        <div>
            <div>x:{num}</div>
            <div>
                <button onClick={()=> {setNum(num)}}>减少</button>
            </div>
            <div>
                <Child ref={x}></Child>
            </div>
        </div>
    )
}

export default demo