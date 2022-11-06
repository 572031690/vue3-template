<!--
 * @Author: mjh
 * @Date: 2022-09-08 10:11:09
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-04 12:02:46
 * @Description:
-->
<template lang="pug">
home-page
    template(v-slot:top)
        .left-text-btn(@click="goBack()")  返回
        .table-btn
            div(v-for="item in btnList" :class="[item.value === data.currCom ? 'active' : '']" :key="item.value" @click="getCurrentCom(item.value)") {{ item.label }}
        .left-text  Form表单
    template(v-slot:body)
        .table-box
            component(:is='FpiFormPop[data.currCom]')
</template>

<script lang="ts" setup name="fpi-table">
import { useRouter } from 'vue-router'
import FpiFormPop from '@/components/fpiForm/formExample'
import HomePage from '@/layouts/HomePage.vue'
const router = useRouter()

const data = reactive({
    btnList: [
        { label: '6UI-demo', value: 'FpiForm6' },
        { label: '1ui样例', value: 'FpiForm1' },
        { label: '2自定义rules', value: 'FpiForm2' },
        { label: '5表单排布', value: 'FpiForm5' },
        { label: '3动态表单', value: 'FpiForm3' },
        { label: '7表单插槽', value: 'FpiForm7' },
        // { label: 'render', value: 'FpiForm4' },
        { label: 'test', value: 'FpiForm-test' },
    ],
    currCom: 'FpiForm1'
})
const width = `${data.btnList.length * 70}px`
onMounted(() => {
    //
})
const getCurrentCom = (comName: string) => {
    data.currCom = comName
}

const goBack = () => {
    router.go(-1)
}
const { btnList } = toRefs(data)
</script>

<style lang="scss" scoped>
.left-text-btn {
    width: 35px;
    padding: 5px 8px;
    font-size: 20px;
    font-weight: medium;
    color: #fff;
    letter-spacing: 0;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 5px;
}

.left-text {
    font-size: 20px;
    font-weight: medium;
    color: #fff;
    letter-spacing: 0;
}

.table-btn {
    display: flex;
    flex-wrap: wrap;
    width: v-bind("width");
    max-width: 85%;
    margin-top: 5px;

    // justify-content: space-between;

    div {
        padding: 4px 8px;
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: medium;
        color: #fff;
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 5px;
    }

    .active {
        color: rgb(64, 158, 255);
    }
}

.table-box {
    padding: 10px 20px;
}
</style>
