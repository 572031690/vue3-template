<!--
 * @Author: Tian
 * @Date: 2022-06-21 13:38:54
 * @LastEditors: Tian
 * @LastEditTime: 2022-06-22 11:01:22
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

const emits = defineEmits(['handleSelectedMenu'])
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

const handleSelect = (index: string, indexPath: string, item: Record<string, any>, routeResult: string) => {
    console.log('index = ', index, 'indexPath = ', indexPath, 'item = ', item, 'routeResult = ', routeResult)
    //跳转到指定路由
    emits('handleSelectedMenu', index, indexPath)
}
</script>
<style lang="scss" scoped>
//默认样式覆盖
:deep(.el-menu) {
    --el-menu-item-height: 40px;
}
    
:deep(.el-menu--horizontal>.el-menu-item) {
    border-bottom: none;
    border-radius: 4px;
    height: 28px;
    color: #ffffff;
}
    
:deep(.el-menu--horizontal>.el-menu-item.is-active) {
    background: #ffffff;
    color: #303133;
}
    
:deep(.el-menu--horizontal) {
    border-bottom: none;
}
    
:deep(.el-menu--horizontal>.el-menu-item.is-active) {
    border-bottom: none;
}
    
:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title) {
    color: #ffffff;
    border-bottom: none;
}
   
:deep(.el-menu--horizontal) {
    align-items: center;
}
    
:deep(.el-sub-menu.is-active .el-sub-menu__title) {
    border-bottom: none;
    height: 28px;
    background-color: #ffffff!important;
    color: #303133;
    border-radius: 4px;
}
    

</style>
