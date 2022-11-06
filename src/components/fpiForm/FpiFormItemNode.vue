<template lang="pug">
.line-box(v-if="formItem.isLine")
    .line-title(:style="formItem.lineLabelStyle") {{formItem.lineLabel}}
    .line-body(:style="formItem.lineStyle")
el-form-item(
    v-else
    :prop="formItem.key"
    :rules="formItem.itemRules"
    :required="formItem.required"
    :label-width="formItem.labelWidth"
    :size="formItem.size || 'default'"
    :error="formItem.error"
    :inline-message="formItem.inlineMessage"
    :show-message="formItem.showMessage"
    :label="formItem.label")
    .form-item-input-box(:style="{ width: formItem.inputWidth || '100%' }" v-if="!formItem.slot && !formItem.col")
        component(
        :inputProps="formItem.inputProps"
        :type="formItem.type"
        :option="formItem.option"
        v-model="currModelValue"
        :is='currInputType(formItem.type)'
        v-if="formItem.type && !formItem.slot")
    template(#label v-if="formItem.labelSlot")
        slot(:name="formItem.key + '-label'" )
            span {{ formItem.label }}
    slot(name="col")
    slot(:name="formItem.key" v-if="formItem.slot"  :formItem="formItem")
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import FpiInputNode from './components'
import type { formItemTs } from './type'
import { getVal } from '@/utils/tools'

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
        type: Object as PropType<Record<string, any>>,
        default: () => {
            return {}
        }
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
        // $emit('update:modelValue', value)
        $emit('upDataValue', props.formItem.key, value)
    },
    get() {
        const key = props.formItem.key
        return getVal(props.modelValue, key)
    }
})

const currInputType = computed(() => (type: string) => {
    if (type === 'num-input')
        type = 'input'
    return FpiInputNode[type]
})
</script>

<style scoped lang="scss">
.line-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 12px;

    .line-title {
        font-family: PingFangSC;
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
        color: #0084ff;
        letter-spacing: 0;
    }

    .line-body {
        width: 90%;
        height: 1px;
        background: #0084ff;
    }
}
</style>

<style lang="scss">
.el-col {
    .form-item-input-box {
        .el-date-editor {
            width: 100%;
        }
    }
}
</style>
