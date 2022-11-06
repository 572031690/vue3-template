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
    sum-text="total"
    :summary-method="getSummaries"
    show-summary
    )
</template>

<script lang="ts" setup name="FpiTable4">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import FpiElTableVue from '../FpiElTable.vue'
import type { tableColumnTs } from '../types'
import * as request from '@/service/apis/public'
// 若表格展示的是各类数字，可以在表尾显示各列的合计。
// 将 show-summary 设置为true就会在表格尾部展示合计行。
// 默认情况下，对于合计行，第一列不进行数据求合操作，而是显示「合计」二字（可通过sum - text配置），
// 其余列会将本列所有数值进行求合操作，并显示出来。 当然，你也可以定义自己的合计逻辑。
// 使用 summary - method 并传入一个方法，返回一个数组，这个数组中的各项就会显示在合计行的各列中，
// summary-method 优先级高于 sum-text

interface columDataTs {
    [key: string]: any
    code: string
    dataTimeType: string
    name: string
    grade: number
    dateTime: string
}
interface SummaryMethodProps<T = columDataTs> {
    columns: TableColumnCtx<T>[]
    data: T[]
}

const data = reactive({
    column: [
        {
            prop: 'code',
            label: '车牌',
        },
        {
            prop: 'dataTimeType',
            label: '联单编号',
            width: '300',
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
const getSummaries = (param: SummaryMethodProps) => {
    const { columns, data } = param
    const sums: string[] = []
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = 'Total Cost'
            return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => Number.isNaN(value))) {
            sums[index] = `$ ${values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!Number.isNaN(value))
                    return prev + curr

                else
                    return prev
            }, 0)}`
        }
        else {
            sums[index] = 'N/A'
        }
    })

    return sums
}
const { column, params } = toRefs(data)
</script>
