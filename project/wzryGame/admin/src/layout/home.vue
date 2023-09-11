<template>
    <el-container style="height: 100vh">
      <el-aside width="200px">
        <SideBar />
      </el-aside>
      <el-container>
        <el-main>
          <router-view :key="$route.fullPath"></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import SideBar from './component/sideBar.vue'
export default {
  name: 'Home',
  components: {
    SideBar
  }
}
</script>

<style>
</style>