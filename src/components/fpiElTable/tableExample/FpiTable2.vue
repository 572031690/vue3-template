<template lang="pug">
FpiElTableVue(
    :column="column"
    :ref="el => data.fpiElTableDom = el"
    :api="request.realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    :params="params"
    )
    template(#Edit-header)
        <el-input v-model="params.watershedCodes" size="small" @change="getSearch()" placeholder="Type to search" />
    template(#Edit="{ scope }")
        div
            el-button(size="small" @click="handleEdit(scope.$index, scope.row)") Edit
            el-button(size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" ) Delete
</template>

<script lang="ts" setup name="FpiTable2">
import type { tableColumnTs } from '../types'
import FpiElTableVue from '../FpiElTable.vue'
import { globalKey } from '@/symbols'
import * as request from '@/service/apis/public'
const global = inject(globalKey)
interface columDataTs {
    [key: string]: any
    companyCode: null
    companyName: string
    disposalUnitCode: null
    disposalUnitName: null
    generatingUnitCode: null
    generatingUnitName: null
    jointNumber: string
    jointSerialNumber: string
    licenseNumber: string
    num: string
    receivedQuantity: string
    transferDate: string
    wasteName: string
}
const data = reactive({
    column: [
        {
            type: 'index',
            label: '序号',
            width: '50',
        },
        {
            prop: 'code',
            label: '车牌',
        },
        {
            prop: 'dateTime',
            label: '联单编号',
            width: '300',
        },
        {
            prop: 'grade',
            label: '数量',
            width: '200',
        },
        {
            prop: 'name',
            label: 'receivedQuantity数量',
            width: '200',
        },
        {
            prop: 'dataTimeType',
            label: '日期',
            sortable: true,
        },
        {
            prop: 'Edit',
            width: '250',
            isSlot: true,
            isSlotHeader: true,
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
const getSearch = () => {
    data.fpiElTableDom.reLoadTable()
}
const handleEdit = (index: number, row: columDataTs) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: columDataTs) => {
    console.log(index, row)
}

const { column, params } = toRefs(data)
</script>

