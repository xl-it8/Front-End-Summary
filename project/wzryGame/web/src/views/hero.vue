<template>
    <div class="topHeader bg-black fix">
        <div class="d-flex jc-between ai-center px-3 py-1">
            <div class="d-flex jc-start ai-center ">
                <div class="logo bg-primary">
                    <img class='img-w' src="../assets/logo.png" alt="">
                </div>
                <div class="title d-flex flex-1 ml-2">
                    <div class="text-white fs-lg ">王者荣耀</div>
                    <div class="text-gray fs-md ml-2">攻略站</div>
                </div>
            </div>
            <div class="text-white fs-xs">
                <span class="mr-2">更多英雄</span><span>&gt;</span>
            </div>
        </div>
    </div>
    <div class="hero-container bg-light-1">
        <div class="hero-bg" :style="{ backgroundImage: `url(${detail.banner})` }">
            <div class="hero-ctx d-flex flex-column jc-end">
                <div class="p-3">
                    <div class="fs-md pb-1 text-white">{{ detail.title }}</div>
                    <div class="fs-xl text-white pb-1">{{ detail.name }}</div>
                    <div class="text-white"><span class="mr-1">游戏职业:</span><span>{{
                        detail.categories.map(v =>
                            v.name).join('/')
                    }}</span>
                    </div>
                    <div class="jn d-flex jc-between ai-center text-white">
                        <div class="jn-item py-2">
                            <span class="mr-1">难度</span>
                            <span>{{ detail.scopes.difficult }}</span>
                            <span class="mr-1">技能</span>
                            <span>{{ detail.scopes.skills }}</span>
                            <span class="mr-1">攻击</span>
                            <span>{{ detail.scopes.attach }}</span>
                            <span class="mr-1">生存</span>
                            <span>{{ detail.scopes.dead }}</span>
                        </div>
                        <div><span>皮肤:3</span><span class="ml-2">&gt;</span></div>
                    </div>
                </div>
            </div>
        </div>
        <van-swipe class="swiper-box" :loop="false" :show-indicators="false">
            <van-swipe-item>
                <div class="hero-nav bg-white px-2">
                    <div class="hero-nav-header d-flex jc-around fs-lg border-bottom pt-3 pb-2">
                        <div class="active">英雄初始</div>
                        <div>进阶攻略</div>
                    </div>
                    <div class="hero-nav-btn d-flex jc-around ai-center py-3">
                        <div class="btn">
                            <span class="iconfont icon-news icon"></span>
                            英雄介绍视频
                        </div>
                        <div class="btn"><span class="iconfont icon-news icon"></span>一图识英雄</div>
                    </div>
                    <div class="hero-skill">
                        <div class="hero-skill-icon d-flex jc-around my-1">
                            <div class="box" :class="[i == currentIndex ? 'active' : '']"
                                v-for="(item, i) in detail.skills" :key="i" @click="currentIndex = i">
                                <img :src="item.icon" alt="" width="50" height="50">
                            </div>
                        </div>
                        <div class="card p-2" v-if="refHeroSkill">
                            <h3>{{ refHeroSkill.name }}</h3>
                            <p>{{ refHeroSkill.description }}</p>
                        </div>
                    </div>
                </div>
                <my-list-card plain title="出装推荐" icon="news">
                    <div>
                        <h5>顺风出装</h5>
                        <div class="border-bottom d-flex jc-around ai-center pb-2">
                            <div class="d-flex flex-column ai-center" v-for="(item2, i) in detail.items1"
                                :key="i">
                                <img class="items-img" :src="item2.icon" alt="" width="40" height="40">
                                <div class="mt-2">{{ item2.name }}</div>
                            </div>
                        </div>
                        <h5>逆风出装</h5>
                        <div class="d-flex jc-around ai-center pb-2">
                            <div class="d-flex flex-column ai-center" v-for="(item2, i) in detail.items2"
                                :key="i">
                                <img class="items-img" :src="item2.icon" alt="" width="40" height="40">
                                <div class="mt-2">{{ item2.name }}</div>
                            </div>
                        </div>
                    </div>
                </my-list-card>
                <my-list-card plain title="使用技巧" icon="news">
                  <div>
                    <p>{{ detail.useTips }}</p>
                  </div>
                </my-list-card>
                <my-list-card plain title="对抗技巧" icon="news">
                  <div>
                    <p>{{ detail.battleTips }}</p>
                  </div>
                </my-list-card>
                <my-list-card plain title="团战思路" icon="news">
                  <div>
                    <p>{{ detail.teamTips }}</p>
                  </div>
                </my-list-card>
                <my-list-card plain title="英雄关系" icon="news">
                  <div>
                    <p>最佳搭档</p>
                    <div class="border-bottom pb-2">
                            <div class="d-flex ai-center mb-3" v-for="(item2, i) in detail.partners"
                                :key="i">
                                <img class="items-img mr-2" :src="item2.hero.avatar" alt="" width="40" height="40">
                                <div class="flex-1">{{ item2.description }}</div>
                            </div>
                    </div>
                  </div>
                </my-list-card>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script setup lang="ts">
import myListCard from '@/components/myListCard.vue'
import { defineProps, onMounted, reactive, toRefs, computed } from 'vue'
import { getHeroDetail } from '@/api/home'
import { IHero } from '@/data/home'
const props = defineProps<{
    id: string
}>()
const data = reactive<{
    detail: IHero,
    currentIndex: number
}>({
  detail: {
    avatar: '',
    banner: '',
    battleTips: '',
    teamTips: '',
    title: '',
    useTips: '',
    _id: '',
    categories: [],
    items1: [],
    items2: [],
    name: '',
    partners: [],
    scopes: {
      difficult: 0, dead: 0, skills: 0, attach: 0
    },
    skills: []
  },
  currentIndex: 0
})
const refHeroSkill = computed(() => {
  return data.detail.skills[data.currentIndex]
})
onMounted(async () => {
  const res = await getHeroDetail(props.id)
  data.detail = res.data
  console.log(res)
})
const { detail, currentIndex } = toRefs(data)
</script>

<style lang="scss" scoped>
.topHeader {
    width: 100%;

    .logo {
        width: 30px;
    }
}

.hero-container {
    .hero-bg {
        height: 180px;
        background-position: left top;
        background-size: auto 100%;

        .hero-ctx {
            width: 100%;
            height: 100%;
            background-image: linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .4));

            .jn {
                &-item {
                    & span:nth-child(2n) {
                        display: inline-block;
                        border-radius: 50%;
                        width: 15px;
                        height: 15px;
                        text-align: center;
                        line-height: 15px;
                        background-color: red;
                    }
                }
            }
        }
    }

    .hero-nav {
        &-header {
            .active {
                color: #db9e3f;
                border-bottom: 2px solid #db9e3f;
            }
        }

        .hero-skill {
            &-icon {
                .box {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 2px solid #fff;

                    &.active {
                        border: 2px solid #db9e3f;
                    }
                }
            }
        }
    }

    .items-img {
        border-radius: 50%;
    }
}
</style>
