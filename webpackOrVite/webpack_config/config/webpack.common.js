// webpack --config ./config/webpack.common.js --env development" 执行npm run build2 或者npm run serve 会调用该文件（webpack.common.js）的函数
//commonjs 规范
const resolvePath = require('./paths.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge') //对象合并的
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin') //loader@15版本需要引入

const baseConfig = {
    //单入口 也有多入口
    //entry: './src/index.js', //找个路径是相对于配置项context 不配置默认以webpack --config ./config/webpack.common.js 的./config找个上下文文件为参考也就是 webpack-config这个文件夹
    //content:'.config'
    entry: {
        // main1: {
        //     import: './src/js/main2.js',
        //     dependOn: 'lodash'
        // },
        // lodash: 'lodash'
        main: './src/js/main2.js'
        
    },
    output: {
        // path: path.resolve(__dirname, 'dist'),//需要绝对路径
        path: resolvePath('./dist'),//需要绝对路径
        filename: 'js/[name].js',
        // chunkFilename: 'js/chunk_[name].js', //[name] 这里的name可以根据动态导入模块使用魔法注释进行指定名字 比如import(/*webpackChunkName：'title' */'./title')
        // clean: true,
        // publicPath: '/',
        // assetModuleFilename: 'images/[name].[hash][ext]' //自定义输出文件名
    },
    module: {
        // rules: [
        //     {
        //         test: /\.css$/i,
        //         use: [
        //             'style-loader',
        //             {
        //                 loader: 'css-loader', //可以处理@import url这样发文件
        //                 options: {
        //                     importLoaders: 1,//回退到postcss-loader解析
        //                 }
        //             },
        //             'postcss-loader'
        //             // options: {   //写在postcss.config.js 也可以识别到
        //             //     postcssOptions: {
        //             //         plugins: [
        //             //             [
        //             //                 'postcss-preset-env',
        //             //                 {
        //             //                     // 其他选项
        //             //                 },
        //             //             ],
        //             //         ]
        //             //     }
        //             // }
        //         ]
        //     },
        //     {
        //         test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //         type: 'asset/resource',
        //     },
        //     {
        //         test: /\.js$/i,
        //         exclude: /(node_modules|core-js)/,
        //         use: {
        //             loader: 'babel-loader'
        //         }
        //     },
        //     {
        //         test: /\.vue$/i,
        //         exclude: /(node_modules|core-js)/,
        //         use: {
        //             loader: 'vue-loader'
        //         }
        //     }
        //     // {
        //     //     test:/\.(png| jpe?g | gif )$/i,
        //     //     type: 'asset/resource' //生成单独的一个文件
        //     //     // type: 'asset/inline' //转为base64格式图片
        //     //     // type: 'asset' //通用资源类型
        //     // }
        // ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',
        //     filename: 'index.html',
        //     title: 'webpack',
        // }),
        // new DefinePlugin({  //查找环境变量
        //     BASE_URL: '"./"' //要用字符串的形式 如果不加""最后解析成 ./ 识别不了
        // }),
        // new CopyPlugin({ //打包后把指定的文件复制过去
        //     patterns: [
        //         {
        //             from: 'public',  //从哪个文件
        //             globOptions: {
        //                 ignore: ['**/index.html'] //忽略掉index.html **/特殊写法
        //             }
        //         }
        //     ]
        // }),
        // new VueLoaderPlugin() //用来处理.vue 文件
    ]
}
module.exports = (env) => {
    const isProd = env.production //生产环境下为true 同时会在自己的文件中加上 process.env.NODE_ENV === 'production'
    process.env.NODE_ENV = isProd ? 'production' : 'development'

    const mergeConfig = isProd ? prodConfig : devConfig
    return merge(baseConfig, mergeConfig)
}