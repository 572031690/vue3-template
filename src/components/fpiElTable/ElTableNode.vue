<template lang="pug">
el-table-column(
    :prop="columnData.prop"
    :width="columnData.width"
    :fixed="columnData.fixed"
    :sortable="columnData.sortable"
    :formatter="columnData.formatter"
    :min-width="columnData.minWidth"
    :sort-by="columnData.sortBy"
    :align="columnData.align"
    :render-header="columnData.renderHeader"
    :header-align="columnData.headerAlign"
    :filters="columnData.filters"
    :index="columnData.indexMethod"
    :filter-multiple="columnData.filterMultiple"
    :filter-method="columnData.filterMethod"
    :filter-placement="columnData.filterPlacement"
    :sort-orders="columnData.sortOrders"
    :sort-method="columnData.sortMethod"
    :showOverflowTooltip="columnData.showOverflowTooltip"
    :type="columnData.type" 
    :label="columnData.label")
    template(v-if="columnData.column && !columnData.isSlot && !columnData.isSlotHeader")
        ElTableNode(:columnData="item" v-for="(item, index) of columnData.column" :key="index")
            template(v-slot:[soltItem]="{ scope, item: itemSolt }"  v-for="(soltItem, soltIndex) of getTotalSolt(item)" :key="soltIndex")
                slot(:name="soltItem" :scope="scope" :item="itemSolt")
            template(v-slot:[soltIHeaderItem]  v-for="(soltIHeaderItem, soltHeaderIndex) of getTotalSoltHeader(item)" :key="soltHeaderIndex")
                slot(:name="soltIHeaderItem" )
            template(v-slot:expand-solt="{ props }"  v-if="isHaveExpand(item)")
                slot(name="expand-solt" :props="props")
    template(#default="{ row, $index}" v-if="columnData.type==='tools'")
        div.fpi-tools-box(:style="columnData.toolsStyle && columnData.toolsStyle()") 
            div.fpi-tools-tip(:style="item.style && item.style()" v-for="(item, index) in columnData.toolsArr || []" :key="index" @click="item.click ? item.click(row,$index) : (() => {})") {{item.label}}
    template(#default="scope" v-if="columnData.type!=='tools' && (!columnData.column && columnData.isSlot)")
        slot(:name="columnData.prop" :scope="scope" :item="columnData")
            span {{ columnData.prop && scope.row[columnData.prop] }}
    template(#header v-if="columnData.isSlotHeader")
        slot(:name="columnData.prop + '-Header'" )
            span {{ columnData.label }}
    template(#default="props" v-if="columnData.type === 'expand'")
        slot(name="expand-solt" :props="props")
</template>
<script lang="ts" setup >
import type { tableColumnTs } from './types'
import { getTotalSoltHeader, isHaveExpand, getTotalSolt } from './utils'
import type { PropType } from 'vue'

defineProps({
    /**
     * @desc 表格column列对象
     */
    columnData: {
        type: Object as PropType<tableColumnTs>,
        default: () => {
            return {}
        }
    }
})

</script>
<style lang="scss" scoped>
.fpi-tools-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .fpi-tools-tip{
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: 0em;
        color: #0084FF;
        cursor: pointer;
    }
}
    
        
</style>