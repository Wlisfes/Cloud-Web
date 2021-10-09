import Vue from 'vue'
import { notification, Modal } from 'ant-design-vue'
import { Loading } from 'element-ui'
import mavonEditor from 'mavon-editor'
import Vconsole from 'vconsole'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/directives'
import '@/permission'
import '@/style/index.less'

Vue.use(Modal)
Vue.use(Loading)
Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vconsole()

new Vue({
	router,
	store,
	async created() {
		notification.config({ duration: 2 })
		store.dispatch('banner/initBanner')
		store.dispatch('app/initApp').then(state => {})
	},
	render: h => h(App)
}).$mount('#app')
