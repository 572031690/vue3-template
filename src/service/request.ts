/*
 * @Author: Tian
 * @Date: 2021-11-01 10:31:19
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-23 09:32:10
 * @Description:
 */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { messageBox, redirectLogin, removeToken } from '@/utils/tools'
import { useAxiosStore } from '@/store/axios'
import Config from '@/config'
import BaseList from '@/service/baseServe'
import type { apiObjTs, apiReturnTs } from '@/service/types'
let isWaitToLogin = false // 已经有异步跳转登录页面标识

const innerNet
    = process.env.NODE_ENV === 'development'
        ? true
        : /^(192|0|127|172|localhost)/.test(location.hostname)
const outLogin = () => {
    removeToken()
    isWaitToLogin = true
    setTimeout(() => {
        redirectLogin()
    }, 2000)
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, message: string) => {
    if (isWaitToLogin)
        return
    // 状态码判断
    switch (status) {
    // 400,401: 未登录状态，跳转登录页
    case 400:
    case 401:
        messageBox(`${message} 即将跳转登录页...`)
        outLogin()
        break
        // 403 token过期 清除token并跳转登录页
    case 403:
        messageBox('登录过期，请重新登录即将跳转登录页...')
        outLogin()
        break
        // 服务器拥堵 Bad Gateway
    case 502:
        messageBox('网络拥堵，即将跳转登录页...')
        outLogin()
        break
        // 404请求不存在
    case 404:
        messageBox('请求的资源不存在', 'error')
        break
    default:
        break
    }
}

/* 实例化请求配置 */
const instance: AxiosInstance = axios.create({
    baseURL: Config.domain,
    // 请求时长
    timeout: 60 * 1000,
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true
    },
    transformResponse: [
        (data) => {
            if (
                typeof data === 'string'
                && (data.startsWith('{') || data.startsWith('['))
            )
                data = JSON.parse(data)

            return data
        }
    ]
})

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    (config: AxiosRequestConfig<any>) => {
        config
            && config.headers
            && (config.headers['Cache-Control'] = 'no-cache, no-store') // 清除缓存
        config && config.headers && (config.headers.Pragma = 'no-cache') // 清除缓存
        // 前端不操作token
        // config.headers.token = getToken()
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    (response: AxiosResponse<any>) => {
        // 对后端返回的code做一些出错处理...
        const { code, message } = response.data
        errorHandle(code || response.status, message)
        if ([200, 'success'].includes(code) || typeof code !== 'number')
            return response.data

        else if (code)
            return Promise.reject(response.data)

        else
            return Promise.resolve(response.data)
    },
    // 请求失败
    (error) => {
        if (axios.isCancel(error)) {
            // 接口请求拦截取消
            console.warn(error.message)
        }
        const { response } = error
        if (response) {
            // 请求已发出，但是状态不在2xx的范围
            errorHandle(response.status, response.data.message)
            return Promise.reject(response)
        }
    }
)

const request = instance.request
const CancelToken = axios.CancelToken
const requestControl = <T, R = false>(option: apiObjTs) => {
    if (option.server) option.url = BaseList[option.server] + option.url
    if (option.isIntercept) {
        option.cancelToken = new CancelToken((cancel) => {
            const axiosStore = useAxiosStore()
            axiosStore.addIntercept(cancel)
        })
    }
    return request<any, apiReturnTs<T, R>>(option)
}
export default requestControl
