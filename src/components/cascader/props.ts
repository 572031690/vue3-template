/*
 * @Author: Tian
 * @Date: 2022-07-06 10:38:47
 * @LastEditors: Tian
 * @LastEditTime: 2022-07-06 13:43:11
 * @Description: 
 */
import type { PropType } from 'vue'
import type { TypeList, CascaderOption, CascaderProps } from './types'
export const cascaderProps = {
    /**
     * @desc 当前选中的文本
     */
    textHolder: {
        type: String,
        default: ''
    },
    /**
     * @desc 类型选择
     */
    typeList: {
        type: Array as PropType<TypeList[]>,
        default: () => []
    },
    searchName: {
        type: String,
        default: ''
    },
    /**
     * @desc 默认选中的类型
     */
    currentType: {
        type: String,
        default: ''
    },
    /**
     * @desc 选中项绑定值
     */
    currentNode: {
        type: String,
        default: ''
    },
    /**
     * @desc 可选项数据源，键名可通过 Props 属性配置
     */
    options: {
        type: Array as PropType<CascaderOption[]>,
        default: () => []
    },
    /**
     * @desc 配置选项
     */
    props: {
        type: Object as PropType<CascaderProps>,
        default: () => {
            return {
                //次级菜单的展开方式
                expandTrigger: 'hover',
                //是否多选
                multiple: false,
                //是否严格的遵守父子节点不互相关联
                checkStrictly: true,
                //在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
                emitPath: false,
                //是否动态加载子节点，需与 lazyLoad 方法结合使用
                lazy: false,
                //加载动态数据的方法，仅在 lazy 为 true 时有效
                lazyLoad: '',
                //指定选项的值为选项对象的某个属性值
                value: 'code',
                //指定选项标签为选项对象的某个属性值
                label: 'label',
                //指定选项的子选项为选项对象的某个属性值
                children: 'children',
                //指定选项的禁用为选项对象的某个属性值
                disabled: 'disabled',
                //指定选项的叶子节点的标志位为选项对象的某个属性值
                leaf: 'leaf'

            }
        }
    },
    
 
}