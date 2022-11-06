# form
所有element form属性加上以下属性
formOption // 表单配置项
formBtnOption // 表单按钮配置项
btnBoxStyle // 按钮盒子样式

### function
    getFormData, // 获取表单obj变量
    getForm, // 获取 form dom
    validate, // 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
    validateField, // 验证具体的某个字段。
    resetFields, // 重置该表单项，将其值重置为初始值，并移除校验结果。
    scrollToField, // 滚动到指定的字段
    clearValidate // 清理某个字段的表单验证信息
## formItemTs（对应formOption数组内的每个对象，注意props属性变成key属性也代表变量在对象内的位置）
*** element Form Item原生属性 key对应prop  ***
key: string // 变量名称
label?: string // 标题
labelWidth?: string|number //  标签宽度，例如 '50px'。 可以使用 auto。
required?: boolean // 是否为必填项，如不设置，则会根据校验规则确认 
rules?: staticRulesKeyTs | Array<Record<string, any>> // 规则校验
error: string // 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。
inlineMessage:boolean // true 是否显示校验错误信息
showMessage: boolean // false 是否在行内显示校验信息
size?: 'large' | 'default' | 'small' // 用于控制该表单域下组件的默认尺寸
*** 以下扩展属性  ***
type?: `fromTypeTs` // 按钮类型
value?: any // 默认值
slot?: boolean //是否使用form插槽 true 时 此form-item 内部的输入框会可以由外部样式插入
labelSlot?:boolean //是否使用label插槽 true 时 此form-item 内部的label会可以由外部样式插入
defaultSelect?: number // select类型 默认选中的索引
itemRules?: Array<Record<string, any>> // form item单独设置的rules  这个于rules属性重复后期升级可能会用到
option?: Array<optionTs> // 选择项列表 
inputWidth?: string // 输入框盒子大小 
inputProps?: `inputPropsTs` // 对应直接绑定在input上的属性
*** col属性  ***
col?: `formItemTs`[] // 内部嵌套 对应element的col组件
gutter?: number // 对应element的row组建的间隔属性
span?: number //（是col的内部嵌套  ） 对应传的数组代表占整行的百分比 24是100% 12是50% 以此类推
vHtml?: () => string //（是col的内部嵌套  ）  自定义dom内容 当key不传的时候使用
*** 分割线属性  ***
isLine?: boolean // 是否是分割线
lineLabel?: string // 分割线文字
lineLabelStyle?: record // 分割线文字样式
lineStyle?: record // 分割线样式

*** 按钮类型 ***
fromTypeTs =
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
## inputPropsTs (详细各种input类型参数见下， **注意 option属性是直接在formItem下的不是在inputProps内的) 
size?: 'large' | 'default' | 'small' // 单个input的size
maxlength: string|number //最大输入长度
minlength: number //最小输入长度
showWordLimit: boolean //默认false 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
clearable?: boolean // 是否可以一键清空
disabled?: boolean // 是否警用按钮
style?: any // 传入自定义样式
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
stepStrictly?:boolean // 是否只能输入 step 的倍数	
precision?: number // 数值精度
controlsPosition?: 'right' // 控制按钮位置
isFocus: boolean // 是否默认选择 只对 input num-input 有效
    // 方法
change: (value:string | number) => any // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发
input: (value:string | number) => any // 在 Input 值改变时触发
clear: () => any // 在点击由 clearable 属性生成的清空按钮时触发

## input
size?: 'large' | 'default' | 'small' // 单个input的size
clearable?: boolean // 是否可以一键清空
disabled?: boolean // 是否警用按钮
style?: any // 传入自定义样式
inputStyle?: Record<string, any> // input 元素或 textarea 元素的 style     object
autocomplete?: 'on' | 'off' // 原生属性 表示输入字段是否应该启用自动完成功能。
type?: 'data' | 'password' // input内部的特殊type
showPassword?: boolean // 是否显示密码显示隐藏控制按钮
placeholder?: string // 输入框占位文本
maxlength: string|number //最大输入长度
minlength: number //最小输入长度
showWordLimit: boolean //默认false 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
prefixIcon: string | any // 自定义前缀图标
suffixIcon: string | any // 自定义后缀图标
rows: number // 输入框行数，仅 type 为 'textarea' 时有效
readonly: boolean // 原生  readonly 属性，是否只读
max?: number //  设置最大值
isFocus: boolean // 是否默认选择 只对 input num-input 有效
// function 
change
input
clear
## Checkbox
size?: 'large' | 'default' | 'small' // 单个input的size
placeholder?: string // 输入框占位文本
disabled?: boolean // 是否警用按钮
min?: number // 设置计数器允许的最小值
max?: number // 设置计数器允许的最大值 | 原生 max 属性，设置最大值
change: (value:string | number) => any // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发
type:'button' // button为特殊是checkbox的button模式
option { // 选择项列表  value label **注意 option属性是直接在formItem下的不是在inputProps内的)
### el-checkbox-button(type=button)
    label: string
    checked?: boolean // 当前是否勾选
    disabled?: boolean // 是否可以点击
    value: string | number|boolean
### el-checkbox
    label: string
    checked?: boolean // 当前是否勾选
    disabled?: boolean // 是否可以点击
    indeterminate?: boolean // 设置 indeterminate 状态，只负责样式控制
    border?: boolean // 是否显示边框
    value: string | number|boolean
}
## input-number (计数器)
size?: 'large' | 'default' | 'small' // 单个input的size
clearable?: boolean // 是否可以一键清空
disabled?: boolean // 是否警用按钮
placeholder?: string // 输入框占位文本
max?: number //  设置最大值
min?: number //  设置最小值
step?: number // 计数器步长
stepStrictly?:boolean // 是否只能输入 step 的倍数	
precision?: number // 数值精度
controlsPosition?: 'right' // 控制按钮位置
change: (value:string | number) => any // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发

