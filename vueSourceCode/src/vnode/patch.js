import { isSameVnode } from './index'
function createComponent(vnode) {
    let i = vnode.data
    if ((i = i.hook) && (i = i.init)) {
        i(vnode) //初始化组件
    }
    if (vnode.componentInstance) {
        return true  //说明是组件
    }
}


//创建真实的元素
export function createElm(vnode) {
    let { tag, data, children, text } = vnode
    if (typeof tag === 'string') {

        //创建真实的元素 也要区分是组件还是元素
        if (createComponent(vnode)) { //组件 
            return vnode.componentInstance.$el  //插入到组件对应的页面
        }


        vnode.el = document.createElement(tag)
        patchProps(vnode.el, data)
        children.forEach(child => {
            vnode.el.appendChild(createElm(child)) //组件的话可能会有递归
        })
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}

//处理属性
export function patchProps(el, oldProps = {}, props = {}) {

    let oldStyles = oldProps.style || {}
    let newStyles = props.style || {}
    for (let key in oldStyles) {
        if (!newStyles[key]) {
            el.style[key] = ''
        }
    }

    for (let key in oldProps) {
        if (!props[key]) {
            el.removeAttribute(key)
        }
    }

    for (let key in props) {
        if (key === 'style') {
            for (let styleName in props.style) {
                el.style[styleName] = props.style[styleName]
            }
        }
        el.setAttribute(key, props[key])
    }
}

export function patch(oldVNode, vnode) {
    //这里是组件调用$mount() 的时候 没有传入el的情况
    if (!oldVNode) {  //这就是组件的挂载
        return createElm(vnode) //vm.$el  对应的就是组件渲染的结果 //走了递归
    }

    //初始渲染过程
    const isRealElement = oldVNode.nodeType //判断是否是真实的元素
    if (isRealElement) {
        const elm = oldVNode //获取真实的元素
        const parentElm = elm.parentNode //拿到父元素
        let newElm = createElm(vnode) //创建真实dom
        parentElm.insertBefore(newElm, elm.nextSibling) //在我们的元素后面添加新元素
        parentElm.removeChild(elm) //把之前的元素删除
        return newElm
    } else { //虚拟节点比较
        //diff算法
        //两个节点不是同一个节点 直接删除掉老的换上新的
        //两个节点是同一个节点 比较节点属性是否有差异（新的属性替换）
        //节点比较完毕之后就需要比较子节点
        return pathVnode(oldVNode, vnode)
    }
}
function pathVnode(oldVNode, vnode) {
    //最外层节点比较不相同的情况 直接全部替换
    if (!isSameVnode(oldVNode, vnode)) {
        let el = createElm(vnode) //创建新的
        oldVNode.el.parentNode.replaceChild(el, oldVNode.el) //替换掉
        return el
    }
    //第一层 文本的情况
    let el = vnode.el = oldVNode.el //复用老节点的元素
    if (!oldVNode.tag) { //说明是文本
        if (oldVNode.text !== vnode.text) {
            el.textContent = vnode.text //新的替换老的文本
        }
    }
    //第一层 是标签  对比标签属性patchProps
    patchProps(el, oldVNode.data, vnode.data) //属性


    //比较儿子节点 两种情况 两方都有儿子 一方有一方没有
    let oldChildren = oldVNode.children || []
    let newChildren = vnode.children || []

    if (oldChildren.length > 0 && newChildren.length > 0) {  //两个人都有儿子
        updateChildren(el, oldChildren, newChildren)
    } else if (newChildren.length > 0) { //就只有新的
        mountChildren(el, newChildren)
    } else if (oldChildren.length) { //新的没有 直接删除旧的
        el.innerHTML = ''
    }

    return el
}

function mountChildren(el, newChildren) {
    for (let i = 0; i > newChildren.length; i++) {
        let child = newChildren[i]
        el.appendChild(createElm(child))
    }
}

function updateChildren(el, oldChildren, newChildren) {
    //根据 push pop unshift shift reverse sort 就行处理
    // 头头 尾尾 交叉 比较 指针（索引移动位置判断）
    //vue2采用双指针的方式 比较两个节点
    //准备4个指针
    let oldStartIndex = 0 //旧的开始指针
    let newStartIndex = 0 //新的开始指针
    let oldEndIndex = oldChildren.length - 1 //旧的结束指针
    let newEndIndex = newChildren.length - 1 //新的结束指针

    //新旧头尾的元素比较
    let oldStartVnode = oldChildren[0]
    let newStartVnode = newChildren[0]
    let oldEndVnode = oldChildren[oldEndIndex]
    let newEndVnode = newChildren[newEndIndex]

    //乱序比对 需要一个映射表
    function makeIndexByKey(children) {
        let map = {}
        children.forEach((child, index) => {
            map[child.key] = index
        })
        return map //{a：0,b:1,c:3}
    }

    let map = makeIndexByKey(oldChildren)


    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) { //有任何一个不满足就停止  双方有一方头指针，大于尾部指针就停止循环  //可能是添加元素也可能是删除元素  
        if (!oldStartVnode) { //前面往后 如果循环比对过程中遇到undefinded的节点就不做处理 跳过即可
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) { //后面往前
            oldEndVnode = oldChildren[--oldEndIndex]
        }
        //头头比较 abc abcd
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            pathVnode(oldStartVnode, newStartVnode) //如果是相同节点，则递归比较子节点
            oldStartVnode = oldChildren[++oldStartIndex]
            newStartVnode = newChildren[++newStartIndex]
            //比较开头节点
            //尾尾比较 abc dabc
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            pathVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldChildren[--oldEndIndex]
            newEndVnode = newChildren[--newEndIndex]
            //交叉比较 abcd dabc  就是头尾都对不上
        }  //交叉比较
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            pathVnode(oldEndVnode, newStartVnode)
            //insertBefore 具有移动性 会将原来的元素移动走
            el.insertBefore(oldEndVnode.el, oldStartVnode.el) //将老的尾巴移动到老的前面去
            oldEndVnode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
        } //交叉比较 abcd dcba
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            pathVnode(oldStartVnode, newEndVnode)
            el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling) // oldEndVnode.el.nextSibling代表最后的元素的后面null的前面
            oldStartVnode = oldChildren[++oldStartIndex]
            newEndVnode = newChildren[--newEndIndex]
        } //乱序比对
        else {
            // abcd  bceadf 前面是旧后面是新 前面的例子同理
            //在给动态列表添加key时 要避免使用索引，因为索引前后都是从0开始，可能会发生错误复用
            //乱序比对 根据老的列表做一个映射关系，用新的去查找，找到就移动，找不到就添加到t头部指针的前面去，最后多余的就删除
            let moveIndex = map[newStartVnode.key] //如果拿到则说明是我要移动的索引
            if (moveIndex !== undefined) {
                let moveVnode = oldChildren[moveIndex]//找到对应的虚拟节点 复用
                el.insertBefore(moveVnode.el, oldStartVnode.el) //把老的虚拟节点插入到虚拟节点最前面
                oldChildren[moveIndex] = undefined //表示这个节点已经移动走了
                pathVnode(moveVnode, newStartVnode) //对比属性和子节点
            } else {
                el.insertBefore(createElm(newStartVnode), oldStartVnode.el)
            }

            newStartVnode = newChildren[++newStartIndex]
        }
    }
    //while循环完毕 比较完 可能有多有少 就做添加或删除处理
    if (newStartIndex <= newEndIndex) { //新的多了 就把多余的插入进去
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            let childEl = createElm(newChildren[i])
            //这里可能是向后追加，还有可能是向前面追加  newChildren[newEndIndex + 1]--》在前面追加 前面追加的话追加元素的后面肯定是有元素的 根据这个原则比较
            let anchor = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].el : null //获取下一个元素
            // el.appendChild(childEl)
            el.insertBefore(childEl, anchor) //anchor为null 代表是appendChild
        }
    }
    if (oldStartIndex <= oldEndIndex) { //老的多了,需要删除老的
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldChildren[i]) { //有值就删除掉 如果是undefinded就不做处理
                let childEl = oldChildren[i].el //老的el已经是真实的元素
                el.removeChild(childEl)
            }
        }
    }
}

