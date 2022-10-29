<template>
  <view>
    <!-- 用户未登录时展现登录组件 -->
    <my-login v-if="!token"></my-login>
    <!-- 用户登陆后展现用户信息组件 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import badegMix from '@/mixins/tabbar-badeg.js'
  import {
    mapState
  } from 'vuex'
  export default {
    mixins: [badegMix],
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      ...mapState('user', ['token'])
    }
  }
</script>

<style>
  .my-container {
    height: 100%;
  }
</style>
