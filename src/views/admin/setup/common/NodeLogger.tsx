import { Vue, Component } from 'vue-property-decorator'
import { Modal, Spin, Button, Tag } from 'ant-design-vue'
import { nodeLogger } from '@/api'
import { HttpStatus, LoggerResponse } from '@/types'
import style from '@/style/admin/admin.logger.module.less'

@Component
export default class NodeLogger extends Vue {
	private visible: boolean = false
	private loading: boolean = true
	private node: null | LoggerResponse = null

	private createMethod(method: string): JSX.Element | undefined {
		switch (method.toLocaleUpperCase()) {
			case 'GET':
				return <Tag color="blue">GET</Tag>
			case 'POST':
				return <Tag color="green">POST</Tag>
			case 'DELETE':
				return <Tag color="red">DELETE</Tag>
			case 'PUT':
				return <Tag color="orange">PUT</Tag>
		}
	}

	/**Logger信息**/
	private nodeLogger(id: number) {
		return new Promise(async (resolve, rejcect) => {
			try {
				const { code, data } = await nodeLogger({ id })
				if (code === HttpStatus.OK) {
					this.node = data
				}
				resolve(data)
			} catch (e) {
				rejcect(e)
			}
		})
	}

	/**组件调用**/
	public init(id: number) {
		try {
			this.loading = true
			this.visible = true
			this.nodeLogger(id).finally(() => {
				this.loading = false
			})
		} catch (e) {
			this.loading = false
		}
	}

	/**取消重置**/
	private onClose() {
		this.visible = false
		this.loading = true
	}

	protected render() {
		const { node } = this
		return (
			<Modal
				title="Logger详情"
				dialogStyle={{ maxWidth: '95%' }}
				v-model={this.visible}
				width={880}
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin class="ant-spin-64" spinning={this.loading}>
					<div class={style['node-logger']}>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>来源地址</div>
							<div class={style['item-value']}>
								<div class={`${style['item-pre']} app-ellipsis`}>{node?.referer}</div>
							</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>来源ip</div>
							<div class={style['item-value']}>
								<div class={`${style['item-pre']} app-ellipsis`}>{node?.ip}</div>
							</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>请求地址</div>
							<div class={style['item-value']}>
								<div class={`${style['item-pre']} app-ellipsis`}>{node?.path}</div>
							</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>请求类型</div>
							<div class={style['item-value']}>{this.createMethod(node?.method || 'GET')}</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>请求状态</div>
							<div class={style['item-value']}>
								{node?.type === 1 ? <Tag color="green">success</Tag> : <Tag color="pink">error</Tag>}
							</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>状态码</div>
							<div class={style['item-value']}>{node?.code}</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>状态描述</div>
							<div class={style['item-value']}>{node?.message}</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>请求时间</div>
							<div class={style['item-value']}>
								<div class={`${style['item-pre']} app-ellipsis`}>{node?.createTime}</div>
							</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>请求用户</div>
							<div class={style['item-value']}>
								{node?.user && (
									<div class={`${style['item-pre']} app-ellipsis`}>
										<a>{node.user.nickname}</a>
										<span style={{ marginLeft: '10px' }}>{node.user.uid}</span>
									</div>
								)}
							</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>body参数</div>
							<div class={style['item-value']}>
								<div class={`${style['item-pre']} app-ellipsis`}>{JSON.stringify(node?.body)}</div>
							</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>query参数</div>
							<div class={style['item-value']}>
								<div class={`${style['item-pre']} app-ellipsis`}>{JSON.stringify(node?.query)}</div>
							</div>
						</div>
						<div class={style['node-logger-item']}>
							<div class={style['item-label']}>params参数</div>
							<div class={style['item-value']}>
								<div class={`${style['item-pre']} app-ellipsis`}>{JSON.stringify(node?.params)}</div>
							</div>
						</div>
					</div>
				</Spin>
				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>关闭</Button>
				</div>
			</Modal>
		)
	}
}
