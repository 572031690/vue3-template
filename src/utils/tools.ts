/*
 * @Author: Tian
 * @Date: 2021-11-01 10:48:16
 * @LastEditors: Tian
 * @LastEditTime: 2021-11-02 18:20:56
 * @Description:
 */
import Cookies from 'js-cookie'
const TokenKey = 'token'
import config from '@/config/index'
import { ElMessage } from 'element-plus'
/**
 * @desc 函数 防抖 false/节流 true
 * @param fn 函数
 * @param wait 函数执行间隔时间毫秒数 默认1s Number
 * @param immediate 是否立即执行 Boolean     true: 节流  false 防抖
 */
export function debounce(fn: () => void, immediate: boolean, wait = 1000) {
    let timer: null | NodeJS.Timeout
    return function () {
        if (timer && immediate) {
            return
        }
        if (timer && !immediate) {
            clearTimeout(timer)
        }
        if (immediate) {
            fn()
        }
        timer = setTimeout(() => {
            timer = null
            if (!immediate) {
                fn()
            }
        }, wait)
    }
}
/**
 * @desc 函数
 * @param msg 显示文字
 * @param type 提示类型
 */
export const messageBox = (msg: string, type?: any) => {
    ElMessage({
        message: msg,
        type: type || 'warning',
        duration: 2000
    })
}
/**
 * @description Is Tcp Url
 * @param {String} url
 */
export function isTcp(url: string) {
    return !!url.match(/^https?:\/\//)
}
/**
 * @description Redirect Login Page
 */
export function redirectLogin() {
    window.location.href = config.bspURL
}
/**
 * @desc 驼峰转为非驼峰链接
 * @param str 字符串
 * @param type  链接字符串 -
 */
export function toLowerLine(str: string, type?: string) {
    type = type || '-'
    let tuo = ''
    const arr = str.split('')
    const newArr = arr.map(ite => {
        return ite.toUpperCase() === ite
            ? (ite = type + ite.toLowerCase())
            : ite
    })
    tuo = newArr.join('')
    if (tuo.slice(0, 1) === type) return tuo.slice(1)
    return tuo
}

/**
 * @description Set Token
 * @param {String} token
 */
export function setToken(token: string) {
    Cookies.set(TokenKey, token)
}

/**
 * @description Get Token
 * @return {String}
 */
export function getToken() {
    const token =
        window.localStorage.getItem('token') ||
        Cookies.get(TokenKey) ||
        getQueryValue(TokenKey)
    return token
}

/**
 * @description Remove Token
 */
export function removeToken() {
    Cookies.remove(TokenKey)
    window.localStorage.removeItem('token')
    window.sessionStorage.removeItem('token')
}

/**
 * @description Get Query Value
 * @param {String} key
 * @return {String}
 */
export function getQueryValue(key: string) {
    const url = window.location.search
    const theRequest: any = {}
    if (url.indexOf('?') !== -1) {
        const str = url.substr(1)
        const queryList = str.split('&')
        for (let i = 0; i < queryList.length; i++) {
            theRequest[queryList[i].split('=')[0]] = unescape(
                queryList[i].split('=')[1]
            )
        }
    }
    return theRequest[key] ? theRequest[key] : ''
}

/**
 * @description Check Token
 * @return {Boolean}
 */
export function checkToken() {
    const value = getQueryValue(TokenKey)
    if (value) setToken(value)
    return !!value || !!getToken()
}
/**
 * @description Encode Url Query
 * @param {Object} query
 * @return {String}
 */
export function encodeQuery(query: Record<string, any>) {
    let queryStr = ''
    const keys = Object.keys(query)
    keys.forEach((item, index) => {
        queryStr = index
            ? `${queryStr}&${item}=${query[item]}`
            : `${queryStr}${item}=${query[item]}`
    })
    return queryStr
}

/**
 * @description Decode Url Query
 * @param {String} queryStr
 * @return {Object}
 */
export function decodeQuery(queryStr: string) {
    const query: Record<string, any> = {}
    queryStr = decodeURI(queryStr.replace('?', ''))
    const queryArr = queryStr.split('&')
    queryArr.forEach(item => {
        const keyAndValue = item.split('=')
        query[keyAndValue[0]] = keyAndValue[1]
    })
    return query
}

// vue全局挂载导出方法  使用 const { proxy } = useCurrentInstance()
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
export function useCurrentInstance() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    const proxy = appContext.config.globalProperties
    return {
        proxy
    }
}
/**
 * 获取类型方法 返回 参数类型 或者 true/false
 * @param {*} tgt 需要判断类型的变量
 * @param {*} type? 可传可不传， 不传的话方法返回变量类型，传的话返回参数类型是否一致true/false
 * 可确定的类型：undefined、null、string、number、boolean、array、object、symbol、
 * date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
 */
