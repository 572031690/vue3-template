<template lang="pug">
.table-box
    el-table(
        v-loading="loading" 
        :element-loading-text="elementLoadingText" 
        :element-loading-background="elementLoadingBackground"
        :element-loading-svg-view-box="elementLoadingSvgViewBox"
        :element-loading-svg="elementLoadingSvg"
        ref="singleTableRef"
        :data="currTableData" 
        style="width: 100%;"
        :default-sort="defaultSort" 
        :height="height"
        :max-height="maxHeight"
        :stripe="stripe"
        :lazy="lazy"
        :load="load"
        :size="size"
        :fit="fit"
        :show-header="showHeader"
        :tree-props="treeProps"
        :border="border"
        :row-key="rowKey"
        :sum-text="sumText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :table-layout="tableLayout"
        :show-summary="showSummary"
        :highlight-current-row="highlightCurrentRow"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :cell-style="cellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :cell-class-name="cellClassName"
        :header-cell-style="headerCellStyle"
        :empty-text="emptyText"
        :scrollbar-always-on="scrollbarAlwaysOn"
        :tooltip-effect="tooltipEffect"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :indent="indent"
        :select-on-indeterminate="selectOnindeterminate"
        @current-change="handleCurrentChange"
        @sort-change="sortChange"
        @selection-change="selectionChange"
        @row-click="rowClick"
        )
        ElTableNode(:columnData="item" v-for="(item, index) of column" :key="index")
            template(v-slot:[soltItem]="{ scope, item: items }"  v-for="(soltItem, soltIndex) of getTotalSolt(item)" :key="soltIndex")
                slot(:name="soltItem" :scope="scope" :item="items")
            template(v-slot:[soltIHeaderItem]  v-for="(soltIHeaderItem, soltHeaderIndex) of getTotalSoltHeader(item)" :key="soltHeaderIndex")
                slot(:name="soltIHeaderItem" )
            template(v-slot:expand-solt="{ props }"  v-if="isHaveExpand(item)")
                slot(name="expand-solt" :props="props")
    .list-page(v-if='isShowPage')
        div 
            el-pagination(
                :layout="pageLayout" 
                popper-class="transforPage"  
                :background="isShowPageback"
                v-model:page-size="pageSizes" 
                :page-sizes="pageInit.pageSizesArr || [10, 20, 30, 50]"
                :total="total" 
                :pager-count="pagerCount"
                :small="small"
                :current-page='currentPage' 
                @current-change='currentChange' 
                @size-change="currentSizeChange")
            
</template>
<script lang="ts" setup name="fpi-el-table">
import { getVal } from '@/utils/tools'
import { cloneDeep } from 'lodash-es'
import { loadingProps, pageProps, elementProps } from './props'
import { getTotalSoltHeader, isHaveExpand, getTotalSolt } from './utils'
import { serviceKey, defaultService, } from '@/symbols'
import { ElTable } from 'element-plus'
import { DataType } from '@/utils/tools'
import type { tableColumnTs, dataTs, sortOrderTs } from './types'
import type { PropType } from 'vue'
const $service = inject(serviceKey, defaultService)


