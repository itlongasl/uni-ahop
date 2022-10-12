<template>
  <view>
    <view class="goods-item">
      <!-- 左侧盒子 -->
      <view class="goods-item-left">
        <image :src="goods.goods_small_logo||defaultPic" class="goods-pic" mode=""></image>
      </view>
      <!-- 右侧盒子 -->
      <view class="goods-item-right">
        <view class="goods-name">{{goods.goods_name}}</view>
        <view class="goods-info-box">
          <view class="goods-price">￥{{goods.goods_price | tofixed}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        // 默认值
        default: {}
      }
    },
    data() {
      return {
        // 为了防止某些商品的图片不存在，需要在 data 中定义一个默认的图片：
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    //过滤器
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">

</style>
