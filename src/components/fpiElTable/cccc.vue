<!--
 * @Author: mjh
 * @Date: 2022-11-03 20:00:30
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-06 09:30:13
 * @Description:
-->
<template lang="pug">
vn
</template>

<script lang="ts" setup name="FpiTableAll">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { defineComponent, h, useSlots } from 'vue'
import type { tableColumnTs } from '@/components/fpiElTable/types'
import * as request from '@/service/apis/public'
const props = defineProps({
    mgs: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['changeSS'])
const slots = useSlots()
const vn = defineComponent({
    render() {
        return h(
            'div',
            {
                class: 'sss'
            },
            [
                slots.default ? slots.default(12) : 'ss',
                slots.value ? slots.value() : 'ss',
                props.mgs
            ]
        )
    }
})
console.log(this, 'this')
setTimeout(() => {
    emit('changeSS', 'value')
}, 1000)
</script>

