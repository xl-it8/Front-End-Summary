import React,{ useEffect, useState, useRef}  from 'react'
import HeadNav from '@/components/HeadNav'
import { Link } from 'react-router-dom'
import ArticleItem from '@/components/ArticleItem'
import { Swiper, PageIndicator, Image, DotLoading, InfiniteScroll} from 'antd-mobile'
import MySkeleton from '@/components/MySkeleton'
import { getNewsList } from '@/api'
import './Home.scss'
import { Tarticle } from '@/global'
import Demo from '@/components/demo'
const dot = {
  '--dot-color': 'rgba(0, 0, 0, 0.4)',
  '--active-dot-color': '#ffc0cb',
  '--dot-size': '10px',
  '--active-dot-size': '30px',
  '--dot-border-radius': '50%',
  '--active-dot-border-radius': '15px',
  '--dot-spacing': '8px',

}

const Home = function(){
  const [swaggerList,setSwaggerList] = useState<Tarticle[]>([]),
        [date,setDate] = useState(''),
        [stories,setStories] = useState<Tarticle[]>([])

  const [hasMore, setHasMore] = useState(true)
  async function loadMore() {
      const { stories: newStories
      } =  await getNewsList()
      setStories(val => [...val, ...newStories])
      setHasMore(newStories.length > 0)
  }
  useEffect(()=>{
    (async()=>{
        try {
           const {top_stories, stories,
            date
          } = await getNewsList()
           setSwaggerList(top_stories)
           setDate(date)
           setStories(stories)
          //  console.log(res)
        }catch(_){
        }
    })()
  }, [])
  return <div className='home_box'>
    <HeadNav date={date}/>
    <Demo menu={{a:1}}></Demo>
    <div className='swagger'>
      {
        swaggerList.length !== 0 ?  <Swiper indicator={(total, current) => (
       <div className="customIndicator"> <PageIndicator
               total={total}
               current={current}
               style={dot}/></div>
            )}>{
              swaggerList.map((item: Tarticle,index)=>{
               return <Swiper.Item key={index}>
              <div
                className='content'
              >
                 <Link to={{ pathname: `/detail/${item.id}` }}>
                 <Image src={item.image} lazy />
                <div className='main_content'>
                      <div className='main_title'>{item.title}</div>
                      <div className='main_author'>{item.hint}</div>
                </div>
                </Link>
              </div>
            </Swiper.Item>
              })
              
            }</Swiper> : null
      }
      
    </div>
    <div className='article_list'>
      {
        !stories.length ? <MySkeleton lineCount={4}/> :
        stories.map((item:Tarticle, index)=>{
          return <ArticleItem key={index} aticleItem={item}/>
        })                
      }
    </div>

     {/* 加载更多 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
      {hasMore ? (
        <>
          <span>Loading</span>
        </>
      ) : (
        <span>--- 我是有底线的 ---</span>
      )}
      </InfiniteScroll>
  </div>
}

export default Home