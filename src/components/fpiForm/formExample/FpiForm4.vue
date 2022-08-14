<template lang="pug">
.form-box
    RemderTest(:formItem="itemList[0]" v-model="formData.email")
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
            size: 'small',
            key: 'input1',
            placeholder: '测试',
            value: '15',
            disabled: true,
            rules: 'unNull'
            // rules: [
            //     {
            //         required: true,
            //         message: 'Please input email address',
            //         trigger: 'blur',
            //     },
            //     {
            //         type: 'email',
            //         message: 'Please input correct email address',
            //         trigger: ['blur', 'change'],
            //     }
            // ]
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

setTimeout(() => {
    data.formData.email = '1534'
},2000)
const { itemList, formData } = toRefs(data)
</script>
<style lang="scss" scoped>
.form-box {
    width: 50%;
    margin: 0 auto;
}
</style>