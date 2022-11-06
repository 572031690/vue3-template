<!--
 * @Author: Tian
 * @Date: 2022-06-21 13:38:54
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 00:33:56
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
import * as Api from '@/service/apis'
import { getTreeDataSub } from '@/utils/tools'
// 获取菜单数据
const menuList = reactive({
    list: [] as any[],
    activeIndex: ''
})
// 获取菜单数据
const getMenuData = async () => {
    const { data } = await Api.PublicApi.getSystemMenus({
        systemCode: 'wgmsAnalysisDiagnose'
    })
    if (!data) return
    menuList.list = data?.entries ?? []
    // 默认获取第一个的子集
    menuList.activeIndex = getTreeDataSub(menuList.list[0]).code
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
    padding: 0 16px 0 8px;
    background: rgba(0, 0, 0, 0.1);

    &-logo {
        width: 122px;
    }

    &-user {
        width: 24px;
    }
}
</style>
