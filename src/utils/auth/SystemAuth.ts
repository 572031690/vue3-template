import { setToken } from '@/utils/tools'
import Instance from '@/utils/request'
const systemCode = 'wgmsAnalysisDiagnose'
const authUrl = `bsp-permission-server/api/v1.0/permissions/systemMenus`
//根据权限获取菜单信息
const getHttpAuth = async () => {
    const data = await Instance.post(
        authUrl,
        {
            systemCode
        },
        {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                token: window.localStorage.getItem('token') || ''
            }
        }
    )
    console.log(data, 'data')
}

//暂时不加菜单权限，后续补上
export function verifyAuth() {
    return new Promise(resolve => {
        //登录
        let token = ''
        const uriSplit = decodeURI(location.href).split('?token=')
        if (uriSplit[1]) {
            location.href = uriSplit[0]
        }
        token = uriSplit[1] || localStorage.getItem('token') || ''
        if (token) {
            localStorage.setItem('token', token)
            setToken(token)
        }
        getHttpAuth()

        resolve(token)
    })
}
