<template lang="pug">
.fpi-tree
    .side-input(v-if='showSearchBox')
        el-input(
            v-model="filterText" 
            :placeholder="placeholder"
            :prefix-icon="Search"
        )
    el-tree(
        ref="treeRef"
        class="filter-tree"
        :data="resultData"
        :empty-text='emptyText'
        :node-key='nodeKey1'
        :props="defaultProps"
        :render-after-expand='renderAfterExpand'
        :load='load'
        :highlight-current='highlightCurrent'
        :default-expand-all='defaultExpandAll'
        :expand-on-click-node='expandOnClickNode'
        :check-on-click-node='checkOnClickNode'
        :auto-expand-parent='autoExpandParent'
        :default-expanded-keys='defaultExpandedKeys'
        :show-checkbox='showCheckbox'
        :check-strictly='checkStrictly'
        :default-checked-keys='defaultCheckedKeys'
        :current-node-key='currentNodeKey'
        :filter-node-method='filterNodeMethod'
        :accordion='accordion'
        :indent='indent'
        :icon='icon'
        :lazy='lazy'
        :draggable='draggable'
        :allow-drag='arrowDrag'
        :allow-drop='arrowDrop')
        template(#default="scope")
            .custom-node
                img(:src='scope.data.children ? folderIcon : expandIcon')
                span {{scope.node.label}}
</template>
<script lang="ts" setup name="fpi-tree">
import type { TreeNodeData } from './types'
import { treeProps } from './props'
import { Search } from '@element-plus/icons-vue'
import { serviceKey, defaultService } from '@/symbols'
import type Node from 'element-plus/es/components/tree/src/model/node'
import folderIcon1 from '@/assets/images/treeIcon/icon.svg'
import folderIcon2 from '@/assets/images/treeIcon/file.svg'
const service = inject(serviceKey, defaultService)

defineProps({
    ...treeProps
})
const filterText = ref('')
const treeRef = ref()

// 变量定义
const allProps = reactive({
    nodeKey1: 'id',
    defaultProps: {
        children: 'children',
        label: 'label',
        class: (data: TreeNodeData) => {
            if(data.id === 659053) {
                return 'is-penultimate'
            }
            return null
        }
    },
    resultData: [],
    folderIcon: folderIcon2,
    expandIcon: folderIcon1,
    highlightCurrent: true,
    defaultExpandAll: false,
    expandOnClickNode: true,
    checkOnClickNode: false,
    defaultExpandedKeys: [330101],
    showCheckbox: true,
    defaultCheckedKeys: [330101],
    currentNodeKey: '330101',
    draggable: true,
    arrowDrag: (node: Node) => {
        console.log(node)
        return true
    }
}) 

watch(filterText, (val) => {
    treeRef.value?.filter(val) ?? false
})

const filterNodeMethod = (value: string, data: TreeNodeData) => {
    if (!value) return true
    return data.label.includes(value)
}


const getTreeData = async() => {
    const data = await service('publicMap/getTreeData', {
        code: '330100000000'
    })
    allProps.resultData = data
    console.log(data)
}
getTreeData()

const { nodeKey1, defaultProps, resultData, folderIcon, expandIcon, highlightCurrent, defaultExpandAll, expandOnClickNode, checkOnClickNode, draggable, defaultExpandedKeys, currentNodeKey, showCheckbox, defaultCheckedKeys, arrowDrag } = toRefs(allProps)

</script>
<style lang="scss" scoped>
.fpi-tree {
    padding: $padding;
    .side-input {
        margin-bottom: $margin;
    }
}
.custom-node {
    display: flex;
    align-items: center;
    img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }
}
</style>
<style lang="scss">
.is-penultimate {
    .el-tree-node__content {
        color: #626aef!important;
    }
  
}
</style>