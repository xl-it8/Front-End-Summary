module.exports = {
    presets: [[
        '@babel/preset-env',
        {
            //false : 不对当前的js处理做polyfill的填充
            // usage: 依据用户源代码当中的所使用的新语法进行填充
            //entry： 依据我们当前通过browserslist筛选出来的浏览器决定要填充哪些 不看源代码内容
            useBuiltIns: 'usage',
            corejs: 3
        }
    ]]
}