/*
 * @Author: Tian
 * @Date: 2022-06-24 15:29:09
 * @LastEditors: Tian
 * @LastEditTime: 2022-07-05 19:56:51
 * @Description: 
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { verifyAuth } from '@/utils/auth/SystemAuth'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入Elmessage的css样式文件  解决element按需引入bug
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-table.css'
verifyAuth().then(() => {
    const app = createApp(App)
    app.config.errorHandler = (err, vm, info) => {
        console.log('[全局异常]：', err, vm, info)
    }
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    app.use(router).use(createPinia())
    app.mount('#app')
})
