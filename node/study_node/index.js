/*
    http 模块是 Node.js 内置的 HTTP 库，用于创建 HTTP 服务器或客户端 http 模块提供了类似于浏览器中 XMLHttpRequest 对象的功能，使得 Node.js 开发者能够直接发送 HTTP 请求，并且可以监听 HTTP 服务响应。
       
  
  */
const http = require('http')
const app = http.createServer((req, res) => {
    res.statusCode = 200; //设置响应状态码
    res.setHeader('Content-Type', 'text/plain'); //设置响应头
    res.end('响应数据')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})

/*
  url 模块用于解析和处理 URL 字符串。
*/


/*
stream 模块提供了读写数据流的功能。在 Node.js 中，大多数写入和读取数据的操作都是以流的方式进行的。通过使用 stream 模块，可以从文件或其他来源中读取数据，也可以向文件或其他目标写入数据。

  fs模块提供的流api
     fs.createReadStream 以及 fs.createWriteStream  利用on监听相关事件 比如 data end finish
*/

/*
buffer 模块用于读写二进制数据，它可用于在 Node.js 中处理各种二进制数据，例如图像、音频和视频等。Buffer 是一个全局对象，因此可以直接使用。 因此无需使用 require('buffer').Buffer
*/

const buf5 = Buffer.from('tést');
console.log(buf5)