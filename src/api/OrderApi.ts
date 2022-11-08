import HttpRequest from './index'

export class OrderApi {
  private data: any

  setData (data: any): OrderApi {
    this.data = data
    return this
  }

  /**
   * 生成验证码
   */
  generateVerifyCode (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.getJFIF({
        url: 'order/generateverifycode',
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
   * 生成秒杀令牌
   */
  generateToken (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'order/generatetoken',
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
   * 用户下单
   */
  orderCreate (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'order/' + this.data.path + '/create',
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
   * 查看个人历史订单接口
   */
  personList (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'order/person/list',
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
   * 普通支付接口
   */
  orderPay (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'order/pay',
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
   * 取消订单
   */
  cancelOrder (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'order/cancel',
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
