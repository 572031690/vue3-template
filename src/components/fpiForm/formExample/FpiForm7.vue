<template lang="pug">
.form-box
    FpiForm(
        :formOption="formOption"
        v-model="formData"
        )
        template( v-slot:slot1="{ formItem }" )
            el-input(v-model="formData.slot1")
        template( v-slot:inputPass-label="{ formItem }" )
            span 插入label
</template>

<script lang="ts" setup name="FpiForm">
import { reactive } from 'vue'
import type { formItemTs } from '../type'

const data = reactive({
    formOption: [
        {
            label: '数字输入框',
            type: 'num-input',
            value: null,
            key: 'inputNum',
            rules: 'unNull,number',
            inputProps: {
                clearable: true,
                placeholder: '测试',
            }

        },
        {
            label: '密码输入框',
            type: 'input',
            labelSlot: true,
            key: 'inputPass',
            rules: 'unNull',
            inputProps: {
                showPassword: true,
                type: 'password',
                clearable: true,
                placeholder: '测试',
            }
        },
        {
            label: '插槽输入',
            type: 'input',
            key: 'slot1',
            slot: true,
            rules: 'unNull',
        },
        {
            label: 'select输入',
            type: 'select',
            key: 'selId',
            defaultSelect: 0,
            option: [
                { label: 'Zone one', value: 'shanghai' },
                { label: 'Zone two', value: 'beijing' },
                { label: 'Zone three', value: 'hangzhou' },
            ],
            inputProps: {
                clearable: true,

            }
        },
        {
            label: '单选',
            type: 'radio',
            key: 'radio',
            option: [
                { label: 'Zone one', value: 'shanghai1' },
                { label: 'Zone two', value: 'shanghai2' },
                { label: 'Zone three', value: 'shanghai3' },
            ]
        }
    ] as formItemTs[],
    formData: {
        input1: '',
        inputNum: '',
        inputPass: '',
        selId: '',
        date1: '',
        date2: '',
        delivery: '',
        checkbox1: '',
        radio: '',
        textarea1: '',
        slot1: ''
    }

})
onMounted(() => {
    setTimeout(() => {
        data.formData.inputNum = '21546545646'
    }, 2000)
})
const { formOption, formData } = toRefs(data)
</script>

<style lang="scss" scoped>
.form-box {
    width: 50%;
    margin: 0 auto;
}
</style>
