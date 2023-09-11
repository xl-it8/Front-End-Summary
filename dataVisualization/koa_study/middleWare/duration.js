module.exports = async (context, next) => {
    const currentTime = + new Date()
    await next()
    const nowTime = Date.now()
    const time = nowTime - currentTime
    context.set('X-Response-Time', time + 'ms')
}