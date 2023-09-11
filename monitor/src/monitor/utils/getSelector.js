function getSelector(path) {
  return path
    .reverse()
    .filter((element) => {
      return element !== window && element !== document
    })
    .map((ele) => {
      if (ele.id) {
        return `${ele.nodeName.toLowerCase()}#${ele.id}`
      } else if (ele.className && typeof ele.className === 'string') {
        return `${ele.nodeName.toLowerCase()}.${ele.className}`
      } else {
        return ele.nodeName.toLowerCase()
      }
    })
}

export default function (pathOrTarget) {
  if (Array.isArray(pathOrTarget)) {
    return getSelector(pathOrTarget)
  } else {
    //可能是对象
    let path = []
    while (pathOrTarget) {
      path.push(pathOrTarget.parentNode)
      pathOrTarget = pathOrTarget.parentNode
    }
    return getSelector([path])
  }
}
