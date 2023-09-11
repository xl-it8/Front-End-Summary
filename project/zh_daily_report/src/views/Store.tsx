import React,{useEffect}  from 'react'
import NavBar from '@/components/NavBarAgain'
import ArticleItem from '@/components/ArticleItem'
import NavBarAgain from '../components/NavBarAgain';
import {connect} from 'react-redux'
import action from '@/store/actions'
import { storeRemove} from '@/api'
import {SwipeAction, Toast} from 'antd-mobile'
import './Store.scss'
import MySkeleton from '@/components/MySkeleton';
interface Fn {
   queryStoreListAsync(): Promise<{
      action: string;
      list: any;
  }>
  list:{id:string,news:{id:string,image:string,title:string}}[]
   removeStoreListById(id:string):{}
 }
const Store:React.FC<Fn> =function(props){
   const {list,removeStoreListById,queryStoreListAsync} = props
   console.log(props)
   console.log(list)
   useEffect(() => {
      // 第一次加载完毕:如果redux中没有收藏列表,则异步派发获取
      if (!list) queryStoreListAsync();
  }, []);
   const handleRemove =async (id:string)=>{
      try {
         let { code } = await storeRemove(id);
         if (+code !== 0) {
             Toast.show({
                 icon: 'fail',
                 content: '移除失败'
             });
             return;
         }
         Toast.show({
             icon: 'success',
             content: '移除成功'
         });
         removeStoreListById(id);
     } catch (_) { }
   }
  return <>
  <NavBarAgain/> 
  <div className='store_box'>
   <div className='store_lsit'>
   {list ?
            <div className="box">
                {list.map(item => {
                    let { id, news } = item;
                    return <SwipeAction key={id} rightActions={[{
                        key: 'delete',
                        text: '删除',
                        color: 'danger',
                        onClick: handleRemove.bind(null, id)
                    }]}>
                        <ArticleItem aticleItem={news}></ArticleItem>
                    </SwipeAction>;
                })}
            </div> :
            <MySkeleton lineCount={5}/>
        }
     
  </div>
</div>
</>
}
  
export default connect<{},{},{},{store:{lsit:[]}}>(
   state => state.store,
   action.store
)(Store);