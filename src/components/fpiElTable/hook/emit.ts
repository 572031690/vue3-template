/*
 * @Author: mjh
 * @Date: 2022-11-05 22:54:00
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-06 18:24:54
 * @Description:
 */
import type { sortOrderTs } from '../types'
export const emitList = [
    'select-all', // 当用户手动勾选全选 Checkbox 时触发的事件
    'selection-change', // 复选点击回调
    'row-click', // 行点击事件
    'sort-change', // 当表格的排序条件发生变化的时候会触发该事件
    'current-change', // 单选点击回调
    'expand-change', // 当用户对某一行展开或者关闭的时候会触发该事件
]
export const emitPageList = [
    'page-change', // 页码点击回调
]
export function emitHook($emit: (event: 'select-all' | 'selection-change' | 'row-click' | 'sort-change' | 'current-change' | 'expand-change' | 'page-change', ...args: any[]) => void) {
    /**
     * @desc 点击事件 <emit>
     * @param currentRow  Objcet | String 此次点击的对象
     * @param oldCurrentRow Objcet | Null 上一次点击的对象
     */
    const handleCurrentChange = (currentRow: Record<string, any>, oldCurrentRow: Record<string, any> | null) => {
        $emit('current-change', currentRow, oldCurrentRow)
    }

    /**
     * @desc 当用户手动勾选全选 Checkbox 时触发的事件 <emit>
     * @param currentRow  全选数组
     */
    const handleSelectAll = (currentRow: Record<string, any>[]) => {
        $emit('select-all', currentRow)
    }

    /**
     * @desc 当用户手动勾选全选 Checkbox 时触发的事件 <emit>
     * @param row  展开列数据
     * @param expandedRows 展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded
     */
    const handleExpandChange = (row: Record<string, any>, expandedRows: Record<string, any>) => {
        $emit('expand-change', row, expandedRows)
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
    const rowClick = (row: Record<string, any>[], column: Record<string, any>, event: any) => {
        $emit('row-click', row, column, event)
    }
    /**
     * @desc 当表格的排序条件发生变化的时候会触发该事件 <emit>
     */
    const sortChange = (val: { column: Record<string, any>; prop: string; order: sortOrderTs }) => {
        $emit('sort-change', val)
    }
    return {
        handleCurrentChange,
        handleSelectAll,
        handleExpandChange,
        selectionChange,
        rowClick,
        sortChange
    }
}
