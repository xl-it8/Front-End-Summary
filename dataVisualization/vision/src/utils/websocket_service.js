export default class SocketService {
  // 单例模式 一个类只能创建一个实例
  static instance = null // 这个是静态成员
  static getInstance() {
    // 这里面的this 指向调用者 不是实例对象而是静态 SocketService
    if (!this.instance) {
      this.instance = new SocketService() // 这个 创建的是类所调用的实例 可以访问类身上的属性和方法
    }
    return this.instance
  }

  ws = null // 实例属性
  callbackMapping = {} // 存放函数的
  // 是否连接成功
  connected = false
  connectedCount = 0 // 连接次数
  count = 0
  connect () {
    if (!window.WebSocket) {
      return console.log('您的游览器不支持websocket')
    } else {
      // 这里的this 指向实例对象
      // console.log(this)
      this.ws = new WebSocket('ws://localhost:9888') // 发起实时请求
      this.ws.onopen = () => {
        // 代表连接成功
        this.connected = true
        this.count = 0
      }
      this.ws.onclose = () => {
        // 连接失败的时候  就可能服务器停止了
        this.connected = false
        setTimeout(() => {
          this.count++
          this.connect()
        }, 500 * this.count)
      }
      this.ws.onmessage = (msg) => { // 连接所接受到的数据
        console.log(msg)
        const receiData = JSON.parse(msg.data)
        const socketType = receiData.socketType
        if (this.callbackMapping[socketType]) {
          if (receiData.action === 'getData') {
            const realData = JSON.parse(receiData.data)
            this.callbackMapping[socketType].call(this, realData)
          } else if (receiData.action === 'fullScreen') {
            this.callbackMapping[socketType].call(this, receiData)
          } else {
            console.log(33)
          }
        }
      }
    }
  }

  registerCallback (socketType, callback) {
    this.callbackMapping[socketType] = callback
  }

  unRegisterCallback (socketType) {
    this.callbackMapping[socketType] = null
  }

  send (data) {
    if (this.connected) {
      this.connectedCount = 0
      this.ws.send(JSON.stringify(data)) // 向服务器发送数据
    } else {
      setTimeout(() => {
        this.connectedCount++
        this.send(data)
      }, this.connectedCount * 5) // 优化 this.connectedCount * 5 每次连接判断都延长时间
    }
  }
}

// 与后台做的约定
// action: 'getData', //什么行为 是获取数据 还是 全屏 还是改主题
// socketType: 'trendData', //通讯类型
// chartName: 'trend', // 根据这个获取数据并返回数据 图标名字
// value: '' //传入的值

// export class SocketServe {
//   static instance = null
//   static getInstance() {
//     if (!this.instance) {
//       this.instance = new SocketServe()
//     }
//     return this.instance
//   }

//   connect () {
//     if (!window.WebSocket) {
//       console.log('该游览器不支持websocket')
//     } else {
//       this.ws = new WebSocket("ws:127.0.0.1:4000") // 创建socket实例
//       // this.ws.onmessage=()
//     }
//   }
// }

// websocket 过程 是全双工通信的 前端向后台发送数据 后台返回数据