type typeReturn<T> = T extends string ? boolean : string
export function DataType<T>(tgt: any, type?: T):typeReturn<T> {
    const dataType = Object.prototype.toString
        .call(tgt)
        .replace(/\[object (\w+)\]/, '$1')
        .toLowerCase()
    return (type ? dataType === (type as unknown as string) : dataType) as typeReturn<T>
}

/**
 * 方法名：
 * 功能介绍：返回一个对象里面包含后一个数组比第一个数组增加、减少的数据（适用于去重过后的数组）
 * 参数：
 * @param {*} beforeArr 前一个数组
 * @param {*} afterArr 后一个数组
 * 返回： resObj：{
 *      add: Array<number | string>
        del: Array<number | string>
 * }
 */
export function compare(
    beforeArr: Array<number | string>,
    afterArr: Array<number | string>
) {
    const resObj: {
            add: Array<number | string>
            del: Array<number | string>
        } = {
            add: [],
            del: []
        },
        cenObj: {
            [key: number | string]: any
        } = {}
    //把beforeArr数组去重放入cenObj
    for (let i = 0; i < beforeArr.length; i++) {
        cenObj[beforeArr[i]] = beforeArr[i]
    }
    //遍历afterArr，查看其元素是否在cenObj中
    for (let j = 0; j < afterArr.length; j++) {
        if (!cenObj[afterArr[j]]) {
            resObj.add.push(afterArr[j])
        } else {
            delete cenObj[afterArr[j]]
        }
    }
    for (const k in cenObj) {
        resObj.del.push(k)
    }
    return resObj
}

/**
 * 获取树结构第一级的最小子集
 * list 树结构
 */
export const getTreeDataSub = (list: Array<Record<string, any>>) => {
    const resultUrl = {
        url: '',
        code: ''
    }
    const getTargetUrl = (arr: Record<string, any>) => {
        if (arr.subs && arr.subs.length) {
            getTargetUrl(arr.subs[0])
        } else {
            resultUrl.url = arr.url
            resultUrl.code = arr.code
        }
    }
    getTargetUrl(list)
    return resultUrl
}
/**
 * 获取匹配的树节点
 * list 树结构
 */
export const getTreeNode = (list: Array<Record<string, any>>, code: string | number) => {
    const result = {
        label: '',
        code: ''
    }
    const getTargetNode = (arr: Array<Record<string, any>>, code: string | number) => {
        arr.forEach((item: any) => {
            if(item.code === code) {
                result.label = item.label
                result.code = item.code
            } else if (item.children && item.children.length) {
                getTargetNode(item.children, code)
            }
        })
    }
    getTargetNode(list, code)
    return result
}
/**
 * 获取匹配的树节点
 * list 树结构
 */
 export const getTargetNodeList = (list: Array<Record<string, any>>, name: string | number) => {
    const result: any = []
    const getTargetList = (arr: Array<Record<string, any>>, name: string | number) => {
        arr.forEach((item: any) => {
            if(item.label.indexOf(name) !== -1) {
                result.push(item)
            } else if (item.children && item.children.length) {
                getTargetList(item.children, name)
            }
        })
    }
    getTargetList(list, name)
    return result
}

/**
 * @dec 替换{{}}变量
 * @param {*} vm 变量对象
 * @param {*} expr 变量在对象内的位置  如server.base
 */
 export const getVal = (vm: any, expr: string) => {
    if (!expr) return vm
    const value = expr.split('.').reduce((data: any, current: any) => {
        return data[current]
    }, vm)
    return value
}

/**
 * @name 模板解析
 * @dec 处理{{}}字符串，替换变量值
 * @param {*} vm 变量对象
 * @param {*} expr 字符串内部包含{{变量}}  如http://{{server.base}}/{{path}}
 */
 export const getContentValue = (vm: any, expr: string) => {
    //expr: 我是{{person.name}}
    // 遍历表达式将内容重新特换成一个完整的内容，返回回去
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        return getVal(vm, args[1])
    })
}