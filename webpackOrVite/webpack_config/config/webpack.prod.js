//commonjs 规范
const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
    // optimization: {
    //     chunkIds: 'deterministic', //	在不同的编译中不变的短数字 id. 有益于长期缓存。在生产模式中会默认开启。
    //     minimize: true,
    //     minimizer: [new TerserPlugin(
    //         {
    //             extractComments: false //去掉第三方的批注文件
    //         }
    //     )],
    //     //import动态导入(import('./xxxx')) 默认的异步方式
    //     // splitChunks: {
    //     //     chunks: 'initial', //同步导入（import './xxxx'）chunk压缩
    //     //     minSize: 20000, // 分割后的不能小于20kb 默认单位是b 1kb=1000b
    //     //     maxSize: 20000, //大于20kb的chunk才会被分割
    //     //     minChunks: 1, //拆分前必须共享模块的最小 chunks 数 就是被引用的最小次数
    //     //     cacheGroups: { //缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项。
    //     //         defaultVendors: { //defaultVendors可以任意名字 //处理第三方包
    //     //             test: /[\\/]node_modules[\\/]/,
    //     //             priority: -10, //控制优先级
    //     //             filename: 'js/[id]_vendor.js' //打包后的名字
    //     //         },
    //     //         default: { //配合多入口 处理自己定义的模块 //单独的模块打包 
    //     //             minChunks: 2,
    //     //             priority: -20,
    //     //             filename: 'js/syy_[id].js'
    //     //         },
    //     //     }
    //     // }


    // },
    // devtool: 'cheap-module-source-map',
    mode: 'development'
}