/*
 * @Author: Tian
 * @Date: 2021-11-01 09:57:44
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-03 20:17:20
 * @Description:
 */
const innerNet
    = process.env.NODE_ENV === 'development'
        ? true
        : /^(192|0|127|172|localhost)/.test(location.hostname)
const domain = innerNet ? '/api' : `${location.protocol}//${location.host}`
// const defaultHost = 'https://wgms-test.fpi-inc.site'
const defaultHost = 'http://wgms.dev.fpi-inc.site'
const commonConfig = {
    gridCode: '01000000',
    defaultServer: 'wgmsService', // 请求默认服务
    cityCode: '330100',
    defaultRouteName: '/layout',
    loginUrl: `${innerNet ? defaultHost : domain}/cas/login`,
    webHomePage: innerNet ? `127.0.0.1:${location.port}` : `${domain}/${name}`,
    logoutUrl: `${innerNet ? defaultHost : domain}/cas/logout`,
    userBaseURL: `${defaultHost}/simple-user-center-server`,
    innerNet
}
const { webHomePage, loginUrl, userBaseURL } = commonConfig
const webHomePageStr = encodeURIComponent(webHomePage)
// 未登录，跳转到cas登录地址
const bspURL = `${loginUrl}?service=${userBaseURL}/userCenter/auth/authUser?redirectUrl=${webHomePageStr}`

export default {
    ...commonConfig,
    domain,
    bspURL
}
// table组件自动请求配置项
export const fpiTableConfig = {
    resExpr: '', // 对于请求回传对象对应的table数据在对象内的位置
    pageTotalExpr: 'data.total', // 总共数据条数对于的请求返回对象内位置
    pageReqExpr: { // 页面请求对应参数的名称
        pageSizes: 'pageSize',
        currentPage: 'pageNum'
    },
    currentPageOffset: 0, // 当前页面偏移量 用于配合后端特殊的要求
    pageInit: { // 初始化页码
        pageSizes: 10,
        currentPage: 1,
        total: 0,
        pageSizesArr: [10, 20, 30, 50]
    },
    headerRowStyle: undefined,
    headerCellStyle: undefined,
    rowStyle: undefined,
    cellStyle: undefined,
}
