<template>
  <view class="my-container">
    <!-- 用户未登录时，显示登录组件 -->
    <myLogin v-if="!token"></myLogin>

    <!-- 用户登录后，显示用户信息组件 -->
    <myUserInfo v-else></myUserInfo>

  </view>
</template>

<script>
  import myLogin from '../../components/my_login/my_login.vue'
  import myUserInfo from '../../components/my_userInfo/my_userInfo.vue'
  // 1. 从 vuex 中按需导入 mapState 辅助函数
  import {
    mapState
  } from 'vuex'
  export default {
    components: {
      myLogin,
      myUserInfo
    },
    data() {
      return {

      };
    },
    computed: {
      // 2. 从 m_user 模块中导入需要的 token 字符串
      ...mapState('m_user', ['token']),
    },


  }
</script>

<style lang="scss">
  page,
  .my-container {
    height: 100%;
  }
</style>
