import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import '@/paker/style/index.less'

export default defineComponent({
	name: 'App',
	setup() {
		return () => {
			return (
				<>
					<RouterView></RouterView>
				</>
			)
		}
	}
})
