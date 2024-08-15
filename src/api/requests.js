import axios from 'axios';

// 创建axios实例并配置基础URL
// export const apiClient = axios.create({
//   baseURL: 'https://oasis-backend.zeabur.app/',
// });

export const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
});
