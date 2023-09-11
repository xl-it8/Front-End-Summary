const joi = require('joi') //不能校验multipart/form-data数据
//allow()代表 允许什么值
// valid() 代表只能是其中两个之一
// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()
module.exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    }
}