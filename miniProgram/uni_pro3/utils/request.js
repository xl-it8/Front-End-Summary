// 按需导入 $http 对象
import {
  $http
} from '@escook/request-miniprogram'
import store from '../store/store.js'
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
  if (options.url.indexOf('/my/') === '-1') {
    // 为请求头添加身份认证字段
    options.header = {
      // 字段的值可以直接从 vuex 中进行获取
      Authorization: store.state.m_user.token,
    }
  }
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}
