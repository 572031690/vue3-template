<template lang="pug">
.form-box-test
    FpiForm( 
        ref="ruleFormRef"
        v-model="formData"
        :formOption="formOption"
        :formBtnOption="formBtnOption"
        labelWidth="160px"
        @submit="submit"
        @cancel="cancel"
        )
</template>

<script lang="ts" setup name="FpiForm">
import { reactive } from 'vue'
import type { fpiFormTs } from '@/components/fpiForm/type'
import type { btnOptionTs, formItemTs } from '../type'
const data = reactive({
    formOption: [
        {
            isLine: true, // 是否是分割线
            lineLabel: '基础信息' // 分割线文字
        },
        {
            col: [
                {
                    label: '企业名称：',
                    span: 12,
                    type: 'input',
                    key: 'input1',
                    rules: 'unNull',
                    inputProps: {
                        placeholder: '请选择企业',
                        clearable: true,

                    }
                },
                {
                    span: 12,
                    label: '企业生产状态：',
                    type: 'num-input',
                    value: null,
                    key: 'inputNum',
                    rules: 'unNull,number',
                    inputProps: {
                        clearable: true,
                        placeholder: '',
                    }
                },
            ]
        },
        {
            col: [
                {
                    span: 12,
                    label: '排口名称：',
                    type: 'input',
                    showPassword: true,
                    key: 'inputPass',
                    rules: 'unNull',
                },
                {
                    span: 12,
                    label: '排口编号：',
                    type: 'input',
                    showPassword: true,
                    key: 'inputPass',
                    rules: 'unNull',
                    inputProps: {
                        clearable: true,
                        disabled: true,
                    }
                },
            ]
        },
        {
            col: [
                {
                    label: '排口位置：',
                    type: 'input',
                    key: 'inputPass',
                    rules: 'email',
                },
            ]
        },
        {
            label: '经纬度：',
            gutter: 15,
            col: [
                {
                    span: 5,
                    type: 'input',
                    key: 'num-input',
                    rules: 'unNull',
                    inputProps: {
                        clearable: true,
                    }
                },
                {
                    span: 5,
                    type: 'input',
                    key: 'num-input',
                    rules: 'unNull',
                    inputProps: {
                        clearable: true,

                    }
                }
            ]
        },
        {
            col: [
                {
                    label: '是否安装在线监控：',
                    type: 'radio',
                    key: 'radio',
                    value: false,
                    option: [
                        { label: '是', value: true },
                        { label: '否', value: false },
                    ]
                },
            ]
        },
        {
            col: [
                {
                    label: '备注：',
                    type: 'input',
                    key: 'textarea1',
                    required: false,
                    inputProps: {
                        clearable: true,
                        type: 'textarea'
                    }
                },
            ]
        },
        {
            isLine: true, // 是否是分割线
            lineLabel: '扩展信息' // 分割线文字
        },
        {
            col: [
                {
                    label: '是否参与有效率计算：',
                    type: 'radio',
                    key: 'date2',
                    value: true,
                    option: [
                        { label: '是', value: true },
                        { label: '否', value: false },
                    ]
                }
            ]
        },
        {
            col: [
                {
                    label: '异步筛选',
                    type: 'select',
                    key: 'selId',
                    option: [
                        // { label: '是', value: true },
                        // { label: '否', value: false },
                    ]
                },
            ]
        }

    ] as formItemTs[],
    formData: {
        input1: '',
        inputNum: '',
        inputPass: '',
        selId: '1',
        date1: '',
        date2: true,
        delivery: '',
        checkbox1: '',
        radio: '',
        textarea1: '',
        slot1: ''
    },
    formBtnOption: [
        {
            type: "primary",
            label: '提交',
            click: 'submit'
        },
        {
            label: '取消',
            click: 'cancel'
        }
    ] as btnOptionTs[]

})

const ruleFormRef: any = ref<fpiFormTs>()
onMounted(() => {
    data.formBtnOption = [
        {
            type: "primary",
            label: '提交',
            click: 'submit'
        },
        {
            type: "success",
            label: '自定义取消按钮',
            click: customMethods
        },
        {
            label: '取消',
            click: 'cancel'
        }
    ]
    setTimeout(() => {
        const lastOption = data.formOption[data.formOption.length - 1]
        lastOption.col && (lastOption.col[0].option = [
            { label: '是', value: '1' },
            { label: '否', value: '0' },
        ])
    }, 2000)
})

const submit = (formRef: any) => {
    console.log('表单提交回调', formRef)
}
const cancel = (formRef: any) => {
    console.log('表单取消回调', formRef)
}
const customMethods = (formRef: any) => {
    formRef && formRef.resetFields()
    console.log('自定义按钮回调：', formRef)
}
const { formOption, formData, formBtnOption } = toRefs(data)
</script>
<style lang="scss" scoped>
.form-box-test {
    width: 65%;
    margin: 0 auto;
    ::v-deep(.el-form-item__content) {
        margin-left: 0px !important;
    }

}
</style>
<style lang="scss">

</style>