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
    height: 100vh;
    width: 100%;
    background: #f1f5fb;
    .bg-img{
        width :100%;
    }
        
    .center-box{
        position: absolute;
        top :0;
        height: 100%;
        width: 100%;
    }
        
        .top-line {
            display: flex ;
            justify-content: space-between;
            align-items: center;
            height: 12%;
            padding: 0 32px;
        }
            
        .table-body{
            width: calc(100% - 32px);
            height: 88%;
            margin: 0 auto ;
            background: #FFFFFF;
            box-sizing: border-box;
            border: 1px solid #FFFFFF;
            border-radius: 10px;
        }
            
}


</style>
