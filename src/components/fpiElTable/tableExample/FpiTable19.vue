<template lang="pug">
fpi-el-table(
    :column="column"
    api="publicMap/realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage: 'offset' }"
    :params="params"
    )
</template>

<script lang="ts" setup name="FpiTable4">


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
            label: '图标',
            align: 'center',
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
            prop: 'name',
            width: '80',
            align: 'center',
        },
        {
            prop: 'runState',
            width: '150',
            label: '监测值(mg/L)',
            align: 'center',
            sortable: true,
        },
        {
            prop: 'name',
            label: '操作',
            align: 'center',
            type: 'tools',
            toolsStyle: () => {
                return {
                    width: '70%',
                    margin: '0 auto'
                } 
            },
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
                    style: () => {
                        return {
                            color: '#FF0200'
                        } 
                    },
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


