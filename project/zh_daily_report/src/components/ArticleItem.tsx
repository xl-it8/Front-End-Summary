import React from 'react'
import { Link } from 'react-router-dom'
import './ArticleItem.scss'
import { Tarticle } from '@/global'
const ArticleItem:React.FC<{aticleItem: Tarticle}> =(props)=>{
    const { aticleItem } = props
return <Link to={{ pathname: `/detail/${aticleItem.id}` }}>
   <div className="component_articleItem">
    <div className='articleItem_left'>
        <div>{aticleItem.title}</div>
        <div>{aticleItem.hint}</div>
    </div>
    <div className='articleItem_right'>
      <img src={(aticleItem.images && aticleItem.images[0]) || aticleItem.image} alt="" />
    </div>
</div>
</Link>
}

export default ArticleItem