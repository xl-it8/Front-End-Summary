import React,{useEffect}  from 'react'
import NavBarAgain from '../components/NavBarAgain';
import { List, Toast} from 'antd-mobile'
import './Personal.scss'
import { connect } from 'react-redux';
import action from '@/store/actions'
import {RouteProps} from '@/global'
interface Fn {
   info:{
      pic: string
      name: string
      phone: string
   }
   
   clearUserInfo(): {
     type: string;
     info: string;
 }
 clearStoreList(): {
   type: string;
   info: string;
}
 }
const Personal:React.FC<Fn & Pick<RouteProps,'navigate'>> =function(props){
  const {info,clearUserInfo, clearStoreList, navigate } = props
//   console.log(props)
  const signout =()=>{
    // 清除redux中的信息
    clearUserInfo()
    clearStoreList()
    // 清除Token
    localStorage.removeItem('tk');
    // 提示
    Toast.show({
        icon: 'success',
        content: '您已安全退出'
    });
    // 跳转
    navigate('/login?to=/personal', { replace: true });
  }
  
  return <>
   <NavBarAgain/>
     <div className='persona_box'>
  
     <div className='personal' onClick={()=> navigate('/update')}>
        <div className='personal_img' >
           <img src={info.pic} alt="" />
        </div>
        <div className='personal_name'>
        {info.name}
        </div>
     </div>
     <div className='list'>
       <List>
         <List.Item onClick={()=>navigate('/store')}>
         我的收藏
         </List.Item>
         <List.Item  onClick={signout}>
          退出登录
         </List.Item>
       </List>
     </div>
  </div>
  </>

}

export default connect<{},{},{},{base:{info:{}}}>(state=>state.base,{
   clearUserInfo: action.base.clearUserInfo,
   clearStoreList: action.store.clearStore
})(Personal)