const path = require('path');
const fs = require('fs')
let ejs = require('ejs') //处理输出的静态资源模板内容
const { SyncHook } = require("tapable") //事件流机制 利用订阅发布模式
let babylon = require('babylon')
let types = require('@babel/types')
let traverse = require('@babel/traverse').default
let generator = require('@babel/generator').default
//通过插件解析源代码处理成ast语法
//babylon @babel/traverse @babel/types @babel/generator
//生成bundle文件的 大致为(function(){})({模块入口：模块函数,模块入口2：模块函数2})
class Compiler {
    constructor(config) {
        this.config = config  //webpack.config.js相关配置
        this.entry = config.entry //配置入口 ./src/index.js
        this.enterId; //入口的相对路径
        this.root = process.cwd()  //获取根目录  this.root =D:\projectAll\webpack_config\myWebpack\jd-package
        this.modules = {} //包含所有的模块依赖
        this.hooks = { //整个过程的勾子
            entryOption: new SyncHook(), //开始
            compile: new SyncHook(['name', 'num']), //编译 接受参数
            afterCompile: new SyncHook(), //编译后
            run: new SyncHook(), //运行
            emit: new SyncHook(), //发射
            done: new SyncHook(), //完成
        }
        if (config.plugins.length) {
            config.plugins.forEach(plugin => {
                plugin.apply(this) //调用每个插件的apply方法 把解析器complier传递过去 注册订阅
            })
        }
    }
    //获取模块内容
    getSource(modulePath) { //这里会处理loader的文件
        return fs.readFileSync(modulePath, 'utf-8')
    }
    //解析结果 返回是否存在子依赖项的数组形式 以及解析后的源代码
    parse(source, parentPath) {
        let dependencies = [] //收集依赖的模块相对路径
        const ast = babylon.parse(source) //转为ast
        traverse(ast, { //对ast个性处理
            CallExpression(p) { //require() 有的方法
                let node = p.node //获取回调处理的节点 
                if (node.callee.name === 'require') {
                    node.callee.name = "__webpack__require__"
                    let moduleName = node.arguments[0].value
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')
                    console.log(parentPath)
                    moduleName = './' + path.join(parentPath, moduleName) // src/jd.js
                    dependencies.push(moduleName)
                    //将更新后的子模块依赖名 重新赋值回ast
                    node.arguments = [types.stringLiteral(moduleName)]
                }
            }
        })
        let sourceCode = generator(ast).code //解析源代码
        console.log(sourceCode) //let jd = __webpack__require__("src\\jd.js");  console.log(jd.a);
        console.log(dependencies) //[ 'src\\jd.js' ]
        return { sourceCode, dependencies }
    }
    // modulePath =D:\projectAll\webpack_config\myWebpack\jd-package\src\index.js
    //从根节点root找到所有依赖模块
    buildModule(modulePath, isEntry) {
        //得到文件源代码
        let source = this.getSource(modulePath)
        let moduleName = './' + path.relative(this.root, modulePath) //找到入口的相对路径
        // console.log(moduleName) // src\index.js
        if (isEntry) {
            this.enterId = moduleName
        }
        //解析找到的模块
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName))

        this.modules[moduleName] = sourceCode
        //递归处理所有的子依赖 和处理入口文件一样
        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false)
        })
    }

    emitFile() {
        //输出的路径
        let outputPath = path.join(this.config.output.path, this.config.output.path.filename)
        let template = this.getSource(path.join(__dirname, 'bundle.ejs'))
        //根据模板处理成模板结构
        co 
    }

    run() {
        this.hooks.run.call() //运行 
        this.hooks.compile.call('lj', '3') //编译 可以传递参数
        //构建模块
        this.buildModule(path.resolve(this.root, this.entry), true)
        this.hooks.afterCompile.call() //编译后
        this.hooks.emit.call() //发射

        //输出静态资源文件
        // this.emitFile()
        this.hooks.done.call() //完成结束

    }
}

module.exports = Compiler
//大致工作流程
/*
1. 执行某个命令 如 npx 打包的名字 可找到对应的webpack处理入口 一般在bin文件夹下面 npm link可以创建一个快捷方式
2. 开始构建模块 处理require()模块 处理模块的源代码 以及维护一个 依赖模块数组 dependencies
3. 构建过程中还会根据loader 以及全程的勾子plugins做特殊处理
4.最后打包输出bundle 的 大致为(function(){})({模块入口：模块函数,模块入口2：模块函数2})
 */

//loader 处理流程
//在执行compiler的时候会解析require的文件 通过test匹配到对应的文件 并结合use一一从下往上处理 找到对应的loader包文件处理并返回

//plugin  插件
//利用tapable npm install --save tapable 实现订阅发布
