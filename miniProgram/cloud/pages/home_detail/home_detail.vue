<template>
  <view class="article_id">
    <view class="top">
      <h2>{{formData.title}}</h2>
      <view class="baseInfo">
        <view class="baseInfo_left">
          <view class="profile">
            <image :src="formData.author.avatar
" mode=""></image>
          </view>
          <view class="info">
            <view class="name">
              {{formData.author.author_name }}
            </view>
            <view class="time">
              <text> {{formData.create_time }}</text>
              <text> {{formData.browse_count }}浏览</text>
              <text> {{formData.thumbs_up_count }}点赞</text>
            </view>
          </view>
        </view>
        <view class="baseInfo_right">
          <button type="default" @click="followFn(formData.author.id)">{{formData.is_author_like? '已关注':'关注'}}</button>
        </view>
      </view>
    </view>
    <view class="themeImage">
      <image :src="formData.cover
[0]" mode=""></image>
    </view>
    <view class="content">
      <uParse :content="formData.content" />
      <view class="comments">
        <view class="newComment">
          最新评论
        </view>
        <view class="commentMain">
          <commentCont @replay="replay3" :item="item" v-for="(item,index) in commentList" :key="index" />
        </view>
      </view>
    </view>
    <view class="btmComment">
      <view class="input" @click="open">
        谈谈你都看法
      </view>
      <view class="tool">
        <uni-icons class="icon" type="chatboxes" size="30"></uni-icons>
        <uni-icons class="icon" :type="formData.is_like ? 'heart-filled':'heart'" size="30"
          @click="changeLike(formData._id)">
        </uni-icons>
        <uni-icons class="icon" type="hand-up-filled" size="30" @click="thumb(formData._id)"></uni-icons>
      </view>
    </view>
    <uni-popup ref="popup" type="bottom" class="popup" background-color="#fff" :mask-click="false">
      <view class="top">
        <view @click="close">
          取消
        </view>
        <view @click="publish">
          发布
        </view>
      </view>
      <view class="content">
        <textarea v-model="commentValue" name="" id="" cols="30" rows="10" placeholder="请输入内容">

        </textarea>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import uParse from '@/components/u-parse/u-parse.vue'
  export default {
    components: {
      uParse
    },
    data() {
      return {
        formData: {
          is_author_like: "",
          is_like: ""
        },
        article_id: "",
        comment_id: "",
        reply_id: '',
        commentValue: '',
        commentList: [],
        isFollow: false
      };
    },
    onLoad(item) {
      this.article_id = item.id
      // this.userDetail = JSON.parse(item)
      // console.log(item)
      this.getDetails(item.id)
      this.get_comments()
    },
    // 获取详情信息
    methods: {
      async thumb(articleId) {
        const res = await this.$http.update_thumbsup({
          article_id: articleId
        })
        this.formData.thumbs_up_count++
      },
      changeLike(articleId) {
        // console.log(articleId)
        this.updateLike(articleId)
      },
      async updateLike(articleId) {
        const res = await this.$http.update_like({
          article_id: articleId
        })
        this.formData.is_like = !this.formData.is_like
        uni.$emit('likeUpdate')
        // console.log(res)
      },
      followFn(id) {
        this.updateFollow(id)
      },
      async updateFollow(id) {
        const res = await this.$http.update_author({
          author_id: id
        })
        this.formData.is_author_like = !this.formData.is_author_like
      },
      replay3(article) {
        console.log(article)
        if (article.reply_id) {
          this.reply_id = article.reply_id
        }

        this.comment_id = article.comment_id

        this.open()
      },
      async get_comments() {
        const res = await this.$http.get_comments({
          article_id: this.article_id
        })
        this.commentList = res
        // console.log(res)
      },
      publish() {
        if (!this.commentValue) {
          return
        }
        this.updateComment()
      },
      async updateComment() {
        const res = await this.$http.update_comment({
          article_id: this.article_id,
          reply_id: this.reply_id, //子评论id
          content: this.commentValue,
          comment_id: this.comment_id //主评论id
        })
        this.close()
        this.get_comments()
      },
      open() {
        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
        this.$refs.popup.open()
      },
      close() {
        this.$refs.popup.close()
      },
      getDetails(article_id) {
        this.$http.get_detail({
          article_id
        }).then((res) => {
          // const {
          //   data
          // } = res
          this.formData = res
          // console.log(res);
        })
      },
    }
  }
</script>

<style lang="scss">
  .article_id {
    position: relative;
    padding: 10px 10px 40px 10px;
    heigth: calc(100vh- 44px);

    .top {
      .baseInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;

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
              color: red;
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

        &_right {
          button {
            width: 80px;
            height: 30px;
            background-color: red;
            line-height: 30px;
            text-align: center;
            color: white;
            font-size: 12px;
          }
        }
      }
    }

    .themeImage {
      height: 160px;
      margin: 10px 0;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .content {
      font-weight: 600;
    }

    .btmComment {
      display: flex;
      align-items: center;
      position: fixed;
      box-shadow: 0 -1px 2px 1px rgba(0, 0, 0, .3);
      width: 100%;
      height: 40px;
      bottom: 0;
      left: 0;
      background-color: #fff;

      .input {
        flex: 1;
        border: 1px solid red;
        line-height: 25px;
        height: 30px;
        padding: 2px;
        box-sizing: border-box;
      }

      .tool {
        flex: 1;
        display: flex;
        justify-content: space-evenly;

        .icon {
          color: red !important;
        }

      }

    }

    .popup {
      width: 100%;
      height: 300px;

      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        background-color: #CCc;
      }

      .content {
        width: 100%;
        height: 250px;
      }
    }
  }
</style>
