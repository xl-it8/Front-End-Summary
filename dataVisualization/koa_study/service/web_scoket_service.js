const WebSocket = require('ws') //引入websocket
const path = require('path')
const getApiData = require('../utils/index')
//封装监听方法
module.exports = () => {
    //创建监听服务器
    const wss = new WebSocket.Server({
        port: 9888
    })
    //与客户端连接成功
    wss.on('connection', client => {

        //客户端向服务端发送数据的监听
        client.on('message', async msg => { //msg 是客户端发送的数据
            console.log(msg)
            let payLoad = JSON.parse(msg) //传递的是json格式 转为对象
            let action = payLoad.action
            if (action === 'getData') { //前后端的约定  { action:'' , chartName:'',value:'',socketType:''}
                let filePath = '../data/' + payLoad.chartName + '.json'
                filePath = path.join(__dirname, filePath) //拼接出绝对路径
                const res = await getApiData(filePath) //获取数据的函数
                payLoad.data = res //在原有的对象中添加data
                client.send(JSON.stringify(payLoad)) //向客户端发起数据
            } else {
                //原封不动的将数据转发给每一个与服务端连接的客户端
                //wss.clients 数组 所有客户端
                wss.clients.forEach(client => {
                    client.send(msg)  //如果msg的数据是字节形式 修改ws版本"ws": "^5.2.3"
                })
            }
        })
    })
}