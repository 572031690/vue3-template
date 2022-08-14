import BaseList from '@/service/baseServe'

export interface apiObjTs {
    path?: string // 请求地址
    pathExpr?: string // 解析变量版本请求地址  用{{}}包裹变量
    server?: keyof typeof BaseList // 请求服务
    method?: 'post' | 'get' // 请求类型
    params?: recordt<ajaxDataTs> // 请求参数
    headers?: record // 请求头
    isArray?: boolean, //判断post请求是否传数组,[1, 2, 3]
}

export type apiParamPrototypeTs = string | undefined | null
export type ajaxDataTs = apiParamPrototypeTs | apiParamPrototypeTs[]

export type getApiTs = <T, X = false>(
    url: string,
    params?: Record<string, any>,
    header?: Record<string, any>,
    type?: string
) => apiReturnTs<T, X>

export type apiReturnTs<T, X> = X extends true ? Promise<T> : Promise<{
    code: number
    data: null | T
    message: string
}> 

export type apiListTs = recordt<apiObjTs>