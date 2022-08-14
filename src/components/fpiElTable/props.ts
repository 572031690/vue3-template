import type { TableColumnCtx } from './types'
import type { ColumnStyle } from './types'
import type { SummaryMethod } from './types'
import type { ColumnCls } from './types'
import type { PropType } from 'vue'
export const pageProps = {
    /**
     * @desc 总共数据条数对于的请求返回对象内位置
     * @abstract 如果数据在res内的位置为如下则传入 data.total
     * res: {
     *     data: {
     *          total:56
     *     }
     * }
     */
    pageTotalExpr: {
        type: String,
        default: 'data.total'
    },
    /**
     * @desc 静态组件时（api不传时）页码参数
     * @abstract 需要传入双向数据绑定对象
     * @abstract 里面包含pageSizes currentPage total
     * @param currentPage 当前页
     * @param pageSizes 当前每页显示条数
     * @param total 总共多少条
     */
    pageParams: {
        type: Object as PropType<{
            pageSizes?: number
            currentPage?: number
            total?: number
        }>,
        default: undefined
    },
    /**
     * @desc 初始化页码
     * @abstract 需要修改表格默认的页码参数可以传入次对象
     * @abstract 里面包含pageSizes currentPage total pageSizesArr
     * @param currentPage 默认第几页
     * @param pageSizes 默认页码显示几条数据
     * @param total 默认页码总页数
     * @param pageSizesArr 默认页码尺寸
     */
    pageInit: {
        type: Object as PropType<{
            pageSizes?: number
            currentPage?: number
            total?: number
            pageSizesArr: Array<number>
        }>,
        default: () => {
            return {
                pageSizes: 10,
                currentPage: 1,
                total: 0,
                pageSizesArr: [10, 20, 30, 50]
            }
        }
    },
    /**
     * @desc 页面请求对应参数的名称
     * @abstract 页码的请求参数可能与默认的不一致时需要传入对象
     * @abstract 里面包含pageSizes currentPage变量对应新请求参数名称的字符串
     * @param 当前页对应的请求参数名称
     * @param 页码size对应的请求参数名称
     */
    pageReqExpr: {
        type: Object as PropType<{
            pageSizes: string
            currentPage: string
        }>,
        default: () => {
            return {
                pageSizes: 'pageSize',
                currentPage: 'pageNum'
            }
        }
    },
    /**
     * @desc 是否显示页码
     */
    isShowPage: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 分页按钮类型
     * @abstract 同element的page属性
     */
    pageLayout: {
        type: String,
        default: 'total,sizes,prev, pager,next,jumper'
    },
    /**
     * @desc 当前页面偏移量 用于配合后端特殊的要求
     * @abstract 例如第一页 对应请求应该传0页则传入-1
     */
    currentPageOffset: {
        type: Number,
        default: 0
    },
    /**
     * @desc 是否显示页码按钮背景
     */
    isShowPageback: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 是否使用小型分页样式
     */
    small: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
     * @limit 5 ≤ x ≤ 21 的奇数
     */
    pagerCount: {
        type: Number,
        default: 7
    }
}
export const loadingProps = {
    /**
     * @desc 是否在表格显示加载图标
     * @abstract api 不为空时请求会自动显示加载图标
     * @abstract api 为空时可以手动调用changeLoading方法显示加载
     */
    isShowLoading: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 加载图标文字
     */
    elementLoadingText: {
        type: String,
        default: 'Loading...'
    },
    /**
     * @desc 背景遮罩的颜色
     */
    elementLoadingBackground: {
        type: String,
        default: undefined
    },
    /**
     * @desc 自定义加载图标 (与 element-loading-spinner 相同)
     */
    elementLoadingSvg: {
        type: String,
        default: undefined
    },
    /**
     * @desc loading svg图标遮罩偏移位置 逗号分割 四个数组
     * @abstract 例如 -10, -10, 50, 50
     */
    elementLoadingSvgViewBox: {
        type: String,
        default: undefined
    }
}
// 属性同element table
export const elementProps = {
    /**
     * @desc Table 的高度， 默认为自动高度。
     * @abstract 如果 height 为 number 类型，单位 px；
     * @abstract 如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，
     * @abstract 传空字符串会报错
     * @abstract Table 的高度会受控于外部样式。
     */
    height: {
        type: [String, Number],
        default: undefined
    },
    /**
     * @desc Table 的最大高度
     */
    maxHeight: {
        type: [String, Number],
        default: undefined
    },
    /**
     * @desc 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
     */
    rowClassName: {
        type: [Function, Object] as PropType<ColumnCls<any> | undefined>,
        default: undefined
    },
    /**
     * @desc 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
     */
    rowStyle: {
        type: [Function, Object] as PropType<ColumnStyle<any> | undefined>,
        default: undefined
    },
    /**
     * @desc 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
     */
    headerRowStyle: {
        type: [Function, Object] as PropType<ColumnStyle<any> | undefined>,
        default: undefined
    },
    /**
     * @desc 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
     */
    headerRowClassName: {
        type: [Function, Object] as PropType<ColumnCls<any> | undefined>,
        default: undefined
    },
    /**
     * @desc 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
     */
    headerCellClassName: {
        type: [Function, Object] as PropType<ColumnCls<any> | undefined>,
        default: undefined
    },
    /**
     * @desc 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
     */
    cellClassName: {
        type: [Function, Object] as PropType<
            | string
            | ((data: {
                  row: any
                  rowIndex: number
                  column: TableColumnCtx<any>
                  columnIndex: number
              }) => string)
            | undefined
        >,
        default: undefined
    },
    /**
     * @desc table 列样式
     */
    cellStyle: {
        type: [Function, Object] as PropType<
            (() => Record<string, any>) | Record<string, any>
        >,
        default: () => {
            return {
                // 'text-align': 'center',
                // 'font-family': 'PingFangSC',
                // 'font-size': '12px',
                // 'color': '#303133',
            }
        }
    },
    /**
     * @desc table表头列样式
     */
    headerCellStyle: {
        type: [Object, Function] as PropType<
            Record<string, any> | (() => Record<string, any>)
        >,
        default: undefined
        // 'background-color': '#f7faff',
        //         padding:0
        //  'text-align': 'center',
        // 'border-bottom': ' 0px',
        // 'font-family': 'PingFangSC',
        // 'font-size': '12px',
        // 'font-weight': 'Medium',
        // 'color': '#303133',
    },
    /**
     * @desc 空状态文字
     */
    emptyText: {
        type: String,
        default: '暂无数据'
    },
    /**
     * @desc 总是显示滚动条
     */
    scrollbarAlwaysOn: {
        type: Boolean,
        default: false
    },
    /**
     * @desc tooltip effect 属性
     */
    tooltipEffect: {
        type: String as PropType<'dark' | 'light'>,
        default: 'dark '
    },
    // /**
    //  * @desc 表格文字否全部居中
    //  */
    // center: {
    //     type: Boolean,
    //     default: undefined
    // },
    /**
     * @desc 表格是否可选中
     */
    highlightCurrentRow: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 设置表格单元、行和列的布局方式
     */
    tableLayout: {
        type: String as PropType<'fixed' | 'auto' | undefined>,
        default: undefined
    },
    /**
     * @desc 表尾合计行
     */
    showSummary: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 表尾合计行文本
     */
    sumText: {
        type: String,
        default: '合计'
    },
    /**
     * @desc 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
     */
    defaultExpandAll: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
     */
    expandRowKeys: {
        type: Array as PropType<Array<string | number> | undefined>,
        default: undefined
    },
    /**
     * @desc 是否懒加载子节点数据
     */
    lazy: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 是否显示表头
     */
    showHeader: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 列的宽度是否自撑开
     */
    fit: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 	Table 的尺寸
     */
    size: {
        type: String as PropType<'default' | 'large' | 'small'>,
        default: 'default'
    },
    /**
     * @desc 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
     */
    load: {
        type: Function as PropType<
            (
                row: Array<unknown>,
                treeNode: unknown,
                resolve: (date: Array<unknown>) => void
            ) => any
        >,
        default: undefined
    },
    /**
     * @desc 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。
     * @abstract 若为 true，则选中所有行；若为 false，则取消选择所有行
     */
    selectOnindeterminate: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 展示树形数据时，树节点的缩进
     */
    indent: {
        type: Number,
        default: 16
    },
    /**
     * @desc 渲染嵌套数据的配置选项
     */
    treeProps: {
        type: Object as PropType<{
            hasChildren: string
            children: string
        }>,
        default: undefined
    },
    /**
     * @desc 行数据的 Key，用来优化 Table 的渲染；
     * @abstract 在使用reserve- selection功能与显示树形数据时，该属性是必填的。
     * @abstract 支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
     */
    rowKey: {
        type: [String, Function] as PropType<
            string | ((row: any) => string) | undefined
        >,
        default: undefined
    },
    /**
     * @desc 自定义的合计计算方法
     */
    summaryMethod: {
        type: Function as PropType<SummaryMethod<any> | undefined>,
        default: undefined
    },
    /**
     * @desc 合并行或列的计算方法
     */
    spanMethod: {
        type: Function as PropType<
            | ((data: {
                  row: any
                  rowIndex: number
                  column: TableColumnCtx<any>
                  columnIndex: number
              }) => number[] | { rowspan: number; colspan: number })
            | undefined
        >,
        default: undefined
    },
    /**
     * @desc 是否斑马纹
     */
    stripe: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 默认的排序属性  表格刚加载的时候的排序标准
     */
    defaultSort: {
        type: Object as PropType<
            | {
                  prop: string
                  order: 'descending' | 'ascending' | null // dec大的在前 asc小的在前
              }
            | any
        >,
        default: () => {
            // 默认小的在前
            return {
                prop: '',
                order: 'ascending'
            }
        }
    },
    /**
     * @desc 是否有边框
     */
    border: {
        type: Boolean,
        default: false
    }
}
