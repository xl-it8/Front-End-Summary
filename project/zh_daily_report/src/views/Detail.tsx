import React,{ useState, useEffect} from 'react'
import { flushSync } from 'react-dom';
import ArtivleBar from './components/ArtivleBar'
import { getNewsDetail, getStoryExtra } from '@/api'
import './Detail.scss'
import { RouteProps } from '@/global';
const Deatil:React.FC<RouteProps> =function(props){
  let {params,navigate,location} = props
  const [comments,setComments] =  useState<number>(0),
        [info, setInfo] = useState<{body: string}>({body: ''})

  const  handleStyle =(css:string[])=>{
   // <link rel="stylesheet" href="">
     const link = document.createElement('link')
     link.rel = 'stylesheet'
     link.href = css[0]
     document.head.appendChild(link)
     
  }
  const handleImage =(image:string)=>{
      const imgPlcaeHolder = document.querySelector('.img-place-holder')
      if(!imgPlcaeHolder) return
      const img = new Image()
      img.src = image
      img.onload = function(){
         imgPlcaeHolder.appendChild(img)
      }
      img.onerror = function(){
        const parent =  imgPlcaeHolder.parentNode
        parent?.parentNode?.removeChild(parent)
      }

  }
  useEffect(()=>{
    (async()=>{
        try {
           const result = await getNewsDetail(params.id as string)
           flushSync(() => {
            setInfo(result);
            handleStyle(result);
        });
          handleImage(result.image);
         //  console.log(result.css)
        }catch(_){
        }
    })()
  }, [])
  useEffect(()=>{
    (async()=>{
        try {
           const res = await getStoryExtra(params.id as string)
           setComments(res.comments)
        }catch(_){
        }
    })()
  }, [])
  return <div className='detail_box'>
    <div className='detail_main' dangerouslySetInnerHTML={{__html: info.body}}>
    </div>
    <ArtivleBar comments={comments} navigate={navigate} location={location}></ArtivleBar>
  </div>
}

export default Deatil