const props = defineProps({
    /**
     * @desc 表格列配置 
     * @abstract 内部对象对应每个el-table-column的配置属性
     */
    column: {
        type: Array as PropType<Array<tableColumnTs>>,
        default: () => {
            return []
        }
    },
    /**
    * @desc api请求地址 如果为空则不会请求
    * @abstract 例如： publicMap/realTimeViewLoad 需要搭配本系统axios封装使用
    * 以下为可以搭配api自动请求可以传入的其他属性
    * @param pageInit 初始化页码的默认值
    * @param pageReqExpr 页面请求对应页码参数的名称
    * @param pageTotalExpr 请求回传totol值对应在对象内的位置
    * @param currentPageOffset 当前页面偏移量例如第一页对应的传值为0
    * @param resExpr 请求回传对象对应的table数据在对象内的位置
    * @param filterMethod 对请求回传table数据进行过滤的回调函数
    * @param resPretreatment 手动处理res回调 返回table表格数组 async
    * @method reLoadTable 手动请求方法
    * @method getTableData 外层获取表格数据方法
    */
    api: {
        type: String,
        default: ''
    },
    /**
     * @desc 在传了api属性后creat时是否自动请求表格数据
     * @abstract true不自动请求 false 自动请求需要手动调用reLoadTable方法请求
     */
    isLazyRequest: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 除了页码变量以外的搜索列表参数
     * @abstract 需要双向数据绑定每次列表请求都会一起带上次对象内的参数
     */
    params: {
        type: Object as PropType<Record<string, any>>,
        default: () => {
            return {}
        }
    },
    /**
     * @desc 对于请求回传对象对应的table数据在对象内的位置
     * @abstract 如果数据在res内的位置为如下则传入 data.entris
     * res: {
     *     data: {
     *          entris:[...]表格数组
     *     }
     * }
     */
    resExpr: {
        type: String,
        default: ''
    },
    /**
     * @desc 静态数据（当前页） 
     * @abstract 当api为空时不会请求table表格数据 此变量同el-table的data属性
     * 以下为可以配合静态数据传入table的其他属性
     * @param pageParams 如果有页码需要传入页码变量
     * @param pageInit 初始化页码的值
     * @param pageReqExpr 页面请求对应页码参数的名称
     * @param currentPageOffset 当前页面偏移量例如第一页对应的传值为0
     * @method page-change 对应页码切换回调函数
     */
    tableData: {
        type: Object as PropType<Array<Record<string, any>>>,
        default: undefined
    },
    /**
     * @desc 过滤数据方法
     * @abstract 对于回传数据每条进行过滤操作 类似于js filter的回调函数
     * @param row 对于每条数据的对象
     * @param index 索引
     * @param arr 整个表格数组
     * @return Boolean   true/返回  false/去除
     */
    filterMethod: {
        type: Function as PropType<(
            row: Record<string, any>,
            index: number,
            arr: Array<any>
        ) => boolean>,
        default: undefined
    },
    /**
     * @desc api自动请求模式res预处理方法 可异步需要传入async方法
     * @abstract 可以用于将复杂的res回调处理成需要表格渲染的table数组
     * @abstract 也可用于代替resExpr参数
     * @return table表格数组
     */
    resPretreatment: {
        type: Function as PropType<(res: Record<string, any>) => Array<Record<string, any>>>,
        default: undefined
    },

    // ******** element属性 ***********
    ...elementProps,
    // ******** 页码参数 ***********
    ...pageProps,
    // ******** loading参数 ***********
    ...loadingProps

})


/**
 * @desc table回调函数
 */
const $emit = defineEmits([
    'current-change', // 单选点击回调
    'selection-change',// 复选点击回调 
    'page-change', // 页码点击回调
    'sort-change', // 当表格的排序条件发生变化的时候会触发该事件
    'row-click' // 行点击事件
])
const data:dataTs = reactive({
    currTableData: [], // 当前表格数据
    pageSizes: 10, // 每页显示条数
    currentPage: 1, // 当前页
    loading: false, // 是否显示loading加载图标
    total: 0 // 总共多少条数据
})
/**
 * @desc  table dom
 */
const singleTableRef = ref<InstanceType<typeof ElTable>>()
/**
 * @desc  静态表格时监听tableData变化
 */
watch(
    () => props.tableData,
    (val) => {
        data.currTableData = cloneDeep(val)
    },
    { deep: true }
)
/**
 * @desc  静态表格时监听页码变化
 */
watch(
    () => props.pageParams,
    (val) => {
        val && Object.keys(val).forEach((item: string) => {
            data[item] = (val as Record<string,number>)[item]
        })
    },
    { deep: true, immediate: true }
)


/**
 * @desc  页码组件的回调函数 页码修改
 * @param page  当前页
 * @emits page-change emit回传对象 当前的页码参数
 *   @param currentPage 当前页 
 *   @param pageSizes 每页显示条数
 *   @param total 总共条数
 */
