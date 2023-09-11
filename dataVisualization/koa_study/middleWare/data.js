const path = require('path')
const getApiData = require('../utils/index')
module.exports = async (context, next) => {
    const url = context.request.url
    let baseUrl = url.replace('/api', '')
    baseUrl = '../data' + baseUrl + '.json'
    baseUrl = path.join(__dirname, baseUrl)
    //try catch 捕获错误信息 就是如果是错误的promise会执行catch里面的内容
    try {
        const data = await getApiData(baseUrl)
        context.response.body = data
    } catch (err) {
        const msg = {
            message: '请求地址出错,请重新设置',
            status: '404'
        }
        context.response.body = JSON.stringify(msg)
    }
    await next()
}