import {
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapGetters('cart', ['total'])
  },
  onShow() {
    this.setBadge()
  },
  watch: {
    total() {
      this.setBadge()
    }
  },
  methods: {
    setBadge() {
      // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({
        index: 2,
        text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
      })
      if (this.total === 0) {
        uni.removeTabBarBadge({
          index: 2
        })
      }
    }
  }
}