## DatePicker
type = date-picker
size?: 'large' | 'default' | 'small' // 单个input的size
clearable?: boolean // 是否可以一键清空
disabled?: boolean // 是否警用按钮
style?: any // 传入自定义样式
type?: string // input内部的特殊type
placeholder?: string // 输入框占位文本
disabledDate: (value1:Date,value2?:Date) => boolean // 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。
shortcuts: { text: string, value: Date | (() => Date) }[] // 设置快捷选项，需要传入数组对象
format: string // 显示在输入框中的格式
unlinkPanels: boolean // 在范围选择器里取消两个日期面板之间的联动
rangeSeparator: string // 选择范围时的分隔符
startPlaceholder: string // 范围选择时开始日期的占位内容
endPlaceholder: string // 范围选择时结束日期的占位内容
defaultValue: Date | Date[] // 默认时间
valueFormat: string // 可选，绑定值的格式。 不指定则绑定值为 Date 对象
change: (value:string | number) => any // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发

## radio
size?: 'large' | 'default' | 'small' // 单个input的size
type:'button' // button为特殊是button模式
option { // 选择项列表  value label
change: (value:string | number) => any // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发

### el-radio
    value 
    label
    size
    disabled?: boolean // 是否可以点击
    border?: boolean // 是否显示边框
### el-radio-button
    value 
    label
    size
    disabled?: boolean // 是否可以点击
}

## select
size?: 'large' | 'default' | 'small' // 单个input的size
clearable?: boolean // 是否可以一键清空
disabled?: boolean // 是否警用按钮
placeholder?: string // 输入框占位文本
multiple: boolean // 是否多选
collapseTags: boolean // 多选时是否将选中值按文字的形式展示
collapseTagsTooltip: boolean // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
filterable: boolean // 	Select 组件是否可筛选
change: (value:string | number) => any // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发
option { // 选择项列表  value label
    value 
    label
    disabled?: boolean // 是否可以点击
}
## switch
size?: 'large' | 'default' | 'small' // 单个input的size
style?: string // 传入自定义样式 // switch 可以使用 --el-switch-on-color 属性与 --el-switch-off-color 属性来设置开关的背景色。
例如： --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949
activeText: string // switch 选中文字
inactiveText: string // switch 没选择文字
inlinePrompt: boolean // switch文字是否在内部
disabled?: boolean // 是否警用按钮
activeIcon: any // switch 自定义图标
inactiveIcon: any // switch 自定义图标
activeValue: string|boolean|number // 自定义选择值 switch
inactiveValue: string|boolean|number // 自定义不选择值 switch
change: (value:string | number) => any // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发

## TimePicker
type = date-picker
clearable?: boolean // 是否可以一键清空
size?: 'large' | 'default' | 'small' // 单个input的size
disabled?: boolean // 是否警用按钮
style?: any // 传入自定义样式
placeholder?: string // 输入框占位文本
isRange: boolean // el-time-picker 是否选择时间段
rangeSeparator: string // 选择范围时的分隔符
startPlaceholder: string // 范围选择时开始日期的占位内容
endPlaceholder: string // 范围选择时结束日期的占位内容
change: (value:string | number) => any // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发

## line
isLine?: boolean // 是否是分割线
lineLabel?: string // 分割线文字
lineLabelStyle?: record // 分割线文字样式
lineStyle?: record // 分割线样式

## col
label?: string // 标题
gutter?: number // 对应element的row组建的间隔属性
col: [
    span: number 对应占位符
    vHtml?: () => string //  自定义dom内容 当key不传的时候使用 当type === 'dom'显示
    ... formItem 其他formItem参数
]

*** 例子：**
col: [
    {
        span: number 对应占位符
        type: 'dom' 对应占位符
        vHtml?: () => string
    }
]
*** or ****
col: [
    {
        span: number 对应占位符
        ... formItem 其他formItem参数
    }
]

### rules  可以用字符串任意使用逗号分割
unNull: { required: true, message: '不能为空', trigger: 'blur' },
number: { type: 'number', message: '请输入数字值', trigger: 'change' },
phone: { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' },
checkbox: { type: 'array', required: true, message: '请至少选择一项', trigger: 'blur' },
select: { required: true, message: '请选择', trigger: 'blur' },
date: { required: true, message: '请选择时间', trigger: 'blur' },
email: { type: 'email',required: true, message: '请输入正确的邮箱格式', trigger: 'blur' },
*** 例如 ***
rules: 'unNull'
rules: 'unNull,select'


## button配置项（直接绑定在form上）
btnOptionTs （object[]）
    type?: 	'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text',
    label?: string,
    size?: 'large' | 'default' |'small'
    click?: ((form:FormInstance |undefined) => any) | 'submit' |'cancel'
*** 默认 ***
{
    type: "primary",
    label: '提交',
    click: 'submit'
},
{
    label: '取消',
    click: 'cancel'
}