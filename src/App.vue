<!--
 * @Author: Tian
 * @Date: 2022-05-08 18:13:26
 * @LastEditors: Tian
 * @LastEditTime: 2022-06-22 14:17:43
 * @Description: 
-->

<template lang="pug">
el-config-provider(:locale="locale")
    #mainApp
        router-view
</template>
<script setup lang="ts">
import dayjs from "dayjs"
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import service from '@/service/api'
import { globalKey, serviceKey } from '@/symbols'
const locale = zhCn
provide(serviceKey, service)
provide(globalKey, {
    dayjs
})
</script>

<style lang="scss">
@import url("./styles/base.scss");
#mainApp {
    width: 100%;
    height: 100%;
}
    
</style>
