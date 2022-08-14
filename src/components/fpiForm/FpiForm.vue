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
        :disabled="disabled"
        )
        FpiFormItemNode(
            v-for="(item, index) in formOption" 
            :key="index" 
            :formItem="item"
            @upDataValue="upDataValue"
            v-model="form[item.key]"
            )
            template(v-if="item.slot" v-slot:[item.key]="{ formItem }" )
                slot(:name="formItem.key"   :formItem="formItem")
            template(v-slot:col v-if="!item.type && item.col" )
                el-col(
                    v-for="colItem, colIndex in item.col" 
                    :key="colIndex"
                    :span="colItem.span"
                    )
                    div.html-dom(v-html="colItem.vHtml && colItem.vHtml()" v-if="colItem.type === 'dom'")
                    FpiFormItemNode(
                        v-if="colItem.type !== 'dom'"
                        :formItem="colItem" 
                        v-model="form[colItem.key]"
                        @upDataValue="upDataValue"
                        )
                        template(v-if="item.slot" v-slot:[item.key]="{ formItem }" )
                            slot(:name="formItem.key"   :formItem="formItem")
    el-form-item(:style="{ 'margin-left': labelWidth }")
        el-button( type="primary" @click="submitForm(fpiForm)") Create
        el-button(@click="cancel(fpiForm)") Cancel 
</template>

<script lang="ts" setup>
import { DataType, getVal } from '@/utils/tools'
import { cloneDeep } from 'lodash-es'
import type { dataTs, formItemTs, } from './type'
import type { ValidateFieldsError } from 'async-validator'
import type { Arrayable } from 'element-plus/es/utils'
import type { FormInstance, FormItemProp } from 'element-plus'
import type { PropType } from 'vue'
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
const staticRules: Record<string, Record<string, any>> = {
    unNull: { required: true, message: '不能为空', trigger: 'blur' },
    number: { type: 'number', message: '请输入数字值', trigger: 'change' },
    phone: { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' },
    checkbox: { type: 'array', required: true, message: '请至少选择一项', trigger: 'blur' },
    select: { required: true, message: '请选择', trigger: 'blur' },
    date: { required: true, message: '请选择时间', trigger: 'blur' },
    email: { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
}
const $emit = defineEmits(['update:modelValue'])
const data: dataTs = reactive({
    form: null, // form 表格对象数据
    rulesData: null, // rules对象
    timer: null, // 定时器防抖
    formss: {
        a: {
            c: 25
        }
    }
})
// form dom
const fpiForm = ref<FormInstance>()

/**
 * @desc 监听modelValue表格变化
 */
watch(
    () => props.modelValue,
    () => {
        if (data.timer) return
        data.timer = setTimeout(() => {
            data.timer = null
            data.form = cloneDeep(props.modelValue)
        }, 500)
    },
    { deep: true }
)

const getDeepObj = (obj: Record<string, any>, key: string, val: string | number) => {
    const keyArr = key.split('.')
    keyArr.reduce((data: any, current: any, arr) => {
        // if(arr === keyArr.length - 1) data[current] = val
        return data[current]
    }, obj)
}
// getDeepObj(data.formss, 'a.c',88)
// console.log(data.formss, 'sss') // 1


/**
 * @desc 监听formOption配置项变化
 * @returns initForm 初始化表格
 */
watch(
    () => props.formOption,
    () => {
        console.log('watch-formOption')
        initForm()
    },
    { deep: true }
)
/**
 * @desc  初始化表格
 * @abstract 初始化form变量以及rules对象
 */
const initForm = (isFirst?: boolean) => {
    if (!data.form || DataType(data.form) !== 'object') return
    const currFrom: Record<string, any> = data.form
    const { formOption } = props
    // const currFrom: Record<string, any> = cloneDeep(formData)
    const currRules: Record<string, Array<Record<string, any>>> = {}
    formOption.forEach((item) => {
        if (item.col) {
            item.col.forEach((element: formItemTs) => {
                // 生成v-model对象
                (element.key && 'value' in element && isFirst) && (currFrom[element.key] = element.value)
                if (element.type === 'select') {
                    element.defaultSelect !== undefined
                        && (currFrom[element.key] =
                            element.option
                            && element.option.length >= element.defaultSelect + 1
                            && element.option[element.defaultSelect].value)
                }
                // rules配置
                element.key && (currRules[element.key] = getStaticRules(element.rules, element.type))
            })
        } else {
            // 生成v-model对象
            (item.key && 'value' in item && isFirst) && (currFrom[item.key] = item.value)
            if (item.type === 'select') {
                item.defaultSelect !== undefined
                    && (currFrom[item.key] =
                        item.option
                        && item.option.length >= item.defaultSelect + 1
                        && item.option[item.defaultSelect].value)
            }
            // rules配置
            item.key && (currRules[item.key] = getStaticRules(item.rules, item.type))
        }

    })
    data.rulesData = currRules
    isFirst && $emit('update:modelValue', data.form)
    console.log(data.rulesData, data.form, 'rulesData, form')
}
/**
 * @desc  获取默认值
 * @param type 输入框类型
 */
const getDefaultData = (type: string | undefined) => {
    switch (type) {
        case 'checkbox':
            return []
        default:
            return null
    }
}
/**
 * @desc  获取相应的rules
 * @param rules 可以是由基础rules名称组成的字符串 如 unNull,number
 * @param rules 也可以是自己定义的rules数组
 * @param rules 也可以不传 不传则会绑定默认的不为空rules
 */
const getStaticRules = (rules: string | Record<string, any>[] | undefined, type: string | undefined) => {
    if (!rules) {
        switch (type) {
            case 'checkbox':
                return [staticRules.checkbox]
            case 'select':
            case 'radio':
                return [staticRules.select]
            case 'date-picker':
            case 'time-picker':
                return [staticRules.date]
            default:
                return [staticRules.unNull]
        }
    } else if (typeof rules === 'string') {
        const rulesArr = rules.split(',')
        const returnRules: Array<Record<string, any>> = []
        rulesArr.forEach((item: string) => {
            staticRules[item] && returnRules.push(staticRules[item])
        })
        return returnRules
    } else return rules
}
/**
 * @desc  表单提交
 * @param formRef form的dom节点
 * @returns true/false   表单验证通过/表单验证失败
 */
const submitForm = (formRef: FormInstance | undefined) => {
    formRef && formRef.validate((valid: boolean) => {
        if (valid) {
            console.log('提交成功：', data.form)
            return data.form
        } else {
            console.log('error submit!!')
            return false
        }
    })
}
/**
 * @desc  表单重置
 * @param formRef form的dom节点
 * @abstract 将表单恢复为默认值
 */
const cancel = (formRef: FormInstance | undefined) => {
    formRef && formRef.resetFields()
    $emit('update:modelValue', data.form)
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

const upDataValue = (key: string, value: any) => {
    console.log(key, value,'value')
    data.form && (data.form[key] = value)
    $emit('update:modelValue', data.form)
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
