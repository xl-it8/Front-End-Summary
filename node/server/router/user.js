const express = require('express')
const router = express.Router()
const userHandler = require('../handle_router/user.js') //引入的是对象

// 1. 导入验证表单数据的中间件 //自己封装的校验
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user.js')



//注册新用户
router.post('/register',expressJoi(reg_login_schema), userHandler.register)

//登录用户
router.post('/login',expressJoi(reg_login_schema), userHandler.login)


module.exports = router //暴露对象