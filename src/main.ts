import { createApp } from 'vue'
import App from '@/App'
import router from '@/router'
import store, { key } from '@/store'
import '@/permission'

createApp(App).use(store, key).use(router).mount('#app')
