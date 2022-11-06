<template lang="pug">
el-time-picker(
        :clearable="inputProps.clearable"
        :size="inputProps.size"
        :disabled="inputProps.disabled"
        v-model="currModelValue"
        :placeholder="inputProps.placeholder"
        :range-separator="inputProps.rangeSeparator"
        :is-range="inputProps.isRange"
        :start-placeholder="inputProps.startPlaceholder"
        :end-placeholder="inputProps.endPlaceholder"
        @change="inputProps.change"
        :style="!inputProps.style ? inputProps.style: {...inputProps.style, width: '100%'}")
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { EpPropMergeType } from 'element-plus/es/utils'
import type { fromTypeTs, inputPropsTs, optionTs } from '../type'
const props = defineProps({
    /**
     * @desc 表单配置项
     * @abstract
     */
    inputProps: {
        type: Object as PropType<inputPropsTs>,
        default: () => {
            return {}
        }
    },
    /**
     * @desc 对应vModel值
     */
    modelValue: {
        type: [Number, String, Date] as PropType<EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> | undefined>,
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
