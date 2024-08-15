// import axios from 'axios';
//
// // 创建axios实例并配置基础URL
// // export const apiClient = axios.create({
// //   baseURL: 'https://oasis-backend.zeabur.app/',
// // });
//
// export const apiClient = axios.create({
//   baseURL: 'http://127.0.0.1:5000/',
// });

import Taro from '@tarojs/taro';

// const BASE_URL = 'https://oasis-backend.zeabur.app/';
const BASE_URL = "http://localhost:5000"

export const apiClient = {
  get: (url, data) => {return Taro.request({url:`${BASE_URL}${url}`, data, method:'GET'})},
  post: (url, data) => {return Taro.request({url:`${BASE_URL}${url}`, data, method:'POST'})}
}
