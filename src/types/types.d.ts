/*
 * @Author: mjh
 * @Date: 2022-10-21 20:44:00
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-22 08:12:11
 * @Description: 
 */
declare module '*.yml' {
    const datas: any
    export default datas
}
declare module 'lodash-es'

declare const mapboxgl: any

declare const turf: any

declare interface Window {
    glMap: any
    glPopup: any
    glTooltip: any
    inspectPopup: any
    _imgSourcePath: any
    _mapLayerIdArr: any
    locationMarkerWithCircle: any
    clickPointMarker: any
    _mapMarkerObjArr: any
    echartslayer: any // 危废运输迁徙图
    countryMarker: any
    checkMarker: any // 未处置点位样式
}
declare const mapboxWind: any

declare interface echarts {
    glMap: any
}

// 海康视频
declare const JSEncrypt: any
declare const WebControl: any
declare const showCBInfo: (str: string) => void


type record = Record<string, any>
type recordt<T> = Record<string, T>

type Arrayable<T> = T | T[]