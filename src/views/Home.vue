<template lang="pug">
home-page
    template(v-slot:top)
        .left-text  危废联单
        .left-text-btn(@click="goToTable()")  跳转table
        .right-tip 
            el-button(@click="clickDown()") 导出
    template(v-slot:body)
        .home 
            .top-search-line 
                el-input(@change="setSearchForm" placeholder="联单编码" v-model="searchForm.searchName" style="width: 240px;height: 28px;;margin-right: 8px;" :prefix-icon="Search" clearable)
                el-input(@change="setSearchForm" placeholder="产生企业" v-model="searchForm.searchName" style="width: 240px;height: 28px;;margin-right: 8px;" :prefix-icon="Search" clearable)
                el-input(@change="setSearchForm" placeholder="处置企业" v-model="searchForm.searchName" style="width: 240px;height: 28px;margin-right: 8px;" :prefix-icon="Search" clearable)
                el-date-picker.datepicker.datepicker-custom(
                    v-model='searchForm.date',
                    type='monthrange',
                    range-separator='至',
                    :disabled-date='pickerOptions',
                    start-placeholder='开始时间',
                    format='YYYY年MM月',
                    style="width: 320px;height: 28px;"
                    value-format='YYYY-MM',
                    end-placeholder='结束时间')
            .table-body(v-loading="loading" element-loading-text="Loading..."
                :element-loading-spinner="svg"
                element-loading-svg-view-box="-10, -10, 50, 50"
                element-loading-background="rgba(255,255,255,.4)")
                el-table(:data="list" style="width: 100%" height="550" :cell-style="getCellStyle" :header-cell-style="headStyleFun" center empty-text="暂无数据")
                    el-table-column(prop="jointNumber" label="联单编号" width="180")
                    el-table-column(prop="companyName" label="产生企业" width="180")
                    el-table-column(prop="disposalUnitName" label="处置企业")
                    el-table-column(prop="transportUnitName" label="运输单位")
                    el-table-column(prop="licenseNumber" label="车牌号")
                    el-table-column(prop="wasteName" label="废物名称")
                    el-table-column(prop="num" label="转移数量(吨)")
                    el-table-column(prop="receivedQuantity" label="接收数量")
                    el-table-column(prop="transferDate" label="转移时间")
                    el-table-column( label="操作")
                        template(#default="scope")
                            .edit-text(@click="getRowData(scope.row)") 详情
            .list-page(v-if='pageTotal')
                div 
                    el-pagination(layout="prev, pager, next,sizes" 
                    popper-class="transforPage"  
                    pager-count="6" 
                    v-model:page-size="limit" 
                    :page-sizes="[10, 20, 30, 50]"
                    :total="pageTotal" 
                    :current-page='currentSelectedPage' 
                    @current-change='currentChange' 
                    @size-change="currentSizeChange")
            DialogAddEdit(v-model:dialogVisible="dialogVisible" v-model:jointNumber="jointNumber" :detailData="detailData")
</template>

<script lang="ts" setup name="home">
import { globalKey, serviceKey, defaultService } from '@/symbols'
import HomePage from '@/layouts/HomePage.vue'
import { debounce } from '@/utils/tools'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
const global = inject(globalKey)
const $service = inject(serviceKey, defaultService)
const emits = defineEmits(['update:isDown'])
const router = useRouter()
const data = reactive({
    searchForm: {
        searchName: '',
        date: ''
    },
    pickerOptions: (time: Date) => {
        return time.getTime() > Date.now()
    },
    dialogVisible: false,
    limit: 10,
    currentSelectedPage: 1,
    loading: true,
    jointNumber: '',
    pageTotal: 350,
    list: [],
    detailData: {
        num: '',
        receivedQuantity: ''
    },
    svg: `
        <path class="path" d="
        M 30 15
        L 28 17
        M 25.61 25.61
        A 15 15, 0, 0, 1, 15 30
        A 15 15, 0, 1, 1, 27.99 7.5
        L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
    `,
})
const setSearchForm = () => {
    //
}

const headStyleFun = () => {
    return {
        'background-color': '#F7FAFF',
        'text-align': 'center',
        'border-bottom': ' 0px',
        'font-family': 'PingFangSC',
        'font-size': '12px',
        'font-weight': 'Medium',
        'color': '#303133',
    }
}
const getCellStyle = () => {
    return {
        'text-align': 'center',
        'font-family': 'PingFangSC',
        'font-size': '12px',
        'color': '#303133',
    }
}
// 显示详情
const getRowData = (list: any) => {
    data.detailData = {
        num: list.num,
        receivedQuantity: list.receivedQuantity
    }
    data.jointNumber = list.jointNumber
    data.dialogVisible = true
}
// 页码修改
const currentChange = (page: number) => {
    data.currentSelectedPage = page
    getData()
}
// 页码size修改
const currentSizeChange = () => {
    getData()
}
// 请求数据
const getData = () => {
    data.loading = true
    const params = {
        jointNumber: '',
        pageNum: data.currentSelectedPage,
        pageSize: data.limit,
        beginTime: global?.dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss'),
        endTime: global?.dayjs().endOf('year').format('YYYY-MM-DD HH:mm:ss')
    }
    $service('publicMap/jointList', params, {}, 'intercept').then((res: any) => {
        const resData = res.data?.entries ?? []
        data.pageTotal = res.data.total ?? 0
        data.list = resData
        initData()
        data.loading = false
    })
    // 测试请求
    $service('publicMap/getJsonTest').then((res: any) => {
        // console.log(res,'res')
    })
}
// 数据格式规范
const initData = () => {
    data.list.forEach((item: Record<string, null | string>) => {
        for (const j in item) {
            if (item[j] === 'null' || !item[j]) item[j] = '--'
        }
    })

}
// 下载方法
const handleDownload = () => {
    import('@/utils/vendor/Export2Excel.js' as any).then((excel: any) => {
        //excle表头
        const tHeader = ['联单编号', '产生企业', '处置企业', '运输单位', '车牌号', '废物名称', '转移数量(吨)', '接收数量', '转移时间']
        //返回数据的key
        const filterVal = ['jointNumber', 'companyName', 'disposalUnitName', 'transportUnitName', 'licenseNumber', 'wasteName', 'num', 'receivedQuantity', 'transferDate']
        //后台查询到的list
        const list = data.list
        const datas = formatJson(filterVal, list)
        excel.export_json_to_excel({
            header: tHeader,//表头
            data: datas, //数据
            filename: '危废联单',//导出文件名
            autoWidth: true,//导出宽度自动
            bookType: 'xlsx'//导出后缀
        })
        emits('update:isDown', false)
    })
}
// 下载节流点击
const clickDown = debounce(handleDownload, true)
// 跳转table页
const goToTable = () => {
    router.push({
        path: '/fpi-table',
    })
}
const formatJson = (filterVal: any, jsonData: any) => {
    return jsonData.map((v: any) => filterVal.map((j: any) => v[j]))
}
getData()
const { jointNumber, detailData, pickerOptions, limit, pageTotal, currentSelectedPage, list, searchForm, dialogVisible, loading, svg } = toRefs(data)
</script>
<style lang="scss" scoped>
.left-text{
    font-family: PingFangSC;
    font-size: 20px;
    font-weight: Medium;
    letter-spacing: 0px;
    color: #FFFFFF;
}
    
.left-text-btn{
    font-family: PingFangSC;
    font-size: 20px;
    padding: 5px 8px;
    font-weight: Medium;
    letter-spacing: 0px;
    color: #FFFFFF;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,.6);
    border-radius: 5px ;
}
    
.home{
     padding: 16px 16px 0 16px;
     input {
         margin-right: 8px ;
     }
       
    .table-body{
        margin-top: 12px;
        .edit-text{
            font-family: PingFangSC;
            font-size: 12px;
            cursor: pointer;
            letter-spacing: 0px;
            color: #0062FF;
        }
            
        .header-cell-table{
            text-align: center;
            background: #F7FAFF;
        }
           
        thead{
             :deep(.el-table__cell){
                background-color: red;
             }
                
        }
           
    }
        
        
}
   
    
:deep(.el-input__inner){
    font-size: 12px;
}
    
:deep(.el-range-input){
    font-size: 12px;
}
    
.list-page{
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    margin-top: 10px;
}
    
</style>
