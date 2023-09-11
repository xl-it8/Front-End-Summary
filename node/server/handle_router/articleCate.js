// 导入数据库操作模块
const db = require('../dataBase/index')

// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc' //查找所有is_delete存在的数据 并且按照 id 升序排序
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: result,
        })
    })
}

exports.addArticleCates = (req, res) => {
    //查询分类名称与别名是否被占用 用多种情况
    const sql = 'select * from  ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (result.length === 1 && req.body.name === result[0].name && req.body.alias === result[0].alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (result.length === 1 && req.body.name === result[0].name) return res.cc('分类名称被占用，请更换后重试！')
        if (result.length === 1 && req.body.alias === result[0].alias) return res.cc('分类别名被占用，请更换后重试！')
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, (err, result) => {
            if (err) return res.cc(err)
            res.cc('添加文章分类成功', 0)

        })
    })
}


exports.deleteCateById = (req, res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')

        // 删除文章分类成功
        res.cc('删除文章分类成功！', 0)
    })
}


exports.getArticleById = (req, res) => {
    const sql = `select * from ev_article_cate where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')

        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0],
        })
    })
}

//更新的数据 不能在数据库中重复
exports.updateCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where id!=? and (name=? or alias=?)'
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (result.length === 1 && req.body.name === result[0].name && req.body.alias === result[0].alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (result.length === 1 && req.body.name === result[0].name) return res.cc('分类名称被占用，请更换后重试！')
        if (result.length === 1 && req.body.alias === result[0].alias) return res.cc('分类别名被占用，请更换后重试！')
        const sql = 'update ev_article_cate set ? where id=?'
        db.query(sql, [req.body, req.body.Id], (err, result) => {
            if (err) return res.cc(err)
            // SQL 语句执行成功，但是影响行数不等于 1
            if (result.affectedRows !== 1) return res.cc('更新文章分类失败！')
            res.cc('更新文章分类成功', 0)

        })
    })
}