const isReservedTag = (tag) => {
    return ['a', 'div', 'p', 'button', 'ul', 'li', 'span'].includes(tag)
}


export function createElementVNode(vm, tag, data, ...children) { //...children 数组  函数有arguments为数组 还有剩余参数 需要接受
    if (data == null) {
        data = {}
    }
    let key = data.key
    if (key) {
        delete data.key
    }

    if (isReservedTag(tag)) { //判断标签是原生标签
        return vnode(vm, tag, key, data, children) //是原生标签
    } else { //组件标签
        let Ctor = vm.$options.components[tag] //组件的构造函数

        //Ctor就是组件的定义 可能是一个Sub类 还有可能是组件的obj选项
        return createComponentVnode(vm, tag, key, data, children, Ctor)
    }

}

function createComponentVnode(vm, tag, key, data, children, Ctor) {
    if (typeof Ctor === 'object') {
        vm.$options._base.extend(Ctor) //如果是对象就转为子类构造函数
    }
    data.hook = {
        init(vnode) {
            //保存组件的实例到虚拟节点上
            let instance = vnode.componentInstance = new vnode.componentOptions.Ctor
            instance.$mount() //挂载
        }
    }
    return vnode(vm, tag, key, data, children, null, { Ctor })
}

export function createTextVNode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}


// ast是仅仅解析模板不能自定义添加内容 而render函数处理操作的是虚拟dom 可以灵活控制 
function vnode(vm, tag, key, data, children, text, componentOptions) {
    return {
        vm,
        tag, //标签
        key, //key
        data, //属性
        children, //儿子
        text, //文本
        componentOptions //组件的构造函数Sub
    }
}

export function isSameVnode(vnode1, vnode2) {
    return vnode1.tag === vnode2.tag && vnode1.key === vnode2.key
}

