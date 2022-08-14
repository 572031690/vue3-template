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
import FpiTableAllPop from '@/components/fpiElTable/tableExample'
import HomePage from '@/layouts/HomePage.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const data = reactive({
    btnList: [
        { label: 'ui样例', value: 'FpiTableUI' },
        { label: '动态列表', value: 'FpiTable20' },
        { label: '多个组合', value: 'FpiTableAll' },
        { label: '静态组件', value: 'FpiTable14' },
        { label: '完整api请求', value: 'FpiTable16' },
        { label: 'lazy请求', value: 'FpiTable8' },
        { label: '过滤数据', value: 'FpiTable13' },
        { label: '获取数据', value: 'FpiTable9' },
        { label: '配置工具', value: 'FpiTable19' },
        { label: '状态斑马纹边框', value: 'FpiTable10' },
        { label: '固定列', value: 'FpiTable11' },
        { label: '多级表头', value: 'FpiTable12' },
        { label: '单选多选', value: 'FpiTable15' },
        { label: '筛选', value: 'FpiTable1' },
        { label: '自定义表头', value: 'FpiTable2' },
        { label: '展开行', value: 'FpiTable3' },
        { label: '树形', value: 'FpiTable17' },
        { label: '表尾合计', value: 'FpiTable4' },
        { label: '合并行列', value: 'FpiTable5' },
        { label: '自定义索引', value: 'FpiTable6' },
        { label: '表格布局', value: 'FpiTable7' },
        { label: 'loading', value: 'FpiTable21' },
        { label: 'test', value: 'FpiTable-test' },
    ],
    currCom: 'FpiTableAll'
})
const width = data.btnList.length * 50 + 'px'
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
