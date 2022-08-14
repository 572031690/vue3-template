<template lang="pug">

.form-box
    div
        el-radio-group(v-model="labelPosition" label="label position")
            el-radio-button(label="left") Left
            el-radio-button(label="right") Right
            el-radio-button(label="top") Top
    br
    div
        el-radio-group(v-model="inline" label="是否inline")
            el-radio-button(:label="true") inline
            el-radio-button(:label="false") not-inline
    br
    div
        el-radio-group(v-model="size" label="尺寸")
            el-radio-button(label="large") large
            el-radio-button(label="default") default
            el-radio-button(label="small") small
    br
    FpiForm( 
        :formOption="formOption"
        v-model="formData"
        :inline="inline"
        :labelPosition="labelPosition"
        :size="size"
        )
</template>

<script lang="ts" setup name="FpiForm">
import { reactive } from 'vue'

const data = reactive({
    formOption: [
        {
            label: '输入框',
            type: 'input',
            size: 'small',
            key: 'input1',
            inputProps: {
                placeholder: '测试',
                disabled: true,
            },
            value: '15',
            rules: 'unNull'
        },
        {
            label: '数字输入框',
            type: 'num-input',
            value: null,
            inputProps: {
                clearable: true,
                placeholder: '测试',
            },
            key: 'inputNum',
            rules: 'unNull,number'
        },
        {
            label: '密码输入框',
            type: 'input',
            inputProps: {
                showPassword: true,
                type: 'password',
            clearable: true,
            placeholder: '测试',
            },
            key: 'inputPass',
            rules: 'unNull'
        },
        {
            label: 'select输入',
            type: 'select',
            key: 'selId',
            inputProps: {
                clearable: true,
                
            },
            defaultSelect: 0,
            option: [
                { label: 'Zone one', value: 'shanghai' },
                { label: 'Zone two', value: 'beijing' },
                { label: 'Zone three', value: 'hangzhou' },
            ]
        },
        {
            label: 'textarea输入框',
            type: 'input',
            key: 'textarea1',
            inputProps: {
                placeholder: '测试',
                type: 'textarea'
            }
        }
    ],
    formData: {
        input1: '',
        inputNum: '',
        inputPass: '',
        selId: '',
        textarea1: '',
    },
    labelPosition: 'left',
    inline: false,
    size: 'default'

})
onMounted(() => {
    setTimeout(() => {
        data.formData.inputNum = '21546545646'
    },2000)
})
const { formOption, formData, labelPosition, inline, size } = toRefs(data)
</script>
<style lang="scss" scoped>
.form-box {
    width: 50%;
    margin: 0 auto;
}
</style>