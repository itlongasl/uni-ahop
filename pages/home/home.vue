<template>
  <view>
    <!-- 搜索区 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="swiper in swiperList" :key="goods_id">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=`+swiper.goods_id">
          <img :src="swiper.image_src">
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类区 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层区 -->
    <view class="floor-list">
      <!-- 楼层item项 -->
      <view class="floor-item" v-for="(item,index) in floorList" :key="index">
        <!-- 标题 -->
        <img :src="item.floor_title.image_src" class="floor-title">
        <!-- 图片 -->
        <view class="floor-img-box">
          <!-- 左侧盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <img :src="item.product_list[0].image_src" alt="" class="left-img"
              :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix">
          </navigator>
          <!-- 右侧盒子 -->
          <view class="right-img-box">
            <navigator class="right-img" v-for="(i,index) in item.product_list" :key="index" v-if="index!==0"
              :url="i.url">
              <img :src="i.image_src" :style="{ width: i.image_width + 'rpx' }" mode="widthFix">
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    reqSwiperList,
    reqNavList,
    reqFloorList
  } from '../../api/request.js'
  export default {
    data() {

      return {
        //轮播图数据
        swiperList: [],
        // 分类项数据
        navList: [],
        // 楼层数据
        floorList: []
      }
    },
    onLoad() {
      // 调用方法获取轮播图数据
      this.getSwiperList();
      // 调用方法获取分类项的数据
      this.getNavList();
      // 调用方法获取楼层数据
      this.getFloorList()
    },

    methods: {
      // 获取轮播图数据
      async getSwiperList() {
        const {
          data: res
        } = await reqSwiperList()
        if (res.meta.status !== 200) {
          // 请求失败调用showToast弹出失败消息
          return uni.$showMsg()
        }
        this.swiperList = res.message
      },
      // 获取分类选项数据
      async getNavList() {
        const {
          data: res
        } = await reqNavList()
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.navList = res.message
      },
      // 分类跳转处理函数
      navClickHandler(item) {
        if (item.name == '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取首页楼层数据函数
      async getFloorList() {
        const {
          data: res
        } = await reqFloorList()
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        // 对数据进行处理
        res.message.forEach(floor => {
          // 对数据提供的跳转地址进行更改   因为跳转地址与文件地址有所不同
          floor.product_list.forEach(item => {
            item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      // 自定义事件  跳转到搜索页
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }

  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
