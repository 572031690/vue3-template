<template>
    <TableNode />
</template>

<script lang="ts" setup name="FpiElTableVue">
import { cloneDeep } from 'lodash-es'
import { ElPagination, ElTable, vLoading } from 'element-plus'
import { withDirectives } from 'vue'
import { exposeHook } from './hook/expose'
import TableColumnNode from './TableColumnNode.vue'
import { elementProps, fpiTableProps, loadingProps, pageProps } from './props'
import type { PageKeyTs, dataTs } from './types'
import { emitList, emitPageList } from './hook/emit'
import { DataType, getObjectKey, getVal, pickKey } from './utils'
const props = defineProps({
    // ******** fpitable特殊属性 ***********
    ...fpiTableProps,
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
    ...emitList,
    ...emitPageList
])
const slots = useSlots()
const data: dataTs = reactive({
    currTableData: [], // 当前表格数据
    pageParameter: {
        pageSizes: 10, // 每页显示条数
        currentPage: 1, // 当前页
        total: 0 // 总共多少条数据
    },
    loading: false, // 是否显示loading加载图标
})
const TableNode = defineComponent({
    render() {
        // const loading = resolveDirective('vLoading') // 获取自定义指令
        return h(
            'div',
            {
                class: 'fpi-table-box'
            },
            [
                withDirectives(h(
                    ElTable,
                    {
                        ...pickKey(props, getObjectKey(elementProps)),
                        ref: singleTableRef,
                        data: data.currTableData,
                        style: {
                            width: '100%'
                        },
                        ...emitList.reduce((pre: Record<string, any>, cur) => {
                            pre[`on${cur}`] = (...arg: any[]) => {
                                $emit(cur, ...arg)
                            }
                            return pre
                        }, {}),
                    },
                    {
                        empty() {
                            return slots.empty && slots.empty()
                        },
                        append() {
                            return slots.append && slots.append()
                        },
                        default() {
                            return props.column.map((item, index) => {
                                return h(
                                    TableColumnNode,
                                    {
                                        key: index,
                                        columnData: item,
                                        slots
                                    }
                                )
                            })
                        }
                    }
                ), [[vLoading, data.loading]]),
                props.isShowPage
                    ? h(
                        'div',
                        {
                            class: 'fpi-list-page',
                            style: {
                                'display': 'flex',
                                'flex-direction': 'row-reverse',
                                'padding-right': '15px',
                                'margin-top': '15px',
                                ...(props.pageBoxStyle || {})
                            }
                        },
                        [
                            h(
                                'div',
                                [
                                    h(
                                        ElPagination,
                                        {
                                            'pageSize': data.pageParameter.pageSizes,
                                            ...pickKey(props, ['small', 'pagerCount']),
                                            'layout': props.pageLayout,
                                            'popper-class': 'transformPage',
                                            'background': props.isShowPageback,
                                            'page-sizes': props.pageInit.pageSizesArr || [10, 20, 30, 50],
                                            'total': data.pageParameter.total,
                                            'current-page': data.pageParameter.currentPage,
                                            'onUpdate:pageSize': (value: number) => data.pageParameter.pageSizes = value,
                                            'onCurrentChange': currentChange,
                                            'onSizeChange': currentSizeChange
                                        }
                                    )
                                ]
                            )
                        ]
                    )
                    : ''
            ]
        )
    }
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
            data.pageParameter[item as PageKeyTs] = val[item as PageKeyTs] || 0
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
    data.pageParameter.currentPage = page
    if (props.api) { exposeFun.reLoadTable() }
    else {
        $emit('page-change', {
            currentPage: data.pageParameter.currentPage,
            total: data.pageParameter.total,
            pageSizes: data.pageParameter.pageSizes,
        })
    }
}
/**
 * @desc  页码size修改
 * @emits page-change emit回传对象 当前的页码参数
 *   @param currentPage 当前页
 *   @param pageSizes 每页显示条数
 *   @param total 总共条数
 */
const currentSizeChange = () => {
    if (!props.api && data.pageParameter.total <= ((data.pageParameter.currentPage - 1) * data.pageParameter.pageSizes)) return
    if (props.api) { exposeFun.reLoadTable() }
    else {
        $emit('page-change', {
            currentPage: data.pageParameter.currentPage,
            total: data.pageParameter.total,
            pageSizes: data.pageParameter.pageSizes,
        })
    }
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
    // 判断是否转入api 且不是lazy模式
    if (props.api && !props.isLazyRequest)
        data.currTableData = await filterData()

    else if (props.tableData && props.tableData.length)
        data.currTableData = cloneDeep(props.tableData)
}
/**
 * @desc  判断是否传入过滤数据方法 @filterMethod 并返回
 */
const filterData = async () => {
    let currData = await sendRequest(data.pageParameter.currentPage, data.pageParameter.pageSizes) as any || []
    if (props.filterMethod)
        currData = currData.filter(props.filterMethod)
    return currData
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
        if (props.isShowLoading && !isUnLoading)
            data.loading = true
        const { params } = props
        const reqParams: Record<string, any> = {
            ...params,
        }
        // 如果显示页码则加入页码变量
        if (props.isShowPage) {
            reqParams[props.pageReqExpr.currentPage] = currentPage + props.currentPageOffset
            reqParams[props.pageReqExpr.pageSizes] = pageSizes
        }
        props.api && props.api(reqParams).then(async (res: any) => {
            data.loading = false
            props.isShowPage && (data.pageParameter.total = props.pageTotalExpr ? Number(getVal(res, props.pageTotalExpr)) : 0)
            if (props.resPretreatment)
                res = DataType(props.resPretreatment, 'asyncfunction') ? await props.resPretreatment(res) : props.resPretreatment(res)
            resolve(getVal(res, props.resExpr))
        })
    })
}

const exposeFun = exposeHook(data, props, singleTableRef, { sendRequest, filterData })

initTable()

defineExpose(exposeFun)
</script>

<style lang="scss" scoped>
.list-page {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 15px;
    margin-top: 15px;
}
</style>

<style lang="scss">
// @import url("element-plus/theme-chalk/el-table.css");
// @import url("element-plus/theme-chalk/el-scrollbar.css");
// @import url("element-plus/theme-chalk/el-pagination.css");
// @import url("element-plus/theme-chalk/el-loading.css");

@import url("element-plus/dist/index.css");
</style>

