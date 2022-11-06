<template lang="pug">
el-date-picker(
    v-if="type === 'date-picker'"
    :clearable="inputProps.clearable"
    :disabled="inputProps.disabled"
    v-model="currModelValue"
    :size="inputProps.size"
    :type="inputProps.type"
    :placeholder="inputProps.placeholder"
    :disabled-date="inputProps.disabledDate"
    :shortcuts="inputProps.shortcuts"
    :format="inputProps.format"
    :unlink-panels="inputProps.unlinkPanels"
    :range-separator="inputProps.rangeSeparator"
    :start-placeholder="inputProps.startPlaceholder"
    :end-placeholder="inputProps.endPlaceholder"
    :default-value="inputProps.defaultValue"
    :value-format="inputProps.valueFormat"
    :prefix-icon="inputProps.prefixIcon"
    :style="inputProps.style || { width: '100%'}"
    @change="inputProps.change"
    )
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { EpPropMergeType } from 'element-plus/es/utils'
import type { fromTypeTs, inputPropsTs } from '../type'
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
        type: [Number, String, Boolean, Date] as PropType<EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> | undefined>,
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
        $emit('update:modelValue', value)
    },
    get() {
        return props.modelValue
    }
})
</script>
