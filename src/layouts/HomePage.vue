<template lang="pug">
.HomePage
    img.bg-img(src="@/assets/images/layouts/bg.svg")
    .center-box
        .top-line
            slot(name="top")
                div 这是顶部

        .table-body
            slot(name="body")
                div 这里身体
</template>

<script lang="ts" setup name="HomePage">
</script>

<style lang="scss" scoped>
.HomePage {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #f1f5fb;

    .bg-img {
        width: 100%;
    }

    .center-box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .top-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 12%;
        padding: 0 32px;
    }

    .table-body {
        box-sizing: border-box;
        width: calc(100% - 32px);
        height: 88%;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #fff;
        border-radius: 10px;
    }
}
</style>
