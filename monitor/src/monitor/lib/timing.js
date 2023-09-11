import SendTracker from '../utils/tracker'

import onLoad from '../utils/onLoad'

export default function () {
  let FMP, LCP
  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries()
    FMP = perfEntries[0]
  }).observe({ entryTypes: ['element'] }) // 观察有意义的元素
  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries()
    LCP = perfEntries[0]
  }).observe({ entryTypes: ['largest-contentful-paint'] }) // 观察有意义的元素

  new PerformanceObserver((entryList, observer) => {
    let firstInput = entryList.getEntries()[0]
    if (firstInput) {
      let inputDelay = firstInput.processingStart - firstInput.startTime
      let duration = firstInput.duration
      if (inputDelay > 0 || duration > 0) {
        const log = {
          kind: 'experience',
          type: 'firstInputDelay', //首次输入延迟
          inputDelay, //延迟加载时间
          duration, //处理时间
          startTime: firstInput.startTime,
          // selector:
        }
        console.log(log)
      }
    }
  }).observe({ type: 'first-input', buffered: true }) // 第一次交互

  onLoad(() => {
    setTimeout(() => {
      //   const {
      //     fetchStart,
      //     connectStart,
      //     connectEnd,
      //     requestStart,
      //     requestEnd,
      //     responseStart,
      //     responseEnd,
      //     domInteractive,
      //     domContentLoadedEventStart,
      //     domContentLoadedEventEnd,
      //     loadEventStart,
      //     loadEventEnd
      //   } = PerformanceObserver
      //   const log ={
      //     kind:'experience',//用户体验指标
      //     type:'timing', //统计每个阶段的时间
      //     connectTime:connectEnd-connectStart, //连接时间
      //     ttfbTime:responseStart-requestStart ,//首字节到达时间
      //     responseTime:responseEnd -responseStart, //响应的读取时间
      //     domContentLoadedTime: domContentLoadedEventEnd-domContentLoadedEventStart ,//dom渲染时间
      //     timeToInteractive:domInteractive-fetchStart,//首次交互时间
      //     loadTime:loadEventStart-fetchStart//完整的加载时间
      //   }

      const FP = performance.getEntriesByName('first-paint')[0] //首次绘制
      const FCP = performance.getEntriesByName('first-contentful-paint')[0] //首次内容绘制
      console.log(FCP)
    //   const log2 = {
    //     kind: 'experience',
    //     type: 'paint', //统计每个阶段的时间
    //     firstPaint: FP.startTime,
    //     firstContentfulPaint: FCP.startTime,
    //     firstMeaningfulPaint: FMP.startTime,
    //     largestContentfulPaint: LCP.startTime,
    //   }
    //   console.log(log2)
    }, 300)
  })
}
