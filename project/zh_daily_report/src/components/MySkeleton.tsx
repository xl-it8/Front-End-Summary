import React from 'react'
import { Skeleton } from 'antd-mobile'
// import PropTypes from 'prop-types'
// import {RouteProps} from '@/global'
interface p {
  lineCount: number
}
const MySkeleton:React.FC<p> =(props)=>{
  const { lineCount } = props
  return <div>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={lineCount} animated />
  </div>
}

// MySkeleton.defaultProps ={
//   lineCount: 4
// }

// MySkeleton.propTypes ={
//   lineCount: PropTypes.number.isRequired
// }
// interface xx {
//   a: number
// }
//  interface yy extends xx {
//    c: number
//  }



export default MySkeleton