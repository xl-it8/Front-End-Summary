import SendTracker from '../utils/tracker'

export default function injectXHR() {
  let XMLHttpRequest = window.XMLHttpRequest
  let oldOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (method, url, async) {
    //AOP切片重写
    if (!url.match(/log/)) {
      this.logData = { method, url, async }
    }
    return oldOpen.apply(this, arguments)
  }

  let oldSend = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send = function (body) {
    //AOP切片重写
    if (this.logData) {
      let startTime = Date.now() //发送前的时间
      let handler = (type) => (e) => {
        //柯里化
        let duration = Date.now() - startTime
        let status = this.status //200 500
        let statusText = this.statusText
        let log = {
          kind: 'stability',
          type: 'xhr',
          eventType: type,
          pathname: this.logData.url,
          status: status + '-' + statusText,
          duration,
          response: this.response ? JSON.stringify(this.response) : '', //响应提
          params: body || '',
        }
        console.log(log)
        // new SendTracker().send(log)
      }

      this.addEventListener('load', handler('load'))
      this.addEventListener('error', handler('error'))
      this.addEventListener('abort', handler('abort'))
    }

    return oldSend.apply(this, arguments)
  }
}
