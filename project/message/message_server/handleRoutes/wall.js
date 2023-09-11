const { query, query2 } = require("../dataBase/index");

exports.handel_userIp = (req, res) => {
  res.send({
    message: req.ip,
    status: 200,
  });
};

exports.handel_Wall = (req, res) => {
  const data = req.body;
  const sql = "insert into walls set ?";
  query(sql, data, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("创建失败");
    res.send({
      status: 200,
      message: "创建成功",
    });
  });
};

exports.handel_FeedBack = (req, res) => {
  const data = req.body;
  const sql = "insert into feedbacks set ?";
  query(sql, data, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("新建反馈失败");
    res.send({
      message: "新建成功",
      status: 200,
    });
  });
};

exports.handel_Comment = (req, res) => {
  const data = req.body;
  const sql = "insert into comments set ?";
  query(sql, data, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("添加失败");
    res.send({
      message: "添加成功",
      status: 200,
    });
  });
};

//删除墙 主表对应多条子表一起删除
exports.delete_Wall = (req, res) => {
  const id = res.body.id;
  if (res.body.imgurl) {
    Mkdir.delFiles("assets/", res.body.imgurl);
  }
  const sql =
    "delete a,b,c from walls a left join feedbacks b on a.id=b.wallId left join comments c on a.id=c.wallId where a.id=?";
  query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除失败");
    // res.send({
    //   message: results,
    //   status: 200,
    // });
  });
};

exports.delete_feedback = (req, res) => {
  const id = res.body.id;
  const sql = "delete from feedbacks where id =?";
  query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除失败");
    res.send({
      message: results,
      status: 200,
    });
  });
};

exports.delete_Comment = (req, res) => {
  const id = res.body.id;
  const sql = "delete from comments where id =?";
  query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除失败");
    res.send({
      message: results,
      status: 200,
    });
  });
};

exports.handle_findWallPage = (req, res) => {
  //   console.log(req.body);
  const { page, pageSize, label, type, useId } = req.body;
  let sql;
  let arr;
  //limit n,m  n：跳过第n行 m:取m行
  let num = parseInt((page - 1) * pageSize);

  if (label === -1) {
    sql = "select * from walls where type=? order by id desc limit ?,?"; //拿到type=0的所有数据 接着按照id降序排序 最后选出 limit 8条数据
    arr = [type, num, parseInt(pageSize)];
  } else {
    //当有标签时查阅标签
    sql =
      "select * from walls where type=? and label=? order by id desc limit ?,?";
    arr = [type, label, num, parseInt(pageSize)];
  }
  query(sql, arr, async (err, results) => {
    if (err) return res.cc(err);
    // if (results.length <= 0) return res.cc("查询失败");
    // console.log(results)
    const res3 = await handleData(results, useId);
    res.send({
      message: res3,
      status: 200,
    });
  });
};

//倒序分页查询墙的评论
exports.handle_findCommentPage = (req, res) => {
  const { page, pageSize,wallId } = req.body;
  //limit n,m  n：跳过第n行 m:取m行
  let num = (page - 1) * pageSize;
  let sql = "select * from comments where wallId=? order by id desc limit ?,?";
  query(sql, [wallId, num, pageSize], (err, results) => {
    if (err) return res.cc(err);
    // if (results.length <= 0) return res.cc("查询失败");
    res.send({
      message: results,
      status: 200,
    });
  });
};
//查询各反馈总数据
//  (err, results) => {
//     if (results[0].count === 0) res2 = 0;
//     res2 = results[0].count;
//     // console.log(res2);
//   }
exports.handle_feedbackCount = async (wid, type) => {
  let sql = "select count(*) as count from feedbacks where wallId=? and type=?";
  return query2(sql, [wid, type]).then(([err, results]) => {
    // console.log(results[0].count)
    return results[0].count ? results[0].count : 0;
  });
};

//查询评论总数
exports.handle_commentCount = (wid) => {
  let sql = "select count(*) as count from comments where wallId=?";
  return query2(sql, [wid]).then(([err, results]) => {
    return results[0].count ? results[0].count : 0;
  });
};

//是否点赞
exports.handle_likeCount = (wid, uid) => {
  let sql =
    "select count(*) as count from feedbacks where wallId=? and userId=? and type=0";
  return query2(sql, [wid, uid]).then(([err, results]) => {
    return results[0].count ? results[0].count : 0;
  });
};

const funs = exports;

async function handleData(item, useId) {
  for (let i = 0; i < item.length; i++) {
    //喜欢
    item[i].like = await funs.handle_feedbackCount(item[i].id, 0);
    //举报
    item[i].report = await funs.handle_feedbackCount(item[i].id, 1);
    //要求撤回
    item[i].revoke = await funs.handle_feedbackCount(item[i].id, 2);
    //是否点赞
    item[i].islike = await funs.handle_likeCount(item[i].id, useId);
    //评论数
    item[i].comcount = await funs.handle_commentCount(item[i].id);
  }
  return item;
}
