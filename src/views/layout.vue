<!--
 * @Author: Tian
 * @Date: 2022-06-21 13:38:54
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-30 10:43:40
 * @Description:
-->
<template lang="pug">
.layout
    layout-header
    button-list
    .layout-content
        side-layout
            template(#layoutRight)
                .table-body
                    FpiTableUI
            template(#layoutLeft)
                fpi-tree
</template>

<script lang="ts" setup name="layout">
import LayoutHeader from '@/layouts/LayoutHeader.vue'
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/layouts/bg.svg");
    background-size: 100% auto;

    &-content {
        width: 100%;
        height: calc(100% - 128px);
        padding: 0 $padding;
    }

    .table-body {
        width: 100%;
        padding: 25px;
    }
}
</style>

<style lang="scss">
// .is-expanded {
//     .el-tree-node__content {
//         .treeNodeImg {
//             background-image: url('@/assets/images/treeIcon/icon.svg') !important
//         }
//     }
// }
</style>
