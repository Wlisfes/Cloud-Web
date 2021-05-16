<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
	name: 'AppHeader',
	props: {
		active: {
			type: Number,
			default: 0
		}
	},
	setup(props) {
		const state = reactive({
			menu: [
				{ to: '/', active: 1, name: '🍎 首页' },
				{ to: '/Tubook', active: 2, name: '🍀 归档' },
				{ to: '/Titem', active: 3, name: '🍄 项目' },
				{ to: '/Music', active: 4, name: '🍓 音乐' },
				{ to: '/Notes', active: 5, name: '🍒 笔记' },
				{ to: '/Chain', active: 6, name: '🍄 友链' }
			]
		})

		return () => {
			return (
				<div class="app-header">
					<nav class="app-nav">
						{state.menu.map(k => {
							return (
								<div class={`app-nav-item ${props.active === k.active ? 'is-active' : ''}`}>
									{k.name}
								</div>
							)
						})}
					</nav>
				</div>
			)
		}
	}
})
</script>

<style lang="less" scoped>
.app-header {
	height: 46px;
	display: flex;
	position: relative;
	z-index: 99;
	.app-nav {
		display: flex;
		&-item {
			display: flex;
			align-items: center;
			padding: 0 14px;
			cursor: pointer;
			color: #fff;
			position: relative;
			&.is-active {
				&::before {
					content: '';
					position: absolute;
					left: 14px;
					right: 14px;
					bottom: 5px;
					height: 2px;
					border-radius: 1px;
					background-color: #ffffff;
				}
			}
		}
	}
}
</style>
