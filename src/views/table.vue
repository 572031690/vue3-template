<template lang="pug">
HomePage
    template(v-slot:top)
        .left-text-btn(@click="goBack()")  返回
        .table-btn
            div(v-for="item in btnList" :class="[item.value === data.currCom ? 'active' : '']" :key="item.value" @click="getCurrentCom(item.value)") {{ item.label }}
        .left-text  表格
    template(v-slot:body)
        .table-box
            component(:is='FpiTableAllPop[data.currCom]')
</template>

<script lang="ts" setup name="fpi-table">
import { useRouter } from 'vue-router'
import FpiTableAllPop from '@/components/fpiElTable/tableExample'
import HomePage from '@/layouts/HomePage.vue'
const router = useRouter()

const data = reactive({
    btnList: [
        { label: 'ui样例', value: 'FpiTableUI' },
        { label: 'all多个组合', value: 'FpiTableAll' },
        { label: '1筛选', value: 'FpiTable1' },
        { label: '2自定义表头', value: 'FpiTable2' },
        { label: '3展开行', value: 'FpiTable3' },
        { label: '4表尾合计', value: 'FpiTable4' },
        { label: '5合并行列', value: 'FpiTable5' },
        { label: '6自定义索引', value: 'FpiTable6' },
        { label: '7表格布局', value: 'FpiTable7' },
        { label: '8lazy请求', value: 'FpiTable8' },
        { label: '9获取数据', value: 'FpiTable9' },
        { label: '10状态斑马纹边框', value: 'FpiTable10' },
        { label: '11固定列', value: 'FpiTable11' },
        { label: '12多级表头', value: 'FpiTable12' },
        { label: '13过滤数据', value: 'FpiTable13' },
        { label: '14静态组件', value: 'FpiTable14' },
        { label: '15单选多选', value: 'FpiTable15' },
        { label: '16完整api请求', value: 'FpiTable16' },
        { label: '7树形', value: 'FpiTable17' },
        { label: '19配置工具', value: 'FpiTable19' },
        { label: '20动态列表', value: 'FpiTable20' },
        { label: '21loading', value: 'FpiTable21' },
        { label: '22自定义整列', value: 'FpiTable22' },
        { label: 'test', value: 'FpiTable-test' },
    ],
    currCom: 'FpiTableAll'
})
const width = `${data.btnList.length * 50}px`
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
