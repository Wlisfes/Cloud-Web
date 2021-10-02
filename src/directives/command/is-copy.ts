import { Vue } from 'vue-property-decorator'
import { notification } from 'ant-design-vue'
import Clipboard from 'clipboard'

Vue.directive('copy', {
	bind(el, bind, vnode) {
		const { value } = bind
		const instance = new Clipboard(el, { text: trigger => value })
		instance.on('success', e => {
			e.clearSelection()
			notification.success({ message: '复制成功', description: '', duration: 1 })
		})
		instance.on('error', e => {
			e.clearSelection()
			notification.error({ message: '复制失败', description: '', duration: 1 })
		})
	}
})
