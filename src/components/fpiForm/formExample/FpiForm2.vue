<!--
 * @Author: mjh
 * @Date: 2022-08-19 09:31:37
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 08:47:37
 * @Description:
-->
<template lang="pug">
.form-box
    FpiForm(
        ref="ruleFormRef"
        :formOption="itemList"
        v-model="formData"
        status-icon
        )
</template>

<script lang="ts" setup name="FpiForm">
import type { formItemTs, fpiFormTs } from '@/components/fpiForm/type'

const ruleFormRef: any = ref<fpiFormTs>()
const checkAge = (rule: any, value: any, callback: any) => {
    if (!value)
        return callback(new Error('Please input the age'))

    setTimeout(() => {
        if (!Number.isInteger(value))
            callback(new Error('Please input digits'))

        else if (value < 18)
            callback(new Error('Age must be greater than 18'))

        else
            callback()
    }, 1000)
}
const validatePass = (rule: any, value: any, callback: any) => {
    if (!ruleFormRef.value) return
    if (value === '') {
        callback(new Error('Please input the password'))
    }
    else {
        if (data.formData.checkPass !== '')
            ruleFormRef.value.validateField('checkPass', () => null)

        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (!ruleFormRef.value) return
    if (value === '')
        callback(new Error('Please input the password again'))

    else if (value !== data.formData.pass)
        callback(new Error('Two inputs don\'t match!'))

    else
        callback()
}
const data = reactive({
    itemList: [
        {
            label: '第一次输入密码',
            type: 'input',
            key: 'pass',
            rules: [{ validator: validatePass, trigger: 'blur' }] as const,
            inputProps: {
                type: 'password',
                autocomplete: 'off'
            }
        },
        {
            label: '第二次输入密码',
            type: 'input' as const,
            key: 'checkPass',
            rules: [{ validator: validatePass2, trigger: 'blur' }],
            inputProps: {
                type: 'password',
                autocomplete: 'off'
            }
        },
        {
            label: 'age年龄',
            type: 'num-input' as const,
            key: 'age',
            rules: [{ validator: checkAge, trigger: 'blur' }],
        }
    ] as formItemTs[],
    formData: {
        pass: '',
        checkPass: '',
        age: ''
    }
})

const { itemList, formData } = toRefs(data)
</script>

<style lang="scss" scoped>
.form-box {
    width: 50%;
    margin: 0 auto;
}
</style>
