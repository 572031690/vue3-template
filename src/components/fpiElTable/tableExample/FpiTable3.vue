<!--
 * @Author: mjh
 * @Date: 2022-08-19 09:31:37
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-05 21:16:58
 * @Description:
-->
<template lang="pug">
FpiElTableVue(
    :column="column"
    :ref="el => data.fpiElTableDom = el"
    :api="request.realTimeViewLoad"
    resExpr="rows"
    pageTotalExpr="total"
    :currentPageOffset="-1"
    :pageReqExpr="{ pageSizes: 'limit', currentPage:'offset'}"
    max-height="550"
    :params="params"
    )
    template(#expand-slot="props")
        div
            h3 dataTimeType: {{ props.row.dataTimeType }}
            h3 name: {{ props.row.name }}
            h3 grade: {{ props.row.grade }}
            h3 dateTime: {{ props.row.dateTime }}
</template>

<script lang="ts" setup name="FpiTable3">
import type { tableColumnTs } from '../types'
import FpiElTableVue from '../FpiElTable.vue'
import * as request from '@/service/apis/public'

// 只需type为expand即可   原element-plus组件展开行数据唯一 多个展开行的数据最后展示的都一样
// 所以此组件expand只能有一个不能多个

import { globalKey } from '@/symbols'
const global = inject(globalKey)

const data = reactive({
    column: [
        {
            label: '简介',
            column: [
                {
                    type: 'expand',
                    label: '展开',
                    width: '50',
                },
                {
                    prop: 'code',
                    label: '车牌',
                },
            ]
        },

        {
            prop: 'dataTimeType',
            label: '联单编号',
            width: '300',
        },
        {
            prop: 'name',
            label: '名称',
            width: '200',
        },
        {
            prop: 'grade',
            label: '等级',
            width: '200',
        },
        {
            prop: 'dateTime',
            label: '日期',
            width: '300',
        }
    ] as tableColumnTs[],
    fpiElTableDom: ref(),
    params: {
        stationCodes: 1,
        regionCodes: '330100000000',
        watershedCodes: 'GA',
        factorGroupCode: 'WMS_SHOWITCODE',
        online: -1,
        runState: -1,
        controlLevel: '001',
    },
})

const { column, params } = toRefs(data)
</script>

