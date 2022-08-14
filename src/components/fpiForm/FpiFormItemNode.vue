<template lang="pug">
el-form-item(
    :prop="formItem.key" 
    :rules="formItem.itemRules"
    :label="formItem.label")
    component(
        :formItem="formItem.inputProps"
        :type="formItem.type"
        :option="formItem.option"
        v-model="currModelValue"
        :is='currInputType(formItem.type)' 
        v-if="formItem.type && !formItem.slot") 
    slot(name="col")
    slot(:name="formItem.key" v-if="formItem.slot"  :formItem="formItem")
</template>

<script lang="ts" setup>
import FpiInputNode from './components'
import type { formItemTs } from './type'
import type { PropType } from 'vue'

const props = defineProps({
    /**
     * @desc 表单配置项
     * @abstract 
     */
    formItem: {
        type: Object as PropType<formItemTs>,
        default: () => {
            return []
        }
    },
    /**
     * @desc 对应vModel值
     */
    modelValue: {
        type: [Number,String,Boolean,Array],
        default: ''
    }
})
/**
 * @desc form回调函数
 */
const $emit = defineEmits([
    'update:modelValue',
    'upDataValue'
])
const currModelValue = computed({
    set(value) {
        $emit('update:modelValue', value)
        $emit('upDataValue', props.formItem.key, value)
    },
    get() {
        return props.modelValue
    }
})

const currInputType = computed(() => (type: string) => {
    if(type === 'num-input') type = 'input'
    return FpiInputNode[type]
})
</script>