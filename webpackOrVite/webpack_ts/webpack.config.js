const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader','css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.ts$/,
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.d.ts', '.vue', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'head',
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8083,
    open: true,
  },
  devtool: 'eval-source-map',
  mode: 'development',
}
