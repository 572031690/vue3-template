import type { FormInstance } from 'element-plus'

export interface dataTs {
    form: null | Record<string, any>
    rulesData: null | Record<string, Array<Record<string, any>>>
    timer: null | NodeJS.Timeout
}
export interface inputPropsTs {
    size?: 'large' | 'default' | 'small' // 单个input的size
    clearable?: boolean // 是否可以一键清空
    disabled?: boolean // 是否警用按钮
    style?: any // 传入自定义样式
    autocomplete?: 'on' | 'off' // 原生属性 表示输入字段是否应该启用自动完成功能。
    type?: 'data' | 'password' // input内部的特殊type
    showPassword?: boolean // 是否显示密码显示隐藏控制按钮
    placeholder?: string // 输入框占位文本
}
export interface optionTs {
    // 复选 单选等的选中内容
    value: string | number
    label: string
    disabled?: boolean // 是否可以点击
}
export type fromTypeTs =
    | 'time-picker'
    | 'date-picker'
    | 'select'
    | 'num-input'
    | 'input'
    | 'checkbox'
    | 'radio'
    | 'textarea'
    | 'switch'
    | 'dom'
export interface formItemTs {
    key: string // 变量名称
    label?: string // 标题
    // 按钮类型
    type?: fromTypeTs // 自定义dom类
    value?: any // 默认值
    slot: boolean //是否使用插槽
    vHtml?: () => string //（是col的内部嵌套  ）  自定义dom内容 当key不传的时候使用
    col?: formItemTs[] // 内部嵌套 对应element的col组件
    span?: number //（是col的内部嵌套  ） 对应传的数组代表占整行的百分比 24是100% 12是50% 以此类推
    defaultSelect?: number // select类型 默认选中的索引
    rules?: string | Array<Record<string, any>> // 规则校验
    itemRules: Array<Record<string, any>> // form item单独设置的rules
    option?: Array<optionTs>
    inputProps?: inputPropsTs
}

export interface fpiFormTs {
    getForm: () => FormInstance
    getFormData: () => Record<string, any>
}
