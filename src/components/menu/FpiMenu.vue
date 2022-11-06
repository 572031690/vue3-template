<!--
 * @Author: Tian
 * @Date: 2022-06-21 13:38:54
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 08:40:34
 * @Description:
-->
<template lang="pug">
.fpi-menu
    el-menu(
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis='false'
        :router='false'
        background-color="transparent"
        @select="handleSelect"
    )
        sub-menu(:list='menuList')
</template>

<script lang="ts" setup name="fpi-tree">
import type { listTypeTs } from './types'

const menusProps = defineProps({
    menuList: {
        type: Array as () => listTypeTs[],
        default: () => []
    },
    activeIndex: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['handle-selected-menu'])
const handleSelect = (index: string, indexPath: string[], item: any, routeResult?: any) => {
    console.log('index = ', index, 'indexPath = ', indexPath, 'item = ', item, 'routeResult = ', routeResult)
    // 跳转到指定路由
    emits('handle-selected-menu', index, indexPath)
}
</script>

<style lang="scss" scoped>
// 默认样式覆盖
:deep(.el-menu) {
    --el-menu-item-height: 40px;
}

:deep(.el-menu--horizontal>.el-menu-item) {
    height: 28px;
    color: #fff;
    border-bottom: none;
    border-radius: 4px;
}

:deep(.el-menu--horizontal>.el-menu-item.is-active) {
    color: #303133;
    background: #fff;
}

:deep(.el-menu--horizontal) {
    border-bottom: none;
}

:deep(.el-menu--horizontal>.el-menu-item.is-active) {
    border-bottom: none;
}

:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title) {
    color: #fff;
    border-bottom: none;
}

:deep(.el-menu--horizontal) {
    align-items: center;
}

:deep(.el-sub-menu.is-active .el-sub-menu__title) {
    height: 28px;
    color: #303133;
    background-color: #fff !important;
    border-bottom: none;
    border-radius: 4px;
}
</style>
