import React,{Component,useState} from 'react';

import PropTypes from 'prop-types'
//pureComponent与Component区别  就说第一个是浅比较 只比较第一层的地址 发生变化重新渲染页面没有就不触发

//refs 类中有三种方式  ref='xxx' this.$refs.xxx   createRef() ref=   onClick={(e)=> this.xxx = e}
//setState 可以传递函数

class Dialog extends Component {
 static defaultProps = {
    width : '200px',
    height :'200px'
  }
  static propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }
  render(){
   const {width,height} = Dialog.defaultProps
    return (
        <div style={{width,height,border:'1px solid black'}}>
            <div>你好</div>
            <div>你好去</div>
        </div>
    )
  }
}
//函数式组件初次渲染完毕之后 修改页面中的内部不会再次重新渲染 需要借助勾子
// function Dialog(props){ //props是只读的 Object.freeze(props)冻结了
//   let {width, height, children} = props
//   children = React.Children.toArray(children) //把children转为数组
//   let main = []
//   let footer= []
//   children.forEach(item => {
//     if(item.props.slot){
//        if(item.props.slot === 'main'){
//         main.push(item)
//        }
//        if(item.props.slot === 'footer'){
//         footer.push(item)
//        }
//     }
//   })
//    let [num ,useNum] = useState(0)
//   return (
//     <div className='dialog' style={{width,height,border:'1px solid black'}}>
//   <div className="top" style={{background: 'red', display: 'flex',justifyContent:'space-between',alignItems:'center'}}>
//      <div>标题</div>
//      <div>X</div>
//   </div>
//     {num}
//     <div slot="opertate">
//          <button onClick={()=> {console.log(num); return useNum(--num)} }>减1</button>
//          <button onClick={()=> {console.log(num);  return useNum(++num)} }>加1</button>
//     </div>
//    {main}
//    {footer}
// </div>
//   )
// }
// Dialog.defaultProps = {
//     width:'200px',
//     height:'200px'
// }
// Dialog.propTypes = {
//     width: PropTypes.string.isRequired,
//     height: PropTypes.string.isRequired,
// }
// PropTypes
export default Dialog

