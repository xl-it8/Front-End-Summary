<template>
  <view class="navTitle">
    <scroll-view class="scroll-view-x" scroll-x="true" @scroll="scroll" scroll-left="0">
      <view class="box">
        <view :class="[currIndex === index ? 'box-item active' :'box-item']" v-for="(item ,index) in labelList"
          :key="item._id" @click="getCurrInd(index, item.name)">
          {{item.name}}
        </view>
      </view>
    </scroll-view>
    <view class="tool" @click="gotolabel">
      <uni-icons type="gear" size="30"></uni-icons>
    </view>
  </view>
</template>

<script>
  export default {
    name: "navTitle",
    props: {
      currIndex: {
        type: Number,
        default: 0
      },
      labelList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        ind: 0
      };
    },
    async created() {
      // console.log(this.labelList)
    },
    methods: {
      scroll() {},
      getCurrInd(ind, name) {
        this.$emit('update:currIndex', ind)
        this.$emit('getClassify', name)
      },
      gotolabel() {
        uni.navigateTo({
          url: "/pages/home_label/home_label"
        })
      }
    }
  }
</script>

<style lang="scss">
  .navTitle {
    height: 45px;
    display: flex;
    // width: 100%;
    // border-bottom: 1px #f5f5f5 solid;
    // background-color: #fff;
    // // box-sizing: border-box;

    .scroll-view-x {

      .box {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        height: 45px;
        box-sizing: border-box;

        .box-item {
          flex-shrink: 0;
          padding: 0 10px;
          color: #333;
          font-size: 14px;

          &.active {
            color: coral;
          }
        }
      }
    }

    .tool {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;

      &::after {
        content: '';
        position: absolute;
        top: 12px;
        bottom: 12px;
        left: 0;
        width: 1px;
        background-color: #ddd;
      }
    }
  }
</style>
