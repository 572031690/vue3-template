<template lang="pug">
el-button( @click="setCurrent(1)") 单选选中第二行
el-button(  @click="setCurrent()" ) 清除单选 
el-button( @click="toggleSelection([1, 2])") 复选选中第二三行
el-button(  @click="toggleSelection()" ) 清除复选 
el-button(  @click="toggleSelection('all')" ) 复选全选或全不选 
fpi-el-table(
    :column="column"
    border
    :ref="el => data.fpiElTableDom = el"
    :tableData="list"
    max-height="400"
    highlight-current-row
    :page-params="pageParams"
    @page-change="pageChange"
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    )

</template>

<script lang="ts" setup name="FpiTable15">
import { globalKey, serviceKey, defaultService } from '@/symbols'
const $global = inject(globalKey)
const $service = inject(serviceKey, defaultService)

interface columDataTs {
    [key: string]: any
    companyCode: null,
    companyName: string,
    disposalUnitCode: null,
    disposalUnitName: null,
    generatingUnitCode: null,
    generatingUnitName: null,
    jointNumber: string,
    jointSerialNumber: string,
    licenseNumber: string,
    num: string,
    receivedQuantity: string,
    transferDate: string,
    wasteName: string,
}
// 过滤数据
const data = reactive({
    column: [
        {
            type: 'selection',
            width: '50',
            label: '',
        },
        {
            type: 'index',
            label: '序号',
            width: '100',
        },
        {
            prop: 'code',
            label: '车牌',
            width: '100',
        },
        {
            prop: 'name',
            width: '300',
            label: '联单编号',
        },
        {
            prop: 'grade',
            width: '300',
            label: '数量',
        },
        {
            prop: 'dateTime',
            width: '250',
            label: 'receivedQuantity数量',
        },
        {
            prop: 'dateTime',
            label: 'receivedQuantity数量',
        },

    ],
    fpiElTableDom: ref(),
    pageParams: {
        currentPage:1,
        total: 0,
        pageSizes: 10,
    },
    list:[]
})
onMounted(() => {
    getData()
})
// 请求数据
const getData = () => {
    data.fpiElTableDom.changeLoading(true)
    const params = {
        stationCodes: 1,
        regionCodes: '330100000000',
        watershedCodes: 'GA',
        factorGroupCode: 'WMS_SHOWITCODE',
        online: -1,
        runState: -1,
        controlLevel: '001',
        offset: data.pageParams.currentPage - 1,
        limit: data.pageParams.pageSizes,
    }
    $service('publicMap/realTimeViewLoad', params, {}, 'intercept').then((res: any) => {
        data.pageParams.total = Number(res.total) ?? 0
        data.list = res.rows || []
        data.fpiElTableDom.changeLoading(false)
    })

}
const pageChange = (pageObj: {
    currentPage:number
    total: number
    pageSizes: number
}) => {
    data.pageParams.pageSizes = pageObj.pageSizes
    data.pageParams.currentPage = pageObj.currentPage
    getData()
}

// 单选设置点击选中
// 静态数据模式时只支持number
const setCurrent = (row?: columDataTs|number) => {
  data.fpiElTableDom && data.fpiElTableDom.setCurrentRow(row)
}

/**
 * @desc 复选框手动调用方法
 * @param rows  undefined 清除选中  'all' 全选获不全选会自动取反 
 * rows传数组 可以是对应的对象（静态模式不可用对象）也可以是对应的index(0开始)选中对应列
 */
const toggleSelection = (rows?: any[] | 'all') => {
  data.fpiElTableDom && data.fpiElTableDom.toggleSelection(rows)
}
// 单选点击回调
const handleCurrentChange = (val: any | undefined, old: any) => {
    console.log('此次单选选中：',val,'上次单选选中：', old, '单选')
}
// 多选点击回调
const handleSelectionChange = (val: any[]) => {
    console.log(val, '复选')
}
const { column, list, pageParams } = toRefs(data)
</script>

