<!--
 * @Author: mjh
 * @Date: 2022-08-19 09:31:37
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-05 22:35:41
 * @Description:
-->
<template lang="pug">
el-button(@click="getTableData()")  获取当前表格数据
el-button(@click="getTableData(2)")  获取第3条数据
el-button(@click="getTableData('all')")  获取全部数据
el-button(@click="getTableData(typeCurrent)")  获取第1页15条数据数据
br
FpiElTableVue(
    :column="column"
    :api="request.realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    :params="params"
    :ref="el => data.fpiElTableDom = el"
    )
</template>

<script lang="ts" setup name="FpiTable4">
import type { tableColumnTs } from '../types'
import FpiElTableVue from '../FpiElTable.vue'
import * as request from '@/service/apis/public'
// 对于getTableData方法的使用

const typeCurrent = {
    pageSizes: 15,
    currentPage: 1
}
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
    fpiElTableDom: ref(),
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
// 手动请求
const getTableData = async (type?: 'all' | number | {
    pageSizes: number
    currentPage: number
}) => {
    const getData = await data.fpiElTableDom.getTableData(type)
    console.log('获取到的表格数据：', getData)
}
const { column, params } = toRefs(data)
</script>

