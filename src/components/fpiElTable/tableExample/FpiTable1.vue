<template lang="pug">
fpi-el-table(
    :column="column"
    :ref="el => data.fpiElTableDom = el"
    api="publicMap/realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    :params="params"
    )
                
</template>

<script lang="ts" setup name="FpiTableAll">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { tableColumnTs } from '@/components/fpiElTable/types'
interface columDataTs {
    [key: string]: any
    companyCode: null,
    companyName: string,
    disposalUnitCode: null,
    disposalUnitName: null,
    generatingUnitCode: null,
    generatingUnitName: null,
    jointNumber: string,
    jointSerialNumber: string,
    licenseNumber: string,
    num: string,
    receivedQuantity: string,
    transferDate: string,
    wasteName: string,
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
            filters: [
                { text: 'GKA', value: 'GKA' },
                { text: 'DM', value: 'DM' },
                { text: 'SK', value: 'SK' },
                { text: 'QD', value: 'QD' }
            ],
            filterMethod: (
                value: string,
                row: columDataTs,
                column: TableColumnCtx<columDataTs>
            ) => {
                const property = column.property // 代表当前prop的字符串
                return row[property].indexOf(value) !== -1
            },
        },
        {
            prop: 'dataTimeType',
            label: '物品编号',
            width: '300',
        },
        {
            prop: 'name',
            label: '名称',
            width: '300',
        },
        {
            prop: 'grade',
            label: '等级',
            width: '300',
        },
        {
            prop: 'dateTime',
            label: '日期',
            filters: [
                { text: '2022-06-23 04', value: '2022-06-23 04' },
                { text: '2022-06-23 05', value: '2022-06-23 05' },
                { text: '2022-06-23 00', value: '2022-06-23 00' },
                { text: '2022-06-23 08', value: '2022-06-23 08' },
            ],
            sortable: true,
            filterMethod: (
                value: string,
                row: columDataTs,
                column: TableColumnCtx<columDataTs>
            ) => {
                const property = column.property // 代表当前prop的字符串
                return row[property].indexOf(value) !== -1
            },
            filterPlacement:'bottom-end', //过滤弹出框的定位 与 Tooltip 的 placement 属性相同
            width: '300',
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
    }
})

onMounted(() => {
    setTimeout(() => {
        // data.fpiElTableDom.reLoadTable()

    }, 2000)
})


const { column, params } = toRefs(data)
</script>

