<template>
    <div class="photoWall">
        <img :src="wallItem.imgurl" alt="">
        <div class="bg"></div>
        <div class="box">
            <span class="iconfont icon-aixin"></span>
            <span>{{wallItem.like}}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{
    wallItem: WallList
}>()
</script>

<style lang="scss" scoped>
.photoWall {
    width: 200px;
    position: relative;

    &:hover {
        .bg {
            opacity: 1;
        }

        .box {
            opacity: 1;
        }
    }

    img {
        width: 100%
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3;
        opacity: 0;
    }

    .box {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 40px;
        height: 20px;
        border-radius: 13px;
        background-color: azure;
        text-align: center;
        transition: all 0.3;
        opacity: 0;

        span:nth-child(1) {
            color: grey;
            font-size: 11px;
            margin-right: 4px;
        }

        span:nth-child(2) {
            font-size: 11px;
        }

        &:hover {
            span:nth-child(1) {
                color: brown;
            }
        }

    }
}
</style>