
1. 浏览器支持css html js
   但是 webpack仅支持js和json文件

处理
  css/less/scss/图片
  js
     babel-loader babel-core(用来处理es5代码转成ast语法) babel-preset-env(对某些es6转es5)
       babel-preset-env是插件的集合 包含好多插件 处理某些es6语法
       promise set map等等语法 需要借助babel-polyfill(补丁)
       但是像 装饰器 等可以用单独的插件去处理
     

  devServer
  处理第三方类库 
    1. 直接每个页面引用 如lodash 会打包到bundle中体积大
    2. html页面手动引入cdn extenals配置  但是window上不会有 模块中会在运行时去cdn上找
    3. html-webpack-extenals-plugin 不用在html中引入 window上也会有_ 并且模块中用到会window的_不会打包到bundle中
  环境变量
    --env cross-env DefinePlugin
  inlibe source-map
      eval -- 打包后会有eval包裹 性能好
      cheap -- 报错位置只有行并且 不能映射到最原始的代码
      module -- 能映射到最原始的代码
        (js通过 es6 es6语法数 转成 es5语法 生产es5代码)
      source-map -- 有map文件产生 bundle末尾会有sourceMapping映射到map文件
      inline -- 末尾以base64格式 嵌入到bundle中
  热模块/tree shaking

  eslint-loader和eslintrc文件
  
  copy插件和proxy代理

  html/css/js 压缩
    mode设置开发环境 会对 html/js压缩去除注释(包括html中写的注释) css压缩需要cssminimizerwebpackplugin
  css抽离

  代码分割
  非入口的 chunk 文件名称
     动态文件导入 会自动作为新chunk打包
     vendor 第三方库 多个文件导入 可抽出单独文件打包
     common 公用的也可以
     
  pxtorem 及 lib-flxible

  hash,chunkhash和contenthash
    hash 是通过md5计算出整个打包后文件的hash值 其中一个文件变化hash也会变 快
    chunk 是通过一个代码块 关联的文件变化hash值变化 较快
    content 是通过一个文件内容发生变化而变化 相比最慢
  [name] [ext] 


常见文件格式
 .xxxrc
 xx.config.js
 xxx.json
 webpack文件里面配


手写简化版 webpack github链接库
 https://github.com/Ankera/blog/tree/master/webpack5/webpack-code/webpack