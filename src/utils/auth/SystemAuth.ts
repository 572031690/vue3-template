/*
 * @Author: mjh
 * @Date: 2022-09-06 09:21:32
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 00:38:13
 * @Description:
 */
import { setToken } from '@/utils/tools'
import * as Instance from '@/service/apis/public'
const systemCode = 'wgmsAnalysisDiagnose'
// 根据权限获取菜单信息
const getHttpAuth = async () => {
    const data = await Instance.getSystemMenus(
        {
            systemCode
        },
        {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'token': window.localStorage.getItem('token') || ''
            }
        }
    )
    console.log(data, 'data')
}

// 暂时不加菜单权限，后续补上
export function verifyAuth() {
    return new Promise((resolve) => {
        // 登录
        let token = ''
        const uriSplit = decodeURI(location.href).split('?token=')
        if (uriSplit[1])
            location.href = uriSplit[0]

        token = uriSplit[1] || localStorage.getItem('token') || ''
        if (token) {
            localStorage.setItem('token', token)
            setToken(token)
        }
        getHttpAuth()

        resolve(token)
    })
}
