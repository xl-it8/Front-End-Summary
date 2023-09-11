### webpack 前置

webpack 下载 npm i webpack webpack-cli -D
webpack-cli 目的是为了可以在命令行操作
webpack 需要在本地下载 最好不需要下载到全局 防止协同开发版本冲突问题
本地运行打包 webpack 需要 用到 npx 包 npx webpack 或者在 package.json 的 scripts 脚本配置

webpack 只能识别 js json 模块 其他资源模块需要一些特殊处理

### 模块化

```js
<script type="module" src="./index.js"></script>
// 浏览器不支持模块化 如果不加type=module  加了之后支持 并且有几个特性
// 1. 私有化  2.use strict 3. 相当于 type=defer 不堵塞html渲染
//当然也可以通过webpack 打包工具来解决
```

###

'postcss-loader' 结合 postcss-preset-env（css 预设包集合了一些功能查插件） 会对 css 的属性进行处理 对特殊属性 转换 如十六进制的颜色转为 rgba 格式

还会结合.browserslistrc 不同浏览器的环境下兼容处理
.browserslistrc 会获取所有满足条件的的浏览器版本
last 1 version

> 1% 市场率大于 1% 通过 canIuse 网站可查看浏览器的版本情况
> not dead

@babel/preset-env 可能不会转换所有 es 语法 比如 promise,生成器 所以需要结合 polyfill 来进行补丁 下载包可以直接下载 regenerator-runtime and core-js 不需要下载@babel/polyfill 并且在 Babel.config.js 文件配置

开发模式下 根据文件改变自动打包并使浏览器刷新
方法一：使用 watch:true 结合 live server
缺点 1.所有的源代码都会编译 2.每次编译后会对文件进行读写(打包到磁盘中) 3.不能实现页面局部刷新 4.需要依赖 vscode 的 live server
方法 2 webpack-dev-server 1.修改的源代码会编译 2.不会输出 dist 目录保存在内存 读取更快 3.能实现页面局部刷新 4.不需要依赖 vscode 的 live server

热更新
vue 如何开启热模块更新

1. 下载 vue2 包 "vue-template-compiler": "^2.7.14"包 以及"vue-loader": "^15.10.1"
2. {
   test: /\.vue\$/i,
   exclude: /(node_modules|core-js)/,
   use: {
   loader: 'vue-loader'
   }
   }
3. 引入 const VueLoaderPlugin = require('vue-loader/lib/plugin') 同时在 plugins 里调用 new VueLoaderPlugin()

HMR 不适用于生产环境，这意味着它应当用于开发环境

路径相关
output ：{ 这个路径是告诉 index.html 引用的资源文件去哪里找
相当于域名加 publicPath 加文件 filename
publicPath:'' 本地浏览器运行可以生效 devServer 运行也可以生效
publicPath: '/', 本地浏览器运行不能生效 改为相对路径"./" devServer 运行可以生效,改为相对路径"./"不能生效
}

devServer:{
将指定本地运行服务器所在的文件目录
publicPath
}

source-map
开发环境要求快 比如 eval-source-map
生产环境要求精准 最好不要暴露源代码 hiddin-source-map

ts 相关
步骤如下
方法一
ts 文件解析需要下载包 typescript(具有 typescript 解析器 tsc tsc --init 之后可以创建 tsconfig.json 文件) 以及 ts-loader 处理
{
test:/.ts\$/,
use:['ts-loader'] //处理 ts 相关的文件转为 js 文件并且会有 ts 语法报错功能 缺点是不能处理 polyfill 如 Promise

}
方法二
{
test:/.ts\$/,
use:['babel-loader'] 缺点是没有 ts 语法报错处理

}
还要在 babel.config.js 文件配置
{
presets: [[
'@babel/preset-env',
//如下内容也要写
{
useBuiltIns: 'usage',
corejs: 3
}
],[
@babel/preset-typescript //加一个处理 ts 的 loader 包
]
]
}

//方法三 要想使用第二种并解决没有语法报错的缺点 可以在 package.json 配置
"scripts": {
"build": "npm run tsCK && webpack", //先进性校验 ts 语法再打包
"tsCK"："tsc --noEmit"
},

4. 区分开发环境和生产环境
   开发环境下如果不需要有 dist 目录出现 需要在 pack.json 配置如下 webpack server 核心
   "serve":"webpack server --config ./config/webpack.common.js --env development",

5. 语法检查 eslint
   下载包 npm i eslint -D
   npx eslint --init 初始化配置文件 可以是 js json 或者
   vscode 扩展插件 eslint 来实现报错提示 或者

6. 打包的时候代码分割
   方法一 多入口 根据依赖进行分开打包
   main1: {
   import: './src/js/main2.js',
   dependOn: 'lodash'
   },
   lodash: 'lodash'

   打包后会多一个xxx.license.text注释文件 不需要需要优化配置
   const TerserPlugin = require("terser-webpack-plugin")
   terser-webpack-plugin 里面可以配置这个extractComments: true去除  启用/禁用剥离注释功能。
 方法二 单入口结合 SplitChunksPlugin 处理代码打包分块（常用）
  默认行为
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
