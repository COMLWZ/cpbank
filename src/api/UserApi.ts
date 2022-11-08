import HttpRequest from './index'

export class UserApi {
  private data: any

  setData (data: any): UserApi {
    this.data = data
    return this
  }

  /**
   * 发送验证码
   */
  getotp (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'user/getotp',
        data: this.data,
        success (data: any) {
          resolve(data)
        },
        error (err: any) {
          reject(err)
        },
      })
    })
  }

  /**
   * 校验验证码
   */
  judgeotp (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'user/judgeotp',
        data: this.data,
        success (data: any) {
          resolve(data)
        },
        error (err: any) {
          reject(err)
        },
      })
    })
  }

  /**
   * 注册
   */
  register (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'user/register',
        data: this.data,
        success (data: any) {
          resolve(data)
        },
        error (err: any) {
          reject(err)
        },
      })
    })
  }

  /**
   * 登陆验证
   */
  loginAuth (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'user/login',
        data: this.data,
        success (data: any) {
          resolve(data)
        },
        error (err: any) {
          reject(err)
        },
      })
    })
  }

  /**
   * 获取用户信息
   */
  getUserInfo (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.get({
        url: 'user/get?token=' + this.data,
        success (data: any) {
          resolve(data)
        },
        error (err: any) {
          reject(err)
        },
      })
    })
  }

  /**
   * 用户完善信息
   */
  complete (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'user/complete',
        data: this.data,
        success (data: any) {
          resolve(data)
        },
        error (err: any) {
          reject(err)
        },
      })
    })
  }

  /**
   * 用户订阅秒杀提醒
   */
  subscribe (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'user/subscribe',
        data: this.data,
        success (data: any) {
          resolve(data)
        },
        error (err: any) {
          reject(err)
        },
      })
    })
  }
}

export class StaffApi {
  private data: any

  setData (data: any): StaffApi {
    this.data = data
    return this
  }

  /**
   * 管理员登录
   */
  loginAuth (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'manager/login',
        data: this.data,
        success (data: any) {
          resolve(data)
        },
        error (err: any) {
          reject(err)
        },
      })
    })
  }

  /**
   * 获取管理员个人信息
   */
  getUserInfo (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.get({
        url: 'manager/get?token=' + this.data,
        success (data: any) {
          resolve(data)
        },
        error (err: any) {
          reject(err)
        },
      })
    })
  }
}
