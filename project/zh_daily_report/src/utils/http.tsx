/*
封装fetch接口 模拟axios

fetch 只要返回数据就是成功 但是axios只有是2或3开头才是成功

http.get('xxx',配置项)
http.post('xxx',数据,配置项)

http({
    url:'xxx',
    method:'xxx',
    headers:'xxx',
    body: 'xxx'  //注意 GET 或 HEAD 方法的请求不能包含 body 信息。 bosy要么是json格式要么是a=xx&b=xx格式要么是formData等等
    mode: 'cors',
    credentials: 'include'跨域请求中需要带有cookie
    params: null, 用来设定get请求的问号传参信息 格式必须是纯对象内部处里后拼接到url之后
})


//可利用 new AbortController()中断请求
const ctrol = new AbortController()
signal= ctrol.signal //20
ctrol.abort()
*/
import qs from 'qs'
const isPureObject = (action: {}) => {
  return Object.prototype.toString.call(action) === '[object Object]'
}
const arr1 = ['PUT', 'POST', 'PATCH']
const arr2 = ['GET', 'DELETE', 'HEAD', 'OPTIONS']

interface HTTPFn {
  (config:any):Promise<any>
  [key: string]: any
}

let http:HTTPFn = function (config) {
  if (!isPureObject(config)) config = {}

  config = Object.assign(
    {
      url: '',
      method: 'GET',
      credentials: 'include',
      headers: null,
      body: null,
      params: null, //针对get请求的参数 拼接到路径后面
      responseType: 'json', //返回的格式
      signal: null, //中断信号信息
    },
    config
  )

  if (!config.url) throw TypeError('url is required!')
  if (!isPureObject(config.headers)) config.headers = {}
  if (config.params !== null && !isPureObject(config.params))
    config.params === null

  //处理各种细节
  let {
    url,
    method,
    credentials,
    headers,
    body,
    params,
    responseType,
    signal,
  } = config
  //处理问号传参
  if (params) { //这里的接口地址要是/开头
    url += `${url.includes('?') ? '&' : '?'}${qs.stringify(params)}`
  }
  //处理请求主体信息 变成x-www-forurlencoded格式
  if (isPureObject(body)) {
    body = qs.stringify(body)
    headers['Content-type'] = 'application/x-www-form-urlencoded'
  }

  //处理类似请求拦截 每个请求都要有token
// 处理Token
let token = localStorage.getItem('tk'),
safeList = ['/user_info', '/user_update', '/store', '/store_remove', '/store_list'];
if (token) { //这里是要保证这些地址需要添加token
let reg = /\/api(\/[^?#]+)/,
  [, $1] = reg.exec(url) || [];
let isSafe = safeList.some(item => {
  return $1 === item;
});
if (isSafe) headers['authorization'] = token;
}



  //发送请求
  method = method.toUpperCase()
  config = {
    method,
    credentials,
    headers,
    cache: 'no-cache',
    signal,
  }
  if (/^(POST|PUT|PATCH)$/i.test(method)) config.body = body //如果是
  return fetch(url, config)
    .then((response) => {
      let { status, statusText } = response
      if (/^(2|3)\d{2}$/.test(String(status))) {
        let result
        switch (responseType.toLowerCase()) {
          case 'text':
            result = response.text()
            break
          case 'arraybuffer':
            result = response.arrayBuffer()
            break
          case 'blob':
            result = response.blob()
            break
          default:
            result = response.json()
        }
        // console.log(result)
        // result是promise
        return result //返回的promise对象 避免在服务器返回的流数据出现一些转换问题
      }

      return Promise.reject({
        code: -100,
        status,
        statusText,
      })
    })
    .catch((reason) => {
      if (reason && typeof reason === 'object') {
        let { code, status } = reason
        if (code === -100) {
          //常见状态码错误
          switch (status) {
            case 400:
              alert('请求参数出现问题')
              break
          }
        } else if (code == 20) {
          alert('请求被中断')
        } else {
          alert('系统繁忙,请稍后再试!')
        }
      } else {
        alert('系统繁忙,请稍后再试!')
      }

      return Promise.reject(reason)
    })
}

arr1.forEach((method) => {
  const lowerMethod = method.toLowerCase()
  http[lowerMethod] = function (url: string,body:any, config = {}) {
    return http({
      url,
      method: lowerMethod,
      body,
      ...config,
    })
  }
})

arr2.forEach((method) => {
  const lowerMethod = method.toLowerCase()
  http[lowerMethod] = function (url: string, config = {}) {
   return http({
      url,
      method: lowerMethod,
      ...config,
    })
  }
})


export default http
// // console.dir(http)
// import _ from '../asstes/utils';
// import qs from 'qs';
// import { Toast } from 'antd-mobile';

// /* 核心方法 */
// const http = function http(config) {
//   // initial config & validate
//   if (!_.isPlainObject(config)) config = {};
//   config = Object.assign({
//     url: '',
//     method: 'GET',
//     credentials: 'include',
//     headers: null,
//     body: null,
//     params: null,
//     responseType: 'json',
//     signal: null
//   }, config);
//   if (!config.url) throw new TypeError('url must be required');
//   if (!_.isPlainObject(config.headers)) config.headers = {};
//   if (config.params !== null && !_.isPlainObject(config.params)) config.params = null;

//   let { url, method, credentials, headers, body, params, responseType, signal } = config;
//   if (params) {
//     url += `${url.includes('?') ? '&' : '?'}${qs.stringify(params)}`;
//   }
//   if (_.isPlainObject(body)) {
//     body = qs.stringify(body);
//     headers['Content-Type'] = 'application/x-www-form-urlencoded';
//   }

//   // 处理Token
//   let token = _.storage.get('tk'),
//     safeList = ['/user_info', '/user_update', '/store', '/store_remove', '/store_list'];
//   if (token) {
//     let reg = /\/api(\/[^?#]+)/,
//       [, $1] = reg.exec(url) || [];
//     let isSafe = safeList.some(item => {
//       return $1 === item;
//     });
//     if (isSafe) headers['authorization'] = token;
//   }

//   // send
//   method = method.toUpperCase();
//   config = {
//     method,
//     credentials,
//     headers,
//     cache: 'no-cache',
//     signal
//   };
//   if (/^(POST|PUT|PATCH)$/i.test(method) && body) config.body = body;
//   return fetch(url, config)
//     .then(response => {
//       let { status, statusText } = response;
//       if (/^(2|3)\d{2}$/.test(status)) {
//         let result;
//         switch (responseType.toLowerCase()) {
//           case 'text':
//             result = response.text();
//             break;
//           case 'arraybuffer':
//             result = response.arrayBuffer();
//             break;
//           case 'blob':
//             result = response.blob();
//             break;
//           default:
//             result = response.json();
//         }
//         return result;
//       }
//       return Promise.reject({
//         code: -100,
//         status,
//         statusText
//       });
//     })
//     .catch(reason => {
//       Toast.show({
//         icon: 'fail',
//         content: '网络繁忙,请稍后再试!'
//       });
//       return Promise.reject(reason);
//     });
// };

// /* 快捷方法 */
// ["GET", "HEAD", "DELETE", "OPTIONS"].forEach(item => {
//   http[item.toLowerCase()] = function (url, config) {
//     if (!_.isPlainObject(config)) config = {};
//     config['url'] = url;
//     config['method'] = item;
//     return http(config);
//   };
// });
// ["POST", "PUT", "PATCH"].forEach(item => {
//   http[item.toLowerCase()] = function (url, body, config) {
//     if (!_.isPlainObject(config)) config = {};
//     config['url'] = url;
//     config['method'] = item;
//     config['body'] = body;
//     return http(config);
//   };
// });

// export default http;