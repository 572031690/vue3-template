/*
 * @Author: mjh
 * @Date: 2022-08-29 13:48:39
 * @LastEditors: mjh
 * @LastEditTime: 2022-08-29 13:57:41
 * @Description:
 */
import { defineStore } from 'pinia'

export const usePopStore = defineStore({
    id: 'pop',
    state: () => ({
        currentPop: '', // 当前显示的面板
        popData: '' as any
    }),
    getters: {
        getPop: (state) => {
            return { popData: state.popData, currentPop: state.currentPop }
        },
        getCurrentPop: state => state.currentPop,
        getPopData: state => state.popData,
    },
    actions: {
        async upDatePopup(data: { currentPop: string; popData?: any }) {
            this.currentPop = data.currentPop
            this.popData = data.popData
        },
        initPop() {
            this.currentPop = ''
            this.popData = ''
        }
    }
})
