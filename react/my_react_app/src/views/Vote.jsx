import React,{useContext,useState,useEffect} from 'react'
import VoteMian from './VoteMain'
import VoteFooter from './VoteFooter'
import themeContext from '../store/context'
import '../style/vote.scss'
const Vote =  function(){
  const {getState,subscribe} = useContext(themeContext)
  const {oppNum,supNum  } = getState() //获取store的数据
  //订阅事件池
  const [_, useNum] = useState(0)
  useEffect(()=>{
    subscribe(()=>useNum(Date.now()))
  },[])//页面渲染完毕后执行
  return(
    <div className='vote_views'>
    <div style={{display:"flex",justifyContent:'space-between'}}>
        <h3>统计表</h3>
        <div>总人数:{oppNum + supNum }</div>
    </div>
    <main>
      <VoteMian></VoteMian>
    </main>
    <footer>
      <VoteFooter/>
    </footer>
 </div>
  )
    
}

export default Vote



