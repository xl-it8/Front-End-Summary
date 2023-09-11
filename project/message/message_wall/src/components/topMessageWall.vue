<template>
  <div class="message_wall_top">
    <div class="message_logo">
      <span class="iconfont icon-shuye" style="color:aqua;margin:0 10px;fontSize:40px"></span>
      <div class="title">一刻shiguang</div>
    </div>
    <div class="message_middle">
      <my-button :type="type === 0 ? 'primary' : ''" style="marginRight:10px;" @click="change(0,false)">留言墙</my-button>
      <my-button :type="type === 1 ? 'primary' : ''" style="marginLeft:10px;" @click="change(1,true)">照片墙</my-button>
    </div>
    <div class="message_my">
      <div class="circle"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useStore from '@/store/index'
import { ref } from 'vue'
const type = ref(0)
const { home } = useStore()
const change = (ind: number, bol: boolean) => {
  type.value = ind
  home.changeInd(ind)
  home.changeIsPhoto(bol)
}

</script>

<style lang="scss">
.message_wall_top {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4444;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  background-color: #FDFDFD;
  box-shadow: 0 0 4px black;

  .title {
    display: inline-block;
    height: 52px;
    line-height: 52px;
    font-size: 20px;
    color: #202020;
    letter-spacing: 0;
    font-weight: 600;
    text-align: center;
    vertical-align: top;
  }

  .message_my {
    margin-right: 10px;

    .circle {
      border-radius: 50%;
      width: 45px;
      height: 45px;
      background-color: red;
    }
  }
}
</style>