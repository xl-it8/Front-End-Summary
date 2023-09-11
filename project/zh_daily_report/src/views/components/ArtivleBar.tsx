import React,{useEffect, useMemo}  from 'react'
import { Badge,Toast } from 'antd-mobile'
import { useParams } from 'react-router-dom'
import './ArtivleBar.scss'
import { LeftOutline,FillinOutline,LikeOutline,StarOutline,SendOutline  } from 'antd-mobile-icons'
import { storeRemove, store2} from '@/api'
import {RouteProps} from '@/global'
import { connect } from 'react-redux'

import action from '@/store/actions'
import store from '@/store/index'
interface Fn {
  store:{
    list: {id:string}[]
  }
  base:{info:{}}
  queryUserInfoAsync(): Promise<{
    type: string;
    info: any;
}>
  queryStoreListAsync(): Promise<{
    action: string;
    list: any;
}>
  removeStoreListById(id:string): {
    type: string;
    id: string;
};
  comments:number
}
const ArtivleBar:React.FC<Partial<Fn> & Pick<RouteProps,'navigate' | 'location'>> = (props)=>{
    let {comments,navigate, location} = props

    let params = useParams<{id: string}>() //Key extends string = string如果没有Key就默认是string 传了就继承string
    let id = params.id as string
        //=========下面的逻辑是关于登录/收藏的
      //   let {
      //      queryUserInfoAsync,
      //     queryStoreListAsync, removeStoreListById
      // } = {...action.base,...action.store};
      let {base:{info:userInfo},store:{list:storeList}} = store.getState()
          let {
           queryUserInfoAsync,
          queryStoreListAsync, removeStoreListById
      } = props;
      useEffect(() => {
          (async () => {

              // 第一次渲染完:如果userInfo不存在,我们派发任务同步登录者信息
              if (!userInfo) {
                   queryUserInfoAsync &&  queryUserInfoAsync();
                   let {base:{info}} = store.getState()
                  userInfo = info;
              }
              // 如果已经登录 && 没有收藏列表信息:派发任务同步收藏列表
              if (userInfo && !storeList) {
                queryStoreListAsync && queryStoreListAsync();
              }
          })();
      }, []);
      // 依赖于收藏列表和路径参数,计算出是否收藏
      let isStore = useMemo(() => {
          if (!storeList) return false;
          return storeList.some((item:any) => {
              return +item.news.id === +id;
          });
      }, [storeList, params]);
  
      // 点击收藏按钮
      let handleStore = async () => {
          if (!userInfo) {
              // 未登录
              Toast.show({
                  icon: 'fail',
                  content: '请先登录'
              });
              navigate({
                pathname:'/login',
                search: `?to=${location.pathname}`
              }, { replace: true });
              return;
          }
          // 已经登录:收藏或者移除收藏
          if (isStore) {
              // 移除收藏
              let item = storeList.find((item: any) => {
                  return +item.news.id === +id;
              })
              if (!item) return;
              let { code } = await storeRemove(item.id);
              if (+code !== 0) {
                  Toast.show({
                      icon: 'fail',
                      content: '操作失败'
                  });
                  return;
              }
              Toast.show({
                  icon: 'success',
                  content: '操作成功'
              });
              removeStoreListById&&  removeStoreListById(item.id); //告诉redux中也把这一项移除掉
              return;
          }
          // 收藏(未收藏)
          try {
              let { code } = await store2(id);
              if (+code !== 0) {
                  Toast.show({
                      icon: 'fail',
                      content: '收藏失败'
                  });
                  return;
              }
              Toast.show({
                  icon: 'success',
                  content: '收藏成功'
              });
              queryStoreListAsync&& queryStoreListAsync(); //同步最新的收藏列表到redux容器中
              
          } catch (_) { }
      };
  

  return <div className="artivleBar_box">
   <div className="artivleBar_left" onClick={()=>navigate(-1)}>
       <LeftOutline fontSize={20}/>
   </div>
   <div className="artivleBar_right">
     <Badge content={comments}>
       <FillinOutline fontSize={20}/>
     </Badge>
     <Badge content='5'>
       <LikeOutline fontSize={20} />
     </Badge>
     <StarOutline fontSize={20} color={isStore ? '#76c6b8':''} onClick={()=>handleStore()}/>
     <SendOutline fontSize={20}/>
   </div>
  </div>
}

export default connect<{},{},{},{base:{info:{}},store:{}}>(state=>{
  return {
    base: state.base,
    store: state.store
  }
},{...action.base,...action.store})(ArtivleBar)

