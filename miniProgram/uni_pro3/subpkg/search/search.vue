<template>
  <view calss="search-box">
    <uni-search-bar :focus="true" v-model.trim="searchValue" clearButton="none" :radius="10" @input="input">
    </uni-search-bar>
    <!-- 结果 -->
    <view class="serach-all-result" v-if="searchResults.length !== 0">
      <view class="serach-result-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <text>{{item.goods_name}}</text>
        <!-- <uni-icons type="forward" size="20"></uni-icons> -->
      </view>


    </view>
    <view class="searchHistory" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="20" @click="clear"></uni-icons>
      </view>

      <view class="history-result">
        <text v-for="(item,index) in searchKeyArr" :key="index" @click="gotoGoodsList(item)">{{ item }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    stringify
  } from 'querystring';
  export default {
    data() {
      return {
        searchValue: "",
        searchResults: "",
        searchKeyArr: [],
        // 延时器的 timerId
        timer: null,
      };
    },
    onLoad() {
      this.searchKeyArr = JSON.parse(uni.getStorageSync('kw'))
    },
    methods: {
      gotoDetail(goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      input() {
        // 清除 timer 对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器，并把 timerId 赋值给 this.timer
        this.timer = setTimeout(() => {
          // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
          this.getSearchList()
        }, 500)

      },

      clear() {
        this.searchKeyArr = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      },

      // 点击跳转到商品列表页面
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        // 判断关键词是否为空
        if (this.searchValue === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.searchValue
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        this.saveSearchHistory()
      },
      saveSearchHistory() {
        //去重
        this.searchKeyArr.push(this.searchValue)
        this.searchKeyArr = this.searchKeyArr.reverse()
        //new Set(this.searchKeyArr) 为数组
        this.searchKeyArr = Array.from(new Set(this.searchKeyArr))
        uni.setStorageSync('kw', JSON.stringify(this.searchKeyArr));
      }
    }
  }
</script>

<style lang="scss">
  .uni-searchbar {
    //条件编译要在注释里面写  用来实现跨端适配  可以在js css json vue 文件中使用
    /* #ifndef APP-NVUE */
    display: flex;
    /*#endif*/
    flex-direction: row;
    position: relative;
    padding: 16rpx;
    /* 将默认的 #FFFFFF 改为 #C00000 */
    background-color: #c00000;
  }

  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .serach-all-result {
    padding: 0 10px;

    .serach-result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;

      text {
        font-size: 15px;
        padding: 10px 0;
        font-size: 20px;
      }
    }
  }



  .searchHistory {
    padding: 0 10px;

    .history-title {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;

      text {
        font-size: 15px;
      }
    }

    .history-result {
      display: flex;
      flex-wrap: wrap;

      text {
        display: inline-block;
        font-size: 20px;
        font-weight: 700;
        padding: 10px 10px;
      }
    }




  }
</style>
