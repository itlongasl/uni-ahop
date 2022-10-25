<template>
  <view>
    <view class="goods-item">
      <!-- 左侧盒子 -->
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClick" /><text></text>
        <image :src="goods.goods_small_logo||defaultPic" class="goods-pic" mode=""></image>
      </view>
      <!-- 右侧盒子 -->
      <view class="goods-item-right">
        <view class="goods-name">{{goods.goods_name}}</view>
        <view class="goods-info-box">
          <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChange"></uni-number-box>
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
      },
      // 控制是否展示单选框
      showRadio: {
        type: Boolean,
        // 默认不展示
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
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
    },
    methods: {
      radioClick() {
        // 绑定自定义事件并且传递id及选中状态
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      // 数字输入框change事件
      numChange(val) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: val - 0
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        margin-right: 5px;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price {
          color: #c00000;
          font-size: 16px
        }
      }
    }
  }
</style>
