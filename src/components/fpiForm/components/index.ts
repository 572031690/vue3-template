/**
 * @description Export Split Layouts
 */
import { toLowerLine } from '@/utils/tools'
const contexts: any = import.meta.globEager('./*.vue')
const popLayouts: { [key: string]: any } = {}
for (const key in contexts) {
    const replaceKey: string = key.replace(/(\.\/module\/|\.vue)/g, '') // 去除末尾的.png
    const nameKey = replaceKey.substring(replaceKey.lastIndexOf('/') + 1)
    popLayouts[toLowerLine(nameKey)] = contexts[key].default
}
export default popLayouts
