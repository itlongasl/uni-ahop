//导入网络请求数据的包
import { //按需导入
  $http
} from '@escook/request-miniprogram'

//将$http挂在到uni（在uni-app项目中uni相当于小程序的wx这个顶级对象）上
uni.$http = $http
//请求根路径
// $http.baseUrl = 'https://www.uinav.com'
// $http.baseUrl = 'https://applet-base-api-t.itheima.net'
$http.baseUrl = 'https://api-ugo-web.itheima.net'

// 请求拦截器  在发起请求之前能做一些事情
$http.beforeRequest = function(options) {
  // 发请求之前展示loading效果
  uni.showLoading({
    title: '数据加载中...'
  })
}
// 响应拦截器   在请求完成可以做一些事情
$http.afterRequest = function(options) {
  // 请求完毕后隐藏loading效果
  uni.hideLoading()
}
