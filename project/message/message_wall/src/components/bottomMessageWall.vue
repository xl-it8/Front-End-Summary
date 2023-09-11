<template>
  <div class="message_wall_bottom">
    <div class="message_wall_bottom_banner">
      <div class="bottom_left">
        <div class="title">
          <span class="iconfont icon-shuye" style="color:aqua;margin:0 10px;fontSize:40px"></span>
          <span class="title">一刻shiguang</span>
        </div>
        <p>一刻时光是本人独自开发的，为便于与用户交流的留言平台。</p>
        <p>用户将留言便签贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅可以用于交流，也是一场记录。</p>
        <p>备案/许可证粤ICP备19012866号网站备案/许可证粤ICP备19012866号-1</p>
      </div>

      <div class="bottom_middle">
        <span>链接</span>
      </div>
      <div class="bottom_right">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>


<style lang="scss" scoped>
.message_wall_bottom {
  height: 200px;
  width: 100%;
  background-color: #202020;
  font-size: 12px;
  color: #FFFFFF;
  
  &_banner {
    display: flex;
    padding: 30px 200px 0;
    p{
      line-height: 20px;
    }
  }
}
</style>