<template lang="pug">
el-switch(
        v-if="type === 'switch'"
        :size="inputProps.size"
        :style="inputProps.style"
        :disabled="inputProps.disabled"
        :active-text="inputProps.activeText"
        :inactive-text="inputProps.inactiveText"
        :inline-prompt="inputProps.inlinePrompt"
        :active-icon="inputProps.activeIcon"
        :inactive-icon="inputProps.inactiveIcon"
        :active-value="inputProps.activeValue"
        :inactive-value="inputProps.inactiveValue"
        @change="inputProps.change"
        v-model="currModelValue")
</template>

<script lang="ts" setup>
import type { PropType, WritableComputedRef } from 'vue'
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
const currModelValue: WritableComputedRef<EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> | undefined> = computed({
    set(value) {
        console.log(value, 'value')
        $emit('update:modelValue', value)
    },
    get() {
        return props.modelValue
    }
})
</script>
