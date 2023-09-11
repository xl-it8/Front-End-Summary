// import {
//   get_label
// } from './label.js'


// export default {
//   get_label
// }

const context = require.context('./', false, /.js$/i)
const module = { //指定函数

}
for (let key of context.keys()) {
  if (key === './index.js') {
    continue
  }
  Object.assign(module, context(key))
}

export default module
// console.log(module)
