
import componentMap from './map'
export const handleItem = (formItem) => {
    const item = {...formItem}
    item.type = componentMap[item.type].type
    item.attrs = { ...componentMap[formItem.type].attrs, ...formItem.attrs }

    return item
}