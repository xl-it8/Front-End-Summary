function createEditorConfig(){
    const componentList=[] //用来处理左侧菜单栏的
    const componentMap =[] //用来实现中间内容区域的映射关系
    return {
        componentList,
        componentMap,
        register:(config)=>{
            componentList.push(config)
            componentMap[config.key]= config
        }
    }
}
export const editorConfig  =createEditorConfig()

editorConfig.register({
    label:'输入框',
    preview:()=><el-input></el-input>,
    render:()=> <el-input></el-input>,
    key:"elInput"
})
editorConfig.register({
    label:'按钮',
    preview:()=><el-button>预览按钮</el-button>,
    render:()=><el-button>预览按钮</el-button>,
    key:"elButton"
})