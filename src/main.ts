import Vue from 'vue'
import Antd, { notification } from 'ant-design-vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/style/index.less'
import 'ant-design-vue/dist/antd.css'
import '@/permission'

Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	created() {
		notification.config({ duration: 1.5 })
	},
	render: h => h(App)
}).$mount('#app')
