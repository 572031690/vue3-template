/*
 * @Author: mjh
 * @Date: 2022-10-21 20:43:43
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 08:12:24
 * @Description: 
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
