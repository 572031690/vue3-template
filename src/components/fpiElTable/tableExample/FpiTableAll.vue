<template>
    <FpiElTableVue
        :ref="el => data.fpiElTableDom = el"
        :column="column"
        :api="request.realTimeViewLoad"
        res-expr="rows"
        page-total-expr="total"
        :current-page-offset="-1"
        :page-req-expr="{ pageSizes: 'limit', currentPage: 'offset' }"
        :params="params"
        :default-sort="{ prop: 'receivedQuantity', order: 'descending' }"
        :is-lazy-request="false"
        highlight-current-row
        height="550"
        :cell-style="getCellStyle"
        :header-cell-style="headStyleFun"
        empty-text="暂无数据"
        center
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
    >
        <template #watershedId="{ scope, item }">
            <span>{{ `${scope.row[item.prop]}撒大` }} </span>
        </template>
        <template #companyName="props">
            <span>{{ '撒大companyName' }}{{ fff(props) }}</span>
        </template>
        <template #licenseNumber>
            <span>{{ '撒大licenseNumber' }}</span>
        </template>
    </FpiElTableVue>
</template>

<script lang="ts" setup name="FpiTableAll">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import FpiElTableVue from '../FpiElTable.vue'
import cccc from '../cccc.vue'
import type { tableColumnTs } from '@/components/fpiElTable/types'
import * as request from '@/service/apis/public'
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

const fff = (val: any) => {
    // console.log(val, 's')
    return 's'
}
const data = reactive({
    column: [
        {
            type: 'selection',
            width: '50',
            label: '',
        },
        {
            type: 'index',
            label: '序号',
            width: '50',
        },
        {

            prop: 'companyName',
            label: '联单编号',
            width: '250',
            isSlot: true,
            // fixed: 'right'
        },
        {
            label: '产生企业ss',
            column: [
                {
                    prop: 'accessCode',
                    label: '车牌',
                    width: '120',
                    showOverflowTooltip: true,
                    // isSlot: true,
                },
                {
                    label: '车牌s',
                    width: '60',
                    column: [
                        {
                            prop: 'name',
                            label: '名称',
                            width: '160',
                            // showOverflowTooltip: true,
                            // isSlot: true,
                        }
                    ]
                },
                {
                    prop: 'name',
                    label: '物品编号',
                    width: '300',
                },
                {
                    prop: 'lastConnectTime',
                    label: 'receivedQuantity数量',
                    width: '300',
                },
                {
                    prop: 'dateTime',
                    label: '日期',
                    sortable: true,
                    // sortBy: (row:columDataTs, index:number) => {
                    //     return row.receivedQuantity
                    // },
                    // sortBy: ['receivedQuantity', 'jointSerialNumber'], // 当前面的变量相等时再比较后面的
                    // sortBy: 'receivedQuantity',
                    sortMethod: (row: columDataTs, row1: columDataTs) => {
                        if (Number(row.num) > Number(row1.num)) return -1
                        else return 1
                        // return row.receivedQuantity
                    },
                    sortOrders: ['ascending', 'descending', null],
                    width: '300',
                },
                {
                    prop: 'generatingUnitName',
                    label: '单位',
                    width: '300',
                    formatter: (row: Record<string, any>, column: TableColumnCtx<columDataTs>) => {
                        return row.generatingUnitName || '--'
                    }
                }

            ]
        },
        {
            prop: 'watershedId',
            label: '处置企业',
            isSlot: true,
        }
    ] as tableColumnTs[],
    fpiElTableDom: ref(),
    params: {
        stationCodes: '12,8,103,104,105,106,107,108,109',
        regionCodes: '330100000000',
        watershedCodes: 'GA',
        factorGroupCode: 'SD',
        online: -1,
        runState: -1,
        queryStr: '',
        factorCode: null
    },
    svg: `
        <path class="path" d="
        M 30 15
        L 28 17
        M 25.61 25.61
        A 15 15, 0, 0, 1, 15 30
        A 15 15, 0, 1, 1, 27.99 7.5
        L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
    `,
})
const mgs = ref('message')
const slots = useSlots()
const comp = h(
    cccc,
    {
        class: 'sss',
        onchangeSS: (value: string) => {
            console.log(value, '-mjhs')
        },
        mgs: mgs.value,
    },
    {
        default(props: string) {
            return `${props}mmsss`
        }
    }
    // [
    //     slots.default ? slots.default() : 'ss',
    //     slots.value ? slots.value() : 'ss',
    // ]
)

const headStyleFun = () => {
    return {
        'background-color': '#F7FAFF',
        'text-align': 'center',
        'border-bottom': ' 0px',
        'font-family': 'PingFangSC',
        'font-size': '12px',
        'font-weight': 'Medium',
        'color': '#303133',
    }
}
const getCellStyle = () => {
    return {
        'text-align': 'center',
        'font-family': 'PingFangSC',
        'font-size': '12px',
        'color': '#303133',
    }
}
onMounted(() => {
    setTimeout(() => {
        // data.fpiElTableDom.reLoadTable()
        // setTimeout(() => {
        //     data.fpiElTableDom.toggleSelection([1])
        //     setTimeout(() => {
        //     data.fpiElTableDom.toggleSelection([1,2])
        // },1000)
        // },2000)
    }, 2000)
})

const handleCurrentChange = (val: any | undefined, old: any) => {
    console.log(val, old, '单选')
    setTimeout(() => {
        data.fpiElTableDom.setCurrentRow()
    }, 1000)
}
const handleSelectionChange = (val: any[]) => {
    console.log(val, '复选')
}

const { column, params } = toRefs(data)
</script>
