const test = 123
console.log(test)
import _ from 'lodash' //同步加载
// import './test2'
// import './math'
setTimeout(()=> { //异步加载 webpack会作为一个chunk打包
    import(/* webpackChunkName: 'test' */ './test2')
    import(/* webpackChunkName: 'math' */ './math')
}, 2000)

//还有运行时 runtimeChunk  webpack会作为一个chunk打包
