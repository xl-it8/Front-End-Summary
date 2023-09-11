<template>
  <view class="labelManage">
    <view class="myLabel">
      <view class="top">
        <view>
          我的标签
        </view>
        <view class="operate" @click="edit">
          {{isEdit ? '完成':'编辑'}}
        </view>
      </view>
      <view class="labelItems">
        <view class="labelItem" v-for="(item,index) in labelList" :key="item._id">
          {{ item.name}}
          <uni-icons v-if="isEdit" @click="delLabel(index)" type="clear" size="20" class="iconDel"></uni-icons>
        </view>
      </view>
    </view>
    <view class="myLabel">
      <view class="top">
        <view>
          标签推荐
        </view>
      </view>
      <view class="labelItems">
        <view class="labelItem" v-for="(item,index) in unLabelList" :key="item._id" @click="addLabel(index)">
          {{ item.name}}
          <!-- <uni-icons v-if="isEdit" type="clear" size="20" class="iconDel"></uni-icons> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isEdit: false,
        labelList: [], //选择
        unLabelList: [] //未选择
      };
    },
    async onLoad() {
      const res = await this.$http.get_label({
        name: "get_label",
        data: {
          type: 'all',
          user_id: '63e1f1f7e766bb63741376d9',
        }
      })
      this.labelList = res.filter(item => item.current)
      this.unLabelList = res.filter(item => !item.current)
    },
    methods: {
      delLabel(index) {
        if (!this.isEdit) return
        this.unLabelList.push(this.labelList[index])
        this.labelList.splice(index, 1)
      },
      addLabel(index) {
        if (!this.isEdit) return
        this.labelList.push(this.unLabelList[index])
        this.unLabelList.splice(index, 1)
      },
      async edit() {
        if (!this.isEdit) {
          this.isEdit = true
        } else {
          this.isEdit = false
          const labelArr = this.labelList.map(item => item._id)
          // console.log(labelArr)
          const res = await this.$http.update_label({
            label: labelArr
          })
          uni.$emit('update')
        }

      }
    }
  }
</script>

<style lang="scss">
  .labelManage {
    background: #F4F4F4;
    height: calc(100vh - 44px);
    box-sizing: border-box;

    .myLabel {
      padding: 0 10px;
      margin-bottom: 10px;
      background: #fff;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;

      .top {
        display: flex;
        border-bottom: 1px solid #ccc;
        justify-content: space-between;
        padding: 10px 0;
        font-size: 15px;

        .operate {
          color: green;
        }
      }

      .labelItems {
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px 0;

        .labelItem {
          position: relative;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin: 5px 10px 5px 0;
          padding: 5px;
          text-align: center;
          heigth: 20px;
          line-height: 20px;

          .iconDel {
            position: absolute;
            right: -7px;
            top: -9px;
            color: red !important;
          }
        }
      }
    }
  }
</style>
