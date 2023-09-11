import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from "antd-mobile";
import zhCN from 'antd-mobile/es/locales/zh-CN'
import './index.scss'
import "normalize.css"
import  'lib-flexible' //响应式处理 视图变化
import App from './App'
import { Provider } from 'react-redux';
import store from './store';

//一上来处理设备宽度大于750的问题
(function(){
  const handleMax = function(){
    let html = document.documentElement,
        root = document.getElementById('root') as HTMLElement,
        deviceW =  html.clientWidth
        root.style.maxWidth = '750px' //设置他最大宽度
        if(deviceW >= 750){
          html.style.fontSize = '750px'
        }  
  }
  handleMax()
})(
)

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
      <App />
      </Provider>
    </ConfigProvider>
);


const cc:oo = 789
console.log(cc)