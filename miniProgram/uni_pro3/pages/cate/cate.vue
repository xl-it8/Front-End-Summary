<template>
  <view class="container">
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-container">
      <!-- 使用自定义的搜索组件 -->
      <view class="scroll_view_left">
        <scroll-view scroll-y="true" class="scroll-Y" :style="{height: wh + 'px'}">
          <view :class="['scroll-view-item', selectIndex === index ? 'active' : '' ]" v-for="(item,index) in cateList"
            :key="item.cat_id" @click="handleClick(index)">
            {{item.cat_name}}
          </view>
        </scroll-view>
      </view>
      <view class="scroll_view_right">
        <scroll-view scroll-y="true" class="scroll-Y" :style="{height: wh + 'px'}" :scroll-top="scrPosition">
          <view class="scroll-view-item" v-for="(item2,index) in cateList[selectIndex].children" :key="item.cat_id">
            <h3>{{item2.cat_name}}</h3>
            <view class="cate-right">
              <navigator class="cate-right-item" v-for="(item3,index) in item2.children" :key="item3.cat_id"
                :url="'/subpkg/goods_list/goods_list?cid=' + item3.cat_id">
                <image :src="item3.cat_icon"></image>
                <!-- 文本 -->
                <text>{{item3.cat_name}}</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        // 分类数据列表
        cateList: [],
        selectIndex: 0,
        scrPosition: 0
      };
    },
    onLoad() {
      this.getSystemInfo()
      this.getCateList()
    },
    methods: {
      // gotoGoodsList(item3) {
      //   //跳转到商品列表
      //   uni.navigateTo({
      //     url: '/subpkg/goods_list/goods_list'
      //   })
      // },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      getSystemInfo() {
        const infoSync = uni.getSystemInfoSync()
        this.wh = infoSync.windowHeight - 50
      },

      handleClick(index) {
        this.selectIndex = index
        this.scrPosition = this.scrPosition === 0 ? '' : 0
      },
      async getCateList() {
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        // 判断是否获取失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 转存数据
        this.cateList = res.message
        console.log(this.cateList)
      }

    },
  }
</script>

<style lang="scss">
  .scroll-container {
    display: flex;

    .scroll_view_left {
      width: 120px;

      .scroll-view-item {
        width: 100%;
        line-height: 60px;
        height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .scroll_view_right {
      flex: 1;

      .scroll-view-item {
        h3 {
          font-size: 18px;
          color: red;
          text-align: center;
        }

        .cate-right {
          display: flex;
          flex-wrap: wrap;

          .cate-right-item {
            width: 33.33%;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;

            image {
              width: 60px;
              height: 60px;
            }

            text {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
