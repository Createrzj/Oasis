import Taro from '@tarojs/taro';

const BASE_URL = 'https://oasis-backend.zeabur.app';
// const BASE_URL = "http://localhost:5000"

export const apiClient = {
  get: (url, data) => {
    return Taro.request({
      url: `${BASE_URL}${url}`,
      data,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  },
  post: (url, data) => {
    return Taro.request({
      url: `${BASE_URL}${url}`,
      data,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }
}
