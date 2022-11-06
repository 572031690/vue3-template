<!--
 * @Author: mjh
 * @Date: 2022-09-06 09:21:32
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-06 18:28:26
 * @Description:
-->
<template lang="pug">
elTableNode
</template>

<script lang="ts" setup name="ElTableNode">
import type { PropType } from 'vue'
import { ElTableColumn } from 'element-plus'
import { defineComponent, h } from 'vue'
import type { tableColumnTs } from './types'

const props = defineProps({
    /**
     * @desc 表格column列对象
     */
    columnData: {
        type: Object as PropType<tableColumnTs>,
        default: () => {
            return {} as tableColumnTs
        }
    },
    /**
     * @desc 父亲插槽
     */
    slots: {
        type: Object as PropType<record>,
        default: () => {
            return {} as record
        }
    }
})

const getRenderColumn = (columnData: tableColumnTs) => {
    return h(
        ElTableColumn, {
            ...columnData,
        },
        {
            default(scope: { row: record; $index: number }) {
                if (columnData.type === 'tools') {
                    return h(
                        'div',
                        {
                            class: 'fpi-tools-box',
                            style: {
                                'display': 'flex',
                                'justify-content': 'space-between',
                                'width': '100%',
                                ...columnData.toolsStyle ? columnData.toolsStyle() : {}
                            }
                        },
                        (columnData.toolsArr || []).map((item, index) => {
                            return h(
                                'div',
                                {
                                    class: 'fpi-tools-tip',
                                    key: index,
                                    style: {
                                        'font-size': '14px',
                                        'font-weight': 'normal',
                                        'line-height': '22px',
                                        'color': '#0084ff',
                                        'letter-spacing': 0,
                                        'cursor': 'pointer',
                                        ...(item.style ? item.style() : {})
                                    },
                                    onClick: (e: any) => {
                                        e.stopPropagation()
                                        item.click && item.click(scope.row, scope.$index)
                                    }
                                },
                                item.label
                            )
                        })
                    )
                }
                else if (columnData.type === 'expand') {
                    return h(
                        'div',
                        props.slots['expand-slot'] ? props.slots['expand-slot'](scope) : ''
                    )
                }
                else if (columnData.isSlot && props.slots[columnData.prop || '']) {
                    const propKey = columnData.prop || ''
                    return h(
                        'div',
                        (props.slots as any)[propKey]({ scope, item: columnData })
                    )
                }
                else if (columnData.column && columnData.column.length) {
                    return columnData.column.map((column) => {
                        return getRenderColumn(column)
                    })
                }
            },
            ...(props.slots[`${columnData.prop}-header`]
                ? {
                    header(scope: { column: record; $index: number }) {
                        return h(
                            'div',
                            props.slots[`${columnData.prop}-header`] ? (props.slots[`${columnData.prop}-header`] as any)({ scope, item: columnData }) : h('span', columnData.label)
                        )
                    }
                }
                : '')
        },
    )
}

const elTableNode = defineComponent({
    render() {
        return getRenderColumn(props.columnData)
    }
})
</script>

<style lang="scss" scoped>
.fpi-tools-box {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .fpi-tools-tip {
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        color: #0084ff;
        letter-spacing: 0;
        cursor: pointer;
    }
}
</style>
