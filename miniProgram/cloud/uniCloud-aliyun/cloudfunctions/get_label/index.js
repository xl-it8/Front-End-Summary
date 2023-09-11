'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate
exports.main = async (event, context) => {
  const {
    user_id,
    type
  } = event
  let matchObj = {}
  if (type !== 'all') {
    matchObj = {
      current: true
    }
  }
  // 获取 `user` 集合的引用
  const userInfos = await db.collection('user').doc(user_id).get();
  const userInfo = userInfos.data[0]

  let label = await db.collection('label')
    .aggregate()
    .addFields({
      current: $.in(['$_id', $.ifNull([userInfo.label_ids, []])])
    })
    .match(matchObj)
    .end();
  //event为客户端上传的参数
  // console.log('event : ', event)
  //返回数据给客户端
  return {
    msg: '获取成功',
    data: label.data
  }
};
