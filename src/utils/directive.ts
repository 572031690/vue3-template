/*
 * @Author: mjh
 * @Date: 2022-08-21 19:14:13
 * @LastEditors: mjh
 * @LastEditTime: 2022-08-27 00:13:32
 * @Description:
 */
// 在src 目录下util新建   directive.js 文件 用于输出指令
import type { App } from 'vue'
export const directive = (app: App<Element>) => {
    app.directive('focus', {
        mounted(el, binding, vnode) {
            console.log(vnode)
            binding.value && el.focus()
        }
    })
    app.directive('test', (el, binding) => {
        // 这将被作为 `mounted` 和 `updated` 调用
        console.log(binding, 'binding')
    })
}
