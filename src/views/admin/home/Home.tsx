import { Vue, Component } from 'vue-property-decorator'
import { Button } from 'ant-design-vue'
import router from '@/router'

@Component
export default class Home extends Vue {
	private addRoute() {
		router.addRoute({
			path: '/admin/tag',
			redirect: '/admin/tag/user1',
			component: () => import('@/Layout/admin'),
			children: [
				{
					path: '/admin/tag/user1',
					name: 'tag-User1',
					meta: { title: 'User1', affix: true },
					component: () => import('@/views/admin/user/User')
				},
				{
					path: '/admin/tag/user2',
					name: 'tag-User2',
					meta: { title: 'User2', affix: true },
					component: () => import('@/views/admin/user/User')
				}
			]
		})
	}

	protected render() {
		return (
			<div>
				Home
				<Button onClick={this.addRoute}>addRoutes</Button>
				<Button onClick={() => router.push(`/admin/tag`)}>addRoutes</Button>
			</div>
		)
	}
}
