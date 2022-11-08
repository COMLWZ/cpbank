import axios from 'axios'
import { ElMessage } from 'element-plus'

const router = require('vue-router').useRouter()
const { Http } = require('@/tool/WebEnum')
const qs = require('qs')
/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  config => {
    console.log(config.url)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (config.url === 'product/create') {
      config.baseURL = '/api/test'
    } else {
      config.baseURL = '/api'
    }
    config.timeout = 6000
    // 允许携带cookie
    config.withCredentials = true
    const auth = localStorage.getItem(Http.AUTHORIZATION)
    if (auth !== null) {
      // 携带上token
      config.headers[Http.AUTHORIZATION] = localStorage.getItem(Http.AUTHORIZATION)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data.errCode === 20003 && router.currentRoute.value.path !== '/home') {
      ElMessage.error(response.data.errMsg)
      router.push('/login')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

class HttpRequest {
  static getJFIF (options: { url: string, data: any, success: (data: any) => any, error: (err: any) => any }) {
    axios.post(options.url, qs.stringify(options.data), {
      responseType: 'arraybuffer',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(res => options.success(res.data))
    .catch((err: any) => options.error(err))
  }

  /**
   * get 请求
   */
  static get (options: { url: string, success: (data: any) => any, error: (err: any) => any }) {
    axios({
      method: 'GET',
      url: options.url,
      withCredentials: true
    }).then(res => options.success(res.data))
    .catch((err: any) => options.error(err))
  }

  /**
   * post 请求
   */
  static post (options: { url: string, data: any, success: (data: any) => any, error: (err: any) => any }) {
    axios({
      method: 'POST',
      url: options.url,
      data: qs.stringify(options.data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true
    })
    .then(res => options.success(res.data))
    .catch(err => options.error(err))
  }
}

export default HttpRequest
