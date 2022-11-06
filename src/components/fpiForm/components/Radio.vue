<template lang="pug">
el-radio-group(
    :size="inputProps.size"
    v-model="currModelValue")
    template( v-if="inputProps.type === 'button'")
        el-radio-button(
            v-for="selItem, ind in option || []"
            :label="selItem.value"
            :disabled="selItem.disabled"
            :size="inputProps.size"
        ) {{ selItem.label}}
    template( v-else)
        el-radio(
            v-for="selItem, ind in option || []"
            :label="selItem.value"
            :disabled="selItem.disabled"
            :size="inputProps.size"
            :border="selItem.border"
            :key="ind") {{ selItem.label}}
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
        type: [Number, String, Boolean] as PropType<EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> | undefined>,
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
