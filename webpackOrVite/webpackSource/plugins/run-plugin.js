class DonePlugin {
  apply(compiler) {
    compiler.hooks.run.tap('run', () => {
      console.log('开始编译')
    })
  }
}

module.exports = DonePlugin
