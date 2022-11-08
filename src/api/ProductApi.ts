import HttpRequest from './index'

export class ProductApi {
  private data: any

  setData (data: any): ProductApi {
    this.data = data
    return this
  }

  /**
   * 获取商品列表
   */
  productList (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.get({
        url: 'product/list',
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
   * 获取商品详情页
   */
  productGet (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.get({
        url: 'product/get?id=' + this.data,
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
   * 增加商品
   */
  productCreate (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'product/create',
        // url: 'http://127.0.0.1:8090/product/create',
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
