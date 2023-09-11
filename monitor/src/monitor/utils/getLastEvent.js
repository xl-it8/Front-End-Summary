let lastEvent
;['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(
  (eventType) => {
    document.addEventListener(
      eventType,
      (event) => {
        lastEvent = event
      },
      {
        capture: false, //捕获行为
        passive: true, //不阻止默认行为
      }
    )
  }
)

export default function () {
  return lastEvent
}
