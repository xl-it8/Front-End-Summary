const koa = require('./lib/application')

const app = new koa()

app.use((ctx) => {
  // ctx.body = 'Nihao'
  // console.log(ctx.req.url)
  // console.log(ctx.request.url)
  // console.log(ctx.request.req.url)
  console.log(ctx.body)
  ctx.body = '<div style="color:red;fontSize:23px">3</div>'
  /*
    ctx.req.path
    ctx.response.path
    ctx.response.req.path

    ctx.path
  
  
  */
})

app.listen(3002, () => {
  console.log('server is running at port 3002')
})

//知识点1

// const name = {
//   _name: '',
//   get name(){
//     return this._name
//   },
//   set name(newValue){
//     this._name = newValue
//   }
// }

//知识点2
// Object.create()每次创建新对象 原型就是原来的参数对象

//知识点3
//Object.defineProperty  或者 target.__defineGetter__()废弃 或__defineSetter__()废弃
