<template>
    <button :class="[type]">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
    type: {
        type: String,
        default: ''
    }
    // round: {
    //     type: Boolean,
    //     default: true
    // }
})
</script>

<style lang="scss" scoped>
.primary {
    box-sizing: border-box;
    width: 82px;
    height: 36px;
    background: #3B73F0;
    border-radius: 20px;
}

.primary2 {
    box-sizing: border-box;
    // width: 56px;
    height: 28px;
    border: 1px solid rgba(32, 32, 32, 1);
    border-radius: 14px;
    font-size: 14px;
    color: #202020;
    font-weight: 700;
}

.primary3 {
    box-sizing: border-box;
    width: 48px;
    height: 24px;
    background: #EBEBEB;
    border-radius: 14px;
}

.primary4 {
    // width: 48px;
    box-sizing: border-box;
    height: 24px;
    background: #EBEBEB;
    border-radius: 14px;
}

.primary5 {
    width: 100px;
    height: 48px;
    border: 1px solid rgba(32, 32, 32, 1);
    border-radius: 24px;
    font-size: 14px;
    color: #202020;
    text-align: center;
    font-weight: 400;
    box-sizing: border-box;
}

.primary6 {
    width: 200px;
    height: 48px;
    background: #202020;
    border-radius: 24px;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    box-sizing: border-box;
}
</style>