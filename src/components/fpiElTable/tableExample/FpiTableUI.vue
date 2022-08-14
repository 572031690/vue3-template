<template lang="pug">
fpi-el-table(
    :column="column"
    api="publicMap/realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage: 'offset' }"
    :params="params"
    :headerCellStyle="headerCellStyle"
    max-height="520"
    )
    template(v-slot:twoTips="{ scope }")
        div.two-tips-box 
            div.two-tip(:style="{ background: getBackColor(scope.row.grade) }") {{ scope.row.grade || '--' }}
            div.two-tip-text ~
            div.two-tip(:style="{ background: getBackColor(scope.row.targetGrade) }") {{ scope.row.targetGrade || '--' }}
</template>

<script lang="ts" setup name="FpiTable4">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import cemeraImg from '@/assets/images/table/camera.png'
import { h } from 'vue'
const headerCellStyle = () => {
    return {
        padding: 0,
        'background-color': '#f7faff',
        'text-align': 'center'
    }
}
// 表格头部标签render函数
const renderHeader = () => {
    return h('div',
        { style: { width: 'fit-content', display: 'inline-block', 'vertical-align': 'middle' } },
        [
            h('div', {}, ['监测值']),
            h('div', { style: { 'font-weight': 'normal' } }, ['(mg/L)'])
        ]
    )
}
const colorArr = ['#30D385', '#FFD902', '#FF9902', '#FF0200', '#990099', 'black']
const data = reactive({
    column: [
        {
            type: 'selection',
            align: 'center'
        },
        {
            type: 'index',
            label: '序号',
            width: '60',
            align: 'center'
        },
        {
            prop: 'name',
            label: '状态',
            formatter: (row: Record<string, any>, column: TableColumnCtx<Record<string, any>>) => {
                return h(
                    'div',
                    {
                        style: {
                            width: "10px",
                            height: '10px',
                            margin: "0 auto",
                            background: row.grade === 1 ? '#2AC94F' : '#909399',
                            borderRadius: '50%',
                        },
                    }
                )
            },
        },
        {
            prop: 'name',
            label: '图标',
            align: 'center',
            formatter: () => {
                return h(
                    'img',
                    {
                        src: cemeraImg,
                        style: {
                            width: "15px",
                            height: '15px',
                            margin: "5px auto 0",
                        },
                    }
                )
            },
        },
        {
            prop: 'name',
            label: '左对齐',
            align: 'left'
        },
        {
            prop: 'name',
            label: '居中对齐',
            align: 'center'
        },
        {
            prop: 'name',
            label: '右对齐',
            align: 'right'
        },
        {
            prop: 'name',
            label: '监测时间',
            align: 'center'
        },
        {
            prop: 'targetGrade',
            label: '标签列',
            formatter: (row: Record<string, any>, column: TableColumnCtx<Record<string, any>>) => {
                return h(
                    'div',
                    {
                        style: {
                            width: '36px',
                            height: '22px',
                            margin: "0 auto",
                            'text-align': 'center',
                            'text-height': '22px',
                            'border-radius': '3px',
                            color: 'white',
                            background: row.grade ? colorArr[row.grade - 1] : '#909399'
                        }
                    },
                    row.grade || '--'
                )
            }
        },
        {
            prop: 'twoTips',
            label: '双标签列',
            width: '110',
            isSlot: true,
        },
        {
            prop: 'name',
            width: '80',
            align: 'center',
            renderHeader
        },
        {
            prop: 'name',
            label: '监测值(mg/L)',
            width: '80',
            align: 'center',
            renderHeader
        },
        {
            prop: 'runState',
            width: '140',
            label: '监测值(mg/L)',
            align: 'center',
            sortable: true,
            renderHeader
        },
        {
            prop: 'name',
            label: '操作',
            align: 'center',
            type: 'tools',
            width: '120',
            toolsArr: [
                {
                    label: '查看',
                    click: (row: Record<string, any>, index: number) => {
                        console.log(row, index, '查看')
                    }
                },
                {
                    label: '编辑',
                    click: (row: Record<string, any>, index: number) => {
                        console.log(row, index, '编辑')

                    }
                },
                {
                    label: '删除',
                    click: (row: Record<string, any>, index: number) => {
                        console.log(row, index, '删除')

                    }
                }
            ]
        }
    ],
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
// 获取等级背景颜色
const getBackColor = computed(() => (val: null | number | string) => {
    if (!val) return '#909399'
    else return colorArr[Number(val) - 1]
})

const { column, params } = toRefs(data)
</script>
<style lang="scss" scoped>
// :deep(.el-table__inner-wrapper){
//     border: 1px solid rgb(235, 238, 245);
// }
.two-tips-box {
    display: flex;
    width: fit-content;
    margin: 0 auto;

    .two-tip {
        width: 36px;
        height: 22px;
        text-align: center;
        color: white;
        line-height: 22px;
        background: #30D385;
        border-radius: 3px;
    }

    .two-tip-text {
        margin: 0 4px;
        color: #303133;
    }

}
</style>

