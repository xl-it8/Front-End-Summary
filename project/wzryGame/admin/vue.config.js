const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/admin/'
  : '/', //指定部署后访问静态资源的根路径
  outputDir: __dirname + '/../server/admin' //打包输出的文件位置
})
