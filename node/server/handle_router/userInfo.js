// 导入数据库操作模块
const db = require('../dataBase/index')
var bcrypt = require('bcryptjs');
module.exports.getUserInfo = (req, res) => {
    // res.send('ok')
    // console.log(res)
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    const id = req.body.id
    const str = 'select nickname,username,email,user_pic from user where id =?' //记得列举几个加逗号
    db.query(str, id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取用户失败')
        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: result[0],
        })
    })
}

module.exports.updateUserInfo = (req, res) => {
    const userInfo = req.body

    const sql = `update user set ? where id=?`
    db.query(sql, [userInfo, req.user.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更新用户信息失败')
        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
    })
}

// 重置密码的处理函数
// 更新用户头像的处理函数
// 重置密码的处理函数
module.exports.updatePassword = (req, res) => {
    //判断旧的密码 是否与数据库的一样 不一样则旧密码错误
    const str = 'select password from user where id =?'
    //查询返回的是数组 //更新和修改返回的对象里面有affectedRows
    db.query(str, req.user, id, (err, result) => {
        if (err) return res.cc(err)
        //成功说明获取数据
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) return res.cc('密码错误')
        // 定义更新用户密码的 SQL 语句
        const sql = `update user set password=? where id=?`
        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd,req.user.id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('重置密码失败')
            res.send({
                status: 0,
                message: '重置密码成功'
            })
        })
    })

}

// 更新用户头像的处理函数
module.exports.updateAvatar = (req, res) => {
    const sql = 'update user set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')

        // 更新用户头像成功
        return res.cc('更新头像成功！', 0)
    })
}