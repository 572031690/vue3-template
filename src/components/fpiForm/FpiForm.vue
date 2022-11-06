<template lang="pug">
.fpi-form(v-if="form && rulesData")
    el-form(
        ref="fpiForm"
        :model="form"
        :label-width="labelWidth"
        :label-position="labelPosition"
        :rules="rulesData || {}"
        :inline="inline"
        :status-icon="statusIcon"
        :size="size"
        :label-suffix="labelSuffix"
        :hide-required-asterisk="hideRequiredAsterisk"
        :show-message="showMessage"
        :validate-on-rule-change="validateOnRuleChange"
        :inline-message="inlineMessage"
        :scroll-to-error="scrollToError"
        :disabled="disabled"
        )
        FpiFormItemNode(
                v-for="(item, index) in formOption"
                :key="index"
                :formItem="item"
                @upDataValue="upDataValue"
                v-model="form"
            )
            template(v-if="item.slot" v-slot:[item.key]="{ formItem }" )
                slot(:name="formItem.key"  :formItem="formItem")
            template(v-if="item.labelSlot" v-slot:[getSlotLabelKey(item.key)]="{ formItem }" )
                slot(:name="item.key + '-label'"  :formItem="formItem")
            template(v-slot:col v-if="!item.type && item.col" )
                el-row( :gutter="item.gutter || 0" style="width: 100%;")
                    el-col(
                        v-for="colItem, colIndex in item.col"
                        :key="colIndex"
                        :span="colItem.span"
                        )
                        div.html-dom(v-html="colItem.vHtml && colItem.vHtml()" v-if="colItem.type === 'dom'")
                        FpiFormItemNode(
                            v-if="colItem.type !== 'dom'"
                            :formItem="colItem"
                            v-model="form"
                            @upDataValue="upDataValue"
                            )
                            template(v-if="item.slot" v-slot:[item.key]="{ formItem }" )
                                slot(:name="formItem.key"   :formItem="formItem")
    el-form-item(:style="{ 'margin-left': labelWidth }")
        div(:style="btnBoxStyle")
            el-button( v-for="(item, index) in formBtnOption" :key="index" :type="item.type" @click="btnMethodsControl(item.click)") {{item.label}}
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import equal from 'fast-deep-equal'
import type { ValidateFieldsError } from 'async-validator'
import type { Arrayable } from 'element-plus/es/utils'
import type { FormInstance, FormItemProp } from 'element-plus'
import type { PropType } from 'vue'
import type { btnOptionTs, dataTs, formItemTs, staticRulesKeyTs } from './type'
import { DataType, getDeepObj } from '@/utils/tools'
const props = defineProps({
    /**
     * @desc 表单配置项
     * @abstract
     */
    formOption: {
        type: Array as PropType<Array<formItemTs>>,
        default: () => {
            return []
        }
    },
    /**
     * @desc 表单按钮配置项
     * @abstract
     */
    formBtnOption: {
        type: Array as PropType<Array<btnOptionTs>>,
        default: () => {
            return [
                {
                    type: 'primary',
                    label: '提交',
                    click: 'submit'
                },
                {
                    label: '取消',
                    click: 'cancel'
                }
            ]
        }
    },
    /**
     * @desc 按钮盒子样式
     * @abstract
     */
    btnBoxStyle: {
        type: Object,
        default: undefined
    },
    /**
     * @desc 表单v-model 对象
     * @abstract
     */
    modelValue: {
        type: Object as PropType<Record<string, any>>,
        default: () => {
            return null
        }
    },
    /**
     * @desc  行内表单模式
     */
    inline: {
        type: Boolean,
        default: false
    },
    /**
     * @desc  表单域标签的位置
     * @abstract 当设置为 left 或 right 时，则也需要设置 label-width 属性
     */
    labelPosition: {
        type: String as PropType<'left' | 'right' | 'top'>,
        default: 'right'
    },
    /**
     * @desc  标签的长度
     * @abstract 例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。
     */
    labelWidth: {
        type: String,
        default: '120px'
    },
    /**
     * @desc  表单域标签的后缀
     */
    labelSuffix: {
        type: String,
        default: ''
    },
    /**
     * @desc  是否显示必填字段的标签旁边的红色星号
     */
    hideRequiredAsterisk: {
        type: Boolean,
        default: false
    },
    /**
     * @desc  是否显示校验错误信息
     */
    showMessage: {
        type: Boolean,
        default: true
    },
    /**
     * @desc  是否以行内形式展示校验信息
     */
    inlineMessage: {
        type: Boolean,
        default: false
    },
    /**
     * @desc  当校验失败时，滚动到第一个错误表单项
     */
    scrollToError: {
        type: Boolean,
        default: false
    },
    /**
     * @desc  为输入框添加了表示校验结果的反馈图标。
     */
    statusIcon: {
        type: Boolean,
        default: false
    },
    /**
     * @desc  是否在 rules 属性改变后立即触发一次验证
     */
    validateOnRuleChange: {
        type: Boolean,
        default: true
    },
    /**
     * @desc  表单尺寸
     */
    size: {
        type: String as PropType<'large' | 'default' | 'small'>,
        default: undefined
    },
    /**
     * @desc  是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性。
     */
    disabled: {
        type: Boolean,
        default: false
    }
})
const $emit = defineEmits([
    'update:modelValue',
    'submit', // 表单提交默认方法
    'cancel' // 表单取消默认方法
])
// 基础rules
const staticRules: Record<staticRulesKeyTs, Record<string, any>> = {
    unNull: { required: true, message: '不能为空', trigger: 'blur' },
    number: { type: 'number', message: '请输入数字值', trigger: 'change' },
    phone: { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' },
    checkbox: { type: 'array', required: true, message: '请至少选择一项', trigger: 'blur' },
    select: { required: true, message: '请选择', trigger: 'blur' },
    date: { required: true, message: '请选择时间', trigger: 'blur' },
    email: { type: 'email', required: true, message: '请输入正确的邮箱格式', trigger: 'blur' },
}
const data: dataTs = reactive({
    form: null, // form 表格对象数据
    rulesData: null, // rules对象
    timer: null, // 定时器防抖
})
// form dom
const fpiForm = ref<FormInstance>()

const getSlotLabelKey = (key: string | undefined) => {
    return `${key}-label`
}

/**
 * @desc 监听modelValue表格变化
 */
watch(
    () => props.modelValue,
    (val) => {
        if (!equal(data.form, val))
            data.form = cloneDeep(val)
    },
    { deep: true }
)
/**
 * @desc 监听formOption配置项变化
 * @desc
 * @returns initForm 初始化表格
 */
watch(
    () => props.formOption,
    () => {
        initForm()
        // 防止因为配置项变化导致促发表单校验
        setTimeout(() => {
            fpiForm.value && fpiForm.value.clearValidate()
        })
    },
    { deep: true }
)

/**
 * @desc  初始化表格
 * @abstract 初始化form变量以及rules对象
 * @param isFirst 是否是初始化
 */
const initForm = (isFirst?: boolean) => {
    if (!data.form || DataType(data.form) !== 'object')
        return
    const currFrom: Record<string, any> = data.form
    const { formOption } = props
    const currRules: Record<string, formItemTs['rules']> = {}
    formOption.forEach((item) => {
        if (item.col) {
            item.col.forEach((element: formItemTs) => {
                initParams(currFrom, currRules, element, isFirst)
            })
        }
        else {
            initParams(currFrom, currRules, item, isFirst)
        }
    })
    data.rulesData = currRules as Record<string, formItemTs['rules']>
    isFirst && $emit('update:modelValue', currFrom)
}

const initParams = (currFrom: Record<string, any>, currRules: Record<string, formItemTs['rules']>, item: formItemTs, isFirst: boolean | undefined) => {
    // 生成v-model对象
    (item.key && 'value' in item && isFirst) && (currFrom[item.key] = item.value) // 利用浅拷贝
    if (item.type === 'select' && item.defaultSelect !== undefined && item.option && item.option.length >= item.defaultSelect + 1) {
        const value = item.option[item.defaultSelect].value
        currFrom[item.key] = value
    }
    // rules配置
    item.key && (currRules[item.key] = getStaticRules(item.rules, item.type))
}
/**
 * @desc  获取相应的rules
 * @param rules 可以是由基础rules名称组成的字符串 如 unNull,number
 * @param rules 也可以是自己定义的rules数组
 * @param rules 也可以不传 不传则会绑定默认的不为空rules
 */
const getStaticRules = (rules: formItemTs['rules'], type: string | undefined) => {
    if (typeof rules === 'string') {
        const rulesArr: staticRulesKeyTs[] = rules.split(',')
        const returnRules: Array<Record<string, any>> = []
        rulesArr.forEach((item) => {
            staticRules[item] && returnRules.push(staticRules[item])
        })
        return returnRules
    }
    else { return rules }
}
/**
 * @desc 表单按钮点击控制
 * @param clickKey string 内置方法  function 自定义方法
 */
const btnMethodsControl = (clickKey: 'submit' | 'cancel' | ((form: FormInstance | undefined) => any) | undefined) => {
    if (typeof clickKey === 'string') {
        clickKey === 'submit' && submitForm()
        clickKey === 'cancel' && cancel()
    }
    else { clickKey && clickKey(fpiForm.value) }
}
/**
 * @desc  form表单对象跟新事件
 * @returns fpiFrom dom节点
 */
const upDataValue = (key: string, value: any) => {
    data.form && getDeepObj(data.form, key, value)
    $emit('update:modelValue', data.form)
}
/**
 * @desc  表单提交
 * @param formRef form的dom节点
 * @returns true/false   表单验证通过/表单验证失败
 */
const submitForm = () => {
    const formRef = fpiForm.value
    formRef && formRef.validate((valid: boolean) => {
        if (valid) {
            console.log('提交成功：', data.form)
            $emit('submit')
        }
        else {
            console.log('error submit!!')
        }
    })
}
/**
 * @desc  表单重置
 * @param formRef form的dom节点
 * @abstract 将表单恢复为默认值
 */
const cancel = () => {
    const formRef = fpiForm.value
    formRef && formRef.resetFields()
    $emit('update:modelValue', data.form)
    $emit('cancel')
    console.log('重置成功：', data.form)
}
/**
 * @desc  获取表单obj变量 <Expose>
 * @returns Form Object
 */
const getFormData = () => {
    return data.form
}
/**
 * @desc  对整个表单的内容进行验证。<Expose>
 * @returns 接收一个回调函数，或返回 Promise。
 */
const validate = (callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => {
    return fpiForm.value && fpiForm.value.validate(callback)
}
/**
 * @desc  验证具体的某个字段。<Expose>
 * @param props string|string[]
 * @callback
 * @returns 接收一个回调函数，或返回 Promise。
 */
const validateField = (props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => {
    return fpiForm.value && fpiForm.value.validateField(props, callback)
}
/**
 * @desc  重置该表单项，将其值重置为初始值，并移除校验结果。<Expose>
 * @param props string|string[]
 * @param props 不传则整个表格重置
 */
const resetFields = (props?: Arrayable<FormItemProp>) => {
    fpiForm.value && fpiForm.value.resetFields(props)
}
/**
 * @desc  滚动到指定的字段。<Expose>
 * @param props string|string[]
 */
const scrollToField = (prop: FormItemProp) => {
    fpiForm.value && fpiForm.value.scrollToField(prop)
}
/**
 * @desc  清理某个字段的表单验证信息。<Expose>
 * @param props string|string[]
 * @param props 不传则整个表格清理
 */
const clearValidate = (props?: Arrayable<FormItemProp>) => {
    fpiForm.value && fpiForm.value.clearValidate(props)
}
/**
 * @desc  获取表单obj变量 <Expose>
 * @returns fpiFrom dom节点
 */
const getForm = () => {
    return fpiForm.value
}

data.form = cloneDeep(props.modelValue)
initForm(true)
const { form, rulesData } = toRefs(data)

defineExpose({
    getFormData, // 获取表单obj变量
    getForm, // 获取 form dom
    validate, // 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
    validateField, // 验证具体的某个字段。
    resetFields, // 重置该表单项，将其值重置为初始值，并移除校验结果。
    scrollToField, // 滚动到指定的字段
    clearValidate // 清理某个字段的表单验证信息
})
</script>

<style lang="scss" scoped>
.fpi-form {
    width: 100%;
}
</style>
