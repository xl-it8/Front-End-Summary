const path = require('path').posix //路径统一处理(兼容) 如a/b 处理成a\b
const fs = require('fs')
const parser = require('@babel/parser')//把源代码解析成ast语法树
const traverse = require('@babel/traverse').default //ast语法树遍历按要求处理
const generator = require('@babel/generator').default //处理后的再转成源代码
const types = require('@babel/types') //类型参数处理 如 require('./title')=>require('./title.js')
const { SyncHook } = require('tapable')

const baseDir = toUnixPath(process.cwd())  //node执行的目录 根目录

function toUnixPath(filePath) {
  return filePath.replace(/\\/g, '/')
}

class Compilation {
  constructor(options) {
    this.options = options
    // 当前编译依赖的文件
    this.fileDependencies = []
    // 本次编译的所有模块 不包含入口的
    this.modules = []
    // 里面放置所有的代码块(chunk)
    this.chunks = []
    this.assets = [] 
    this.hooks = {
      chunkAsset: new SyncHook(['chunk', 'filename']),
    }
  }

  build = (onCompiled) => {
    // 5、根据配置中的 entry 找出入口文件
    let entry = {}
    if (typeof this.options.entry === 'string') { //入口两种写法 一种是字符串 一种是对象
      entry.main = this.options.entry
    } else {
      entry = this.options.entry
    }

    for (const entryName in entry) {
      // 获取到了所有入口文件的绝对路径
      const entryPath = path.join(baseDir, entry[entryName]) //入口绝对路径

      this.fileDependencies.push(entryPath)

      // 6、从入口文件出发，调用所有配置的 loader 对模块进行编译
      const entryModule = this.buildModule(entryName, entryPath)

      // 8、根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 chunk
      const chunk = {
        name: entryName,
        entryModule,//入口的模块对象
        modules: this.modules.filter((module) => //这个目的是把所有是对应的入口文件出发引入的模块过滤出来
          module.names.includes(entryName)
        ),
      }

      this.chunks.push(chunk)
    }

    // 9、再把每个 chunk 转换成一个单独的文件加入到输出列表
    this.chunks.forEach((chunk) => {
      const filename = this.options.output.filename.replace(
        '[name]',
        chunk.name
      )
      this.hooks.chunkAsset.call(chunk, filename)
      this.assets[filename] = getSource(chunk)
    })

    onCompiled(
      null,
      {
        module: this.modules,
        chunks: this.chunks,
        assets: this.assets, //{entry.js: 打包后的文件}
      },
      this.fileDependencies
    )
  }

  /**
   * 编译模块
   * @param {*} name 入口的名称
   * @param {*} modulePath 模块的路径
   */
  buildModule = (name, modulePath) => {
    const _this = this

    // ① 读取源代码的内容
    let sourceCode = fs.readFileSync(modulePath, 'utf8')
    // ② 调用此模块需要使用的loader
    const { rules } = this.options.module
    const loaders = []
    rules.forEach((rule) => {
      if (modulePath.match(rule.test)) {
        loaders.push(...rule.use)
      }
    })

    sourceCode = loaders.reduceRight((code, loader) => {
      return require(loader)(code) //引入相应的loader并调用执行 loader就是一个函数
    }, sourceCode)

    // src/entry1.js src/entry2.js
    const moduleId = './' + path.relative(baseDir, modulePath)

    /**
     * 创建一个模块对象，
     * id moduleId是相对于根目录的相对路径
     * dependencies 表示此模块依赖的模块
     * names  表示此模块添加了那几个入口依赖
     */
    const module = {
      id: moduleId,
      dependencies: [],
      names: [name], //入口模块的名字 entry1 entry2 。。。
    }

    // 获取当前路径所在的路径
    const dirName = path.dirname(modulePath)
    const extensions = this.options.resolve.extensions

    // 7、再找出该模块依赖的模块，在递归本步骤（buildModule），知道所有依赖入口文件加载完
    const ast = parser.parse(sourceCode, { sourceType: 'module' })
    traverse(ast, {//遍历查找
      CallExpression({ node }) {
        if (node.callee.name === 'require') {
          const depModuleName = node.arguments[0].value // '.title' 模块文件中require()引入的路径值

          // 获取依赖路径的绝对路径
          let depModulePath = path.join(dirName, depModuleName)

          depModulePath = tryExtensions(depModulePath, extensions) //补全后缀

          // 把此依赖文件添加到依赖数组里面，当文件发生变化了，会重新编译文件，创建一个新的 Compilation
          _this.fileDependencies.push(depModulePath)

          const depModuleId = './' + path.relative(baseDir, depModulePath)

          // 修改 ast 语法树，把 require 方法的参数变成依赖的模块 ID
          node.arguments = [types.stringLiteral(depModuleId)] //处理成.title.js 替换模块引入的.title

          module.dependencies.push({
            depModuleId,
            depModulePath,
          })
        }
      },
    })

    const { code } = generator(ast) //源代码
    module._source = code
  //循环所有的依赖模块
    module.dependencies.forEach(({ depModuleId, depModulePath }) => {
      const buildModule = _this.modules.find( //看看是否有重复被多个入口chunk引入的模块有的化就不需要再构建重复（buildModule）引用的模块了
        (module) => module.id === depModuleId
      )
      if (buildModule) {
        buildModule.names.push(name) //虽然不用构建了 但是要让这个模块记住入口模块的名字
      } else {
        const depModule = _this.buildModule(name, depModulePath) //以入口出发 传入入口名和依赖模块绝对路径 返回依赖的模块对象
        _this.modules.push(depModule) //重点把依赖模块全部收集到modules
      }
    })

    return module
  }
}

/**
 * 尝试给当前的路径添加扩展名，直到找到文件为止
 */
function tryExtensions(modulePath, extensions) {
  if (fs.existsSync(modulePath)) {
    return modulePath
  }

  for (let i = 0; i < extensions.length; i++) {
    const filePath = modulePath + extensions[i]
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }

  throw new Error(`找不到${modulePath}`)
}

function getSource(chunk) {
  return `
    (() => {
      var modules = {
        ${chunk.modules.map(
          (module) => `
          "${module.id}": (module) => {
            ${module._source}
          }
        `
        )}
      }
      var cache = {};
      function require(moduleId) {
        var cachedModule = cache[moduleId];
        if (cachedModule !== undefined) {
          return cachedModule.exports;
        }
        var module = cache[moduleId] = {
          exports: {}
        };
        modules[moduleId](module, module.exports, require);
        return module.exports;
      }

      var exports = {};
      ${chunk.entryModule._source}
    })();
  `
}

/*
function getSource(chunk) {
  return `
    (() => {
      var modules = {
        './title.js':(module)=>{
            module.exports = 'title';
        }
      }
      var cache = {};
      function require(moduleId) {
        var cachedModule = cache[moduleId];
        if (cachedModule !== undefined) {
          return cachedModule.exports;
        }
        var module = cache[moduleId] = {
          exports: {}
        };
        modules[moduleId](module, module.exports, require);
        return module.exports;
      }

      var exports = {};
      const title = require('.title.js')
      console.log(title)
    })();
  `
}

*/

module.exports = Compilation