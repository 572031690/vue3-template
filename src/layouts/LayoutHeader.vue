<!--
 * @Author: Tian
 * @Date: 2022-06-21 13:38:54
 * @LastEditors: Tian
 * @LastEditTime: 2022-06-23 09:57:38
 * @Description: 
-->
<template lang="pug">
.layout-nav.flex-between-center
    .layout-nav-logo
        img(src="@/assets/images/layouts/logo.png")
    .layout-nav-menu
        fpi-menu(@handleSelectedMenu='handleSelectedMenu' :menuList='menuList.list' :activeIndex='menuList.activeIndex')
    .layout-nav-user
        img(src="@/assets/images/layouts/user.png")
</template>
<script lang="ts" setup name="layout-header">
import { getTreeDataSub } from '@/utils/tools'
import { serviceKey, defaultService } from '@/symbols'
const service = inject(serviceKey, defaultService)
//获取菜单数据
const menuList = reactive({
    list: [],
    activeIndex: ''
})
//获取菜单数据
const getMenuData = async() => {
    const { data } = await service('publicMap/getSystemMenus', {
        systemCode: 'wgmsAnalysisDiagnose'
    }, {
        'Content-Type': 'application/json'
    })
    menuList.list = data.entries
    //默认获取第一个的子集
    menuList.activeIndex = getTreeDataSub(data.entries[0]).code
}
getMenuData()
const handleSelectedMenu = (index: string, indexPath: string) => {
    console.log(index, indexPath)
}
</script>
<style lang="scss" scoped>
.layout-nav {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.1);
    padding: 0 16px 0 8px;
    &-logo {
        width: 122px;
    }
    &-user {
        width: 24px;
    }
}

</style>
