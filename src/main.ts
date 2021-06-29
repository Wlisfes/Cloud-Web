import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/style/index.less'
import 'ant-design-vue/dist/antd.css'
import '@/permission'

Vue.use(Antd)
Vue.config.productionTip = false
console.log(process.env)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
