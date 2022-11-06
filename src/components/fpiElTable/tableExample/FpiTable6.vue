<!--
 * @Author: mjh
 * @Date: 2022-08-19 09:31:37
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-05 20:23:26
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

const data = reactive({
    column: [
        {
            type: 'index',
            label: '序号',
            width: '50',
            index: (index: number) => {
                return index * 2
            }
        },
        {
            prop: 'code',
            label: '车牌',
        },
        {
            prop: 'dataTimeType',
            label: '联单编号',
        },
        {
            prop: 'name',
            label: '名称',
            width: '200',
        },
        {
            prop: 'grade',
            label: '等级',
            width: '200',
        },
        {
            prop: 'dateTime',
            label: '日期',
            width: '300',
        }
    ] as tableColumnTs[],
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

const { column, params } = toRefs(data)
</script>

