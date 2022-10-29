// 获取首页轮播图数据  /api/public/v1/home/swiperdata  GET请求  无携带参数
export const reqSwiperList = () => {
  return uni.$http.get('/api/public/v1/home/swiperdata')
}
//获取首页分类选项数据  /api/public/v1/home/catitems  GET请求   无携带参数
export const reqNavList = () => {
  return uni.$http.get('/api/public/v1/home/catitems')
}
//获取首页楼层数据  /api/public/v1/home/floordata  GET请求  无携带参数
export const reqFloorList = () => {
  return uni.$http.get('/api/public/v1/home/floordata')
}
// 获取分类数据  /api/public/v1/categories  GET请求  无携带参数
export const reqCateList = () => {
  return uni.$http.get('/api/public/v1/categories')
}
// 获取商品搜索列表  /api/public/v1/goods/qsearch  GET请求  携带query(搜索关键词)参数
export const reqSearchList = (query) => {
  return uni.$http.get('/api/public/v1/goods/qsearch', {
    query: query
  })
}
//获取商品列表数据  /api/public/v1/goods/search  GET请求  携带参数
export const reqGoodsList = (queryObj) => {
  return uni.$http.get('/api/public/v1/goods/search', queryObj)
}
// 获取商品详情数据  /api/public/v1/goods/detail  GET请求  携带商品id
export const reqDetailInfo = (id) => {
  return uni.$http.get('/api/public/v1/goods/detail?goods_id=' + id)
}
//微信登录获取token参数  /api/public/v1/users/wxlogin  POST请求  携带参数
export const reqUserToken = (query) => {
  return uni.$http.post('/api/public/v1/users/wxlogin', query)
}
// 创建订单请求  /api/public/v1/my/orders/create  POST请求  
export const reqPayOrder = (orderInfo) => {
  return uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
}
// 订单支付  /api/public/v1/my/orders/req_unifiedorder  POST请求  
export const reqUnifiedorder = (orderNumber) => {
  return uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
    order_number: orderNumber
  })
}
