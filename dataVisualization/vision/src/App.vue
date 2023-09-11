<template>
  <div id="app">
    <ScreenAdapter>
      <div style="fontSize: 40px">你好啊</div>
      <div style="width: 200px; height: 200px;background: red;">ok啊</div>
    </ScreenAdapter>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import ScreenAdapter from './components/ScreenAdapter.vue'
export default {
  data() {
    return {

    }
  },
  components: { ScreenAdapter }
}
</script>
<style lang="less">
.time {
  position: absolute;
  z-index: 999;
  width: 200px;
  height: 200px;
  background-color: red;
  font-size: 23px;
}
</style>
