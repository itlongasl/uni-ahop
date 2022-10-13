<template>
  <view v-if="goodsInfo.goods_name" class="detail-container">
    <!-- 轮播图区域-->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in goodsInfo.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goodsInfo.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <view class="goods-name">{{goodsInfo.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递:免运费</view>
    </view>
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <!-- 商品导航 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {
    reqDetailInfo
  } from '../../api/request.js'
  export default {
    data() {
      return {
        // 存储传过来的商品id
        goods_id: '',
        // 存储商品详情数据
        goodsInfo: {},
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 9
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      }
    },
    onLoad(options) {
      this.goods_id = options.goods_id
      this.getDetailInfo()
    },
    methods: {
      // 获取商品详情数据函数
      async getDetailInfo() {
        const {
          data: res
        } = await reqDetailInfo(this.goods_id)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 使用字符串的replace方法为标签添加行内样式解决图片空白间隙的问题
        // 通过正则匹配将数据里面的html结构的img标签添加一个行内样式
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
          .replace(/webp/g, 'jpg') //图片是webp后缀名ios系统可能显示不出来，使用replace替换为jpg格式
        this.goodsInfo = res.message
      },
      // 点击图片实现大图预览事件
      preview(index) {
        // 调用previewImage方法实现预览图片
        uni.previewImage({
          // 预览时默认显示图片索引
          current: index,
          // 使用map循环遍历数组拿到所有图片的url地址
          urls: this.goodsInfo.pics.map(item => item.pics_big)
        })
      },
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .detail-container {
    padding-bottom: 50px;

    swiper {
      height: 750rpx;

      image {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .goods-info-box {
      padding: 10px;
      padding-right: 0;

      .price {
        color: #c00000;
        font-size: 18px;
        margin: 10px 0;
      }

      .goods-info-body {
        display: flex;
        justify-content: space-between;

        .goods-name {
          font-size: 13px;
          margin-right: 10px;
        }

        .favi {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-left: 1px solid #efefef;
          width: 120px;
          font-size: 12px;
          color: gray;
        }
      }

      .yf {
        font-size: 12px;
        color: gray;
        margin: 10px 0;
      }
    }

    .goods-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
