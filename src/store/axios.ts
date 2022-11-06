/*
 * @Author: mjh
 * @Date: 2022-09-06 09:21:32
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-23 23:46:45
 * @Description:
 */
import { defineStore } from 'pinia'
import type { Canceler } from 'axios'

export const useAxiosStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: 'axios',
    state: () => ({
        countIntercept: 0,
        interceptArray: [] as Canceler[]
    }),
    // getters
    getters: {
        countInterceptData: state => state.countIntercept,
        interceptArrayData: state => state.interceptArray
    },
    actions: {
        async addIntercept(cancel: Canceler) {
            // 可以做异步
            this.countIntercept++
            this.interceptArray.push(cancel)
        },
        async clearIntercept(num?: number) {
            if (num) {
                const length = this.interceptArray.length
                this.interceptArray.slice(-num).forEach((cancel) => {
                    cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
                })
                this.countIntercept = this.countIntercept - num
                this.interceptArray = this.interceptArray.slice(0, length - num)
                return
            }
            this.interceptArray.forEach((cancel) => {
                cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
            })
            this.countIntercept = 0
            this.interceptArray = []
        }
    }
})
