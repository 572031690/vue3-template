export default class Base {
    /* 水模块 */
    static wgmsService = 'prj-hy-wgms-screen-server'
    static wgmsBspService = 'bsp-permission-server'
    static wgmsAllWaterMonitorServer = 'wgms-all-water-monitor-server'
    static wgmsMonitorDataServer = 'wgms-monitor-data-server'
    static wgmsBaseServer = 'wgms-base-server'
    static wgmsBasicInfoServer = 'basic-information-manager-server'
}

export const typeObj = {
    string:'string',
    number: 'number',
    object: 'object',
    array: 'array',
    boolean: 'boolean',
    any: 'any',
    'undefined': 'undefined',
    'null': 'null'
}
