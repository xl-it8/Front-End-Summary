import React,{useEffect} from 'react'
import './HeadNav.scss'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import action from '@/store/actions'
import touxiang from '../asstes/images/timg.jpg' //创建类型声明
const handelDate =(date: string)=>{
    const reg = /^(\d{4})(\d{2})(\d{2})$/
    const arr = reg.exec(date) as RegExpExecArray
    return arr ? [arr[1],arr[2],arr[3]] : [null,null,null]
}
const HeadNav:React.FC<{date:string,info?: {pic:string},queryUserInfoAsync?:()=>void}> = function(props){ 
    const navigate = useNavigate()
    const { date, info, queryUserInfoAsync} = props  //"20230516"
useEffect(() => {
    if (!info) {
        queryUserInfoAsync && queryUserInfoAsync();
    }
}, []);
    const arr = handelDate(date)
    return <div className='component_head'>
         <div className='head_left'>
            <div>
                <div>{arr[2]}</div>
                <div>十月</div>
            </div>
            <div>
               早点休息
            </div>
         </div>
         <div className='head_right' onClick={()=>navigate('/personal')}>
                <img src={info ? info.pic : touxiang} alt="" />
         </div>
    </div>
}

export default connect<{},{},{},{base:{info:{pic:string}}}>(state=> state.base, action.base)(HeadNav)