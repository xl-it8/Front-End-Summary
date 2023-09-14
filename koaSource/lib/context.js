const context = {}

function createDefineProperty(target, key) {
  Object.defineProperty(context, key, {
    get() {
      return this[target][key]
    },
    set(newValue) {
        this[target][key] = newValue
    },
  })
}
createDefineProperty('request', 'url')
createDefineProperty('response', 'body')
module.exports = context
