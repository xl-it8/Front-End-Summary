const connection = require('../dataBase/index.js')
var bcrypt = require('bcryptjs');
// 导入配置文件
const config = require('../config')
// 用这个包来生成 Token 字符串 
const jwt = require('jsonwebtoken')

module.exports.register = (req, res) => {
    const regInfo = req.body
    // //进行校验  表单的数据合法性
    // const validateRes = schema.validate(regInfo)
    // if(validateRes.error) return res.cc(validateRes.error)
    // if (!regInfo.username || !regInfo.password) return res.send({ status: 1, message: '用户名或密码不能为空！' })

    const regStr = 'select * from user where username=?'
    connection.query(regStr, regInfo.username, (err, result) => {
        if (err) return res.cc(err)

        if (result.length > 0) return res.cc('用户名被注册')

        //对传入数据库的密码进行加密
        regInfo.password = bcrypt.hashSync(regInfo.password, 10)
        const sql = 'insert into user set ?'
        connection.query(sql, regInfo, (err, result) => {
            if (err) return res.cc(err)
            //result.affectedRows 对于 select 返回的是数组 对于inset update 返回的可以通过affectedRows判断是否为1
            if (result.affectedRows === 1) return res.cc('注册成功', 0)

        })

    })

}

//登录流程 就是输入账号密码 校验是否符合 符合 则与数据库对比是否有有改账号 同时有这个账号就需要校验账号是否对  有的返回用户信息 没有就提示注册账号
module.exports.login = (req, res) => {
    const loginInfo = req.body
    const loginStr = 'select * from user where username=?'
    connection.query(loginStr, loginInfo.username, (err, result) => {
        if (err) return res.cc(err)
        if (result.length > 0) { //说明有这个用户
            // 拿着用户输入的密码,和数据库中存储的密码进行对比
            const compareResult = bcrypt.compareSync(loginInfo.password, result[0].password)
            // 如果对比的结果等于 false, 则证明用户输入的密码错误
            if (!compareResult) {
                return res.cc('登录失败！')
            }
            const user = { ...result[0], password: '', user_pic: '' }
            //登录成功返回一个token
            // 生成 Token 字符串
            const tokenStr = jwt.sign(user, config.secret, {
                expiresIn: config.expiresIn, // token 有效期为 10 个小时
            })
            res.send({
                status: 0,
                message: '登录成功！',
                // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
                token: 'Bearer ' + tokenStr,
            })
        } else {
            res.cc('账号为空,请注册')
        }
    })
} 