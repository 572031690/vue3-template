<!--
 * @Author: mjh
 * @Date: 2022-08-19 16:33:51
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 08:41:33
 * @Description:
-->
<template lang="pug">
.control-btn
    el-button(type="primary" @click="addDomain()") 增加表单
    el-button( @click="removeDomain()" ) 删除表单
.form-box
    FpiForm(
        :formOption="itemList"
        v-model="formData"
        )
</template>

<script lang="ts" setup name="FpiForm">
import { reactive } from 'vue'
import type { formItemTs } from '../type'
const data = reactive({
    itemList: [
        {
            label: '输入框',
            type: 'input',
            key: 'email',
            inputProps: {
                placeholder: '测试',
            },
            rules: [
                {
                    required: true,
                    message: 'Please input email address',
                    trigger: 'blur',
                },
                {
                    type: 'email',
                    message: 'Please input correct email address',
                    trigger: ['blur', 'change'],
                }
            ]
        },
        {
            label: '动态输入框',
            type: 'input',
            key: 'domains.0.value',
            inputProps: {
                placeholder: '测试',
            },
            rules: 'unNull'
        }
    ] as formItemTs[],
    formData: {
        email: '',
        domains: [
            {
                key: 1,
                value: '',
            }
        ]
    }

})
onMounted(() => {
    setTimeout(() => {
        data.formData.email = '25'
    }, 2000)
})
const removeDomain = () => {
    if (!data.formData.domains.length) return
    const currIndex = data.itemList.length
    data.itemList.pop()
    data.formData.domains.pop()
}

const addDomain = () => {
    data.formData.domains.push({
        key: Date.now(),
        value: '',
    })
    data.itemList.push({
        label: '动态输入框',
        type: 'input',
        key: `domains.${data.itemList.length - 1}.value`,
        inputProps: {
            placeholder: '测试',
        },
        rules: 'unNull'
    } as formItemTs)
}
const { itemList, formData } = toRefs(data)
</script>

<style lang="scss" scoped>
.form-box {
    width: 50%;
    margin: 0 auto;
}

.control-btn {
    width: fit-content;
    margin: 0 auto 15px;
}
</style>
