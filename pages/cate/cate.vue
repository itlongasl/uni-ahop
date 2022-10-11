<template>
  <view>
    <!-- <my-search :bgcolor="'pink'" :radius="3"></my-search> -->
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滚动栏 -->
      <scroll-view scroll-y="true" class="left-scroll" :style="{ height: wh + 'px' }">
        <block v-for="(item,index) in cateList" :key="index">
          <view :class="['left-scroll-item',index==active?'active':'']" @click="changeCate(index)">{{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧滚动栏 -->
      <scroll-view scroll-y="true" class="right-scroll" :style="{ height: wh + 'px'}" :scroll-top="scrollTop">
        <!-- 二级分类 -->
        <view v-for="(item2,index) in cateLevel2" class="cate-lv2" :key="index">
          <view class="cate-lv2-title">
            / {{item2.cat_name}} /
          </view>
          <!-- 三级分类 -->
          <view class="cate-lv3">
            <view class="cate-lv3-item" v-for="(item3,i) in item2.children" :key="i" @click="gotoGoodsList(item3)">
              <image :src="item3.cat_icon.replace('dev','web')"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import {
    reqCateList
  } from '../../api/request.js'
  export default {
    data() {
      return {
        // 当前设备可用屏幕高度
        wh: 0,
        // 存储分类数据
        cateList: [],
        active: 0,
        // 二级分类
        cateLevel2: [],
        scrollTop: 0
      }
    },
    onLoad() {
      // 获取设备可用屏幕高度
      const sysInfo = uni.getSystemInfoSync()
      //减去搜索区域的50px高度
      this.wh = sysInfo.windowHeight - 50
      //调用函数请求分类数据
      this.getCateList()
    },
    methods: {
      // 获取分类数据
      async getCateList() {
        const {
          data: res
        } = await reqCateList()
        if (res.meta.status !== 200) {
          // 请求失败调用showToast弹出失败消息
          return uni.$showMsg()
        }
        this.cateList = res.message
        // 将第一个二级分类数据先赋值为默认数据
        this.cateLevel2 = res.message[0].children
      },
      changeCate(index) {
        this.active = index
        // 通过索引来确定展示的二级分类
        this.cateLevel2 = this.cateList[index].children
        this.scrollTop = this.scrollTop === 0 ? 0.1 : 0
      },
      // 分类选项点击事件处理函数
      gotoGoodsList(value) {
        // 点击分类选项跳转到分包页面goods_list页面并传相应的id
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?id=' + value.cat_id
        })
      },
      // 自定义事件  跳转到搜索页
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll {
      width: 120px;

      .left-scroll-item {
        background-color: #f7f7f7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #ffffff;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }

    .cate-lv2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }

    .cate-lv3 {
      display: flex;
      flex-wrap: wrap;

      .cate-lv3-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;

        image {
          width: 60px;
          height: 60px;
        }

        text {
          font-size: 12px
        }
      }
    }
  }
</style>
