import { InjectionKey } from 'vue'
import { globalTs, serviceTs } from '@/types/common'

/** 全局的信息 InjectionKey */
export const globalKey: InjectionKey<globalTs> = Symbol()
export const serviceKey: InjectionKey<serviceTs> = Symbol()

export const defaultService: serviceTs = (
    url: string,
    params?: record,
    header?: record,
    type?: string
) => {
    return console.log('service方法注入失败')
}
