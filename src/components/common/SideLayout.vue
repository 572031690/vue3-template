<template lang="pug">
.side-layout
    .layout-left
        el-scrollbar
            slot(name='layoutLeft')
    .layout-right
        slot(name='layoutRight')
</template>

<style lang="scss" scoped>
.side-layout {
    display: flex;
    width: 100%;
    height: 100%;
    background: $color-bg-white;
    border-radius: 8px 8px 0 0;

    .layout-left {
        width: 200px;
        border-right: 1px solid $border-color;
    }

    .layout-right {
        width: calc(100% - 200px);
    }
}
</style>
