<template>
  <div class="app">
    <Editor v-model="state" />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Editor from './package/editor'
import data from './data.json'
import {editorConfig as Config } from './utils/editor-config'
const state = ref(data)
provide('config',Config) //会有响应式处理

</script>

<style lang="scss">
.app {
  position: fixed;
  left: 20px;
  top: 20px;
  bottom: 20px;
  right: 20px;
}
</style>
