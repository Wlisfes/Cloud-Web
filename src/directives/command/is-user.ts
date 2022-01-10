import { Vue } from 'vue-property-decorator'
import store from '@/store'

Vue.directive('user', {
	bind(el, bind, vnode) {
		const { uid, onClick } = bind.value
		if (store.state.user.uid === uid) {
			el.setAttribute('role', 'user')
			if (typeof onClick === 'function') {
				el.onclick = onClick
			}
		}
	}
})
