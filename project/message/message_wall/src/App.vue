<template>
  <!-- <Message message="成功啦" type="success"/> -->
  <TopMessageWall />
  <router-view />
  <BottomMessageWall />
</template>
<script setup lang="ts">
// import { ref } from 'vue'
// import Message from '@/components/LJ/message/message.vue'
import TopMessageWall from './components/topMessageWall.vue';
import BottomMessageWall from './components/bottomMessageWall.vue';
</script>
<style lang="scss">
#app {
  padding-top: 52px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased; //抗锯齿
  -moz-osx-font-smoothing: grayscale; //抗锯齿
}
</style>
