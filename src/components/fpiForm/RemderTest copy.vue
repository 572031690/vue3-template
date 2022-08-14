<template lang="pug">
FpiFormItemNodess
</template>

<script lang="ts">
import { createApp, h, render } from 'vue'
import { ElButton } from 'element-plus'

// export default {
//     name: 'MyInput',
//     props: ['modelValue'],
//     render(){
//         return h('input',{
//             modelValue: this.modelValue,
//             onInput: ($event) => {this.$emit('update:modelValue', $event.target.value)}
//         })
//     }
// }

const app = createApp({})
app.component('FpiFormItemNodess', {
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  render() {
    return h(
      ElButton, // tag name
      {},
       // props/attributes
      this.$slots.default() // array of children
    )
  }
})
// const props = defineProps({
//     level: {
//       type: Number,
//       required: true
//     }
// })
// const FpiFormItemNode = {
//   render: () => {
//     return h(
//       // 1. 要渲染的标签名称：第一个参数【必需】
//       ElButton,
//       // 2. 渲染标签的属性：第二个参数【可选】
//       {
//         // style: {
//         //   color: "#333",
//         //   border: "1px solid #ccc",
//         // },
//         class: "",
//         type:"primary",
//         id: "",
//         onClick: changeNum,
//       },
//       // 3. 渲染标签的子元素数组：第三个参数【可选】
//       props.level
//     //   [
//     //     // "render函数文本" 文本内容可以直接写入
//     //     h("p", num.value), // h()创建的VNodes
//     //   ]
//     )
//   },
// }
 
// const num = ref(0) // vue3中需要使用ref或reactive声明变量，否则无法实现双向数据绑定
// const changeNum = () => {
//     num.value++ // 改变ref定义的变量值需要使用.value , reactive不需要 
// }
 

</script>