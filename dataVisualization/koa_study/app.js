const Koa = require('koa');
const app = new Koa();
//中间件 本质就是一个函数 有执行顺序的 洋葱模式的执行顺序 先进后出的形式
const handleTime = require('./middleWare/duration')
app.use(handleTime)
const setHeader = require('./middleWare/headers')
app.use(setHeader)
const handleData = require('./middleWare/data')
app.use(handleData)
app.listen(8080, () => {
    console.log('running')
});


const WebSocketServer = require('./service/web_scoket_service')
//开启监听 客户端
WebSocketServer()