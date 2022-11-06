/*
 * @Author: mjh
 * @Date: 2022-11-06 09:06:18
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-06 18:42:33
 * @Description:
 */

/**
 * @dec 替换{{}}变量
 * @param {*} vm 变量对象
 * @param {*} expr 变量在对象内的位置  如server.base
 */
export const getVal = (vm: any, expr: string) => {
    if (!expr)
        return vm
    const value = expr.split('.').reduce((data: any, current: any) => {
        return data[current]
    }, vm)
    return value
}
/**
 * 获取类型方法 返回 参数类型 或者 true/false
 * @param {*} tgt 需要判断类型的变量
 * @param {*} type? 可传可不传， 不传的话方法返回变量类型，传的话返回参数类型是否一致true/false
 * 可确定的类型：undefined、null、string、number、boolean、array、object、symbol、
 * date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
 */
export function DataType(tgt: any): string
export function DataType(tgt: any, type: string): boolean
export function DataType(tgt: any, type?: string) {
    const dataType = Object.prototype.toString
        .call(tgt)
        .replace(/\[object (\w+)\]/, '$1')
        .toLowerCase()
    return (type ? dataType === type : dataType)
}
export function pickKey<T extends Record<string, any>, K extends keyof T>(obj: T, keyArr: K[]) {
    return keyArr.reduce((pre: record, cur: K) => {
        (pre as T)[cur] = obj[cur]
        return pre
    }, {})
}

export function getObjectKey<T extends Record<string, any>>(obj: T) {
    return Object.keys(obj) as (keyof T)[]
}
