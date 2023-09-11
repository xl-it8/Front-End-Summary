//利用阿里云进行数据传输
// const userAgent = require('useragent')
let host = ''
let project = ''
let ligStore = ''
function getExtraData(){
    return {
        host,
        project,
        ligStore,
        title: document,
        url:location.href
        // name: userAgent.parse(navigator.userAgent).name
    }
}

class SendTracker {
    constructor(){
        this.url = '地址',
        this.xhr = new XMLHttpRequest()
    }
    send(data = {}){
      let extraData = getExtraData()
      let log ={...extraData, ...data}
      //对象不能有数字 阿里云日志规定
      for(let key in log){
        if(typeof log[key] === 'number'){
            log[key] = `${log[key]}`
        }
      }
      let body = JSON.stringify({
        __logs__:[log] //阿里云规定的写法
      })
      this.xhr.open('POST', this.url)
      this.xhr.setRequestHeader('Content-Type', 'application/json')
      this.xhr.setRequestHeader('x-log-apiversion','0.6,0')//版本号
      this.xhr.setRequestHeader('x-log-bodyrawsize',body.length)//请求大小
      this.xhr.onload = function(){ //完成

      }
      this.xhr.onerror = function(){ //失败

      }
      this.xhr.send(log)
    }
}

export default  SendTracker