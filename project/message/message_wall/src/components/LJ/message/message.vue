<template>
    <transition name="down">
        <div class="message" :style="style[type]" v-show="showMessage">
            <!-- 上面绑定的是样式 -->
            <!-- 不同提示图标会变 -->
            <!-- <i class="iconfont" :class="[style[type].icon]"></i> -->
            <span class="text">{{ message }}</span>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
const props = defineProps({
    message: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    }
})
let timer: number | undefined;
const showMessage = ref(false)
onMounted(() => {
    showMessage.value = true
    timer = setTimeout(() => {
        showMessage.value = false
    }, 2000)
})
onUnmounted(() => {
    clearTimeout(timer)
})
// 定义一个对象，包含三种情况的样式，对象key就是类型字符串
const style = {
    warn: {
        icon: "icon-error",
        color: "#fff",
        backgroundColor: "rgb(255, 126, 14)",
        borderColor: "rgb(250, 236, 216)",
    },
    error: {
        icon: "icon-error-",
        color: "#fff",
        backgroundColor: "#d13131",
        borderColor: "rgb(253, 226, 226)",
    },
    success: {
        icon: "icon-successed",
        color: "#fff",
        backgroundColor: "#03cda9",
        borderColor: "rgb(225, 243, 216)",
    }
}
</script>

<style lang="scss" scoped>
.message {
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border-radius: 30px;
    color: #fff;
    z-index: 9999;

    .iconfont {
        font-size: 20px;
    }

    .text {
        padding: 0 15px;
    }
}

/* 动画进入开始时状态 */
.down-enter-from {
    opacity: 0;
    transform: translate(-50%, -60px); //覆盖
}

.down-enter-to {
    transform: translate(-50%, 0%);
}

/* 动画进入过程动画效果 */
.down-enter-active {
    transition: all 0.5s ease;
}

/* 动画离开开始时状态 */
.down-leave-from {
    transform: translate(-50%, 0%);
}

/* 动画结束时动画 */
.down-leave-to {
    opacity: 0;
    transform: translate(-50%, -60px);
}

/* 动画离开过程动画效果 */
.down-leave-active {
    transition: all 0.5s ease;
}
</style>