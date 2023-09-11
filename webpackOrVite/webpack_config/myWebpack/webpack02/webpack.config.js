const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const HtmlMinimizerWebpackPlugin = require('html-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
//console.log(process.env.NODE_ENV)  //通过cross-env 跨平台设置NODE_ENV的具体环境
module.exports = function (env) {
  //console.log(env) //{ development: true } scripts里面写入 --env=xxx会传入函数形参
  return {
    mode: 'production', //开发和生产 默认是生产会压缩 这里的设置会影响用户写的js模块的process.env.NODE_ENV
    devtool: 'cheap-source-map',
    entry: {
      main: './src/index.js',
      entry: './src/index2.js',
    }, //默认名称是main 多入口{} html插件也要配对应的个数 然后需要控制输出的bundle名字
    output: {
      filename: '[name]/[name]_bundle.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/', //这里是指定资源文件的位置 比如css img等  publicPath+filename http://localhost/bundle.js访问脚本
      assetModuleFilename: 'images/[hash][ext]', //与generator一样的作用
      clean: true, //每次打包清空dist目录
      chunkFilename: 'entry/async_[chunkhash:8].js', //选项决定了非初始（non-initial）chunk 文件的名称
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.html/,
          loader: 'html-loader', //处理html中引入资源模块 如图片路径
        },
        {
          test: /\.(css|less)$/,
          // use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'less-loader'],
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['postcss-preset-env'],
                },
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.(png|jpe?g)$/i,
          type: 'asset', //处理js中引入的图片 css中引入的也会同样处理
          // generator:{
          //   filename: 'static/[hash:10][ext]'
          // }
          parser: {
            dataUrlCondition: {
              maxSize: 14 * 1024, //小于14kb则以base64形式嵌入bundle中 反之处理的路径后放到对应的dist目录下 并根据assetModuleFilename决定处理的格式 有generator则优先
            },
          },
        },
      ],
    },
    performance: {
      hints: false,
    },
    externals: {
      lodash: '_',
    },
    optimization: {
      minimize: true, //开启压缩
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            // compress: {
            //   drop_console: true, // 去除掉 console
            // },
          },
        }),
        // new CssMinimizerPlugin(), 默认去除css中的注释
        new HtmlMinimizerWebpackPlugin({
          minimizerOptions: {
            removeEmptyAttributes: false, // 去除空属性
            removeEmptyElements: true, // 去除空元素
          },
        }),
      ],
      /*
      模块在代码中被复用或者来自 node_modules 文件夹
模块的体积大于等于30kb（压缩之前）
当按需加载 chunks 时，并行请求的最大数量不能超过5
页面初始加载时，并行请求的最大数量不能超过3
      */
      splitChunks: {
        // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
        chunks: 'all',
        // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
        minSize: 2000,
        // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
        minChunks: 1,
        // 表示按需加载文件时，并行请求的最大数目。默认为5。
        maxAsyncRequests: 30,
        // 表示加载入口文件时，并行请求的最大数目。默认为3。
        maxInitialRequests: 30,
        // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
        // automaticNameDelimiter: '~',
        // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
        // name: true,
        // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name:'vendors'
          },
          //
          default: {
            minChunks: 1,
            priority: -20,
            name:'commons'
          },
        },
      },
    },
    devServer: {
      //默认会根据文件内存存储系统 把输出文件目录作为服务的静态目录
      open: true,
      static: {
        //先找output的path服务器位置 再找这里的 一般不需要打包的放在这个资源位置
        directory: path.join(__dirname, 'public'),
        //publicPath: '/assets/' 本地服务器的存储目录访问位置 http://localhost/assets/bj.txt
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '学习webpack', //模板已经有了则优先级高于title
        template: path.resolve(__dirname, 'index.html'),
        // publicPath: './public'
        filename: 'index1.html',
        chunks: ['main'], //哪些需要被html引入的写到数组中
      }),
      new HtmlWebpackPlugin({
        title: '学习webpack2', //模板已经有了则优先级高于title
        template: path.resolve(__dirname, 'index2.html'),
        filename: 'index2.html',
        // publicPath: './public'
        chunks: ['entry'],
        excludeChunks: ['loadsh'],
      }),
      // new HtmlWebpackExternalsPlugin({
      //   externals: [
      //     {
      //       module: 'lodash',
      //       entry: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
      //       global: '_',
      //     },
      //   ],
      // }),
      new webpack.ProvidePlugin({
        //Automatically load modules instead of having to import or require them everywhere.
        $: 'jquery',
      }),
      // new webpack.DefinePlugin({
      //   VERSION: JSON.stringify('5fa3b9'),
      // })
      new MiniCssExtractPlugin({
        filename: 'static/[name].css',
      }),
    ],
  }
}