//稍稍总结 都有儿子的情况下比较

// abc adcd 头部头部比较 匹配到了各自指针往后移动 一级一级比较 相同的直接复用以前的 开始指针超过结束指针 则看新的元素是多还是少 多就创建新元素 添加到最后 少就删除老的节点
// abc dabc 尾部尾部比较 从尾部开始各自指针向前移动 一级一级比较 相同直接复用以前的 结束指针超过开始指针 则看新的元素是多还是少 多就创建新元素 添加到前面 少就删除老的节点
// abcd dabc 交叉比较（从尾部开始） 头头尾尾都没有匹配到则 尾头比较 有相同 就复用（把匹配到的旧元素 插入到旧元素最前面） 并且旧的尾部指针和新的开始指针各自向前向后移动
// abcd dcba 交叉比较（从头部开始） 头头尾尾都没有匹配到则 头尾比较 有相同 就复用（把匹配到的旧元素 插入到旧元素最后面的下一个兄弟的前面） 并且旧的头部指针和新的结束指针各自向后向前移动
// abcd  bceadf 前面情况都没有 就是乱序情况 旧元素会做一个映射关系 从新元素头部开始 去映射表中看是否有相同 如果没有相同就创建新元素插入到旧元素开始指针元素的前面 并且新元素开始指针向后移 如果有相同元素 那么就把匹配到的旧元素插入到旧元素开始指针的前面  并且新元素开始指针向后移 同事记得把匹配到的旧元素改为undefinded 遇到undefinded指针就跳过该元素