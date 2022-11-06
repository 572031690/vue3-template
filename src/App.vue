<!--
 * @Author: Tian
 * @Date: 2022-05-08 18:13:26
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-21 23:57:32
 * @Description:
-->

<template>
    <ElConfigProvider :locale="locale">
        <div id="mainApp">
            <router-view />
        </div>
    </ElConfigProvider>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import { globalKey } from '@/symbols'
const locale = zhCn
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

.el-input__wrapper {
    width: 100%;
}

.el-date-editor {
    width: 100%;
}
</style>
