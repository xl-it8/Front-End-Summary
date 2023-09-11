import axios, { AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios' //是指编译器在查找导入模块内容时所遵循的流程
class Request {
  //实力
  instance: AxiosInstance = null
  baseConfig: AxiosRequestConfig = { baseURL: 'http://localhost/api', timeout: 5000 }
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
      },
      (err: any) => {
        return Promise.reject(err)
      },
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse<any, any>) => {
        return res
      },
      (err: any) => {
        let message = ''
        switch (err.message.error) {
          case 400:
            message = '请求错误(400)'
            break
          case 401:
            message = '未授权，请重新登录(401)'
            break
          case 404:
            message = '请求出错(404)'
            break
          case 408:
            message = '请求超时(408)'
            break
          case 500:
            message = '服务器错误(500)'
            break
          default:
            message = `连接出错(${err.response.status})!`
        }
        return Promise.reject(err.response)
      },
    )
  }

  public get<T>(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<T, any>> {
    return this.instance.get(url, config)
  }
  //  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
  public post<T = any, D = any>(url: string, data?: D): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data)
  }
  // delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  public delete<T = any>(url: string, config?: AxiosRequestConfig<AxiosResponse<T>>) {
    return this.instance.delete(url, config)
  }
}

export default new Request({})
