import HttpRequest from './index'

export class SecKillApi {
  private data: any

  setData (data: any): SecKillApi {
    this.data = data
    return this
  }

  /**
   * 获取秒杀活动列表
   */
  secKillList (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.get({
        url: 'seckill/list',
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
   * 获取活动详情页
   */
  secKillGet (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.get({
        url: 'seckill/get?id=' + this.data,
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
   * 获取秒杀活动url的path
   */
  secKillGetPath (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.get({
        url: 'seckill/getpath?seckillId=' + this.data.seckillId + '&token=' + this.data.token,
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
   * 发布秒杀活动
   */
  secKillPublish (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'seckill/publish',
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
   * 查看秒杀活动成功下单的日志
   */
  secKillGetLogSuccess (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.get({
        url: 'seckill/getlogsuccess?seckillId=' + this.data,
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
   * 查看秒杀活动被初筛的日志
   */
  secKillGetLogFail (): Promise<any> {
    return new Promise((resolve, reject) => {
      HttpRequest.post({
        url: 'seckill/getfaillog',
        data: { seckillId: this.data },
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
