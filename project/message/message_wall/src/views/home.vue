<template>
    <div class="note_home" ref="noteHome">
        <my-top :data="data" @changeLabel="changeLabel" />
        <template v-if="home['seleInd']">
            <div class="phtopAll">
                <photo-crad v-for="(item, index) in Data.list" :key="index" :wallItem="item"
                    @click="openPhotoModel(index)"></photo-crad>
            </div>
        </template>

        <template v-else>
            <div class="card_container">
                <note-card class="card_item" v-for="(item, index) in Data.list" :key="index" :wallItem="item"
                    @click="openDetail(index)"></note-card>
            </div>
        </template>
        <!-- 添加留言墙 -->
        <addMessage v-model:visible="visible" @changeBtn="(isBtn = true)" @submit="submit" />
        <seeMessage v-model:seeMesVisible="seeMesVisible" @changeBtn="isBtn = true; modelVisible = false"
            :wallItem="Data.list[Data.ind]" />
        <div v-if='isBtn' class="open_btn" @click="openMessage" :style="{ bottom: openHeight + 'px' }">
        </div>

        <previewImg :modelVisible="modelVisible" :num="ind" :list="Data.list" @changePhotp="changePhotp" />
        <div class="noMore" v-if="Data.none">没有更多...</div>
        <div id="lottie_box" class="animation" v-if="Data.loading"></div>
        <div class="NoData" v-if="!Data.list.length"><img src="@/assets/images/nomore.webp" alt=""></div>
    </div>


</template>

<script setup lang="ts">
import lottie from 'lottie-web'
import data from '../utils/data'
import myTop from '@/components/myTop.vue'
import noteCard from '@/components/noteCard.vue'
import addMessage from '@/components/addMeassge.vue'
import useStore from '@/store/index'
import seeMessage from '@/components/seeMeassge.vue'
import photoCrad from '@/components/photoCrad.vue'
import previewImg from '@/components/previewImg.vue'
import { addWall, getUserIp, findWallPage } from '@/api/wall'
import { watch, ref, getCurrentInstance, reactive, onMounted } from 'vue'
const { proxy } = getCurrentInstance();
// console.log(instance)
const openHeight = ref(20)
const visible = ref(false)
const seeMesVisible = ref(false)
const modelVisible = ref(false)
const isBtn = ref(true)
const ind = ref(1)
const ip = ref('')
const { home } = useStore()
const findPageData = reactive({
    page: 1,
    pageSize: 8,
    type: 0,
    label: -1,
    useId: ''
})
const Data = reactive<{
    list: WallList[],
    ind: number,
    none: boolean
    flag: boolean
    loading: boolean
}>({
    list: [],
    ind: 0,
    none: false,
    flag: false,
    loading: false
})
const initData = async () => {
    try {
        const res = await getUserIp()
        ip.value = res.message as string
        findPageData.useId = res.message as string
        getWalldata()
        // console.log(ip.value)
    } catch (e) {
        console.log(e)
    }
}
const loadAnimation = () => {
    lottie.loadAnimation({
        container: document.querySelector('#lottie_box') as Element,
        renderer: 'svg', //渲染方式
        loop: true,//循环播放
        autoplay: true,
        animationData: require('@/assets/loading.json') //本地动画
    })
}
onMounted(() => {
    loadAnimation()
    initData()
})
watch(() => home['seleInd'], () => {
    Data.none = false
    Data.list = []
    findPageData.page = 1
    initData()
})
const getWalldata = async () => {
    try {
        Data.loading = true //开启加载动画
        findPageData.type = home.seleInd //获取照片还是文字
        findPageData.label = home.label - 1 //获取标签索引
        const res = await findWallPage(findPageData)
        const currList = res.message as WallList[]
        if (Number(res.status) === 200 && currList.length) {
            Data.loading = false
            Data.list = Data.list.concat(currList) //拼接
            if (currList.length < findPageData.pageSize) {
                Data.none = true //没有更多
                Data.flag = false //节流
                findPageData.page = 1
            } else {
                Data.flag = true
                findPageData.page++
            }
            console.log(Data.list)
        }
    } catch (e) {
        Data.loading = false
        console.log(e)
    }
}
const changeLabel = (ind: number) => {
    Data.none = false
    Data.list = []
    findPageData.page = 1
    getWalldata()
}
const handelDisTance = () => {
    const Htmlheight = document.documentElement.scrollHeight
    const HtmlTop = document.documentElement.scrollTop
    //页面可视区高度
    const Pageheight = document.documentElement.clientHeight
    if (Pageheight + HtmlTop + 220 >= Htmlheight) {
        openHeight.value = Pageheight + HtmlTop + 220 - Htmlheight
        if (Data.flag) {
            Data.flag = false
            getWalldata()
        }
    } else {
        openHeight.value = 20
    }
}
const openMessage = () => {
    visible.value = true
    isBtn.value = false
}
const openDetail = (wallInd: number) => {
    Data.ind = wallInd
    seeMesVisible.value = true
    isBtn.value = false
}
const openPhotoModel = (num: number) => {
    modelVisible.value = true
    seeMesVisible.value = true
    ind.value = num
}
const submit = async (form: WallData) => {
    try {
        form.userId = ip.value
        const res = await addWall(form)
        if (Number(res.status) === 200) {
            visible.value = false
            isBtn.value = true
            proxy.$message({ message: '成功啦', type: 'success' })
            changeLabel(1)
        }
    } catch (e) {
        console.log(e)
    }
}
const changePhotp = (bol: boolean) => {
    if (bol) {
        ind.value--
        if (ind.value <= 1) ind.value = 10
    } else {
        ind.value++
        if (ind.value >= 10) ind.value = 1
    }
}

window.addEventListener('scroll', handelDisTance)


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
            color: red;
        }
    }

    .card_container {
        padding: 10px 50px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .card_item {
            width: 280px;
            height: 240px;
            // background-color: #F6DFDB;
            margin: 0 10px 10px 0;

            &:last-child {
                margin-right: 0;
            }

            &:hover {
                transform: translateY(-5px);
                transition: all 0.3s;
            }
        }
    }

    .open_btn {
        position: fixed;
        // bottom: 20px;
        transition: all 0.3;
        right: 20px;
        width: 56px;
        height: 56px;
        box-shadow: 0px 4px 8px 0px;
        border-radius: 50%;
        background: url('@/assets/images/加号.png') #202020 no-repeat 0 0/cover;
    }

    .phtopAll {
        padding: 10px 20px;
        box-sizing: border-box;
        // width:100%;
        columns: 6;
        column-gap: 1px;
    }

    .NoData {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .noMore {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px auto;
    }

    .animation {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px auto;
        width: 150px;
        height: 100px;
        // background-color: antiquewhite;
    }
}
</style>