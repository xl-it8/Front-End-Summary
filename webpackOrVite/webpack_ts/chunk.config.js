const path = require('path')
module.exports = {
  entry: {
    app: './src/chunk.js',
  },
  // entry: './src/chunk.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].bundle.js', //以entry为入口的chunk
    chunkFilename: '[name].[contenthash:16].bundle.js', //动态加载chunk的chunk  可能是异步加载的模块
    clean: true,
  },
  mode: 'development',
  optimization: {
    splitChunks: { //拆分模块  共享模块或者是node——modules模块 并且大于minSize
      chunks: 'initial', //async只能分离异步模块 initial分离初始化模块比如lodash 不能分离异步模块 只对入口文件进行拆分 all 就是初始化和异步都拆分
      minSize: 20000, //控制最小包的大小，大于这个值才会去拆分，如果拆分的公共模块小于这个大小，那就复制成多份，直接打包到引用该模块的包里 默认20000 20kb 1kb =1000bytes
      minChunks: 1, //模块的重复调用次数大于等于minChunks值时，就会满足这项拆包条件，但只看入口模块导入的，不看动态加载模块中导入的(import(‘…’))，即使设置的chunks为“all”
      maxAsyncRequests: 30, //异步文件的最大并行请求数量 用于限制异步模块内部的并行最大请求数
      maxInitialRequests: 30, //入口文件最大请求的文件数量（import等方式）
      enforceSizeThreshold: 50000,
      cacheGroups: { //可以继承或者重写splitChunks对象下的属性，但是test、priority和reuseExistingChunk只能配置在cacheGroup对象中每个添加的对象都有默认配置，如果想禁用此配置，可以将其设置为false
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级
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
}
