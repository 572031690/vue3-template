<template lang="pug">
FpiElTableVue(
    :column="column"
    :api="request.realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    :params="params"
    :span-method="arraySpanMethod"
    )
</template>

<script lang="ts" setup name="FpiTable4">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { tableColumnTs } from '../types'
import FpiElTableVue from '../FpiElTable.vue'
import * as request from '@/service/apis/public'
// 多行或多列共用一个数据时，可以合并行或列。
// 通过给 table 传入span-method方法可以实现合并行或列， 方法的参数是一个对象，
// 里面包含当前行 row、当前列 column、当前行号 rowIndex、当前列号 columnIndex 四个属性。
// 该函数可以返回一个包含两个元素的数组，第一个元素代表 rowspan，第二个元素代表 colspan。
// 也可以返回一个键名为 rowspan 和 colspan 的对象。

interface columDataTs {
    [key: string]: any
    code: string
    dataTimeType: string
    name: string
    grade: number
    dateTime: string
}
interface SpanMethodProps {
  row: columDataTs
  column: TableColumnCtx<columDataTs>
  rowIndex: number
  columnIndex: number
}
const data = reactive({
    column: [
        {
            prop: 'code',
            label: '车牌',
        },
        {
            prop: 'dataTimeType',
            label: '物品编号',
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
// 数组形式
const arraySpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}: SpanMethodProps) => {
    if (rowIndex % 2 === 0) { // 是双数倍数的行
        if (columnIndex === 0) { // 第一列横向占两格 纵向占一格
            return [1, 2]
        }
        else if (columnIndex === 1) { // 未了给左边横向两格腾出位置不让右边底部超出一格所以讲此列这个格消失
            return [0, 0]
        }
    }
    return [1, 1]
}
// 对象形式
const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}: SpanMethodProps) => {
    if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
            return {
                rowspan: 2,
                colspan: 1,
            }
        }
        else {
            return {
                rowspan: 0,
                colspan: 0,
            }
        }
    }
}
const { column, params } = toRefs(data)
</script>

