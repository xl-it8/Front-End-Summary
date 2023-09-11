export default (options) => {
  const {
    name,
    data
  } = options
  let obj = {
    user_id: '63e1f1f7e766bb63741376d9',
    ...data
  }
  return new Promise((resolve, reject) => {
    uniCloud.callFunction({
      name,
      data: obj,
      success(res) {
        resolve(res.result.data)
      },
      fail(err) {
        reject(err)
      }
    })
  }).catch((e) => {
    console.log(e)
  })
}
