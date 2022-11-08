import HttpRequest from './index';

class TestApi {
  test ():Promise<any> {
    return new Promise<any>((resolve, reject) => {
      HttpRequest.get({
        url: 'test/get',
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
}

export default TestApi;
