<template lang="pug">
.form-box
    FpiForm(
        :formOption="formOption"
        v-model="formData"
        )
        template( v-slot:slot1="{ formItem }" )
            el-input(v-model="formData.slot1")
</template>

<script lang="ts" setup name="FpiForm">
import { reactive } from 'vue'
import type { formItemTs } from '@/components/fpiForm/type'

const data = reactive({
    formOption: [
        {
            label: '输入框',
            type: 'input',
            size: 'small',
            key: 'input1',
            rules: 'unNull',
            value: '88',
            inputProps: {
                placeholder: '测试',
                disabled: true,
            }
        },
        {
            label: '数字输入框',
            type: 'num-input',
            value: null,
            key: 'inputNum',
            rules: 'unNull,number',
            inputProps: {
                clearable: true,
                isFocus: true,
                placeholder: '测试',
            }

        },
        {
            label: '密码输入框',
            type: 'input',
            key: 'inputPass',
            rules: 'unNull',
            value: '5456415646768',
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
            label: 'col 时间输入',
            col: [
                {
                    span: 11,
                    type: 'date-picker',
                    key: 'date1',
                    inputProps: {
                        type: 'date',
                        placeholder: 'Pick a date',
                    }

                },
                {
                    type: 'dom',
                    span: 2,
                    vHtml: () => {
                        return '<div style="color: #6b7280;text-align:center;">-</div>'
                    }
                },
                {
                    span: 11,
                    type: 'time-picker',
                    key: 'date2',
                    inputProps: {
                        placeholder: 'Pick a time',
                    }
                }
            ]
        },
        {
            label: '滑块',
            type: 'switch',
            key: 'delivery',
            value: true
        },
        {
            label: '多选',
            type: 'checkbox',
            key: 'checkbox1',
            value: [],
            option: [
                { label: 'Zone one', value: 'shanghai1' },
                { label: 'Zone two', value: 'shanghai2' },
                { label: 'Zone three', value: 'shanghai3' },
            ]
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
