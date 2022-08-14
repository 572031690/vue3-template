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
import FpiFormPop from '@/components/fpiForm/formExample'
import HomePage from '@/layouts/HomePage.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const data = reactive({
    btnList: [
        { label: 'ui样例', value: 'FpiForm1' },
        { label: '自定义rules', value: 'FpiForm2' },
        { label: '表单排布', value: 'FpiForm5' },
        { label: '动态表单', value: 'FpiForm3' },
        { label: 'render', value: 'FpiForm4' },
        { label: 'test', value: 'FpiForm-test' },
    ],
    currCom: 'FpiForm1'
})
const width = data.btnList.length * 70 + 'px'
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
    font-size: 20px;
    padding: 5px 8px;
    font-weight: Medium;
    letter-spacing: 0px;
    color: #FFFFFF;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, .6);
    border-radius: 5px;
}

.left-text {
    font-size: 20px;
    font-weight: Medium;
    letter-spacing: 0px;
    color: #FFFFFF;
}

.table-btn {
    display: flex;
    width: v-bind('width');
    margin-top: 5px;
    max-width: 85%;
    flex-wrap: wrap;
    justify-content: space-between;

    div {
        font-size: 16px;
        padding: 4px 8px;
        margin-bottom: 5px;
        font-weight: Medium;
        color: #FFFFFF;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid rgba(255, 255, 255, .6);
    }

    .active {
        color: rgb(64, 158, 255);
    }

}


.table-box {
    padding: 10px 20px;
}
</style>
