/*
 * @Author: Tian
 * @Date: 2022-06-24 15:29:09
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-05 21:28:06
 * @Description:
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from '@/App.vue'
import router from '@/router'
import { verifyAuth } from '@/utils/auth/SystemAuth'
import { directive } from '@/utils/directive'

// 注册 (函数指令)
// 引入Elmessage的css样式文件  解决element按需引入bug
import 'element-plus/theme-chalk/el-message.css'
verifyAuth().then(() => {
    const app = createApp(App)
    directive(app)

    app.config.errorHandler = (err, vm, info) => {
        console.log('[全局异常]：', err, vm, info)
    }
    for (const [key, component] of Object.entries(ElementPlusIconsVue))
        app.component(key, component)

    app.use(router).use(createPinia())
    app.mount('#app')
})
