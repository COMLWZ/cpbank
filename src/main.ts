import { createApp } from 'vue'
import App from './App.vue'
// 重置样式
import '@/assets/css/reset.css'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
