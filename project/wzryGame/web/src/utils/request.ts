import axios from 'axios'
console.log(process.env.VUE_APP_BASE_URL)
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || '/web/api'
})

export default instance