const currentChange = (page: number) => {
    data.currentPage = page
    if (props.api) reLoadTable()
    else $emit('page-change', {
        currentPage: data.currentPage,
        total: data.total,
        pageSizes: data.pageSizes,
    })
}
/**
 * @desc  页码size修改
 * @emits page-change emit回传对象 当前的页码参数
 *   @param currentPage 当前页 
 *   @param pageSizes 每页显示条数
 *   @param total 总共条数
 */
const currentSizeChange = () => {
    if (props.api) reLoadTable()
    else $emit('page-change', {
        currentPage: data.currentPage,
        total: data.total,
        pageSizes: data.pageSizes,
    })
}
/**
 * @desc  初始化表格 @async
 * @abstract 会初始化页码参数 对应 @pageInit 传参
 * @abstract 判断 @api 是否为空 为空则获取 @tableData 数据 
 * @abstract @isLazyRequest 是否默认请求
 */
const initTable = async () => {
    // 初始化页码
    const { pageInit } = props
    Object.keys(pageInit).forEach((item: string) => {
        (data as any)[item] = (pageInit as any)[item]
    })
    // 判断是否转入api 且部署lazy模式
    if (props.api && !props.isLazyRequest) {
        data.currTableData = await filterData()
    } else if (props.tableData && props.tableData.length) data.currTableData = cloneDeep(props.tableData)
}
/**
 * @desc  判断是否传入过滤数据方法 @filterMethod 并返回
 */
const filterData = async () => {
    const currData = await sendRequest(data.currentPage, data.pageSizes) as any || []
    if (props.filterMethod) return currData.filter(props.filterMethod)
    else return currData
}
/**
 * @desc 请求数据方法Promise
 * @param currentPage  当前页
 * @param pageSizes  页面数据数量
 * @param isUnLoading  是否需要显示加载图标
 */
const sendRequest = async (currentPage: number, pageSizes: number, isUnLoading?: boolean) => {
    // 获取转入的筛选数据
    return new Promise((resolve) => {
        if (props.isShowLoading && !isUnLoading) data.loading = true
        const { params } = props
        const reqParams: Record<string, any> = {
            ...params,
        }
        // 如果显示页码则加入页码变量
        if (props.isShowPageback) {
            reqParams[props.pageReqExpr.currentPage] = currentPage + props.currentPageOffset
            reqParams[props.pageReqExpr.pageSizes] = pageSizes
        }
        $service(props.api, reqParams).then(async (res: any) => {
            data.loading = false
            props.isShowPage && (data.total = props.pageTotalExpr ? Number(getVal(res, props.pageTotalExpr)) : 0)
            if (props.resPretreatment) {
                res = DataType(props.resPretreatment, 'asyncfunction') ? await props.resPretreatment(res) : props.resPretreatment(res)
            }
            resolve(getVal(res, props.resExpr))
        })
    })
}
/**
 * @desc 设置选中行 <emit>
 * @param row  传的是哪一个对象就选中哪个  不穿则清除选中
 */
const setCurrentRow = (row?: Record<string, any> | number) => {
    if (typeof row === 'number') singleTableRef && singleTableRef.value?.setCurrentRow(data.currTableData[row])
    else singleTableRef && singleTableRef.value?.setCurrentRow(row)
}
/**
 * @desc 点击事件 <emit>
 * @param currentRow  Objcet | String 此次点击的对象
 * @param oldCurrentRow Objcet | Null 上一次点击的对象 
 */
const handleCurrentChange = (currentRow: Record<string, any>, oldCurrentRow: Record<string, any> | null) => {
    $emit('current-change', currentRow, oldCurrentRow)
}
/**
 * @desc 复选框点击事件 <emit>
 * @param currentSelection  currentSelection 选中的对象数组
 */
const selectionChange = (currentSelection: Record<string, any>[]) => {
    $emit('selection-change', currentSelection)
}
/**
 * @desc 行点击事件 <emit>
 * @param row  
 * @param column  
 * @param event  
 */
const rowClick = (row: Record<string, any>[], column:Record<string, any>, event:any) => {
    $emit('row-click', row, column, event)
}
/**
 * @desc 当表格的排序条件发生变化的时候会触发该事件 <emit>
 */
