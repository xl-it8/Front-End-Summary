const express =require('express')
const router =express.Router()
const handelUserInfo = require('../handle_router/userInfo')
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema,update_avatar_schema } = require('../schema/user')
// 获取用户的基本信息
router.post('/userInfo',handelUserInfo.getUserInfo)
//更新用户基本信息
router.post('/updateUserInfo',expressJoi(update_userinfo_schema),handelUserInfo.updateUserInfo)
// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), handelUserInfo.updatePassword)

// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), handelUserInfo.updateAvatar)


module.exports = router