import type { PropType } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { AllowDragFunction, AllowDropFunction, FilterNodeMethodFunction, Icon, LoadFunction, RenderContentFunction, TreeKey, TreeNodeData, TreeOptionProps, hType } from './types'
export const treeProps = {
    /**
     * @desc 是否显示搜索框
     */
    showSearchBox: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 搜索框提示文字
     */
    placeholder: {
        type: String,
        default: '请输入'
    },
    /**
     * @desc 树结构数据
     */
    treeData: {
        type: Array as PropType<TreeNodeData[]>,
        default: () => []
    },
    /**
     * @desc 内容为空的时候展示的文本
     */
    emptyText: String,
    /**
     * @desc 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
     */
    nodeKey: String,
    /**
     * @desc 配置选项
     */
    props: {
        type: Object as PropType<TreeOptionProps>,
        default: () => {
            return {}
        }
    },
    /**
     * @desc 是否在第一次展开某个树节点后才渲染其子节点
     */
    renderAfterExpand: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 加载子树数据的方法，仅当 lazy 属性为true 时生效
     */
    load: {
        type: Function as PropType<LoadFunction>,
        default: () => {
            return {}
        }
    },
    /**
     * @desc 树节点的内容区的渲染
     */
    renderContent: {
        type: Function as PropType<RenderContentFunction>,
        default: (h: hType, { node, data }: {
            node: Node
            data: TreeNodeData
        }) => {
            return {}
        }
    },
    /**
     * @desc 是否高亮当前选中节点，默认值是 false
     */
    highlightCurrent: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 是否默认展开所有节点
     */
    defaultExpandAll: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点
     */
    expandOnClickNode: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点
     */
    checkOnClickNode: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 展开子节点的时候是否自动展开父节点
     */
    autoExpandParent: {
        type: Boolean,
        default: true
    },
    /**
     * @desc 默认展开的节点的 key 的数组
     */
    defaultExpandedKeys: {
        type: Array as PropType<TreeKey[]>,
        default: () => []
    },
    /**
     * @desc 节点是否可被选择
     */
    showCheckbox: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
     */
    checkStrictly: {
        type: Boolean,
        default: false
    },
    /**
     * @desc 默认勾选的节点的 key 的数组
     */
    defaultCheckedKeys: {
        type: Array as PropType<TreeKey[]>,
        default: () => []
    },
    /**
     * @desc 当前选中的节点
     */
    currentNodeKey: {
        type: [String, Number],
        default: ''
    },
    /**
     * @desc 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏
     */
    filterNodeMethod: {
        type: Function as PropType<FilterNodeMethodFunction>,
        default: () => {
            return {}
        }
    },
    /**
     * @desc 是否每次只打开一个同级树节点展开
     */
    accordion: {
        type: Boolean,
        default: false,
    },
    /**
     * @desc 相邻级节点间的水平缩进，单位为像素
     */
    indent: {
        type: Number,
        default: 16,
    },
    /**
     * @desc 自定义图标组件，测试了一下，这里会生成统一的图标
     */
    icon: {
        type: String as PropType<Icon>,
        default: ''
    },
    /**
     * @desc 具有子集的节点的图标
     * @example import folderIcon1 from '@/assets/images/treeIcon/icon.svg'
     */
    folderIcon: {
        type: String,
        default: ''
    },
    /**
     * @desc 展开的节点的图标
     * @example import folderIcon1 from '@/assets/images/treeIcon/icon.svg'
     */
    expandIcon: {
        type: String,
        default: ''
    },
    // 是否懒加载子节点，需与 load 方法结合使用
    lazy: {
        type: Boolean,
        default: false,
    },
    // 是否开启拖拽节点功能
    draggable: {
        type: Boolean,
        default: false,
    },
    // 判断节点能否被拖拽 如果返回 false ，节点不能被拖动
    arrowDrag: {
        type: Function as PropType<AllowDragFunction>,
        default: () => {
            return {}
        }
    },
    // 拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
    arrowDrop: {
        type: Function as PropType<AllowDropFunction>,
        default: () => {
            return {}
        }
    }
}
