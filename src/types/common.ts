export type globalTs = {
    dayjs: any
}
export type serviceTs = (
    url: string,
    params?: Record<string, any>,
    header?: Record<string, any>,
    type?: string
) => any
export interface tableColumnTs {
    prop: string,
    label?: string,
    width?: string,
    isSlot?: boolean,
    column?: Array<{
        prop: string,
        label?: string
        width?: string
        isSlot?: boolean
        column?: Array<{
            prop: string,
            label?: string
            width?: string
            isSlot?: boolean
        }>
    }>
}