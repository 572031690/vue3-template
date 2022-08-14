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
    mapLoadComplete: boolean
    _imgSourcePath: any
    _mapLayerIdArr: any
    locationMarkerWithCircle: any
    clickPointMarker: any
    _mapClusterNameArr: any
    _mapMarkerObjArr: any
    sampleMarker: any
    waterLinkPopup: any
    allHtmlMarkerArr: any
    store: any
    windLayer: any
    fpiHkVideo: any
    rankMarkers: any
    axiosCancel: any
    gasLinkPopup: any
    echartslayer: any // 危废运输迁徙图
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