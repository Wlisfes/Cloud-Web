import Vue from 'vue'
import { notification, Modal } from 'ant-design-vue'
import mavonEditor from 'mavon-editor'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/style/index.less'
import '@/permission'

Vue.use(Modal)
Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	async created() {
		notification.config({ duration: 2 })
		store.dispatch('banner/initBanner')
	},
	render: h => h(App)
}).$mount('#app')
