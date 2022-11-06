<!--
 * @Author: Tian
 * @Date: 2022-07-06 10:33:56
 * @LastEditors: mjh
 * @LastEditTime: 2022-09-08 10:13:45
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
defineProps({
    ...cascaderProps
})
const $emit = defineEmits(['handle-change-node', 'handle-type-change', 'handle-search-event', 'handle-input-event'])
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
    $emit('handle-change-node', { ...curNodeInfo })
    // 弹框消失
    cascaderObj.showPanel = !cascaderObj.showPanel
}
const typeChange = (type: any) => {
    cascaderObj.searchName = ''
    $emit('handle-type-change', type)
}
const changeIcon = () => {
    cascaderObj.isOpen = !cascaderObj.isOpen
    cascaderObj.showPanel = !cascaderObj.showPanel
}
const searchEvent = (val: string) => {
    $emit('handle-search-event', val)
}
const inputEvent = (val: string) => {
    $emit('handle-search-event', val)
}
</script>

<style lang="scss">
.cascader {
    position: absolute;
    top: 70px;
    left: 350px;
    z-index: 99;
    font-size: $font-size-common;
    color: var(--el-color-white);

    .cascader-title {
        @include flex-start;

        cursor: pointer;

        .text {
            margin-right: $padding-8;
        }
    }

    .cascader-popup {
        min-width: 448px;
        padding: $padding-8;
        margin-top: 10px;
        background: $color-bg-white;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 8%);

        .cascader-panel {
            margin-top: $padding-8;
        }

        .cascader-popup-search {
            width: 200px;
        }
    }
}
</style>
