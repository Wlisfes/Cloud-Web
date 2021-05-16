<script>
import { defineComponent, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { AppHeader } from '@/Layout/web/common'

export default defineComponent({
	name: 'Layout',
	setup() {
		const route = useRoute()
		const store = useStore()
		store.dispatch('root/banner')

		const curr = computed(() => store.getters['root/curr'])
		const appStyle = computed(() => {
			if (curr.value) {
				return { backgroundImage: `url('/bing${curr.value.url}')` }
			}
			return {}
		})

		return () => {
			return (
				<section class="app-layout" style={appStyle.value}>
					<AppHeader active={route.meta.active}></AppHeader>
					<div class="app-layout-router">
						<RouterView></RouterView>
					</div>
				</section>
			)
		}
	}
})
</script>

<style lang="less" scoped>
.app-layout {
	height: 100%;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	position: relative;
	display: flex;
	flex-direction: column;
	transition: all 300ms;
	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: -webkit-radial-gradient(50% 50%, ellipse closest-corner, transparent 10%, #07111b 90%);
	}
	&-router {
		flex: 1;
		z-index: 99;
	}
}
</style>
