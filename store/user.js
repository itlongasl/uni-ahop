export default {
  namespaced: true,

  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: JSON.parse(decodeURIComponent(uni.getStorageSync('token')) || '""'),
    // token: '',
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    // 重定向
    redirectInfo: null
  }),

  mutations: {
    updateAddress(state, address) {
      // 更新收获地址
      state.address = address
      this.commit('user/saveAddressToStorage')
    },
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 存储用户登录信息
    updateUserInfo(state, usetInfo) {
      state.userInfo = usetInfo
      this.commit('user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    // 存储token
    updateToken(state, token) {
      state.token = token
      this.commit('user/saveUserToken')
    },
    saveUserToken(state) {
      uni.setStorageSync('token', encodeURIComponent(JSON.stringify(state.token)))
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }
  },

  getters: {
    // 收货地址
    addstr(state) {
      if (!state.address.provinceName) return ''

      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    },
  }
}
