import Vue from 'vue'
import Antd, { notification } from 'ant-design-vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/style/index.less'
import '@/permission'

Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	created() {
		notification.config({ duration: 2 })
	},
	render: h => h(App)
}).$mount('#app')
