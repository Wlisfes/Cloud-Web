import { Vue, Component, Prop } from 'vue-property-decorator'
import { useInstance, VMInstance, VMInstanceProps } from '@/utils/instance'
import { Modal, Button, Spin, FormModel, Select, Pagination } from 'ant-design-vue'
import { Image, SkeletonItem } from 'element-ui'
import { nodePosters } from '@/api'
import { HttpStatus, Source, NodePoster } from '@/types'
import style from '@/style/common/app.poster.module.less'
type SourceOption = {
	option: {
		status: number | undefined
		type: number | undefined
	}
}

export interface InitPosterProps extends VMInstanceProps {
	multiple: boolean
}

export function init(props?: InitPosterProps): Promise<VMInstance> {
	const { onMounte, onUnmounte } = useInstance()

	@Component
	class NodePosterModal extends Vue {
		private visible: boolean = false
		private current: NodePoster[] = []
		private source: Source<Array<NodePoster>> & SourceOption = {
			column: [],
			page: 1,
			size: 12,
			total: 0,
			sizeOption: ['10', '20', '30', '40', '50'],
			showSize: true,
			loading: true,
			dataSource: [],
			option: {
				status: undefined,
				type: 3
			},
			initSource: async () => {
				try {
					this.source.loading = true
					const { source } = this
					const { code, data } = await nodePosters({
						page: source.page,
						size: source.size,
						status: source.option.status,
						type: source.option.type
					})
					if (code === HttpStatus.OK) {
						this.source.total = data.total
						this.source.dataSource = data.list
					}
				} catch (e) {}
				this.source.onClose()
			},
			onClose: () => {
				this.source.loading = false
			},
			onChange: pagination => {
				this.source.page = pagination.current
				this.source.size = pagination.pageSize
				this.source.initSource()
			},
			onReset: () => {
				this.source.option.status = undefined
				this.source.option.type = 3
				this.source.onSearch?.()
			},
			onSearch: () => {
				this.source.page = 1
				this.source.size = 12
				this.source.total = 0
				this.source.initSource()
			}
		}

		/**选择图片、取消图片事件**/
		private onSelect(node: NodePoster) {
			const active = this.current.some(k => k.id === node.id)
			if (props?.multiple) {
				//可多选
				if (active) {
					this.current = this.current.filter(k => k.id !== node.id)
				} else {
					this.current.push(node)
				}
			} else {
				//单选
				this.current = active ? [] : [node]
			}
		}

		/**组件挂载**/
		protected mounted() {
			onMounte().finally(() => {
				this.visible = true
				this.source.initSource()
			})
		}

		/**组件卸载**/
		private onUnmounte(key: 'submit' | 'close') {
			if (key === 'submit') {
				this.$emit(key, {
					props: props?.multiple ? this.current : this.current[0] || null,
					done: (delay?: number) => {
						onUnmounte({ el: (this as any)._vnode.elm.parentNode, remove: true, delay }).finally(() => {
							this.visible = false
						})
					}
				})
			} else {
				onUnmounte({ el: (this as any)._vnode.elm.parentNode, remove: true }).finally(() => {
					this.$emit(key, () => {
						this.visible = false
					})
				})
			}
		}

		protected render() {
			const { source } = this

			return (
				<Modal
					dialogStyle={{ maxWidth: '95%', paddingBottom: 0 }}
					v-model={this.visible}
					width={840}
					closable={false}
					centered
					destroyOnClose
					onCancel={() => this.onUnmounte('close')}
				>
					<Spin class="ant-spin-64" spinning={source.loading}>
						<div class={style['app-poster']}>
							<FormModel layout="inline" class={style['node-source']}>
								<div class="node-source-item inline-50">
									<FormModel.Item>
										<Select
											v-model={source.option.type}
											placeholder="图片类型"
											style={{ width: '150px' }}
										>
											<Select.Option value={1}>avatar</Select.Option>
											<Select.Option value={2}>upload</Select.Option>
											<Select.Option value={3}>cover</Select.Option>
											<Select.Option value={4}>photo</Select.Option>
										</Select>
									</FormModel.Item>
									<FormModel.Item>
										<Select
											v-model={source.option.status}
											allowClear
											placeholder="图片状态"
											style={{ width: '150px' }}
										>
											<Select.Option value={0}>已禁用</Select.Option>
											<Select.Option value={1}>已启用</Select.Option>
											<Select.Option value={2}>已删除</Select.Option>
										</Select>
									</FormModel.Item>
								</div>
								<FormModel.Item>
									<Button type="primary" onClick={this.source.onSearch}>
										查找
									</Button>
								</FormModel.Item>
								<FormModel.Item>
									<Button onClick={this.source.onReset}>重置</Button>
								</FormModel.Item>
								<FormModel.Item style={{ marginRight: 0 }}>
									<Button onClick={() => this.source.initSource()}>刷新</Button>
								</FormModel.Item>
							</FormModel>
							<div class={style['app-poster-conter']}>
								{source.dataSource.map(k => {
									const active = this.current.some(v => v.id === k.id)
									return (
										<div key={k.id} class={style['app-poster-item']}>
											<div class={style['node-poster']}>
												<div
													class={style['node-poster-conter']}
													onClick={() => this.onSelect(k)}
												>
													<div
														class={style['node-poster-border']}
														style={{ borderColor: active ? 'red' : '#ffffff' }}
													>
														<Image
															fit="cover"
															style={{ width: '100%', height: '100%' }}
															src={`${k.url}?x-oss-process=style/resize`}
														>
															<SkeletonItem
																slot="placeholder"
																variant="image"
																style={{ width: '100%', height: '100%' }}
															></SkeletonItem>
															<SkeletonItem
																slot="error"
																variant="image"
																style={{ width: '100%', height: '100%' }}
															></SkeletonItem>
														</Image>
													</div>
												</div>
											</div>
										</div>
									)
								})}
							</div>
							{source.total > 0 && (
								<div class={style['app-poster-footer']}>
									<Pagination
										current={source.page}
										pageSize={source.size}
										total={source.total}
										pageSizeOptions={source.sizeOption}
										onChange={(current: number, pageSize: number) => {
											source.onChange?.({
												current,
												pageSize,
												pageSizeOptions: [],
												showSizeChanger: false,
												total: source.total
											})
										}}
									></Pagination>
								</div>
							)}
						</div>
					</Spin>
					<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
						<Button onClick={() => this.onUnmounte('close')}>取消</Button>
						<Button
							type="primary"
							disabled={this.current.length === 0}
							onClick={() => this.onUnmounte('submit')}
						>
							确定
						</Button>
					</div>
				</Modal>
			)
		}
	}

	return new Promise(resolve => {
		const NodeComponent = Vue.extend(NodePosterModal)
		const node = new NodeComponent().$mount(document.createElement('div'))
		if (typeof props?.getContainer === 'function') {
			props.getContainer().appendChild?.(node.$el)
		} else {
			document.body.appendChild(node.$el)
		}

		resolve(node as NodePosterModal)
	})
}
