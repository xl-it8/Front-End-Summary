'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate
exports.main = async (event, context) => {
  const {
    user_id,
    name,
    page,
    pageSize
  } = event
  let obj = {}
  if (event.name !== '全部') {
    obj = {
      classify: name
    }
  }
  const userinfo = await db.collection('user').doc(user_id).get()
  const article_likes_ids = userinfo.data[0].article_likes_ids
  const res = await db.collection('article').aggregate().match(obj).addFields({
      is_like: $.in(['$_id', article_likes_ids]) //$_id代表list表的文章的id 是否在article_likes_ids存在
    })
    .project({
      content: false
    }).skip(pageSize * (page - 1)).limit(pageSize).end()

  //返回数据给客户端
  return {
    msg: '获取成功',
    data: res.data
  }
};
