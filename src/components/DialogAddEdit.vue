<template lang="pug">
el-dialog( v-model="dialogVisible" top="9vh" title="联单详情" @close="dialogClose" width="840px" :close-on-click-modal="false")
    .dia-top
        .tips-box(v-for="item in DialogAddEditData" :key="item.props")
            .label {{ item.label }}
            .value-box {{ form[item.props] }}
        .tips-box
    .table-box
        el-table(:data="form.wasteList" style="width: 100%" height="120" :cell-style="getCellStyle" :header-cell-style="headStyleFun" center empty-text="暂无数据")
            el-table-column(prop="wasteName" label="废物名称")
            el-table-column(prop="wasteCode" label="废物代码")
            el-table-column(prop="disposalMethod" label="处置方式")
            el-table-column(prop="num" label="转移数量")
            el-table-column(prop="receivedQuantity" label="接收数量")
</template>

<script setup lang="ts" name="DialogAddEdit">
import { DialogAddEditData } from '@/utils/staticData'
import * as service from '@/service/apis/public'

const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: true
    },
    jointNumber: {
        type: String,
        default: ''
    },
    detailData: {
        type: Object,
        default: () => {
            return {
                num: '',
                receivedQuantity: ''
            }
        }
    }
})

const emits = defineEmits(['update:dialogVisible', 'update:jointNumber'])

watch(() => props.jointNumber, (val) => {
    if (!val)
        clearData()
    else getData(val)
})
const data: {
    form: Record<string, any>
} = reactive({
    form: {
        disposalTime: '',
        disposalUnitCode: '-',
        disposalUnitLatitude: '',
        disposalUnitLongitude: '',
        disposalUnitName: '',
        disposalUnitTel: '',
        generatingUnitAddress: '',
        generatingUnitCode: '',
        generatingUnitLatitude: '',
        generatingUnitLongitude: '',
        generatingUnitName: '',
        generatingUnitTel: '',
        jointNumber: '',
        jointSerialNumber: '',
        receiver: '',
        shipper: '',
        transferTime: '',
        transportName: '',
        transportTel: '',
        transportTime: '',
        transportUnitCode: '',
        transportUnitName: '',
        transportUnitTel: '',
        vehicleNum: '',
        receivedQuantity: '',
        num: '',
        wasteList: []
    }
})
// 清除数据
const clearData = () => {
    for (const i in data.form) {
        if (i === 'wasteList')
            data.form[i] = []
        else (data.form as Record<string, string | null | any[]>)[i] = ''
    }
}
// 关闭按钮
const dialogClose = () => {
    emits('update:jointNumber', '')
    emits('update:dialogVisible', false)
}
const getCellStyle = () => {
    return {
        'text-align': 'center',
        'font-family': 'PingFangSC',
        'font-size': '12px',
        'color': '#303133',
    }
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
// 请求详情
const getData = async (val: string) => {
    const params = {
        jointNumber: val
    }
    service.jointDetail(params).then((res) => {
        data.form = res.data || {}
        data.form.num = props.detailData.num
        data.form.receivedQuantity = props.detailData.receivedQuantity
        initData()
    })
}
// 数据格式规范
const initData = () => {
    for (const i in data.form) {
        if (i === 'wasteList') {
            data.form[i].forEach((item: Record<string, null | string>) => {
                for (const j in item) {
                    if (item[j] === 'null' || !item[j])
                        item[j] = '--'
                }
            })
        }
        else if ((data.form as Record<string, string | null | any[]>)[i] === 'null' || !(data.form as Record<string, string | null | any[]>)[i]) { (data.form as Record<string, string | null | any[]>)[i] = '--' }
    }
}
const { form } = toRefs(data)
</script>

<style lang="scss" scoped>
.dia-top {
    display: flex;
    flex-wrap: wrap;
    padding: 0 54px 0 10px;
    margin-top: -10px;

    .tips-box {
        display: flex;
        flex: 1;
        align-items: center;
        margin-bottom: 16px;

        .label {
            flex: 1.1;
            font-family: PingFangSC;
            font-size: 14px;
            color: #303133;
            text-align: right;
        }

        .value-box {
            box-sizing: border-box;
            flex: 2;
            width: 240px;
            height: 28px;
            padding-left: 12px;
            font-family: PingFangSC;
            font-size: 12px;
            line-height: 28px;
            color: #303133;
            letter-spacing: 0;
            background: #fff;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
        }
    }
}

.table-box {
    padding: 0 35px;
}
</style>
