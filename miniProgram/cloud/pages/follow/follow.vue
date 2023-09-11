<template>
  <view class="follow">
    <view class="follow-nav">
      <view class="nav" @click="currIndex = 0" :class="[currIndex===0 ?'active': '']">
        文章
      </view>
      <view class="nav" @click="currIndex = 1" :class="[currIndex===1 ?'active': '']">
        作者
      </view>
    </view>
    <view class="follow-container">
      <swiper class="swiper" :current="currIndex" @change="changeIndex">
        <swiper-item>
          <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="scrollLower">
            <view>
              <card :type="item2.mode" v-for="item2 in list" :key="item2._id" :item="item2" @changeLike="changeLike" />
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="scrollLower">
            <view>
              <card :type="item2.mode" v-for="item2 in list" :key="item2._id" :item="item2" @changeLike="changeLike" />
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <!--   <uni-load-more status="loading"></uni-load-more> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        currIndex: 0,
        labelList: [],
        list: []
      };
    },
    onLoad() {
      this.getFollow()
    },
    onShow() {
      this.getFollow()
    },
    methods: {
      async getFollow() {
        const res = await this.$http.get_follow()
        this.list = res
      },
      changeIndex(e) {
        this.currIndex = e.detail.current
      },
      changeLike(e) {
        this.updateLike(e)
      },
      async updateLike(articleId) {
        const res = await this.$http.update_like({
          article_id: articleId
        })
        this.getFollow()
        uni.$emit('likeUpdate')
      },
      scrollLower(e) {

      }
    }
  }
</script>

<style lang="scss">
  .follow {
    heigth: calc(100vh- 44px);

    .follow-nav {
      width: 100%;
      height: 60px;
      display: flex;
      box-sizing: border-box;
      padding: 5px 20px;
      margin-bottom: 5px;


      .nav {
        flex: 1;
        border: 1px solid purple;
        border-radius: 5px;
        box-sizing: border-box;
        text-align: center;
        height: 40px;
        line-height: 40px;

        &.active {
          color: pink;
        }
      }
    }

    .follow-container {
      height: calc(100vh - 159px);
      padding: 0 10px;
      box-sizing: border-box;

      .swiper {
        height: 100%;

        .scroll-Y {
          height: 100%;

          .baseInfo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 4px;
            margin-bottom: 5px;
            border-bottom: 1px solid black;
            width: 100%;
            height: 80px;

            &_left {
              display: flex;
              align-items: center;

              .profile {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 8px;
                overflow: hidden;

                image {
                  width: 100%;
                  height: 100%;
                }
              }

              .info {
                // display: flex;
                // flex-direction: column;

                flex: 1;

                .name {
                  font-size: 17px;
                }

                .time {
                  color: #ccc;
                  font-size: 14px;

                  text {
                    margin-right: 5px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
