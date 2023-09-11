import { parseHtml } from './parse'
function genProps(attrs) {
    let str = '' //{name,value}
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i]
        if (attr.name === 'style') {
            let obj = {}
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(':')
                obj[key] = value
            })
            attr.value = obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, -1)}}` //把最后多余的逗号去掉 slice第二个参数为负数代表 字符串长度+负数值
}

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g //{{ asad }} 匹配到的内容就是我们表达式的变量
function gen(node) {
    if (node.type === 1) {
        return codegen(node)
    } else {
        //文本
        let text = node.text //ast中的文本内容
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`
        } else {
            let tokens = []
            let match;
            defaultTagRE.lastIndex = 0;
            let lastIndex = 0;
            while (match = defaultTagRE.exec(text)) {
                let index = match.index;
                if (index > lastIndex) {
                    tokens.push(JSON.stringify(text.slice(lastIndex, index)))
                }
                tokens.push(`_s(${match[1].trim()})`)
                lastIndex = index + match[0].length
            }
            if (lastIndex < text.length) {
                tokens.push(JSON.stringify(text.slice(lastIndex)))
            }
            return `_v(${tokens.join('+')})`
        }
        
    }

}

function genChildren(children) {
    return children.map(child => gen(child)).join(',')
}


function codegen(ast) {
    // 格式
    // 举个例子
    //render () {
    // return _c('div',{id:'app'},_c('div',{style:{"color":'red',background:'yellow'}},_v(_s(name)+'hello'),_c('span',null,_v(_s(age))))
    // }
    let children = genChildren(ast.children)
    let code = (`_c('${ast.tag}',${ast.attrs.length > 0 ? genProps(ast.attrs) : 'null'}${ast.children.length ? `,${children}` : ''})`)
    return code
}

export function compileToFunction(template) {
    //通过template转为ast语法树
    let ast = parseHtml(template) //树形结构
    
    // console.log(ast)
    let code = codegen(ast) //获取如下格式的字符串 _c('div',{id:"app"},_c('div',null,_v(_s(name))),_c('span',null,_v(_s(age))))
    // console.log(code)
    //生成render函数(render渲染之后就是虚拟dom) 
    code =`with(this){return ${code}}` 
    //with(){} 作用就是在{}里的变量 可以由()写入的对象中去 
    // let obj={name:'li'}
    // with(obj){
    //     console.log(name); //li  相当于obj.name
    // }

    let render = new Function(code) //通过new Function 把字符串生成函数
    return render 

}