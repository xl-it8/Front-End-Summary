<template>
    <transition>
        <div class="add_message" v-show="visible">
            <div class="add_message_top">
                <div>留言</div>
                <div @click="closeMessage">x</div>
            </div>
            <div class="scoll_zero">
                <template v-if="isPhoto">
                    <div class="addPhoto" @click="addFile" v-if="!path">
                        <canvas id="plus" width="50" height="50"></canvas>
                    </div>
                    <img @click="addFile" v-else :src="path" alt="" style="width:300px;height:200px;padding:5px;">
                    <input ref="file" type="file" accept=".jpg,.png,.webp" multiple @change="changeFile"
                        style="display:none">
                    <div class="add_zero">
                        <input type="text" placeholder="签名" v-model="form.name">
                        <textarea name="" id="" cols="30" rows="10" placeholder="留言..." style="background: #EBECED"
                            v-model="form.message"></textarea>
                    </div>
                </template>
                <template v-else>
                    <div class="color_container">
                        <div class="color_container_item" v-for="(item, index) in colorArr"
                            :style="{ background: item }" :key="index" @click="getColorIndex(index)"
                            :class="{ selectBorder: selectBorder === index }">
                        </div>
                    </div>
                    <div class="add_zero">
                        <input type="text" placeholder="签名" v-model="form.name">
                        <textarea name="" id="" cols="30" rows="10" placeholder="留言..."
                            :style="{ background: background }" v-model="form.message"></textarea>
                    </div>
                </template>
                <h3>选择标签</h3>
                <div class="label">
                    <my-button class='btn' :type="(type === index ? 'primary4' : '')"
                        v-for="(item, index) in data[seleInd].label.slice(1)" :key="index" @click="changeSel(index)">{{
                                item
                        }}</my-button>
                </div>
                <h3>负责声明</h3>
                <div class="ruler">
                    一刻时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br>
                    1、反对宪法所确定的基本原则的；<br>
                    2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br>
                    3、损害国家荣誉和利益的；<br>
                    4、煽动民族仇恨、民族歧视，破坏民族团结的；<br>
                    5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br>
                    6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br>
                    7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br>
                    8、侮辱或者诽谤他人，侵害他人合法权益的；<br>
                    9、含有法律、行政法规禁止的其他内容的信息。<br>
                </div>
            </div>
            <div class="footer">
                <my-button type="primary5" style="margin-right:5px;" @click="closeMessage">放弃</my-button>
                <my-button type="primary6" @click="submit">确定</my-button>
            </div>
        </div>
    </transition>

</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onUpdated, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/store/index'
import data from '../utils/data'
import { fileUpload } from '@/api/wall'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const { home } = useStore()
const { seleInd, isPhoto } = storeToRefs(home) //toRefs 需要点value
const background = ref('#FCAFA2')
const selectBorder = ref(0)
const type = ref(0)
const path = ref()
const file = ref<HTMLInputElement | null>(null)
const colorArr = ref(['#FCAFA2', '#FFE394', '#92E6F5', '#A8ED8A', '#CAA7F7'])
const form = reactive<WallData>({
    type: 0,
    userId: '',
    name: '',
    moment: '',
    label: 0,
    color: 0,
    imgurl: ''
})

const getColorIndex = (ind: number) => {
    selectBorder.value = ind
    background.value = colorArr.value[ind]
    form.color = ind
}
const emit = defineEmits<
    {
        (e: 'update:visible',
            value: boolean): void,
        (e: 'changeBtn'): void,
        (e: 'submit', value: WallData): void,
    }
>()
const closeMessage = () => {
    emit('update:visible', false)
    emit('changeBtn')
}

const submit = () => {
    form.type = seleInd.value
    form.moment = new Date() + ''
    emit('submit', form)
}

const changeSel = (ind: number) => {
    type.value = ind
    form.label = ind
}

const paintPlus = async () => {
    const canvas = document.getElementById('plus') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.beginPath()
    //50
    ctx.moveTo(15, 25)
    ctx.lineTo(35, 25)
    ctx.lineWidth = 2
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(25, 15)
    ctx.lineTo(25, 35)
    ctx.lineWidth = 2
    ctx.stroke()

}
onUpdated(() => {
    if (props.visible && isPhoto.value) {
        paintPlus()
    }

})

const addFile = async () => {
    file.value?.click()
    // console.dir(file.value)
}
const changeFile = async () => {
    const files = file.value?.files as FileList
    const fd = new FormData()
    fd.append('file', files[0])
    try {
        const res = await fileUpload(fd)
        path.value = res.message
        form.imgurl = path.value
    } catch (e) {
        console.log(e)
    }
}
</script>

<style lang="scss" scoped>
.add_message {
    @include message;
    // padding: 20px 0 0 20px;

    &_top {
        display: flex;
        justify-content: space-between;
        padding-right: 10px;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        color: #202020;
        font-weight: 700;
    }

    .scoll_zero {
        height: 350px;
        overflow: auto;
        padding-right: 15px;
        box-sizing: border-box;

        .addPhoto {
            width: 50px;
            height: 50px;
            margin: 10px 0;
            border-radius: 50%;
            border: 1px solid #202020;
        }

        &::-webkit-scrollbar {
            width: 5px;
            background-color: #C1C1C1;
        }

        /* 滚动条上的滚动滑块 */
        &::-webkit-scrollbar-thumb {
            background-color: orange;
        }

        .ruler {
            width: 320px;
            height: 120px;
            font-size: 12px;
            color: #949494;
            letter-spacing: 0;
            text-align: justify;
            line-height: 18px;
            font-weight: 400;
        }
    }

    .color_container {
        margin: 30px 0 12px;
        display: flex;
        justify-content: flex-start;

        &_item {
            margin-right: 8px;
            width: 24px;
            height: 24px;
        }

        .selectBorder {
            border: 1px solid green;
        }
    }

    .add_zero {
        position: relative;
        width: 320px;
        height: 240px;

        input {
            position: absolute;
            box-sizing: border-box;
            bottom: 10px;
            left: 10px;
            width: 296px;
            height: 36px;
            outline: none;
            background: none;
            border: 1px solid #FFFFFF;
            text-align: right;
        }

        textarea {
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            outline: none;
            resize: none;
            border: none;
        }
    }

    h3 {
        font-size: 14px;
        color: #202020;
        margin: 20px 0;
    }

    .label {
        display: flex;
        flex-wrap: wrap;

        .btn {
            margin: 5px;
        }
    }

    .footer {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 360px;
        height: 60px;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>