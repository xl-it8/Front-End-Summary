export default function (callBack) {
  if (document.readyState === 'complete') {
    callBack() //保证页面加载完毕之后调用函数判断是否是白屏
  } else {
    window.addEventListener('load', callBack) //没有就监听
  }
}
