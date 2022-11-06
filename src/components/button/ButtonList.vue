<!--
 * @Author: Tian
 * @Date: 2022-06-22 11:25:10
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 00:20:51
 * @Description:
-->
<template lang="pug">
.layout-button
    .layout-title
        .text 页面标题
        .toogle-list
            el-button 业务标签
            el-button(color='rgba(0, 0, 0, 0.15)') 业务标签
    //-级联选择器
    fpi-cascader(
        :options='cascaderObj.options'
        :currentType='cascaderObj.currentType'
        :typeList='cascaderObj.typeList'
        :textHolder='cascaderObj.textHolder'
        :currentNode.sync='cascaderObj.currentNode'
        @handleChangeNode='handleChangeNode'
        @handleTypeChange='handleTypeChange'
        @handleSearchEvent='handleSearchEvent'
        ref='areaCascaderRef')
    .layout-list
        el-button 默认按钮
        el-button(type="warning") 特殊按钮
        el-button(type="success") 新增按钮
        el-button(type="danger") 删除所选
        el-button(@click="goToTable('table')") FpiTable
        el-button(@click="goToTable('form')") FpiForm
</template>

<script lang="ts" setup name="button-list">
import { useRouter } from 'vue-router'
import type { TypeList } from './types'
import { getTargetNodeList } from '@/utils/tools'
import * as request from '@/service/apis/public'
const router = useRouter()

// 跳转table页
const goToTable = (name: string) => {
    router.push({
        path: `/${name}`
    })
}
const areaCascaderRef = ref()
const cascaderObj = reactive({
    typeList: [
        { label: '区域', key: 'area' },
        { label: '流域', key: 'valley' }
    ],
    currentType: '',
    currentNode: '',
    options: [] as any,
    textHolder: '',
    copyList: [] as any
})
cascaderObj.currentType = '区域'
const handleChangeNode = (curNode: TypeList) => {
    cascaderObj.currentNode = curNode.code
    // 更新文本
    cascaderObj.textHolder = `${cascaderObj.currentType}：${curNode.label}`
}
const handleTypeChange = (type: string) => {
    cascaderObj.currentType = type
    const code = type === '区域' ? 'area' : 'valley'
    getAreaData(code)
}
// 搜索
const handleSearchEvent = (val: string) => {
    const res = getTargetNodeList(cascaderObj.copyList, val)
    cascaderObj.options = res
}

// 获取区域树、流域树
const getAreaData = async (code: string) => {
    const params = code === 'area'
        ? {
            code: '330100000000'
        }
        : {
            codes: 'GA'
        }
    const data = await request[`getCascader${code}Data` as ('getCascaderareaData' | 'getCascadervalleyData')](params as any)
    cascaderObj.options = data
    cascaderObj.copyList = data
    cascaderObj.textHolder = `${cascaderObj.currentType}：${(data as any)[0].label}`
    cascaderObj.currentNode = (data as any)[0].code
}
getAreaData(cascaderObj.typeList[0].key)
</script>

<style lang="scss" scoped>
.layout-button {
    height: 88px;
    padding: 0 40px;

    @include flex-aside;

    .layout-title {
        @include flex-start;

        .text {
            margin-right: $margin;
            font-size: $font-size-title;
            color: var(--el-color-white);
        }
    }
}
</style>
