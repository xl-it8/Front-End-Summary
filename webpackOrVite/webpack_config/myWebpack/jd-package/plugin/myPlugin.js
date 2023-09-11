class MyPlugin {
    //插件会有一个apply方法 //注册订阅
    apply(complier) {
        complier.hooks.compile.tap('compile', function (...rest) {
            console.log(...rest)//在这里可以执行具体的插件任务 比如处理HTMLWebpackPlugin 。。。
        })
    }
}

module.exports = MyPlugin 