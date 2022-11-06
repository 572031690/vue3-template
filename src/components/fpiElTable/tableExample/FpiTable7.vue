<!--
 * @Author: mjh
 * @Date: 2022-08-19 09:31:37
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-06 18:47:10
 * @Description:
-->
<template lang="pug">
el-radio-group(v-model="tableLayout")
    el-radio-button(label="fixed")
    el-radio-button(label="auto")
FpiElTableVue(
    :column="column"
    :table-layout="tableLayout"
    :api="request.realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    :params="params"
    )
</template>

<script lang="ts" setup name="FpiTable4">
import type { tableColumnTs } from '../types'
import FpiElTableVue from '../FpiElTable.vue'
import * as request from '@/service/apis/public'
// 自定义 type=index 列的行号。
// 通过给 type=index 的列传入 index 属性，可以自定义索引。
// 该属性传入数字时，将作为索引的起始值。 也可以传入一个方法，
// 它提供当前行的行号（从 0 开始）作为参数，返回值将作为索引展示。

import { globalKey } from '@/symbols'
const global = inject(globalKey)

const data = reactive({
    column: [
        {
            type: 'index',
            label: '序号',
            width: '100',
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
            prop: 'dateTime',
            label: 'receivedQuantity数量',
        },

    ] as tableColumnTs[],
    tableLayout: 'fixed' as const,
    params: {
        stationCodes: 1,
        regionCodes: '330100000000',
        watershedCodes: 'GA',
        factorGroupCode: 'WMS_SHOWITCODE',
        online: -1,
        runState: -1,
        controlLevel: '001',
    },
})

const { column, params, tableLayout } = toRefs(data)
</script>

