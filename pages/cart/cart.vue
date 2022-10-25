<template>
  <view class="cart-container" v-if="cartList.cart.length!==0">
    <!-- 收获地址组件 -->
    <my-address></my-address>

    <!-- 商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 循环渲染购物车商品列表数据 -->
    <uni-swipe-action>
      <block v-for="(goods,index) in cartList.cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click="swiperItemClick(goods)">
          <my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="radioChange"
            @num-change="numberChange">
          </my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <my-settle></my-settle>
  </view>

  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import badegMix from '@/mixins/tabbar-badeg.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badegMix],
    computed: {
      ...mapState({
        cartList: (state) => state.cart
      })
    },
    data() {
      return {
        showRadio: false,
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      }
    },
    onLoad() {},
    methods: {
      ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      // 自定义事件
      radioChange(e) {
        this.updateGoodsState(e)
      },
      numberChange(e) {
        this.updateGoodsCount(e)
      },
      swiperItemClick(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      font-size: 12px;
      margin-left: 10px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
