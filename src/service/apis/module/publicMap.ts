/*
 * @Author: Tian
 * @Date: 2022-05-06 13:37:55
 * @LastEditors: Tian
 * @LastEditTime: 2022-07-05 21:29:18
 * @Description: 8
 */
import { typeObj } from '@/service/baseServe'
const { string, number, object, array, any, boolean } = typeObj
import { apiListTs } from '@/types/service'
const apiList: apiListTs = {
    //危废联单列表
    jointDetail: {
        path: '/solid-waste/joint-detail',
        // pathExpr: '/solid-waste/joint-detail/id={{id}}',
        server: 'wgmsService',
        params: {
            jointNumber: string // object array string boolean number
        }
    },
    //危废联单详情
    jointList: {
        path: '/solid-waste/joint-list-by-param',
        server: 'wgmsService',
        params: {
            pageNum: number,
            pageSize: number,
            jointNumber: string,
            beginTime: string,
            endTime: string
        }
    },
    //测试请求
    getJsonTest: {
        path: 'https://gis-dev.fpi-inc.site/interpolation-file-server/api/v1/sys/download/interpolation/118/mlhy/2022/02/12/aqi_2022021210.png'
    },
    //菜单接口
    getSystemMenus: {
        path: '/api/v1.0/permissions/systemMenus',
        server: 'wgmsBspService',
        method: 'post',
        params: {
            systemCode: string
        }
    },
    //左侧树结构接口
    getTreeData: {
        path: '/api/v2.0/client/region/queryByCode',
        server: 'wgmsBasicInfoServer',
        params: {
            code: [null, undefined, string]
        }
    },
    //级联选择器树形接口
    getCascaderareaData: {
        path: '/api/v1.0/client/region/queryByCode',
        server: 'wgmsBaseServer',
        params: {
            code: string
        }
    },
    getCascadervalleyData: {
        path: '/api/v1.0/client/watershed/queryByCodes',
        server: 'wgmsBaseServer',
        params: {
            codes: string
        }
    },
    // table测试接口
    realTimeViewLoad: {
        path: '/api/v1/real-time-view/load',
        server: 'wgmsAllWaterMonitorServer',
        method: 'get',
        params: {
            stationCodes: number,
            regionCodes: string,
            watershedCodes: string,
            factorGroupCode: string,
            online: number,
            runState: number,
            controlLevel: string,
            limit: number,
            offset: number
        }
    },
    // 动态列表请求damo
    singleStation: {
        path: '/api/v1.0/report/singleStation',
        server: 'wgmsMonitorDataServer',
        method: 'get',
        params: {
            beginTime: number,
            endTime: number,
            siteId: number,
            queryTimeType: string,
            factorGroupId: number
        }
    },
    // 获取全部因子组接口
    queryFactorGroupByCode: {
        path: '/api/v1.0/factor/functionPoint/queryFactorGroupByCode',
        server: 'wgmsBaseServer',
        method: 'get',
        params: {
            code: string
        }
    }

    // jointList: {
    //     name: 'jointList',
    //     method: 'post',
    //     path: '/solid-waste/joint-list',
    //     server: 'wgmsService',
    //     params: {
    //         pageNum: '',
    //         pageSize: ''
    //     }
    // }
}
export default apiList
