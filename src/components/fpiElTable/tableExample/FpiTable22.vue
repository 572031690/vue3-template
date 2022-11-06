<!--
 * @Author: mjh
 * @Date: 2022-08-19 09:31:37
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-05 21:57:19
 * @Description:
-->
<template lang="pug">
FpiElTableVue(
    :column="column"
    border
    :ref="el => data.fpiElTableDom = el"
    :tableData="list"
    max-height="400"
    :page-params="pageParams"
    @page-change="pageChange"
    :span-method="arraySpanMethod"

    )
    template(#empty)
        div 请求无数据哦～
    template(#name="props")
        div
            span(v-if="props.scope.row.isLineDiy") 这是一个自定义的列----------------------
            span(v-else) {{props.scope.row.name}}
</template>

<script lang="ts" setup name="FpiTable11">
import type { SpanMethodProps, tableColumnTs } from '../types'
import FpiElTableVue from '../FpiElTable.vue'
import * as request from '@/service/apis/public'
// 过滤数据
const data = reactive({
    column: [
        {
            prop: 'name',
            label: '车牌',
            isSlot: true,
            width: '150',
        },
        {
            prop: 'dataTimeType',
            width: '300',
            label: '联单编号',
        },
        {
            prop: 'generatingUnitName',
            label: '数量',
        },
        {
            prop: 'grade',
            width: '250',
            label: 'receivedQuantity数量',
        },
        {
            prop: 'lastConnectTime',
            label: 'receivedQuantity数量',
        },

    ] as tableColumnTs[],
    fpiElTableDom: ref(),
    pageParams: {
        currentPage: 1,
        total: 0,
        pageSizes: 10,
    },
    list: []
})
onMounted(() => {
    getData()
})
// 请求数据
const getData = () => {
    data.fpiElTableDom.changeLoading(true)
    const params = {
        stationCodes: 1,
        regionCodes: '330100000000',
        watershedCodes: 'GA',
        factorGroupCode: 'WMS_SHOWITCODE',
        online: -1,
        runState: -1,
        controlLevel: '001',
        limit: data.pageParams.pageSizes,
        offset: data.pageParams.currentPage - 1
    }
    request.realTimeViewLoad(params, {
        isIntercept: true
    }).then((res: any) => {
        data.pageParams.total = Number(res.total) ?? 0
        res.rows[1].isLineDiy = true
        res.rows[4].isLineDiy = true
        data.list = res.rows || []
        data.fpiElTableDom.changeLoading(false)
    })
}

// 必须按照这三个变量名写
const pageChange = (pageObj: {
    currentPage: number
    total: number
    pageSizes: number
}) => {
    data.pageParams.pageSizes = pageObj.pageSizes
    data.pageParams.currentPage = pageObj.currentPage
    getData()
}
// 合并行方法
const arraySpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}: SpanMethodProps) => {
    if (row.isLineDiy) {
        if (columnIndex === 0) return [1, data.column.length]
        else return [0, 0]
    }
    return [1, 1]
}
const { column, list, pageParams } = toRefs(data)
</script>

