<template>
  <view class="card">
    <view class="card-base" v-if="type==='column'">
      <view class="card-title">
        <view class="card-title-l">
          {{item.title }}
        </view>
        <view class="card-title-r" @click.stop="changeHeart(item._id)">
          <uni-icons :type="iconType ? 'heart-filled':'heart'" size="30" class="heart"></uni-icons>
        </view>
      </view>
      <view class="img">
        <view class="img-box" v-for="(img, index) in item.cover.slice(0,3)">
          <image :src="img" mode=""></image>
        </view>
      </view>
      <view class="card-bottom">
        <view class="card-type">
          {{item.classify}}
        </view>
        <view class="card-type">
          {{item.browse_count}}浏览
        </view>
      </view>
    </view>


    <view class="card-base" v-else-if="type==='image'">
      <view class="img">
        <view class="img-box">
          <image :src="item.cover[0]" mode=""></image>
        </view>
      </view>
      <view class="card-title">
        <view class="card-title-l">
          {{item.title }}
        </view>
        <view class="card-title-r">
          <uni-icons type="heart" size="30" class="heart"></uni-icons>
        </view>
      </view>
      <view class="card-bottom">
        <view class="card-type">
          {{item.classify}}
        </view>
        <view class="card-type">
          {{item.browse_count}}浏览
        </view>
      </view>
    </view>


    <view class="card-base card-base-fl" v-else>
      <view class="img2">
        <image :src="item.cover[0]" mode="" width="100%"></image>
      </view>
      <view class="card-title2">
        <view class="card-title-l">
          {{item.title }}
        </view>
        <view class="card-bottom2">
          <view class="card-type">
            {{item.classify}}
          </view>
          <view class="card-type">
            {{item.browse_count}}浏览
          </view>
        </view>
      </view>
    </view>

  </view>

</template>

<script>
  export default {
    name: "card",
    props: {
      type: {
        type: String,
        default: 'base'
      },
      item: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        iconType: ''
      };
    },
    watch: {
      item(newVal) {
        this.iconType = newVal.isLike
      }
    },
    created() {

      this.iconType = this.item.is_like
    },
    methods: {
      changeHeart(e) {
        this.iconType = !this.iconType
        this.$emit('changeLike', e)
      }
    }
  }
</script>

<style lang="scss">
  .card {
    .card-base-fl {
      display: flex;

      .img2 {
        margin-right: 20px;

        uni-image {
          height: 100px;
        }

        image {
          width: 100px;

        }
      }

      .card-title2 {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .card-bottom2 {
          display: flex;
          justify-content: space-between;
        }
      }

    }

    .card-base {
      padding: 10px;
      box-shadow: 0 0 4px black;
      margin: 10px 10px;

      .card-title {
        display: flex;
        justify-content: space-between;

        .card-title-r {
          .heart {
            color: red !important;
          }

        }
      }

      .img {
        display: flex;
        justify-content: space-between;

        .img-box {
          flex: 1;
          height: 100px;

          image {
            width: 100%;
            height: 100%;
          }
        }
      }

      .card-bottom {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
