const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  devServer: {
    port:'8800',
    open: true,
    host:'127.0.0.1',
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      devServer.app.get('/success', function (req, res) {
        res.json('就')
      })
      devServer.app.post('/error', function (req, res) {
        res.sendStatus(500)
      })
    },
  },
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'head', //把打包输出的bundle注入到head中
    }),
  ],
}
