<template>
    <div class="comment">
        <div class="profile"></div>
        <div class="content">
            <div class="content_top">
                <span>{{comItem.name}} </span>
                <span>{{formatTime(comItem.moment)}} </span>
            </div>
            <div class="content_main">
                {{comItem.comment}}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatTime } from '@/utils/index'
import { defineProps } from 'vue'
const props = defineProps<{
    comItem: CommentData
}>()
</script>

<style lang="scss" scoped>
.comment {
    display: flex;
    margin: 10px 0 32px 0;

    .profile {
        width: 28px;
        height: 28px;
        background-color: red;
        border-radius: 50%;
        margin-right: 8px;
    }

    .content {
        &_top {
            margin-bottom: 5px;

            span:nth-child(1) {
                font-size: 14px;
                color: #202020;
                margin-right: 4px;
            }

            span:nth-child(2) {
                font-size: 12px;
                color: #949494;
            }
        }

        &_main {
            font-size: 14px;
            color: #202020;
            text-align: left;
        }
    }
}
</style>