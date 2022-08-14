import type { CSSProperties, VNode } from 'vue'

export declare type ColumnCls<T> =
    | string
    | ((data: { row: T; rowIndex: number }) => string)

export declare type SummaryMethod<T> = (data: {
    columns: TableColumnCtx<T>[]
    data: T[]
}) => string[]

export declare type ColumnStyle<T> =
    | CSSProperties
    | ((data: { row: T; rowIndex: number }) => CSSProperties)

declare type CI<T> = {
    column: TableColumnCtx<T>
    $index: number
}
declare type FilterMethods<T> = (
    value: any,
    row: T,
    column: TableColumnCtx<T>
) => void
declare type Filters = {
    text: string
    value: string
}[]
export type sortOrderTs = 'ascending' | 'descending' | null
export interface TableColumnCtx<T> {
    id: string
    realWidth: number
    type: string
    label: string
    className: string
    labelClassName: string
    property: string
    prop: string
    width: string | number
    minWidth: string | number
    renderHeader: (data: CI<T>) => VNode
    sortable: boolean | string
    sortMethod: (a: T, b: T) => number
    sortBy: string | ((row: T, index: number) => string) | string[]
    resizable: boolean
    columnKey: string
    rawColumnKey: string
    align: string
    headerAlign: string
    showTooltipWhenOverflow: boolean
    showOverflowTooltip: boolean
    fixed: boolean | string
    formatter: (
        row: T,
        column: TableColumnCtx<T>,
        cellValue: any,
        index: number
    ) => VNode | string
    selectable: (row: T, index: number) => boolean
    reserveSelection: boolean
    filterMethod: FilterMethods<T>
    filteredValue: string[]
    filters: Filters
    filterPlacement: string
    filterMultiple: boolean
    index: number | ((index: number) => number)
    sortOrders: ('ascending' | 'descending' | null)[]
    renderCell: (data: any) => void
    colSpan: number
    rowSpan: number
    children: TableColumnCtx<T>[]
    level: number
    filterable: boolean | FilterMethods<T> | Filters
    order: string
    isColumnGroup: boolean
    isSubColumn: boolean
    columns: TableColumnCtx<T>[]
    getColumnIndex: () => number
    no: number
    filterOpened?: boolean
}
export interface tableColumnTs {
    // ********** element原生属性 **********
    // *************************************
    prop?: string // 变量名称
    label?: string // 表头显示文字
    width?: string // 表格列宽度
    type?: 'selection' | 'index' | 'expand' | 'tools' // 复选/索引列/展开行/自定义的工具类
    sortable?: boolean // 是否可排序
    minWidth?: string // 表格列最小宽度
    showOverflowTooltip?: boolean // 是否超过宽度显示省略号 并显示tooltip
    fixed?: 'right' | 'left' | boolean // 是否固定改列 true false 'right' | 'left'
    indexMethod?: (index: number) => number | string // 自定义索引
    sortOrders?: boolean // 是否有排序按钮
    // 指定数据排序规则，仅当 sortable 设置为 true 时有效。
    // row1 当前列 row2来比较的列 返回 1 row1往前排  -1 row1往后排
    sortMethod?: (
        row1: Record<string, any>,
        row2: Record<string, any>
    ) => 1 | -1
    // 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。
    // string  使用该变量排序
    // Array  如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推
    // function  row 当前列 index 索引 返回 row.num等等
    sortBy?:
        | ((row: Record<string, any>, index: number) => any)
        | string
        | Array<string>
    formatter?: (
        row: Record<string, any>,
        column: TableColumnCtx<Record<string, any>>
    ) => any // 自定义该列内容
    // 列标题 Label 区域渲染使用的 Function
    renderHeader?: (data: { column: Record<string, any>; index: number }) => any // 自定义该列内容
    filters?: Array<{
        // 筛选框内容
        text: string | number
        value: string | number | boolean
    }>
    // 数据过滤的选项是否多选
    filterMultiple?: boolean
    // 筛选回调方法
    filterMethod?: (
        value: string | number | boolean, // 筛选选中value
        row: Record<string, any>, // 当前行
        column: TableColumnCtx<Record<string, any>>
    ) => boolean // column信息
    filterPlacement?: string // 过滤弹出框的定位 与 Tooltip 的 placement 属性相同
    align?: 'left' | 'center' | 'right' // 对齐方式
    headerAlign?: 'left' | 'center' | 'right' // 对齐方式

    // ********** 新加入column属性 **********
    // *************************************
    isSlot?: boolean // 是否可插槽 使用template在最外层定义 插槽名称#prop
    isSlotHeader?: boolean // 是否可表头插槽 使用template 插槽名称 #prop + '-Header'
    // 当type为'tools'时有效 设置工具botton的父级的样式
    toolsStyle?: () => Record<string, string>
    toolsArr?: Array<{
        label: string // btn文字
        style?: () => Record<string, string> // 设置当前btn的样式
        click?: (row: Record<string, any>, index: number) => any // 绑定点击事件
    }>
    column?: Array<any> // 多级表头子列
}
export interface dataTs {
    [key: string]: any
    currTableData: Record<string, any>[] // 当前表格数据
    pageSizes: number // 每页显示条数
    currentPage: number // 当前页
    loading: boolean // 是否显示loading加载图标
    total: number // 总共多少条数据
}
