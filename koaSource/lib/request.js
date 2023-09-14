const url = require('url').URL
const request = {
  get header() {
    return this.req.headers
  },

  get url() {
    return this.req.url
  },
}
module.exports = request
