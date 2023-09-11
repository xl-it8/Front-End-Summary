/* eslint-disable vue/no-mutating-props */
import { defineComponent, computed, inject, ref, onMounted} from "vue"

export default defineComponent({
  props:{
    block:{
        type:Object
    }
  },
  setup(props){
    const blockStyle =computed(()=>{
      return {
        top:`${props.block.top}px`,
        left:`${props.block.left}px`,
        "z-index":`${props.block['z-index']}px`,
      }
    })
    const blockRef = ref(null)
    const config = inject('config')
    onMounted(()=>{  //组件挂载完毕之后触发
     let {offsetWidth, offsetHeight} = blockRef.value //获取元素对象的宽高
     if(props.block.alignCenter){
      props.block.left = props.block.left - offsetWidth/2
      props.block.top = props.block.top - offsetHeight/2
      props.block.aliginCenter= false
     }
     props.block.width = offsetWidth
     props.block.height = offsetHeight

    })



    //获取映射组件
    const mapComponent = config.componentMap[props.block.key] //用户提供的key 映射
    const  regisetComponent= mapComponent.render()
    //  console.log(config)
    return ()=>(
      <div class="editor_block" style={blockStyle.value} ref={ blockRef }>
          {regisetComponent} 
      </div>
    )   
  }
})