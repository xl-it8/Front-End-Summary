
import mapElement from './elementMap'
export const handleTopData = (item) => {
    const { name } = item
    const defineItem = mapElement[name] //获取已定义的项
    item.props = { ...defineItem.props, ...item.attrs }
    item.name = defineItem.name //改变组件名字



    console.log(item)
    return item
}