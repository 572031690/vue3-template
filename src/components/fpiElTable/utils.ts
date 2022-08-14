import { tableColumnTs } from './types'
/**
 * @desc 获取column配置内是否有自定义header插槽
 * @param column 表格对象
 * @abstract 递归获取
 * @returns header插槽名称数组
 */
export const getTotalSoltHeader = (column: tableColumnTs) => {
    const totalSoltName: string[] = []
    const getDeepSolt = (columnObj: tableColumnTs) => {
        if (columnObj.isSlotHeader)
            totalSoltName.push(columnObj.prop + '-Header')
        columnObj.column &&
            columnObj.column.length &&
            columnObj.column.forEach((item: tableColumnTs) => {
                getDeepSolt(item)
            })
    }
    getDeepSolt(column)
    return totalSoltName
}
/**
 * @desc 获取column配置内是否有自定义expand展开行
 * @param column 表格对象
 * @abstract 递归获取
 * @returns boolean 是否含有expand展开行
 */
export const isHaveExpand = (column: tableColumnTs) => {
    let isHave = false
    const getDeepSolt = (columnObj: tableColumnTs) => {
        if (columnObj.type === 'expand') isHave = true
        !isHave &&
            columnObj.column &&
            columnObj.column.length &&
            columnObj.column.forEach((item: tableColumnTs) => {
                getDeepSolt(item)
            })
    }
    getDeepSolt(column)
    return isHave
}
/**
 * @desc 获取column配置内是否有自定义表格插槽
 * @param column 表格对象
 * @abstract 递归获取
 * @returns 插槽prop 名称数组
 */
export const getTotalSolt = (column: tableColumnTs) => {
    const totalSoltName: string[] = []
    const getDeepSolt = (columnObj: tableColumnTs) => {
        if (columnObj.isSlot && columnObj.prop)
            totalSoltName.push(columnObj.prop)
        columnObj.column &&
            columnObj.column.length &&
            columnObj.column.forEach((item: tableColumnTs) => {
                getDeepSolt(item)
            })
    }
    getDeepSolt(column)
    return totalSoltName
}
/**
 * @desc 当label内有$br字样的时候会自动换行
 * @param columns element表格对象
 * @param index 索引
 * @returns 换行后的表头dom
 */
export const renderHeaderDefault = (columns: {
    column: record
    index: number
}) => {
    const label = columns.column.label
    if (!label) return
    const labelArr = label.split('$br')
    if (labelArr.length === 1) return label
    return h(
        'div',
        {},
        labelArr.map((item: string) => h('div', {}, item))
    )
}
