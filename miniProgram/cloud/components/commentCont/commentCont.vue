<template>
  <view class="comment">
    <view class="top">
      <view class="img">
        <image :src="item.author.avatar" mode=""></image>
      </view>
      <view class="right">
        <view>
          {{item.author.author_name}}
        </view>
        <view>
          {{item.create_time}}
        </view>
      </view>
    </view>
    <view class="info">
      <view class="info_con">
        {{item.comment_content}}
      </view>
      <view class="replayBtn" @click="replay2">
        回复
      </view>
    </view>
    <view class="replay">
      <view class="sameReplay">
        <commentCont :is_reply="true" v-for="(item2,index) in item.replys" :key="index" :item="item2"
          @replay="replay2({...item2,is_reply:true})" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "commentCont",
    props: {
      item: {
        type: Object,
        default: () => ({})
      },

      is_reply: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      };
    },
    methods: {
      replay2(childReplay) {
        let item
        console.log(childReplay)
        if (childReplay.is_reply) { //说明是子回复
          item = {
            reply_id: childReplay.comment_id,
            // ...childReplay,
            comment_id: this.item.comment_id
          }
        } else {
          item = this.item
        }
        this.$emit('replay', item)
      }
    }
  }
</script>

<style lang="scss">
  .comment {
    box-shadow: 0 0 2px 2px #ccc;
    padding: 5px;

    .top {
      margin: 10px 0;
      display: flex;

      .img {
        width: 50px;
        height: 50px;
        margin-right: 40px;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .right {
        flex: 1;
        color: #ccc;
      }

    }

    .info {
      .replayBtn {
        width: 50px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 10px 0 10px 0;
      }
    }

    .replay {
      padding: 10px;
    }
  }
</style>
