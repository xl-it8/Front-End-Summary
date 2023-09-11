//流程 创建路由模块--》 路由处理函数抽离--》表单数据后端校验 --》数据库后台数据处理返回（connection.query）

//处理包  对数据库密码加密的包 bcryptjs  对前端传入后台数据校验的包可用 joi 和'@escook/express-joi  以及 对token处理和校验的包 jsonwebtoken 和express-jwt
const express = require('express')
const cors = require('cors') //解决跨域的包
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
const Joi = require('joi')
const multer = require('multer')
const expressjwt = require("express-jwt");
const config = require('./config')
const app = express()
// 使用 express.static() 中间件，将 uploads 目录中的图片托管为静态资源
app.use("/uploads", express.static('./uploads')) //访问的时候需要带上uploads
app.use(cors())
// res.setHeader('Content-Type', 'text/html; charset=utf-8') //防止中文乱码
//全局中间件
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        return res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next() //通行
})
//发起请求携带token 就会进行身份校验
app.use(
    expressjwt({
        secret: config.secret,
        algorithms: ["HS256"],
    }).unless({ path: [/^\/api\//] })
);
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false })) //内置中间件

//配置解析application/json格式的数据的中间件
app.use(express.json())
// 使用 express.urlencoded() 中间件无法解析 multipart/form-data 格式的请求体数据。
// 当前项目，推荐使用 multer 来解析 multipart/form-data 格式的表单数据。
app.use('/api', userRouter) //登录注册相关的内容

app.use('/my', userInfoRouter) //处理用户信息
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)


// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)


// 4.1 错误级别中间件
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    //multipart/form-data校验失败
    if (err instanceof multer.MulterError) return res.cc({
        status: 1,
        message: err.message
    })
    //权限校验失败
    // 4.1 Joi 参数校验失败
    if (err instanceof Joi.ValidationError) {
        return res.send({
            status: 1,
            message: err.message
        })
    }
    // 4.2 未知错误
    res.send({
        status: 1,
        message: err.message
    })
})



app.listen(3000, () => {
    console.log('127.0.0.1: 3000')
})