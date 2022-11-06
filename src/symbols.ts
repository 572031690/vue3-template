/*
 * @Author: mjh
 * @Date: 2022-09-09 17:52:31
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 08:33:15
 * @Description:
 */
import type { InjectionKey } from 'vue'
import type { globalTs } from '@/types/common'
/** 全局的信息 InjectionKey */
export const globalKey: InjectionKey<globalTs> = Symbol('')

