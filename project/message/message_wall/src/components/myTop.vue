<template>
    <h2>{{ data[seleInd].title }}</h2>
    <p>{{ data[seleInd].content }}</p>
    <div class="navbar_title">
        <my-button class="btn" :type="label === index ? 'primary2' : ''" v-for="(item, index) in data[seleInd].label"
            :key="index" @click="changeTitle(index)">{{ item }}</my-button>
    </div>
</template>

<script setup lang="ts">

import { defineProps, ref, defineEmits } from 'vue';
import { storeToRefs } from 'pinia'
import useStore from '@/store/index'
defineProps<
    {
        data: Idata
    }>()

const { home } = useStore()
const { seleInd, label } = storeToRefs(home)
const emit = defineEmits<{
    (event: 'changeLabel', value: number): void
}>()
// const type = ref(0)
const changeTitle = (ind: number) => {
    home.changeLabel(ind)
    emit('changeLabel', ind)
    // type.value = ind

}
</script>

<style lang="scss" scoped>
.note_home {
    position: relative;

    h2 {
        @include flexCenter;
        margin-top: 30px;
        margin-bottom: 10px;
        font-size: 56px;
        color: #202020;
    }

    p {
        @include flexCenter;
        font-size: 14px;
        color: #5B5B5B;
    }

    .navbar_title {
        @include flexCenter;
        margin-top: 30px;

        :deep(.btn) {
            margin: 0 5px;
            font-size: 14px;
            color: #5B5B5B;
        }
    }
}
</style>