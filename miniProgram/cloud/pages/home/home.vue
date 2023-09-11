<template>
  <view class="home">
    <navBar />
    <navTitle :labelList="labelList" :currIndex.sync="currIndex" @getClassify="getClassify" ref="navTitle" />
    <view class="main">
      <swiper class="swiper" :current="currIndex" @change="changeIndex">
        <swiper-item v-for="(item,index) in labelList" :key="item._id">
          <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="scrollLower">
            <view>
              <card :type="item2.mode" v-for="item2 in list" :key="item2._id" :item="item2"
                @changeLike="changeLike(item2._id)" @click.native="gotoDetail(item2
)" />
              <uni-load-more :status="loadingStatus"></uni-load-more>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        currIndex: 0,
        currClassify: '全部',
        list: [],
        labelList: [],
        page: 1,
        pageSize: 5,
        loadingStatus: 'loading'
      }
    },
    async onLoad() {
      // this.gotoDetail({
      //   name: 'lj'
      // })
      uni.$on('likeUpdate', () => {

        this.list = []
        this.getList()
      })
      uni.$on('update', async function(data) {
        // console.log(data)
        this.labelList = await this.$http.get_label({
          name: "get_label",
          data: {
            user_id: '63e1f1f7e766bb63741376d9'
          }
        })
      })
      this.getList('全部')
      this.labelList = await this.$http.get_label({
        name: "get_label",
        data: {
          user_id: '63e1f1f7e766bb63741376d9'
        }
      })
      this.labelList && this.labelList.unshift({
        name: '全部'
      })
    },
    methods: {

      gotoDetail(item) {
        // const params = {
        //   _id: item._id,
        //   title: item.title,
        //   author: item.author,
        //   create_time: item.create_time,
        //   thumbs_up_count: item.thumbs_up_count,
        //   browse_count: item.browse_count
        // }
        // // const params = 
        // console.log(params)
        uni.navigateTo({
          url: `/pages/home_detail/home_detail?id=${item._id}`
        })
      },
      changeLike(articleId) {
        console.log(articleId)
        this.updateLike(articleId)
      },
      async updateLike(articleId) {
        const res = await this.$http.update_like({
          user_id: '63e1f1f7e766bb63741376d9',
          article_id: articleId
        })
        console.log(res)
      },
      //滚动到底部的时候
      scrollLower() {
        this.loadingStatus = 'loading'
        this.throttle(this.getList, 700)()
      },
      //下拉节流
      throttle(fn, delay) {
        const that = this
        let isLoaded = true
        return function() {
          if (isLoaded) {
            setTimeout(() => {
              that.page++
              fn.apply(that, [that.currClassify])
              isLoaded = true
            }, delay)
          }
          isLoaded = false
        }
      },
      getClassify(name) {
        this.currClassify = name
        this.page = 1
        this.list = []
        this.getList(name)
      },
      async getList(event) {
        const newList = await this.$http.get_list({
          name: "get_list",
          data: {
            name: event ? event : this.currClassify,
            page: this.page,
            pageSize: this.pageSize,
          }
        })
        this.list = [...this.list, ...newList]
        if (newList.length) {
          this.loadingStatus = 'noMore'
        }
        // console.log(this.list)
      },
      getIndex(index) {
        this.currIndex = index
        // console.log(index)
      },

      changeIndex(e) {
        this.currIndex = e.detail.current
        this.currClassify = this.$refs.navTitle.labelList[this.currIndex].name
        this.getList(this.currClassify)
        this.page = 1
        this.list = []
        // console.log(this.currClassify)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 90vh;

    .swiper {
      height: 100%;
    }

    .main {
      flex: 1;
      box-sizing: border-box;
      overflow: hidden;

      .scroll-Y {
        flex: 1;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    }
  }
</style>
