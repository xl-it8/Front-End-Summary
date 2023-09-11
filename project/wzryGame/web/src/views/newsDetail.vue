<template>
    <div class="detail-container">
        <div class="detail-header d-flex p-2">
            <div class="mr-2" @click="$router.go(-1)">
              &lt;
            </div>
            <div class="flex-1 fs-lg detail-header-title">
             {{ detail.title }}
            </div>
            <div class="text-gray fs-sm" v-time="detail.createdAt">
                {{ detail.createdAt }}
            </div>
        </div>
        <div class="detail-content" v-html="detail.detail">
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive, toRefs } from 'vue'
import { getNewsDetail } from '@/api/home'
const props = defineProps<{
    id:string
}>()
const data = reactive<{
    detail: {createdAt:string, detail:string, title: string}
}>({
  detail: { createdAt: '', detail: '', title: '' }
})
onMounted(async () => {
  const res = await getNewsDetail(props.id)
  data.detail = res.data
//   console.log(res)
})
const { detail } = toRefs(data)
</script>

<style lang="scss" scoped>
.detail-header {
    border-bottom: 1px solid #ccc;
    &-title {
        color:aqua;
    }
}
</style>
