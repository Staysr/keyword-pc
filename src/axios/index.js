import axios from 'axios'
import router from '@/router/index.js'
const instance = axios.create({
  baseURL: window.localStorage.getItem('baseUrl'),
  withCredentials: false,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }

});
// 请求拦截器
instance.interceptors.request.use(function(config) {
  // console.log(config, "请求拦截器")
  return config;
}, function(error) {
  return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use(function(response) {
  console.log(response, "响应拦截器")
  if (response.data.code == -1) {
    window.localStorage.removeItem('token')
    return false
  }
  return response.data;
}, function(error) {
  return Promise.reject(error);
});
export default instance
