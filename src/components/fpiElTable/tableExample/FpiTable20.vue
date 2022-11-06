<template lang="pug">
FpiElTableVue(
    :column="column"
    :api="request.singleStation"
    :isShowPage="false"
    :params="params"
    border
    table-layout="auto"
    :resPretreatment="resPretreatment"
    :span-method="arraySpanMethod"
    )
</template>

<script lang="ts" setup name="FpiTable4">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { tableColumnTs } from '../types'
import FpiElTableVue from '../FpiElTable.vue'
import * as request from '@/service/apis/public'
interface SpanMethodProps {
    row: Record<string, any>
    column: TableColumnCtx<Record<string, any>>
    rowIndex: number
    columnIndex: number
}
interface dataTs {
    column: { prop: string; label: string; align: string; fixed?: string }[]
    params: {
        beginTime: number
        endTime: number
        siteId: number
        queryTimeType: string
        factorGroupId: number
    }
    factorList: any[]
}
const data = reactive({
    column: [
        {
            prop: 'title',
            label: '时间',
            align: 'center',
            fixed: 'left'
        }
    ] as tableColumnTs[],
    params: {
        beginTime: 1655913600000,
        endTime: 1655957321383,
        siteId: 298,
        queryTimeType: 'day',
        factorGroupId: 8
    } as {
        beginTime: number
        endTime: number
        siteId: number
        queryTimeType: string
        factorGroupId: number
    },
    factorList: [] as any[]

})

// table预处理方法
const resPretreatment = async (res: any) => {
    return new Promise<Array<any>>(async (resolve) => {
        if (!data.factorList.length) {
            const factorRes = await request.queryFactorGroupByCode({ code: 'surfaceSection' })
            data.factorList = factorRes[0].factors
        }
        const columnAdd = detailHeader()
        const lineName = [{ name: '样本数量', expr: 'samples' }, { name: '最小值', expr: 'factorMin' }, { name: '最大值', expr: 'factorMax' }, { name: '平均值', expr: 'factorAvg' }, { name: '水质等级', expr: 'factorGrade' }, { name: '样本数量', expr: 'samples' }]
        const returnData: Array<Record<string, string | number>> = []
        lineName.forEach((item) => {
            const currData = res[item.expr]
            const curObj: Record<string, any> = {}
            curObj.title = item.name
            columnAdd.forEach((value) => {
                if (!currData) {
                    curObj[value.prop] = '--'
                    return
                }
                curObj[value.prop] = getValueUseful(currData[value.prop])
            })
            returnData.push(curObj)
        })
        const obj: Record<string, any> = {
            title: '总体水质等级'
        }
        columnAdd.length && (obj[columnAdd[0].prop] = res.stationGrade || '--')
        returnData.push(obj)
        resolve(returnData)
    })
}

// 处理表头
const detailHeader = () => {
    const columnAdd: Array<
        {
            prop: string
            label: string
            align: string
            fixed?: string
        }
    > = []
    data.factorList.forEach((item: {
        unitName: string
        factorIndexCode: string
        factorIndexName: string
    }) => {
        const staticColumn = {
            prop: item.factorIndexCode,
            label: '',
            align: 'center',
        }
        const name = getName(item.factorIndexName)
        staticColumn.label = item.unitName ? `${name}\n(${item.unitName})` : name

        columnAdd.push(staticColumn)
    })
    data.column = [...data.column, ...columnAdd] as tableColumnTs[]
    return columnAdd
}
// 对于值进行判断
const getValueUseful = (value: number | null | 'NaN' | undefined) => {
    if (value === 'NaN') return '--'
    else return !value && value !== 0 ? '--' : value
}
// 对于header去除（ 或者 (
const getName = (value: string) => {
    if (value.includes('(')) return value.slice(0, value.indexOf('('))
    if (value.includes('（')) return value.slice(0, value.indexOf('（'))
    return value
}

// 合并行方法
const arraySpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}: SpanMethodProps) => {
    if (rowIndex === 6) {
        if (columnIndex === 0) return [1, 1]
        else if (columnIndex === 1)
            return [1, data.factorList.length]

        else return [0, 0]
    }
    return [1, 1]
}
const { column, params } = toRefs(data)
</script>

<style lang="scss" scoped>
:deep(.el-table th.el-table__cell>.cell) {
    white-space: pre;

    // white-space: pre-wrap; // 也行。
}
</style>

