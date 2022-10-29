<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>

</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  import {
    reqPayOrder,
    reqUnifiedorder
  } from '@/api/request.js'
  export default {
    name: "my-settle",
    data() {
      return {
        // 倒计时的秒数
        seconds: 3,
        // 定时器
        timer: null
      };
    },
    computed: {
      ...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('user', ['addstr']),
      ...mapState('user', ['token']),
      ...mapState('cart', ['cart']),
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('cart', ['updateAllGoodsState']),
      ...mapMutations('user', ['updateRedirectInfo']),
      changeAllState() {
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 用户点击结算按钮事件
      settlement() {
        if (!this.checkedCount) return uni.$showMsg('请选择结算商品!')
        if (!this.addstr) return uni.$showMsg('请选择收货地址!')
        // if (!this.token) return uni.$showMsg('请登录后结算!')
        if (!this.token) return this.delayNavigate()
        // 预调用微信支付功能处理函数
        this.payOrder()
      },
      async payOrder() {
        // 参数整理
        const orderInfo = {
          // 开发时选择真实价格
          // order_price: this.checkedCount,
          // 写死价格
          order_price: 0.01,
          // 收货地址
          consignee_addr: this.addstr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))
        }

        // 发起请求
        const result = await reqPayOrder(orderInfo)
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败!')
        const orderNumder = "GD20180504000000000045"

        // 订单预支付
        const {
          data: res
        } = await reqUnifiedorder(orderNumder)
      },
      // 超时导航到login页面
      delayNavigate() {
        this.seconds = 3
        this.showTips(this.seconds)

        this.timer = setInterval(() => {
          this.seconds--
          // 判断倒计时
          if (this.seconds <= 0) {
            // 为0关闭定时器
            clearInterval(this.timer)
            // 跳转到login
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  // 跳转方式
                  openType: 'switchTab',
                  // 跳转页面
                  from: '/pages/cart/cart'
                })
              }
            })
            // 终止下面代码执行
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      },
      // 展示提示消息
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请登录后再结算！' + n + '秒后自动跳转到登录页',
          mask: true,
          duration: 1500,
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    // 将背景色从 cyan 改为 white
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount {
      color: #c00000;
    }

    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>
