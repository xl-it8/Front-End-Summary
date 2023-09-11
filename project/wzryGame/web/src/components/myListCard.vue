<template>
    <div class="myCard mt-3 bg-white p-3">
        <div class="cardHeader d-flex ">
            <span class="iconfont" :class="`icon-${icon}`"></span>
            <span class="flex-1 fs-xl pl-1">{{ title }}</span>
            <span v-if="!plain">...</span>
        </div>
        <slot></slot>
        <div class="mt-4" :class="{cardMain:!plain}" v-if="cardList">
            <ul class="cardMain-nav d-flex jc-between ai-center  fs-2 mb-2">
                <li class="pt-3 pb-1 fs-lg" :class="[ind === index ? 'active' : '']" v-for="(item, index) in cardList"
                    :key="index" @click="changIndex(index)">
                    {{ item.name }}
                </li>
            </ul>
            <div class="cardMain-content">
                <van-swipe class="swiper-box" ref="swipeRef" :loop="false" :show-indicators="false" @change="change">
                    <van-swipe-item v-for="(item, index) in cardList" :key="index">
                        <slot name="context" :categories="item"></slot>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { defineProps, ref } from 'vue'
import type { SwipeInstance } from 'vant'
import { ListData } from '@/data/home'
// const context = getCurrentInstance() as ComponentInternalInstance
defineProps<{
    title: string,
    icon: string,
    cardList?: ListData[],
    plain?: boolean
}>()
const ind = ref(0)
// const height = ref(0)
const swipeRef = ref<SwipeInstance>()
const changIndex = (i: number) => {
  ind.value = i
  swipeRef.value?.swipeTo(i)
}

const change = (index: number) => {
  ind.value = index
}
</script>

<style lang="scss" scoped>
.cardMain {
    border-top: 1px solid #ccc;

    &-nav {
        li.active {
            color: #db9e3f;
            border-bottom: 2px solid #db9e3f;
        }
    }
}
</style>
