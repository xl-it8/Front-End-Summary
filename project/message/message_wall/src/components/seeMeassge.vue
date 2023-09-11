<template>
    <transition>
        <div class="see_message" v-if="seeMesVisible">
            <div class="see_message_fixed">
                <div class="see_message_fixed_top">
                    <div class="see_message_fixed_top_left">
                        <span>联系墙主撕掉该便签</span>
                        <span>举报</span>
                    </div>
                    <div @click="closeMessage">X</div>
                </div>
            </div>
            <note-card :wallItem="wallItem"></note-card>
            <div class="edit">
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入内容" v-model="data.comment"></textarea>
                <input type="text" placeholder="匿名" v-model="data.name">
                <my-button type="primary" @click="addcomment">评论</my-button>
            </div>
            <h5>评论&nbsp;&nbsp;<span>{{wallItem.comcount}}</span></h5>
            <comment v-for="(item,index) in data.commentList" :key="index" :comItem="item" />

        </div>
    </transition>
</template>

<script lang="ts" setup>
import noteCard from './noteCard.vue';
import comment from './comment.vue'
import { addComment, findCommentPage } from '@/api/wall'
import { watchEffect, defineProps, reactive, getCurrentInstance, WritableComputedRef } from 'vue'
const { proxy } = getCurrentInstance();
const props = defineProps<{
    wallItem: WallList,
    seeMesVisible: boolean,
}>()
const data = reactive({
    commentList: [] as CommentData[],
    comment: '',
    name: '',
    commentPageData: {
        page: 1,
        pageSize: 4,
        wallId: 0
    }
})
const emit = defineEmits<
    {
        (e: 'update:seeMesVisible',
            value: boolean): void,
        (e: 'changeBtn'): void
    }
>()

const closeMessage = () => {
    emit('update:seeMesVisible', false)
    emit('changeBtn')
}
const addcomment = async () => {
    try {
        const obj: CommentData = {
            wallId: props.wallItem.id,
            userId: props.wallItem.userId,
            imgurl: '',
            comment: data.comment,
            name: data.name || '匿名',
            moment: new Date() + ''
        }
        // console.log(obj)
        const res = await addComment(obj)
        if (Number(res.status) === 200) {
            proxy.$message({ type: 'success', message: '添加成功' })
            props.wallItem.comcount++
            getCommentPage()
        }
    } catch (e) {
        console.log(e)
    }
}

const getCommentPage = async () => {
    try {
        data.commentPageData.wallId = props.wallItem.id
        const res = await findCommentPage(data.commentPageData)
        if (Number(res.status) === 200) {
            data.commentList = res.message as CommentData[]
        }
    } catch (e) {
        console.log(e)
    }
}
watchEffect(() => {
    if(props.seeMesVisible){
        getCommentPage()
    }
})
</script>

<style lang="scss" scoped>
.see_message {
    @include message;
    padding: 40px 10px 10px 10px;
    height: 100%;
    overflow: scroll;

    &::-webkit-scrollbar {
        width: 5px;
        background-color: #C1C1C1;
    }

    /* 滚动条上的滚动滑块 */
    &::-webkit-scrollbar-thumb {
        background-color: orange;
    }

    &_fixed {
        position: fixed;
        right: 0;
        top: 52px;
        height: 40px;
        width: 360px;
        line-height: 40px;
        padding: 10px;
        box-sizing: border-box;
        background-color: #fff;

        &_top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;


            &_left {
                display: flex;

                span:nth-child(1) {
                    font-size: 16px;
                    color: #3B73F0;
                    margin-right: 30px;
                }

                span:nth-child(2) {
                    font-size: 16px;
                    color: #F67770;
                }
            }
        }
    }


    .edit {
        margin: 12px 0;

        textarea {
            width: 320px;
            height: 56px;
            border: 1px solid rgba(148, 148, 148, 1);
            background: none;
            padding: 10px;
            outline: none;
            resize: none;
            box-sizing: border-box;
        }

        input {
            width: 200px;
            height: 36px;
            border: 1px solid rgba(148, 148, 148, 1);
            margin: 0 40px 30px 0;
            background: none;
            outline: none;
        }
    }

    h5 {
        margin-bottom: 20px;
    }
}
</style>