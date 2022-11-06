<!--
 * @Author: mjh
 * @Date: 2022-08-19 09:31:37
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 08:09:44
 * @Description:
-->
<template lang="pug">
el-button(@click="getTableLoad()")  请求表格
FpiElTableVue(
    :column="column"
    :api="request.realTimeViewLoad"
    :ref="el => data.fpiElTableDom = el"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    :isLazyRequest="true"
    :params="params"
    )
</template>

<script lang="ts" setup name="FpiTable4">
import type { tableColumnTs } from '../types'
import FpiElTableVue from '../FpiElTable.vue'
import * as request from '@/service/apis/public'
// isLazyRequest设置为true就可以实现默认不请求

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
            label: 'receivedQuantity数量',
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
const getTableLoad = () => {
    data.fpiElTableDom.reLoadTable()
}
const { column, params } = toRefs(data)
</script>

