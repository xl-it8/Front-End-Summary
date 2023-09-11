// username: Joi.string().alphanum().min(3).max(12).required(),
// password: Joi.string()
//   .pattern(/^[\S]{6,15}$/)
//   .required(),
// repassword: Joi.ref('password')
const wallSchema = {
    // 2.1 校验 req.body 中的数据
    body: {
    
    },
    // 2.2 校验 req.query 中的数据
    query: {
    },
    // 2.3 校验 req.params 中的数据
    params: {
    }
  }