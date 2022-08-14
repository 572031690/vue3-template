<!--
 * @Author: Tian
 * @Date: 2022-07-06 10:33:56
 * @LastEditors: Tian
 * @LastEditTime: 2022-07-06 11:29:29
 * @Description: 
-->
<template lang="pug">
.cascader
    .cascader-title(@click='changeIcon')
        .text {{textHolder}}
        el-icon(v-if='cascaderObj.isOpen')
            CaretTop
        el-icon(v-else)
            CaretBottom
    transition(name='el-zoom-in-top')
        .cascader-popup.border-1(v-if='cascaderObj.showPanel')
            .flex-between-center
                .cascader-popup-type
                    el-radio-group(:modelValue="currentType" @change="typeChange" size='small')
                        el-radio-button(v-for='item in typeList' :key='item.key' :label='item.label')
                .cascader-popup-search
                    el-input(
                        size='small'
                        v-model="cascaderObj.searchName"
                        placeholder="请输入"
                        :prefix-icon="Search"
                        @change='searchEvent'
                        @input='inputEvent'
                        )
            .cascader-panel
                el-cascader-panel(
                    v-model='cascaderObj.selectedCode'
                    :options="options"
                    :props='props'
                    @change='changeNode'
                    ref='fpiCascaderRef'
                    )
</template>
<script lang="ts" setup name="fpi-cascader">
import { Search } from '@element-plus/icons-vue'
import { cascaderProps } from './props'
import type { CascaderObj } from './types'
const $emit = defineEmits(['handleTypeChange', 'handleChangeNode', 'handleSearchEvent', 'handleInputEvent'])
defineProps({
    ...cascaderProps
})
const cascaderObj: CascaderObj = reactive({
    isOpen: false,
    searchName: '',
    showPanel: false,
    selectedCode: ''
})
const fpiCascaderRef = ref()
const changeNode = () => {
    const curNodeInfo = fpiCascaderRef.value.getCheckedNodes()[0]
    // change事件
    $emit('handleChangeNode', {...curNodeInfo})
    // 弹框消失
    cascaderObj.showPanel = !cascaderObj.showPanel
}
const typeChange = (type: any) => {
    cascaderObj.searchName = ''
    $emit('handleTypeChange', type)
}
const changeIcon = () => {
    cascaderObj.isOpen = !cascaderObj.isOpen
    cascaderObj.showPanel = !cascaderObj.showPanel
}
const searchEvent = (val: string) => {
    $emit('handleSearchEvent', val)
}
const inputEvent = (val: string) => {
    $emit('handleSearchEvent', val)
}
</script>
<style lang="scss">
.cascader {
    color: var(--el-color-white);
    font-size: $font-size-common;
    position: absolute;
    top: 70px;
    left: 350px;
    z-index: 99;
    .cascader-title {
        @include flex-start;
        cursor: pointer;
        .text {
            margin-right: $padding-8;
        }
    }
    .cascader-popup {
        min-width: 448px;
        margin-top: 10px;
        padding: $padding-8;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        background: $color-bg-white;
        .cascader-panel {
            margin-top: $padding-8;
        }
        .cascader-popup-search {
            width: 200px;
        }
    }
}
</style>