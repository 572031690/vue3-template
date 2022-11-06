import type { FormInstance } from 'element-plus'

export interface dataTs {
    form: null | Record<string, any>
    rulesData: null | Record<string, formItemTs['rules']>
    timer: null | NodeJS.Timeout
}
export interface inputPropsTs {
    size?: 'large' | 'default' | 'small' // 单个input的size
    maxlength: string | number // 最大输入长度
    minlength: number // 最小输入长度
    showWordLimit: boolean // 默认false 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
    clearable?: boolean // 是否可以一键清空
    disabled?: boolean // 是否警用按钮
    style?: any // 传入自定义样式 // switch 可以使用 --el-switch-on-color 属性与 --el-switch-off-color 属性来设置开关的背景色。
    prefixIcon: string | any // 自定义前缀图标
    suffixIcon: string | any // 自定义后缀图标
    readonly: boolean // 原生  readonly 属性，是否只读
    rows: number // 输入框行数，仅 type 为 'textarea' 时有效
    inputStyle?: Record<string, any> // input 元素或 textarea 元素的 style     object
    autocomplete?: 'on' | 'off' // 原生属性 表示输入字段是否应该启用自动完成功能。
    type?: 'data' | 'password' | 'button' // input内部的特殊type  button为特殊是checkbox的button模式
    showPassword?: boolean // 是否显示密码显示隐藏控制按钮
    placeholder?: string // 输入框占位文本
    min?: number // 设置计数器允许的最小值
    max?: number // 设置计数器允许的最大值 | 原生 max 属性，设置最大值
    step?: number // 计数器步长
    stepStrictly?: boolean // 是否只能输入 step 的倍数
    precision?: number // 数值精度
    controlsPosition?: 'right' // 控制按钮位置
    disabledDate: (value1: Date, value2?: Date) => boolean // 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。
    shortcuts: { text: string; value: Date | (() => Date) }[] // 设置快捷选项，需要传入数组对象
    format: string // 显示在输入框中的格式
    unlinkPanels: boolean // 在范围选择器里取消两个日期面板之间的联动
    rangeSeparator: string // 选择范围时的分隔符
    startPlaceholder: string // 范围选择时开始日期的占位内容
    endPlaceholder: string // 范围选择时结束日期的占位内容
    defaultValue: Date | Date[] // 默认时间
    valueFormat: string // 可选，绑定值的格式。 不指定则绑定值为 Date 对象
    multiple: boolean // 是否多选
    collapseTags: boolean // 多选时是否将选中值按文字的形式展示
    collapseTagsTooltip: boolean // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
    filterable: boolean // Select 组件是否可筛选
    activeText: string // switch 选中文字
    inactiveText: string // switch 没选择文字
    inlinePrompt: boolean // switch文字是否在内部
    activeIcon: any // switch 自定义图标
    inactiveIcon: any // switch 自定义图标
    activeValue: string | boolean | number // 自定义选择值 switch
    inactiveValue: string | boolean | number // 自定义不选择值 switch
    isRange: boolean // el-time-picker 是否选择时间段
    isFocus: boolean // 是否默认选择 只对 input num-input 有效
    // 方法
    change: (value: string | number) => any // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发
    input: (value: string | number) => any // 在 Input 值改变时触发
    clear: () => any // 在点击由 clearable 属性生成的清空按钮时触发
}

export interface optionTs {
    // 复选 单选等的选中内容
    value: string | number | boolean
    label: string
    disabled?: boolean // 是否可以点击
    indeterminate?: boolean // 设置 indeterminate 状态，只负责样式控制
    checked?: boolean // 当前是否勾选
    border?: boolean // 是否显示边框
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
    | 'input-number'
export interface formItemTs {
    // ************* element Form Item原生属性 key对应prop  *******************
    key: string // 变量名称
    label?: string // 标题
    labelWidth?: string | number //  标签宽度，例如 '50px'。 可以使用 auto。
    required?: boolean // 是否为必填项，如不设置，则会根据校验规则确认
    rules?: staticRulesKeyTs | Array<Record<string, any>> | readonly [{ readonly validator: (rule: any, value: any, callback: any) => void; readonly trigger: 'blur' }] // 规则校验
    error: string // 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。
    inlineMessage: boolean // true 是否显示校验错误信息
    showMessage: boolean // false 是否在行内显示校验信息
    size?: 'large' | 'default' | 'small' // 用于控制该表单域下组件的默认尺寸
    // **************************** 以下扩展属性  *******************************
    type?: fromTypeTs // 按钮类型
    value?: any // 默认值
    slot?: boolean // 是否使用form插槽 true 时 此form-item 内部的输入框会可以由外部样式插入
    labelSlot?: boolean // 是否使用label插槽 true 时 此form-item 内部的label会可以由外部样式插入
    defaultSelect?: number // select类型 默认选中的索引
    itemRules?: Array<Record<string, any>> // form item单独设置的rules  这个于rules属性重复后期升级可能会用到
    option?: Array<optionTs> // 选择项列表
    inputWidth?: string // 输入框盒子大小
    inputProps?: Partial<inputPropsTs> // 对应直接绑定在input上的属性
    // ****************************** col属性  ********************************
    span?: number // （是col的内部嵌套  ） 对应传的数组代表占整行的百分比 24是100% 12是50% 以此类推
    vHtml?: () => string // （是col的内部嵌套  ）  自定义dom内容 当key不传的时候使用
    col?: formItemTs[] // 内部嵌套 对应element的col组件
    gutter?: number // 对应element的row组建的间隔属性
    // ****************************** 分割线属性  ******************************
    isLine?: boolean // 是否是分割线
    lineLabel?: string // 分割线文字
    lineLabelStyle?: record // 分割线文字样式
    lineStyle?: record // 分割线样式
}

export interface btnOptionTs {
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
    label?: string
    size?: 'large' | 'default' | 'small'
    click?: ((form: FormInstance | undefined) => any) | 'submit' | 'cancel'
}
export interface fpiFormTs {
    getForm: () => FormInstance
    getFormData: () => Record<string, any>
}

export type staticRulesKeyTs = 'email' | 'date' | 'select' | 'unNull' | 'number' | 'phone' | 'checkbox' | string

