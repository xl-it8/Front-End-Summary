<template>
    <div class="home-container bg-light-1">
        <div class="swiper">
            <van-swipe class="swiper-box" :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                    <img class='img-w' src="../../../images/web/25eef8c0fd73d190de7ea916fe104d3b.jpeg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img class='img-w' src="../../../images/web/25eef8c0fd73d190de7ea916fe104d3b.jpeg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img class='img-w' src="../../../images/web/25eef8c0fd73d190de7ea916fe104d3b.jpeg" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="entry-container">
            <div class="enter-x bg-white" v-if="isOpen">
                <ul class="enter-x-item d-flex py-3">
                    <li class="enter-x-item-li d-flex flex-column ai-center text-center py-2" v-for="item in 12"
                        :key="item">
                        <span class="icon"></span>
                        <span>故事站</span>
                    </li>
                </ul>
            </div>
            <div class="enter-y bg-white" v-else>
                <ul class="enter-y-item d-flex flex-wrap">
                    <li class="enter-y-item-li d-flex flex-column ai-center text-center py-3 my-1" v-for="item in 12"
                        :key="item">
                        <span class="icon" />
                        <span>故事站</span>
                    </li>
                </ul>
            </div>
            <div class="open-btn text-center  bg-light" @click="openItem">
                <span class="mr-1 iconfont" :class="[isOpen ? 'icon-zhankai' : 'icon-shouqi']"></span>
                <span>{{ isOpen? '展开': '收起' }}</span>
            </div>
        </div>
        <my-list-card title="新闻资讯" icon="news" :cardList="cardList">
            <template #context="{ categories }">
                <div  @click="$router.push(`/newsDetail/${item._id}`)" class="context py-2 d-flex" v-for="(item, index) in categories.newsList" :key="index">
                    <span class="mr-2 newsName">{{ item.categoryName }}</span>
                    <span class="flex-1 fs-3 text-ellipsis">{{ item.title }}</span>
                    <span class="text-dark">{{ dayjs(item.createdAt).format('YYYY-MM-DD') }}</span>
                </div>
            </template>
        </my-list-card>
        <my-list-card title="英雄列表" icon="news" :cardList="heroList">
            <template #context="{ categories:{heroList} }">
                 <div class="d-flex flex-wrap p-1" style="height:100%">
                    <div class="text-center p-1" @click="$router.push(`/hero/${item._id}`)" style="width:20%;box-sizing:border-box" v-for="(item, index) in heroList"
                        :key="index">
                        <img :src="item.avatar" class="img-w" alt="">
                        <div>{{ item.name }}</div>
                    </div>
                 </div>
            </template>
        </my-list-card>
        <p>3</p>
        <p>3</p>
        <p>3</p>
        <p>3</p>
        <p>3</p>
        <p>3</p>
        <p>3</p>
        <p>3</p>
        <p>3</p>
        <p>3</p>
        <p>3</p>
        <p>3</p>
    </div>
</template>

<script setup lang="ts">
import myListCard from '@/components/myListCard.vue'
import { reactive, toRefs, onMounted } from 'vue'
import dayjs from 'dayjs'
import { getList, getHeroList } from '@/api/home'

const data = reactive<{
    isOpen: boolean,
    cardList: { name: string, newsList: {_id:string, categoryName: string, title: string, createdAt: string }[] }[],
    heroList: { name: string; heroList: {_id:string, name: string, avatar: string }[] }[]
}>({
  isOpen: true,
  cardList: [],
  heroList: []
})

const { isOpen, cardList, heroList } = toRefs(data)
const openItem = () => {
  isOpen.value = !isOpen.value
}

onMounted(async () => {
  const res = await getList()
  data.cardList = res.data
  const res2 = await getHeroList()
  data.heroList = res2.data
})
</script>

<style lang="scss" scoped>
@mixin bgImg() {
    .icon {
        display: inline-block;
        width: 45px;
        height: 40px;
        background: url('@/assets/index.png') no-repeat -210px -63px;
        background-size: 375px;
    }
}

:deep(.van-swipe__indicators) {
    left: 92%;
}

.swiper {
    height: 165px;

    .swiper-box {
        height: 165px;
    }
}

.home-container {
    width: 100%;

    .entry-container {
        width: 100%;

        .enter-x {
            width: 100%;
            overflow-y: scroll;

            &-item {
                width: 300%;

                &-li {
                    width: 25%;
                    border-right: 1px solid #ccc;
                    @include bgImg
                }
            }
        }

        .enter-y {
            width: 100%;

            &-item {
                box-sizing: border-box;
                width: 100%;

                &-li {
                    box-sizing: border-box;
                    width: 25%;
                    border-right: 1px solid #ccc;
                    @include bgImg
                }

                & li:nth-child(4n) {
                    border-right: none
                }
            }
        }

        .open-btn {
            height: 40px;
            line-height: 40px;
        }
    }
}
</style>
