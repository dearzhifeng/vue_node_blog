import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../src/assets/font_icon/iconfont.css'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {dateFormat} from "@/utils/datefilter";
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  if(window.localStorage.getItem('token')){config.headers.Authorization = window.localStorage.getItem('token')}
  // 在最后必须 return config
  return config
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})


import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor)
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.filter('dateFormat',dateFormat)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
