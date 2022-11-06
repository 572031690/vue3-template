<template lang="pug">
h2 显示斑马纹 / 状态纹
el-radio-group(v-model="tableRowClass")
    el-radio-button(:label="true" )
    el-radio-button(:label="false")
FpiElTableVue(
    :column="column"
    :api="request.realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    :params="params"
    :row-class-name="tableRowClassName"
    border
    :stripe="tableRowClass"
    )
</template>

<script lang="ts" setup name="FpiTable4">
import type { tableColumnTs } from '../types'
import FpiElTableVue from '../FpiElTable.vue'
import * as request from '@/service/apis/public'
// stripe 斑马纹
// row-class-name 状态回调
// border 边框
// 优先级   border > row-class-name
interface columDataTs {
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
    tableRowClass: false,
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
// 状态方法
const tableRowClassName = ({
    row,
    rowIndex,
}: {
  row: columDataTs
  rowIndex: number
}) => {
    if (rowIndex === 1)
        return 'warning-row'

    else if (rowIndex === 3)
        return 'success-row'

    return ''
}
const { column, tableRowClass, params } = toRefs(data)
</script>

<style lang="scss" scoped>
:deep(.el-table .warning-row) {
    --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
}

:deep(.el-table .success-row) {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
