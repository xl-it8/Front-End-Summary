//commonjs 规范
module.exports = {
    devServer: {
        port: '8555',
        host: "localhost",
        open: true,
        // hot:'true'  默认是热更新 hot: true 有个问题是之前某个模块代码写出构建失败保存 改完之后再次构建会使 整个浏览器刷新
        hot: 'only' //解决这个问题 局部构建错误后刷新
        // compress: true 默认开启gzip压缩
        // static: './dist'  
    },
    devtool: 'source-map',

    mode: 'development'
}