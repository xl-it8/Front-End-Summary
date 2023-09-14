const path = require('path')
const RunPlugin = require('./plugins/run-plugin')
const DonePlugin = require('./plugins/done-plugin')


/*
调试常见两种方式
 方式一 利用vscode的创建launch.json文件
 方式二 利用手动执行webpack
 webpack打包流程
   1、初始化参数，从配置文件和 Shell 语句中读取参数，得出最终的配置对象
   2、用上一步得到的参数 初始化 compiler 对象
   3、加载所有配置的插件
   4  开始执行run方法创建单个compliation对象 文件每次变化就重新创建编译
   5、根据配置中的 entry 找出入口文件
   6、从入口文件出发，调用所有配置的 loader 对模块进行编译 (先配置loader 再处理依赖模块require)
   7、再找出该模块依赖的模块，在递归本步骤（buildModule），直到所有依赖入口文件加载完
   8、根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 chunk
   9、再把每个 chunk 转换成一个单独的文件加入到输出列表 assets存放
   10、在确定好输出内容后，根据配置确定输出的路径和文件名，把文件写入到文件系统

  总的来说 遇到一个文件 创建模块对象 对该文件loader处理 使用ast语法处理依赖模块并收集  依赖模块递归处理从创建模块对象继续走以上流程
*/
module.exports = {
  entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js',
  },
  mode: 'development',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist2'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve(__dirname, 'loaders/logger1.js'),
          path.resolve(__dirname, 'loaders/logger2.js'),
        ],
      },
    ],
  },
  plugins: [new RunPlugin(), new DonePlugin()],
}