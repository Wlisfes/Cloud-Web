<script>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons-vue'
import day from 'dayjs'

export default defineComponent({
	name: 'AppHome',
	setup() {
		const store = useStore()
		const time = ref(null)
		const curr = computed(() => store.getters['root/curr'])

		const createTime = () => {
			time.value = day().format('YYYY/MM/DD - HH:mm:ss')
			setTimeout(() => createTime(), 1000)
		}
		createTime()

		const onPrve = () => store.commit('root/SET_PRVE')
		const onNext = () => store.commit('root/SET_NEXT')

		return () => {
			return (
				<div class="app-conter">
					<div class="app-conter-context">
						<div class="describe">
							<div style="font-size: 22px;">{time.value}</div>
							<div>{curr.value?.copyright}</div>
						</div>
					</div>
					<div class="app-conter-curr">
						<StepBackwardOutlined class="curr-icon" onClick={onPrve} />
						<StepForwardOutlined class="curr-icon" onClick={onNext} />
					</div>
					<footer class="app-conter-footer">
						Swpe Ant Design ©2019 Created by Wlisfes粤ICP备18016996号-1
					</footer>
				</div>
			)
		}
	}
})
</script>

<style lang="less" scoped>
.app-conter {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	&-context {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.describe {
			font-size: 16px;
			color: #fff;
			line-height: 1.5;
			div {
				margin: 12px;
			}
		}
	}
	&-curr {
		padding: 40px;
		display: flex;
		justify-content: flex-end;
		.curr-icon {
			font-size: 40px;
			color: #ffffff;
			cursor: pointer;
			margin: 0 10px;
		}
	}
	&-footer {
		height: 32px;
		background-color: rgba(51, 51, 51, 0.5);
		color: #666;
		text-align: center;
		font-size: 14px;
		line-height: 32px;
		user-select: none;
		cursor: pointer;
	}
}
</style>
