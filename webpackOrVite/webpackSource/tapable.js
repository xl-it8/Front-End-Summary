class SyncHook {
  constructor(args) {
    this.args = args
    this.fns = []
  }
  tap(name, fn) {
    this.fns.push(fn)
  }
  call(...args) {
    this.fns.forEach(fn=>fn(...args))
  }
}

const hook = new SyncHook(['name', 'chunk'])
hook.tap('run', (name,chunk) => {}) //订阅
hook.tap('done', () => {})
hook.call('lij','xx')
