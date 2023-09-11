const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// 第一个分组就是属性的key value就是 分组3/分组4/分组5
const dynamicArgAttribute =
    /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) //匹配到的分组是一个 标签名 <xxx 匹配是开始标签的名字
const startTagClose = /^\s*(\/?)>/ //<br/>  />
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) //匹配的是</XXX>  最终匹配的分组就是结束标签的名字
const doctype = /^<!DOCTYPE [^>]+>/i
const comment = /^<!\--/
const conditionalComment = /^<!\[/


// 元素节点 标签
// 文本节点 空格 换行 文字
//属性节点  id=''
// 原则 从开始标签匹配 匹配完之后再删除掉 匹配一个删除一个


export function parseHtml(html) {

    const ELEMENT_TYPE = 1; //元素类型的nodeType 为1
    const TEXT_TYPE = 3; //文本类型的nodeType 为3
    const stack = [] //用与存放元素的(栈就是数组结构)
    let currentParent; //始终指向栈中的最后一个
    let root ; //根节点
    //最终需要转换成一颗抽象的语法树 就是dom树
    function createASTElement(tag, attrs) {
        return {
            tag,
            type: ELEMENT_TYPE,
            children: [],
            attrs,
            parent: null
        }
    }
    function start(tag, attrs) { //开始标签
        let node = createASTElement(tag, attrs) //创造一个ast 节点(对象)
        if (!root) { //是否为空树
            root = node //如果为空就把当前的树作为根节点
        }
        if(currentParent){ //有它说明有父节点
            node.parent=currentParent
            currentParent.children.push(node) //需要将父亲记住儿子
        }
        stack.push(node)
        currentParent = node //currentParent为栈中最后一个

    }
    function chars(text) { //文本直接放到当前指向的节点中
        text =text.replace(/\s/g,'')
        text && currentParent.children.push({
            type:TEXT_TYPE,
            text,
            parent:currentParent
        })

    }
    function end() {
      let node = stack.pop() //弹出最后一个
      currentParent =stack[stack.length-1] //让当前指针往前走
    }

    function advance(n) {
        html = html.substring(n) //截取字符串 返回新的字符
    }
    function parseStartTag() {
        // match方法就是匹配结果返回一个数组和exec类型
        const start = html.match(startTagOpen) //匹配到的是开始标签 <xxx  
        if (start) {
            const match = {
                tagName: start[1], //标签名
                attrs: []
            }
            advance(start[0].length) //移除标签
            //如果不是开始标签的结束 就一直匹配下去
            let attr, end
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length)
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })
            }
            if (end) {
                advance(end[0].length)
            }
            return match
        }


        return false
    }

    while (html) {
        //如果textEnd为0 说明是html 开始标签<div>或者结束标签 nihao<br/> 
        //如果textEnd>0 说明就是文本结束的位置
        let textEnd = html.indexOf('<')
        if (textEnd === 0) {
            const startTagMatch = parseStartTag()//开始标签的匹配结果
            if (startTagMatch) { //解析到的开始标签
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }

            let endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
        }
        if (textEnd > 0) {
            let text = html.substring(0, textEnd) //文本内容
            if (text) {
                chars(text)
                advance(text.length) //解析到的文本
            }
        }
    }
    return root ;
}