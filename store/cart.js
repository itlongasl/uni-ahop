export default {
  namespaced: true,


  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count,goods_small_logo,goods_state}
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  mutations: {
    addToCart(state, goods) {
      // 使用find方法判断是否有重复商品加入购物车
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      //如果没有重复商品findResult返回undefined
      if (!findResult) {
        state.cart.push(goods)
      } else { //重复了findResult返回该商品的数据对象  让商品数量自增加1
        findResult.goods_count++
      }
      this.commit('cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    //更新所选商品的选中状态
    updateGoodsState(state, goods) {
      // 找出所点击的商品
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 判断是否找到所匹配的商品
      if (findResult) {
        // 更改商品的选中状态
        findResult.goods_state = goods.goods_state
        this.commit('cart/saveToStorage')
      }
    },
    // 存储商品数量
    updateGoodsCount(state, goods) {
      // 找出所点击的商品
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 判断是否找到所匹配的商品
      if (findResult) {
        // 更改商品的选中状态
        findResult.goods_count = goods.goods_count
        this.commit('cart/saveToStorage')
      }
    },
    //购物车删除事件
    removeGoodsById(state, goods_id) {
      // 找出不需要删除的商品,重新存储
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('cart/saveToStorage')
    },
    updateAllGoodsState(state, newState) {
      state.cart.forEach(item => item.goods_state = newState)
      this.commit('cart/saveToStorage')
    }
  },

  getters: {
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((price, item) => price += (item.goods_price * item
        .goods_count), 0).toFixed(2)
    }
  }

}
