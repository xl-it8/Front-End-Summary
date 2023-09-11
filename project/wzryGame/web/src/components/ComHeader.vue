<template>
    <div class="topHeader bg-black fix">
        <div class="d-flex jc-between ai-center px-3 py-1">
            <div class="d-flex jc-start">
                <div class="logo bg-primary">
                    <img class='img-w' src="../assets/logo.png" alt="">
                </div>
                <div class="title flex-1 ml-2">
                    <div class="text-white fs-lg">王者荣耀</div>
                    <div class="text-gray fs-md">团队成就更多</div>
                </div>
            </div>
            <div>
                <button class="btn bg-primary text-dark text-center"><span class="soan">立即下载</span></button>
            </div>
        </div>
    </div>
    <div class="nav bg-primary">
        <ul class="nav-item d-flex jc-around ai-center text-white">
            <li class="nav-item-cx active pt-1">首页</li>
            <li class="nav-item-cx pt-1">攻略中心</li>
            <li class="nav-item-cx pt-1">赛事中心</li>
            <li class="nav-item-cx pt-1">ip新游</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
// import { Button } from 'vant'
</script>

<style lang="scss" scoped>
.topHeader {
    width: 100%;

    .logo {
        width: 30px;
    }
}

.btn {
    width: 60px;
    height: 24px;
    border: none;
    border-radius: 2px;
}

 .nav {
    height: 40px;

    &-item {
        height: 40px;

        &-cx {
            &.active {
                border-bottom: 3px solid #fff;
            }
        }
    }
}
</style>
