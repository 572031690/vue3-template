import { defineStore } from 'pinia'

export const useMainStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: 'mian',
    state: () => ({
        count: 15
    }),
    // getters
    getters: {
        countData: state => state.count
    },
    actions: {
        async insertPost(data: number) {
            // 可以做异步
            // await doAjaxRequest(data);
            this.count = data
        }
    }
})
