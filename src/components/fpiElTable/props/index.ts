import type { PropType } from 'vue'
import type { ColumnCls, ColumnStyle, SummaryMethod, TableColumnCtx, tableColumnTs } from '../types'
import { fpiTableConfig } from '@/config'

export const fpiTableProps = {
    /**
     * @desc 表格列配置
     * @abstract 内部对象对应每个el-table-column的配置属性
     */
    column: {
        type: Array as PropType<Array<tableColumnTs>>,
        default: () => {
            return [] as tableColumnTs[]
        }
    },
    /**
    * @desc api请求请求方法 如果为空则不会请求
    * @abstract  传入方法要求：入口传参是请求参数，返回一个promise
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
        type: Function,
        default: undefined
    },
    /**
     * @desc 在传了api属性后create时是否自动请求表格数据
     * @abstract true不自动请求 false 自动请求需要手动调用reLoadTable方法请求
     */
    isLazyRequest: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 除了页码变量以外的搜索列表参数
     * @abstract 需要双向数据绑定每次列表请求都会一起带上此对象内的参数
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
        default: fpiTableConfig.resExpr || ''
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
        type: Function as PropType<(res: Record<string, any>) => (Array<Record<string, any>> | Promise<any>)>,
        default: undefined
    },
}
export const pageProps = {
    /**
     * @desc 总共数据条数对应在请求返回对象内位置
     * @abstract 如果数据在res内的位置为如下则传入 data.total
     * res: {
     *     data: {
     *          total:56
     *     }
     * }
     */
    pageTotalExpr: {
        type: String,
        default: fpiTableConfig.pageTotalExpr || 'total'
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
            return fpiTableConfig.pageInit || {
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
            return fpiTableConfig.pageReqExpr || {
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
        default: fpiTableConfig.currentPageOffset || 0
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
    },
    /**
     * @desc 页码盒子的样式
     */
    pageBoxStyle: {
        type: Object,
        default: () => {
            return {}
        }
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
        default: fpiTableConfig.rowStyle || undefined
    },
    /**
     * @desc 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
     */
    headerRowStyle: {
        type: [Function, Object] as PropType<ColumnStyle<any> | undefined>,
        default: fpiTableConfig.headerRowStyle || undefined
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
            return fpiTableConfig.cellStyle || {
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
        default: fpiTableConfig.headerCellStyle || undefined
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
     * @desc Table 的尺寸
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
    },
    /**
     * @desc 确保主轴的最小尺寸  2.2.1
     */
    flexible: {
        type: Boolean,
        default: false
    },
}
