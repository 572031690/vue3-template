<template lang="pug">
el-checkbox-group(
        v-model="currModelValue")
        el-checkbox(
            v-for="selItem, ind in option || []" 
            :label="selItem.value"
            :disabled="selItem.disabled"
            :key="ind") {{ selItem.label}}
       
</template>

<script lang="ts" setup>
import type { inputPropsTs, fromTypeTs, optionTs } from '../type'
import type { PropType } from 'vue'
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
        type: Array as PropType<Array<any>>,
        default: () => {
            return []
        }
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