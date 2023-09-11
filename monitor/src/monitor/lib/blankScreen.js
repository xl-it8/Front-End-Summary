import SendTracker from '../utils/tracker'

import onLoad from '../utils/onLoad'
//白屏  elementsFromPoint

export default function () {
  let wrapperElement = ['html', 'body', '.container', '.content'] //之前就有的并非后期渲染的元素  如果取到这些元素 代表是空白点
  let emptyPoints = 0 //空点数
  function getSelector(element) {
    if (element.id) {
      return '#' + element.id
    } else if (element.className) {
      return (
        '.' +
        element.className
          .split('  ')
          .filter((item) => !!item)
          .join('.')
      )
    } else {
      return element.nodeName.toLowerCase()
    }
  }
  function isWrapper(element) {
    let selector = getSelector(element)
    if (wrapperElement.indexOf(selector) != -1) {
      emptyPoints++
    }
  }
  onLoad(() => {
    for (let i = 1; i < 9; i++) {
      let xElements = document.elementsFromPoint(
        (window.innerWidth * i) / 10, //300 *1/10 =30  300*2/10=60 300*3 /10=90  x轴取9个点
        window.innerHeight / 2
      )
      let yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / 10
      )

      let leftElements = document.elementsFromPoint(
        10, (window.innerHeight * i) / 10
      )
      isWrapper(xElements[0])
      isWrapper(yElements[0])
      isWrapper(leftElements[0]) //最左边的也要判断
    }

    if (emptyPoints >= 24) {
      //是空白点  白屏
      let centerElements = document.elementsFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      )
      let log = {
        kind: 'stability',
        type: 'blank',
        emptyPoints,
        screen: window.screen.width + 'X' + window.screen.height, //屏幕的宽高 包括任务栏
        viewsPoint: window.innerWidth + 'X' + window.innerHeight,
        selector: getSelector(centerElements[0]), //窗口的宽高 包括滚动条
      }
    //   new SendTracker.send(log)
    }
  })
}
