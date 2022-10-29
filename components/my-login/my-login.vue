<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" class="icon-login" color="#afafaf"></uni-icons>
    <button type="primary" class="btn-login" addgroupapp="" @click="getUserProfile">一键登录</button>
    <text class="text-login">登陆后尽享更多权益</text>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    reqUserToken
  } from '@/api/request.js'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      // 获取用户基本信息
      getUserProfile() {
        uni.getUserProfile({
          desc: '登录授权',
          success: (res) => {
            this.updateUserInfo(res.userInfo)

            this.getToken(res)
          },
          fail(err) {
            if (err.errMsg === "getUserProfile:fail auth deny") return uni.$showMsg('您取消了登录授权')
          }
        })
      },
      // 获取code对应值
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => err)
        if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登陆失败')
        // 整理好参数
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 发送请求
        const {
          data: loginRes
        } = await reqUserToken(query)
        // 判断是否请求成功  400也算请求成功
        if (!(loginRes.meta.status === 200 || loginRes.meta.status === 400)) return uni.$showMsg('登陆失败')

        const msg = loginRes.message || {}
        // 返回400就手动制造一个token
        if (loginRes.meta.status === 400) {
          // 模拟token
          for (let i = 1; i <= 32; i++) {
            const n = Math.floor(Math.random() * 16.0).toString(16)
            msg.token += n
          }
          msg.token = msg.token.slice(9, 41)
          // 存储到vuex
          this.updateToken(msg.token)
          this.navigateBack()
        }
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
      background-color: #fff;
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #C00000;
    }

    .text-login {
      font-size: 12px;
      color: gray;
    }
  }
</style>
