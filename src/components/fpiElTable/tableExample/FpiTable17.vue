<template lang="pug">
FpiElTableVue(
    :column="column"
    style="width: 100%; margin-bottom: 20px"
    :tableData="tableData"
    :page-params="pageParams"
    :ref="el => data.fpiElTableDom = el"
    @page-change="pageChange"
    row-key="id"
    border
    max-height="250"
    )
FpiElTableVue(
    :column="column"
    style="width: 100%;"
    :tableData="tableData1"
    :page-params="pageParams"
    @page-change="pageChange"
    row-key="id"
    max-height="250"
    border
    lazy
    :load="load"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    )
</template>

<script lang="ts" setup name="FpiTable4">
import FpiElTableVue from '../FpiElTable.vue'
import type { tableColumnTs } from '../types'
// 使用方式同element-plus官网
//    default-expand-all

interface User {
    id: number
    date: string
    name: string
    hasChildren?: boolean
    children?: User[]
}

const data = reactive({
    column: [
        {
            type: 'index',
            label: '序号',
            width: '50',
        },
        {
            prop: 'date',
            label: 'date',
        },
        {
            prop: 'name',
            label: 'Name',
        }
    ] as tableColumnTs[],
    pageParams: {
        currentPage: 1,
        total: 0,
        pageSizes: 10,
    },
    // dom 节点
    fpiElTableDom: ref(),
    tableData: [
        {
            id: 1,
            date: '2016-05-02',
            name: 'wangxiaohu',
        },
        {
            id: 2,
            date: '2016-05-04',
            name: 'wangxiaohu',
        },
        {
            id: 3,
            date: '2016-05-01',
            name: 'wangxiaohu',
            children: [
                {
                    id: 31,
                    date: '2016-05-01',
                    name: 'wangxiaohu',
                },
                {
                    id: 32,
                    date: '2016-05-01',
                    name: 'wangxiaohu',
                },
            ],
        },
        {
            id: 4,
            date: '2016-05-03',
            name: 'wangxiaohu',
        }
    ],
    tableData1: [
        {
            id: 1,
            date: '2016-05-02',
            name: 'wangxiaohu',
        },
        {
            id: 2,
            date: '2016-05-04',
            name: 'wangxiaohu',
        },
        {
            id: 3,
            date: '2016-05-01',
            name: 'wangxiaohu',
            hasChildren: true,
        },
        {
            id: 4,
            date: '2016-05-03',
            name: 'wangxiaohu',
        },
    ]
})
onMounted(() => {
    // 还可以使用此方法设置展开行
    data.fpiElTableDom.toggleRowExpansion(data.tableData[2], true)
})
const load = (
    row: any,
    treeNode: unknown,
    resolve: (date: User[]) => void
) => {
    setTimeout(() => {
        resolve([
            {
                id: 31,
                date: '2016-05-01',
                name: 'wangxiaohu',
            },
            {
                id: 32,
                date: '2016-05-01',
                name: 'wangxiaohu',
            },
        ])
    }, 1000)
}
// 必须按照这三个变量名写
const pageChange = (pageObj: {
    currentPage: number
    total: number
    pageSizes: number
}) => {
    data.pageParams.pageSizes = pageObj.pageSizes
    data.pageParams.currentPage = pageObj.currentPage
    // getData()
}
const { column, pageParams, tableData, tableData1 } = toRefs(data)
</script>

