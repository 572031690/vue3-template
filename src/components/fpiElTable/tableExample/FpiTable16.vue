<template lang="pug">
fpi-el-table(
    :column="column"
    :ref="el => data.fpiElTableDom = el"
    api="publicMap/realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    :pageInit="pageInit"
    :params="params"
    max-height="450"
    )

</template>

<script lang="ts" setup name="FpiTable4">
// resExpr对应接口请求返回对应的表格数据的对象内的位置
// 如： res:{     那么位置就是data
//     data: []
// }
// @pageTotalExpr是对应的对应total页的接口返回对应的位置
// @pageInit是接口初始化时页码的参数默认值
// @params 对应其他请求参数
// @ currentPageOffset 当前页的偏移量 此例就是偏移-1  也就是第一页是0而不是1
// @pageReqExpr 是请求中页码对于的变量名称

const pageInit = {
    pageSizes: 15,
    currentPage: 1,
    total: 0,
    pageSizesArr:[10, 15, 30, 50]
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
            label: 'receivedQuantity数量',
        },
        {
            prop: 'dateTime',
            label: 'receivedQuantity数量',
        },

    ],
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

const { column, params } = toRefs(data)
</script>

