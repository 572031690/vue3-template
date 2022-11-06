<template lang="pug">
el-select(
        :clearable="inputProps.clearable"
        :disabled="inputProps.disabled"
        v-model="currModelValue"
        :size="inputProps.size"
        :multiple="inputProps.multiple"
        :collapse-tags="inputProps.collapseTags"
        :collapse-tags-tooltip="inputProps.collapseTagsTooltip"
        :filterable="inputProps.filterable"
        :placeholder="inputProps.placeholder"
        @change="inputProps.change"
        )
        el-option(
            v-for="selItem, ind in option || []"
            :label="selItem.label"
            :value="selItem.value"
            :disabled="selItem.disabled"
            :key="ind")
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
