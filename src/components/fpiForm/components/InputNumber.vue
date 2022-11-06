<template lang="pug">
el-input-number(
    v-if="type === 'input-number'"
    :size="inputProps.size"
    :min="inputProps.min"
    :max="inputProps.max"
    :disabled="inputProps.disabled"
    :placeholder="inputProps.placeholder"
    :step="inputProps.step"
    :step-strictly="inputProps.stepStrictly"
    :precision="inputProps.precision"
    :controls-position="inputProps.controlsPosition"
    @change="inputProps.change"
    v-model="currModelValue")
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
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
        type: [Number, String, Boolean],
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
