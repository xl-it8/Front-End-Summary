import React from 'react';
import ReactDOM from 'react-dom/client'; //渲染webApp 构建html的核心包
import store from './store' //引入store
// import themeContext from './store/context';
import Vote from './views/Vote'
import Dialog from './components/dialog'
import {createElement, render} from './utils/jsHandler'
import Demo2 from './views/demo2'
import SagaDemo from './views/sagaDemo'
import {Provider} from 'react-redux'
import App from './App'
import './api'
let x = 2
let y = 3
const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log(  <Dialog>
//    <div slot="main">你好</div>
// </Dialog>)
root.render(
   <Provider store={store}> <SagaDemo></SagaDemo> </Provider>
  
   // <App></App>
   // <themeContext.Provider value={store}> <Vote/></themeContext.Provider>
  
   //  <Dialog>
   //     <div slot="main">你好</div>
   //  </Dialog>
   //  <>
   //       <h3 className='contaniner' style={{background: 'red',fontSzie: '16px'}}>开始</h3>
   //       <div className="main">
   //          <span>第一个值：{x}</span>
   //          <span>第一个值：{y}</span>
   //       </div>
   //       {/* {React.createElement('span', null ,'虚拟dom')} */}
   //  </>
);

// 

/* 通过preset-react-app 对jsx编译后的
React.createElement(
   React.Fragment, React.Fragment ==<></>
   null,
   React.createElement(
      "h3", 
      {
       className: "contaniner",
       style: {
       background: 'red',
       fontSzie: '16px'
            }
      },
  "\u5F00\u59CB"
  ), 
  React.createElement(
   "div", 
     {
      className: "main"
     }, 
    React.createElement(
      "span", 
       null, 
       "\u7B2C\u4E00\u4E2A\u503C\uFF1A", x), 
   React.createElement(
      "span", 
       null, 
       "\u7B2C\u4E00\u4E2A\u503C\uFF1A", y
       )
       )
      );
*/
// const vDom  = createElement(
//    'div',
//    null,
//    createElement(
//       "h3", 
//       {
//        className: "contaniner",
//        style: {
//        background: 'red',
//        fontSzie: '16px'
//             }
//       },
//   "\u5F00\u59CB"
//   ), 
//   createElement(
//    "div", 
//      {
//       className: "main"
//      }, 
//     createElement(
//       "span", 
//        null, 
//        "\u7B2C\u4E00\u4E2A\u503C\uFF1A", x), 
//    createElement(
//       "span", 
//        null, 
//        "\u7B2C\u4E00\u4E2A\u503C\uFF1A", y
//        )
//        )
//       );



// const vDom  = React.createElement(
//    React.Fragment,
//    null,
//    React.createElement(
//       "h3", 
//       {
//        className: "contaniner",
//        style: {
//        background: 'red',
//        fontSzie: '16px'
//             }
//       },
//   "\u5F00\u59CB"
//   ), 
//   React.createElement(
//    "div", 
//      {
//       className: "main"
//      }, 
//      React.createElement(
//       "span", 
//        null, 
//        "\u7B2C\u4E00\u4E2A\u503C\uFF1A", x), 
//        React.createElement(
//       "span", 
//        null, 
//        "\u7B2C\u4E00\u4E2A\u503C\uFF1A", y
//        )
//        )
//       );
// render(vDom, document.getElementById('root'))
// console.log(vDom)
// function fn() {
//    return /*#__PURE__*/React.createElement("div", null, "33");
//  }
// console.log(fn())


// Parent.prototype.sing = function(){
//    console.log('父亲唱歌')
// }
// Parent.prototype.song = function(){
//    console.log('父亲唱歌')
// }
// function Parent(){
//   this.a = '父亲1'
//   this.c = '父亲2'
// }

// function Son(){
//    Parent.call(this) //获取父类属性
//    this.b = '儿子1'
// }

// Son.prototype = Object.create(Parent.prototype)
// Son.prototype.constructor = Son
// console.log(new Son())


