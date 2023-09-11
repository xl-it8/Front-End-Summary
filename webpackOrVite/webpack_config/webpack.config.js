//commonjs 规范
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const { DefinePlugin } = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin') //loader@15版本需要引入
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),//需要绝对路径
        filename: 'js/bundle.js',
        clean: true,
        publicPath: '/',
        assetModuleFilename: 'images/[name].[hash][ext]' //自定义输出文件名
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader', //可以处理@import url这样发文件
                        options: {
                            importLoaders: 1,//回退到postcss-loader解析
                        }
                    },
                    'postcss-loader'
                    // options: {   //写在postcss.config.js 也可以识别到
                    //     postcssOptions: {
                    //         plugins: [
                    //             [
                    //                 'postcss-preset-env',
                    //                 {
                    //                     // 其他选项
                    //                 },
                    //             ],
                    //         ]
                    //     }
                    // }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/i,
                exclude: /(node_modules|core-js)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/i,
                exclude: /(node_modules|core-js)/,
                use: {
                    loader: 'vue-loader'
                }
            }
            // {
            //     test:/\.(png| jpe?g | gif )$/i,
            //     type: 'asset/resource' //生成单独的一个文件
            //     // type: 'asset/inline' //转为base64格式图片
            //     // type: 'asset' //通用资源类型
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            title: 'webpack',
        }),
        new DefinePlugin({  //查找环境变量
            BASE_URL: '"./"' //要用字符串的形式 如果不加""最后解析成 ./ 识别不了
        }),
        new CopyPlugin({ //打包后把指定的文件复制过去
            patterns: [
                {
                    from: "public",  //从哪个文件
                    globOptions: {
                        ignore: ['**/index.html'] //忽略掉index.html **/特殊写法
                    }
                }
            ]
        }),
        new VueLoaderPlugin() //用来处理.vue 文件
    ],
    devServer: {
        // hot:'true'  默认是热更新 hot: true 有个问题是之前某个模块代码写出构建失败保存 改完之后再次构建会使整个浏览器刷新
        hot: 'only' //解决这个问题 局部构建错误后刷新
        // compress: true 默认开启gzip压缩
        // static: './dist'  
    },
    devtool: 'source-map',
    mode: 'development'
}