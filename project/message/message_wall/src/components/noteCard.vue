<template>
    <div class="note_card" :style="{ background: colorArr[wallItem.color] }">
        <div class="note_top">
            <p>{{ formatTime(wallItem.moment) }}</p>
            <p>{{ data[wallItem.type].label[wallItem.label + 1] }}</p>
        </div>
        <div class="note_content">
            {{ wallItem.message }}
        </div>
        <div class="note_foot">
            <div class="note_foot_left">
                <span class="iconfont icon-aixin" :class="{ ax: likeNum != 0 }" @click.stop="Like(0)"></span>
                <span>{{ likeNum }}</span>
                <span class="iconfont icon-weixin"></span>
                <span>{{ wallItem.comcount }}</span>
            </div>
            <div class="note_foot_right">
                {{ wallItem.name }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatTime } from '@/utils/index'
import data from '../utils/data'
import { defineProps, ref, computed, WritableComputedRef } from 'vue';
import { addFeedback } from '@/api/wall'
const colorArr = ref(['#FCAFA2', '#FFE394', '#92E6F5', '#A8ED8A', '#CAA7F7'])
const props = defineProps<{
    wallItem: WallList,
}>()
const likeNum = computed({
    get() {
        return props.wallItem.like
    },
    set(val) {
        props.wallItem.like = val
    }
}) as WritableComputedRef<number>
const Like = async (num: number) => {
    try {
        if (likeNum.value <= 0) {
            const obj = {
                wallId: props.wallItem.id,
                userId: props.wallItem.userId,
                moment: new Date() + '',
                type: num
            }
            const res = await addFeedback(obj)
            if (Number(res.status) === 200) {
                likeNum.value = likeNum.value + 1
            }
        }

    } catch (e) {
        console.log(e)
    }
}
</script>

<style lang="scss" scoped>
.note_card {
    box-sizing: border-box;
    padding: 10px;

    .note_top {
        @include flexZY;
        font-size: 12px;
        color: #949494;
        margin-bottom: 10px;
    }

    .note_content {
        font-size: 14px;
        color: #202020;
        line-height: 22px;
        font-weight: 400;
        height: 140px;
        font-family: myFont;
    }

    .note_foot {
        @include flexZY;

        &_left {

            font-size: 12px;
            color: #7E7E7E;

            & span:nth-child(1) {
                width: 16px;
                height: 16px;
                margin-right: 5px;
                vertical-align: middle;

                &:hover {
                    cursor: pointer;
                    color: red;
                }
            }

            & span:nth-child(2),
            span:nth-child(4) {
                font-size: 12px;
                color: #7E7E7E;
                margin-right: 5px;
            }

            & span:nth-child(3) {
                width: 11px;
                height: 11px;
                color: #7E7E7E;
                margin-right: 5px;
                vertical-align: middle;
            }

            .ax {
                color: red;
            }
        }

        &_right {
            font-size: 14px;
            color: #202020;
            font-family: myFont;
            font-weight: 700;
        }
    }
}
</style>