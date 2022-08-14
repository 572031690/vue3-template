<template lang="pug">
el-time-picker(
        :clearable="formItem.clearable"
        :disabled="formItem.disabled"
        v-model="currModelValue"
        :placeholder="formItem.placeholder"
        :style="!formItem.style ? formItem.style: {...formItem.style, width: '100%'}")
       
</template>

<script lang="ts" setup>
import type { inputPropsTs, fromTypeTs, optionTs } from '../type'
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
    },
    /**
     * @desc 表单选择配置数组
     */
    option: {
        type: Array as PropType<Array<optionTs>>,
        default: () => {
            return []
        }
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
        $emit('update:modelValue', value)
    },
    get() {
        return props.modelValue
    }
})
</script>