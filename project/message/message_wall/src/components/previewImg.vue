<template>
    <transition>
        <div class="model" v-show="modelVisible">
            <div class="left_arrow" @click="changeImg('plus')"> &lt; </div>
            <div class="image">
                <img :src="list[num].imgurl" v-if="list[num]" alt="">
            </div>
            <div class="right_arrow" @click="changeImg('decrease')"> > </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps<{
    modelVisible: boolean,
    num: number,
    list: WallList[]
}>()
const emit = defineEmits<{
    (e: 'changePhotp', flag: boolean): void
}>()
var timer: null | number = null
const changeImg = (item: string) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        timer = null
        if (item === 'plus') {
            emit('changePhotp', true)
        } else {
            emit('changePhotp', false)
        }
    }, 500)
}

</script>

<style lang="scss" scoped>
.model {
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.80);
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;

    .image {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-75%, -50%);
        width: 700px;
        height: 400px;
        background-color: aqua;
        z-index: 44455;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .left_arrow,
    .right_arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        line-height: 56px;
        opacity: 0.5;
        background: #949494;
        border-radius: 50%;
        text-align: center;
    }

    .left_arrow {
        left: 20px;
    }

    .right_arrow {
        right: 390px;
    }
}
</style>