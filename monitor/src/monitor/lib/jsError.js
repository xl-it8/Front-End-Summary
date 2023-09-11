import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
import SendTracker from '../utils/tracker'
export function injectJsError() {
  //监听全局未捕获的错误
  window.addEventListener(
    'error',
    function (e) {
      console.log(e)
      const lastEvent = getLastEvent()
      if (e.target && (e.target.src || e.target.href)) {
        new SendTracker().send({
          kind: 'stability', //监控指标的大类
          type: 'error', //小类型 这是一个错误
          errorType: 'resourceError', //js,css图片资源加载错误
          filename: e.target.src || e.target.href, //哪个文件报错
          tagName: e.target.tagName,
          // stack: getLines(e.error.stack),
          selector: getSelector(e.target) //代表最后一个操作的元素
        })
      } else {
        new SendTracker().send({
          kind: 'stability', //监控指标的大类
          type: 'error', //小类型 这是一个错误
          errorType: 'jsError', //js执行的错误
          url: '', //访问哪个路径 报错
          message: e.message, //报错信息、
          filename: e.filename, //哪个文件报错
          position: `${e.lineno}:${e.colno}`,
          // stack: getLines(e.error.stack),
          selector: lastEvent ? getSelector(lastEvent.path) : '', //代表最后一个操作的元素
        })
      }
    },
    true
  )

  window.addEventListener(
    'unhandledrejection',
    (e) => {
      const lastEvent = getLastEvent()
      let message
      let filename
      let line = 0
      let column = 0
      let stack = ''
      let reason = e.reason
      if (typeof reason === 'string') {
        message = reason
      } else if (typeof reason === 'object') {
        let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
        filename = matchResult[1]
        line = matchResult[2]
        column = matchResult[3]
        message = reason.message
        stack = getLines(reason.stack)
      }
      new SendTracker().send({
        kind: 'stability', //监控指标的大类
        type: 'error', //小类型 这是一个错误
        errorType: 'promiseError', //js执行的错误
        message, //报错信息、
        filename, //哪个文件报错
        position: `${line}:${column}`,
        stack,
        selector: lastEvent ? getSelector(lastEvent.path) : '', //代表最后一个操作的元素
      })
    },
    true
  ) //true捕获模式

  function getLines(stack) {
    return stack
      .split('\n')
      .slice(1)
      .map((item) => item.replace(/^\s+at\s+/g, ''))
      .join('^')
  }
}
