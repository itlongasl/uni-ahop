<template>
  <view class="my-search-container" :style="{'background-color': bgcolor }" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <!-- 使用uni-ui提供的字体图标 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#c00000'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        default: 18 //px
      }
    },
    data() {
      return {

      };
    },
    methods: {
      searchBoxHandler() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container {
    display: flex;
    // background-color: #c00000;
    align-items: center;
    padding: 0 10px;
    height: 50px;

    .my-search-box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      width: 100%;
      background-color: #fff;
      // border-radius: 18px;

      .placeholder {
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }
</style>
