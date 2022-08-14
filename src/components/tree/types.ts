import type { Component, ComponentInternalInstance, VNode, h } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type TreeStore from 'element-plus/es/components/tree/src/model/tree-store'

export type TreeData = TreeNodeData[];
export type TreeKey = string | number;
export type hType = typeof h


export interface TreeNodeData {
    [key: string]: any;
}

export interface TreeOptionProps {
    children?: string;
    label?: string | ((data: TreeNodeData, node: Node) => string);
    disabled?: string | ((data: TreeNodeData, node: Node) => string);
    isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean);
    class?: (data: TreeNodeData, node: Node) => string | {
        [key: string]: boolean;
    } | string;
}

export type RenderContentFunction = (h: hType, context: RenderContentContext) => VNode | VNode[]
export interface RenderContentContext {
    _self: ComponentInternalInstance;
    node: Node;
    data: TreeNodeData;
    store: TreeStore;
}
export type LoadFunction = (rootNode: Node, loadedCallback: (data: TreeData) => void) => void
export type AllowDragFunction = (node: Node) => boolean
export type DropType = 'inner' | 'prev' | 'next'
export type AllowDropFunction = (draggingNode: Node, dropNode: Node, type: DropType) => boolean
export type FilterValue = any
export type FilterNodeMethodFunction = (value: FilterValue, data: TreeNodeData, child: Node) => boolean
export type Icon = string | Component

