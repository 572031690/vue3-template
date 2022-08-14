<template lang="pug">
el-input(
    :size="formItem.size" 
    :disabled="formItem.disabled"
    :clearable="formItem.clearable"
    :type="formItem.type"
    :autocomplete="formItem.autocomplete"
    v-model="currModelValue" 
    :show-password="formItem.showPassword"
    :placeholder="formItem.placeholder")
       
</template>

<script lang="ts" setup>
import type { inputPropsTs, fromTypeTs } from '../type'
import type { PropType } from 'vue'
import type { EpPropMergeType } from 'element-plus/es/utils'
const props = defineProps({
    /**
     * @desc 表单配置项
     * @abstract 
     */
    formItem: {
        type: Object as PropType<inputPropsTs>,
        default: () => {
            return {}
        }
    },
    /**
     * @desc 对应vModel值
     */
    modelValue: {
        type: [Number, String] as PropType<EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> | undefined>,
        default: ''
    },
    /**
     * @desc 对应表格type
     */
    type: {
        type: String as PropType<fromTypeTs>,
        default: ''
    }
})
/**
 * @desc form回调函数
 */
const $emit = defineEmits([
    'update:modelValue'
])
const currModelValue = computed({
    set(value) {
        if (props.type === 'num-input') {
            const num = parseFloat(value as string)
            if (Object.is(num, NaN))
                value = null
            else value = num
        }
        $emit('update:modelValue', value)
    },
    get() {
        return props.modelValue
    }
})
</script>