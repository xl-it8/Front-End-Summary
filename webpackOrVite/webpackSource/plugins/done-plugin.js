class DonePlugin {
    apply(compiler){
        compiler.hooks.done.tap('done',()=>{ //注册
            console.log('结束编译')
        })
    }
}

module.exports = DonePlugin