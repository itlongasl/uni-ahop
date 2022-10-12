<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods,index) in goodsList" :key="index" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    reqGoodsList
  } from '../../api/request.js'
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 搜索关键词
          query: '',
          // 搜索列表id
          cid: '',
          // 请求页码 默认第一页
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 20
        },
        // 商品列表数据
        goodsList: [],
        // 总数据数量
        total: 0,
        // 节流阀
        isloading: false

      };
    },
    onLoad(options) {
      // 将传过来的参数存进data
      // 存储搜索关键词
      this.queryObj.query = options.query || ''
      // 存储相关id
      this.queryObj.cid = options.cid || ''
      // 调用函数获取商品列表数据
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据
      async getGoodsList(cb) {
        // 开启节流阀
        this.isloading = true
        const {
          data: res
        } = await reqGoodsList(this.queryObj)
        // 关闭节流阀
        this.isloading = false
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        // 数据请求完毕关闭下拉刷新
        cb && cb()
        // 新旧数据拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      // 点击商品列表跳转到商品详情页面
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    },
    // 监听上拉加载事件
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
      // 当节流阀开启时直接return不触发下面的数据请求
      if (this.isloading) return
      // 页码值自增加一
      this.queryObj.pagenum++
      // 重新调用方法获取数据
      this.getGoodsList()
    },
    //监听下拉刷新事件
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      // 重新发送数据请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      .goods-pic {
        width: 100px;
        height: 100px;
        margin-right: 5px;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px
      }

      .goods-info-box {
        .goods-price {
          color: #c00000;
          font-size: 16px
        }
      }
    }
  }
</style>
