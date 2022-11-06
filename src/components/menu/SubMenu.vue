<!--
 * @Author: Tian
 * @Date: 2022-06-21 13:55:26
 * @LastEditors: Tian
 * @LastEditTime: 2022-06-22 11:10:42
 * @Description:
-->
<template lang="pug">
template(v-for='item in list' :key='item.id')
    el-sub-menu(v-if='!item.hidden && item.subs.length' :key='item.id' :index='item.code')
        template(#title) {{item.label}}
        sub-menu(:list='item.subs')
    el-menu-item(v-else :key='item.code' :index="item.code") {{item.label}}
</template>

<script lang="ts" setup name="sub-menu">
import type { listTypeTs } from './types'
defineProps({
    list: {
        type: Array as () => listTypeTs[],
        default: () => []
    }
})
</script>
