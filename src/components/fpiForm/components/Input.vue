<template lang="pug">
el-input(
    ref="inputDom"
    :type="inputProps.type"
    v-model="currModelValue"
    :maxlength="inputProps.maxlength"
    :minlength="inputProps.minlength"
    :show-word-limit="inputProps.showWordLimit"
    :placeholder="inputProps.placeholder"
    :clearable="inputProps.clearable"
    :show-password="inputProps.showPassword"
    :disabled="inputProps.disabled"
    :size="inputProps.size"
    :prefix-icon="inputProps.prefixIcon"
    :suffix-icon="inputProps.suffixIcon"
    :rows="inputProps.rows"
    :readonly="inputProps.readonly"
    :autocomplete="inputProps.autocomplete"
    :input-style="inputProps.inputStyle"
    :max="inputProps.max"
    @change="inputProps.change"
    @input="inputProps.input"
    @clear="inputProps.clear"
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
        type: [Number, String, Boolean] as PropType<EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> | undefined>,
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
const inputDom = ref()
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
onMounted(() => {
    if (props.inputProps.isFocus)
        inputDom.value && inputDom.value.focus()
})
</script>
