
export interface CascaderObj {
    isOpen: boolean;
    searchName: string;
    showPanel: boolean;
    selectedCode: string;
    // currentType: string;
}

export interface TypeList {
    label: string;
    key?: string;
    code?: string;
}
export type CascaderNodeValue = string | number;
export interface CascaderOption extends Record<string, unknown> {
    label?: string;
    value?: CascaderNodeValue;
    children?: CascaderOption[];
    disabled?: boolean;
    leaf?: boolean;
}
export enum ExpandTrigger {
    CLICK = "click",
    HOVER = "hover"
}
import type { default as CascaderNode } from 'element-plus/es/components/cascader-panel/src/node'
export type { CascaderNode }
export type isDisabled = (data: CascaderOption, node: CascaderNode) => boolean;
export type isLeaf = (data: CascaderOption, node: CascaderNode) => boolean;
export type Resolve = (dataList?: CascaderOption[]) => void;
export type LazyLoad = (node: CascaderNode, resolve: Resolve) => void;
export interface CascaderProps {
    expandTrigger?: ExpandTrigger;
    multiple?: boolean;
    checkStrictly?: boolean;
    emitPath?: boolean;
    lazy?: boolean;
    lazyLoad?: LazyLoad;
    value?: string;
    label?: string;
    children?: string;
    disabled?: string | isDisabled;
    leaf?: string | isLeaf;
    hoverThreshold?: number;
}