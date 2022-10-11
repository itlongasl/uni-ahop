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
