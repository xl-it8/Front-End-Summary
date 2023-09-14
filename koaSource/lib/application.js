const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Application {
  //创建的应用都要独立
  constructor() {
    //this.context.__proto__ = context
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middleWare = []
  }
  use(fn) {
    this.middleWare.push(fn)
  }
  createContext(req, res) {
    //ctx.__proto__.__proto__ = context
    const ctx = Object.create(this.context)
    const request = Object.create(this.request) //对req扩展的对象
    const response = Object.create(this.response)//对res扩展的对象
    ctx.request = request //处理的
    ctx.req = ctx.request.req = req //这里是不做处理的
    ctx.response = response //处理的
    ctx.res = ctx.request.res = res
   
    return ctx
  }
  callback = (req, res) => {
    //每次浏览器请求是无状态性都要重新创建对象
    const ctx = this.createContext(req, res)
    this.middleWare.forEach((fn) => fn(ctx))
    res.end(ctx.body);
  }
  listen(port, fn) {
    const server = http.createServer(this.callback)
    server.listen(port, fn)
  }
}

module.exports = Application