const sortChange = (val:{ column: Record<string, any>, prop: string, order: sortOrderTs }) => {
    $emit('sort-change', val)
}
/**
 * @desc 请求数据 <Expose>
 * @param type  true开始loading / false结束
 */
const changeLoading = async (type: boolean) => {
    data.loading = type
}
/**
 * @desc 手动请求数据 <Expose>
 */
const reLoadTable = async () => {
    // 判断是否转入api 有则请求数据
    if (props.api) {
        data.currTableData = await filterData()
    } else data.currTableData = cloneDeep(props.tableData)
}
/**
 * @desc 获取table数据<Expose>
 * @param types? Objcet | String
 * @param 'all' 获取全部数据 用于比如需要导出
 * @param number 获取当前页第几条数据
 * @param 不传 获取当前页
 * @param 对象 获取指定页和数量的数据
 */
const getTableData = async (types?: 'all' | number | {
    pageSizes: number
    currentPage: number
}) => {
    if (!types || !props.isShowPageback) return cloneDeep(data.currTableData)
    if (types === 'all') {
        const returnData = await sendRequest(1, data.total, true)
        return returnData
    }
    if (typeof types === 'number') return cloneDeep(data.currTableData[types])
    if (typeof types === 'object') {
        const returnData = await sendRequest(types.currentPage, types.pageSizes, true)
        return returnData
    }
}

/**
 * @desc 复选框手动调用方法 <Expose>
 * @param rows  undefined 清除选中  'all' 全选获不全选会自动取反 
 * @abstract rows传数组 可以是对应的对象（静态模式不可用对象）也可以是对应的index(0开始)选中对应列
 */
const toggleSelection = (rows?: any[] | 'all') => {
    if (rows === 'all') {
        singleTableRef.value?.toggleAllSelection()
    } else if (rows) {
        rows.forEach((row) => {
            // TODO: improvement typing when refactor table 取undefined会自动取反 不然就要传true false
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (typeof row === 'number') singleTableRef.value?.toggleRowSelection(data.currTableData[row], undefined)
            // TODO: improvement typing when refactor table
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            else singleTableRef.value?.toggleRowSelection(row, undefined)
        })
    } else {
        singleTableRef.value?.clearSelection()
    }
}
/**
 * @desc 获取复选框选中行 <Expose>
 * 
 */
const getSelectionRows = () => {
    return singleTableRef.value?.getSelectionRows()
}
/**
 * @desc 手动排序表格。 参数 prop 属性指定排序列，order 指定排序顺序。 <Expose>
 * 
 */
const sort = (prop: string, order: string) => {
    return singleTableRef.value?.sort(prop, order)
}
/**
 * @desc 用于可扩展的表格或树表格，如果某行被扩展，则切换。 
 * @abstract 使用第二个参数，您可以直接设置该行应该被扩展或折叠。<Expose>
 * @param row   当前行的对象或者索引
 * @param expanded // true/false 是否展开
 */
const toggleRowExpansion = (rowOrIndex: Record<string, any> | number, expanded: boolean) => {
    if (typeof rowOrIndex === 'number') return singleTableRef.value?.toggleRowExpansion(data.currTableData[rowOrIndex], expanded)
    return singleTableRef.value?.toggleRowExpansion(rowOrIndex, expanded)
}

initTable()

const { loading, currTableData, pageSizes, currentPage, total } = toRefs(data)
defineExpose({
    // 获取表格数据
    getTableData,  
    // 请求数据
    reLoadTable,
    // 设置表格选中行
    setCurrentRow,
    // 复选框手动调用方法
    toggleSelection,
    // 获取复选框选中行
    getSelectionRows,
    // 手动排序
    sort,
    // 设置展开行展开或者收缩
    toggleRowExpansion,
    // 外部改变loading方法
    changeLoading
})
</script>
<style lang="scss" scoped>
.list-page {
    display: flex;
    margin-top: 15px;
    padding-right: 15px;
    flex-direction: row-reverse;
}
</style>