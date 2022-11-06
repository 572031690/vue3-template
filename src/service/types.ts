/*
 * @Author: mjh
 * @Date: 2022-10-21 23:51:28
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 00:15:28
 * @Description:
 */
import type { AxiosRequestConfig } from 'axios'
import type BaseList from '@/service/baseServe'

export interface apiObjTs extends AxiosRequestConfig {
    url?: string // 请求地址
    server?: keyof Omit<typeof BaseList, 'prototype'> // 请求服务
    isIntercept?: boolean // 是否推入全局的请求拦截栈
    baseURL?: string // 本地调试时 接口特殊代理
}
export type apiReturnTs<T, X> = X extends true ? T : {
    code: number
    data: null | T
    message: string
}
