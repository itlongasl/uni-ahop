<template>
  <view class="search-box">
    <!-- 搜索框 -->
    <uni-search-bar :radius="100" cancelButton="none" @confirm="search" @input="input"></uni-search-bar>
    <!-- 搜索建议列表 -->
    <view class="search-list" v-if="searchResults.length !==0">
      <view class="search-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="16" @click="clearHistoryList"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    reqSearchList
  } from '../../api/request.js'
  export default {
    data() {
      return {
        // 防抖计时器
        timer: null,
        // 搜索关键字
        kw: '',
        // 搜索结果列表
        searchResults: [],
        // 存储搜索历史关键字
        historyList: []
      };
    },
    // 生命周期钩子  挂载时
    onLoad() {
      // 挂载时加载本地存储中的搜索历史
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(value) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // 将用户输入的值存储起来
          this.kw = value
          this.getSearchList()
        }, 500)
      },
      // 获取搜索列表数据
      async getSearchList() {
        // 判断搜索关键词是否为空
        if (this.kw.length == 0) {
          // 如果搜索框没有搜索关键字,清空搜索结果
          this.searchResults = []
          return
        }
        // 传入参数(用户搜索关键字)
        const {
          data: res
        } = await reqSearchList(this.kw)
        if (res.meta.status == 200) {
          this.searchResults = res.message
        }
      },
      // 点击商品列表跳转到商品详情
      gotoDetail(item) {
        this.saveSearchHistory()
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory() {
        // 将搜索关键字追加到搜索历史
        // this.historyList.push(this.kw)
        // 将数组转化为Set对象
        const set = new Set(this.historyList)
        // 先删除
        set.delete(this.kw)
        // 再添加  这样最新的关键字就永远在数组的最后一位  通过数组翻转处理就会到第一位  这样最新的搜索关键字就会在搜索历史的第一个
        set.add(this.kw)
        // 将set对象重新转化为数组
        this.historyList = Array.from(set)
        // 将搜索历史永久存储到本地存储中
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 清空搜索历史记录
      clearHistoryList() {
        // 清空data中的historyList
        this.historyList = []
        // 同时清空存储在本地存储的数据即可
        uni.setStorageSync('kw', '[]')
      },
      // 点击搜索历史跳转到商品列表页面
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw,
        });
      }
    },
    computed: {
      histories() {
        // 通过展开运算符基于historyList获得一个全新的数组
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;

    .search-list {
      padding: 0 5px;

      .search-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 13px 0;
        border-bottom: 1rpx solid #efefef;
        font-size: 12px;

        .goods-name {
          // 文本不允许换行
          white-space: nowrap;
          // 文本溢出隐藏
          overflow: hidden;
          // 溢出部分使用...代替
          text-overflow: ellipsis;
          margin-right: 3px;
        }
      }
    }

    .history-box {
      padding: 0 5px;

      .history-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #efefef;
      }

      .history-list {
        display: flex;
        flex-wrap: wrap;

        .uni-tag {
          display: inline-block;
          margin: 5px 5px 0 0;
        }
      }
    }
  }
</style>
