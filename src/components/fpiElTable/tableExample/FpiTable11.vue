<!--
 * @Author: mjh
 * @Date: 2022-08-19 09:31:37
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 08:05:05
 * @Description:
-->
<template lang="pug">
FpiElTableVue(
    :column="column"
    :api="request.realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    :params="params"
    border
    max-height="400"
    )
</template>

<script lang="ts" setup name="FpiTable11">
import FpiElTableVue from '../FpiElTable.vue'
import type { tableColumnTs } from '../types'
import * as request from '@/service/apis/public'
// 固定列 只需要在column传参对于的对象内传入fixed 属性
// fixed : true false left right
// 传入 max-height 或 height 固定表头
const data = reactive({
    column: [
        {
            type: 'index',
            label: '序号',
            width: '100',
        },
        {
            prop: 'address',
            label: '地址',
            width: '350',
            fixed: 'right' // true left right
        },
        {
            prop: 'code',
            width: '300',
            label: '联单编号',
        },
        {
            prop: 'code',
            label: '车牌',
            width: '150',
        },
        {
            prop: 'dataTimeType',
            width: '300',
            label: '联单编号',
        },
        {
            prop: 'name',
            label: '数量',
        },
        {
            prop: 'grade',
            width: '250',
            label: '等级',
        },
        {
            prop: 'grade',
            label: '等级',
        },
        {
            prop: 'dateTime',
            width: '250',
            label: 'receivedQuantity数量',
        },
    ] as tableColumnTs[],
    params: {
        stationCodes: 1,
        regionCodes: '330100000000',
        watershedCodes: 'GA',
        factorGroupCode: 'WMS_SHOWITCODE',
        online: -1,
        runState: -1,
        controlLevel: '001',
    }
})

const { column, params } = toRefs(data)
</script>

