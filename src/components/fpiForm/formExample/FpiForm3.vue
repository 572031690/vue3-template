<template lang="pug">
.form-box
    FpiForm( 
        :formOption="itemList"
        v-model="formData"
        )
</template>

<script lang="ts" setup name="FpiForm">
import { reactive } from 'vue'
interface DomainItem {
  key: number
  value: string
}
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
        }
    ],
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

const removeDomain = (item: DomainItem) => {
  const index = data.formData.domains.indexOf(item)
  if (index !== -1) {
    data.formData.domains.splice(index, 1)
  }
}
// 替换{{}}变量
const getVal = (vm: any, expr: string) => {
    if (!expr) return vm
    const value = expr.split('.').reduce((data: any, current: any) => {
        return data[current]
    }, vm)
    return value
}
const addDomain = () => {
  data.formData.domains.push({
    key: Date.now(),
    value: '',
  })
}
const { itemList, formData } = toRefs(data)
</script>
<style lang="scss" scoped>
.form-box {
    width: 50%;
    margin: 0 auto;
}
</style>