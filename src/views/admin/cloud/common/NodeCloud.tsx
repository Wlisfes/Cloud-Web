import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, InputNumber, Modal, Radio, Select } from 'ant-design-vue'
import { Button, Switch, Spin, notification } from 'ant-design-vue'
import { AppCover } from '@/components/common'
import { NodeUpload } from '@/views/admin/cloud/common'
import { nodeCloud, nodeCreateCloud, nodeUpdateCloud, nodeMultipleClouds, nodeCloudSources } from '@/api'
import { HttpStatus, NodeCloud, NodeCloudSource } from '@/types'

@Component
export default class NodeSource extends Vue {
	$refs!: { form: FormModel; nodeUpload: NodeUpload }

	private visible: boolean = false
	private loading: boolean = false
	private upload: boolean = false
	private active: string = 'create'
	private sources: NodeCloudSource[] = []
	private multiple: NodeCloud[] = []
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			id: 0,
			type: 1,
			title: '',
			cover: '',
			description: '',
			status: true,
			order: 0,
			source: [],
			parent: undefined,
			size: 0,
			key: '',
			name: '',
			path: ''
		},
		rules: {
			title: [{ required: true, message: '请输入媒体标题', trigger: 'blur' }],
			cover: [{ required: true, message: '请上传媒体封面', trigger: 'blur' }],
			status: [{ required: true, message: '请选择媒体状态', trigger: 'blur' }],
			key: [{ required: true, message: '请上传媒体文件', trigger: 'blur' }]
		}
	}

	/**媒体上传操作**/
	private onSubmitUpload(props?: { key: string; path: string; file: File }) {
		this.state.form.key = props?.key || ''
		this.state.form.path = props?.path || ''
		this.state.form.name = props?.file.name || ''
		this.state.form.size = props?.file.size || 0
		this.upload = props?.key ? false : true
	}

	/**分类标签列表**/
	private async nodeCloudSources() {
		try {
			const { code, data } = await nodeCloudSources({ page: 1, size: 200, status: 1 })
			if (code === HttpStatus.OK) {
				this.sources = data.list
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**多集媒体目录列表**/
	private async nodeMultipleClouds() {
		try {
			const { code, data } = await nodeMultipleClouds({ page: 1, size: 200 })
			if (code === HttpStatus.OK) {
				this.multiple = data.list
			}
		} catch (e) {
			return e
		}
	}

	/**音视频信息**/
	private async nodeCloud(id: number) {
		try {
			const { code, data } = await nodeCloud({ id })
			if (code === HttpStatus.OK) {
				this.state.form = Object.assign(this.state.form, {
					type: data.type,
					title: data.title,
					cover: data.cover,
					description: data.description,
					status: data.status === 1,
					order: data.order,
					source: data.source.map(k => k.id),
					parent: data.parent?.id || undefined,
					key: data.key,
					name: data.name,
					path: data.path
				})
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**修改音视频媒体**/
	private async nodeUpdateCloud() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeUpdateCloud({
				id: form.id,
				type: form.type,
				title: form.title,
				cover: form.cover,
				status: +form.status,
				order: form.order,
				description: form.description || null,
				parent: form.parent || null,
				source: form.source || [],
				size: form.size,
				key: form.key,
				name: form.name,
				path: form.path
			})
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.$emit('replay')
				this.onClose()
			}
		} catch (e) {
			this.loading = false
		}
	}

	/**创建音视频**/
	private async nodeCreateCloud() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeCreateCloud({
				type: form.type,
				title: form.title,
				cover: form.cover,
				status: +form.status,
				order: form.order,
				description: form.description || null,
				parent: form.parent || null,
				source: form.source || [],
				size: form.size,
				key: form.key,
				name: form.name,
				path: form.path
			})
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.$emit('replay')
				this.onClose()
			}
		} catch (e) {
			this.loading = false
		}
	}

	/**组件调用**/
	public async init(active: 'create' | 'update', id?: number) {
		try {
			this.loading = true
			this.active = active
			this.visible = true
			await this.nodeMultipleClouds()
			await this.nodeCloudSources()
			if (id) {
				this.state.form.id = id
				await this.nodeCloud(id)
			}
			this.loading = false
		} catch (e) {
			this.loading = false
		}
	}

	/**组件初始化**/
	private onClose() {
		this.visible = false
		setTimeout(() => {
			this.loading = false
			this.active = 'create'
			this.state.form = Object.assign(this.state.form, {
				id: 0,
				type: 1,
				title: '',
				cover: '',
				description: '',
				status: true,
				order: 0,
				source: [],
				parent: undefined,
				size: 0,
				key: '',
				name: '',
				path: ''
			})
		}, 300)
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				switch (this.active) {
					case 'create':
						this.nodeCreateCloud()
						break
					case 'update':
						this.nodeUpdateCloud()
						break
				}
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.state
		return (
			<Modal
				title={this.active === 'create' ? '新增' : '编辑'}
				dialogStyle={{ maxWidth: '95%' }}
				v-model={this.visible}
				width={880}
				centered
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin size="large" spinning={this.loading}>
					<FormModel
						ref="form"
						class="app-form"
						{...{ props: { model: form, rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<FormModel.Item label="媒体类型">
							<Radio.Group v-model={form.type} disabled={this.active === 'update'}>
								<Radio value={1}>单集媒体</Radio>
								<Radio value={2}>多集媒体</Radio>
							</Radio.Group>
						</FormModel.Item>
						<FormModel.Item label="媒体封面" prop="cover">
							<AppCover
								path="cover"
								ratio={16 / 9}
								cover={form.cover}
								onSubmit={(props: { path: string }) => (form.cover = props.path)}
							></AppCover>
						</FormModel.Item>
						{form.type === 1 && (
							<div>
								<FormModel.Item label="媒体文件" prop="key">
									<NodeUpload
										name={form.name}
										onSubmit={this.onSubmitUpload}
										onStart={() => this.onSubmitUpload()}
									></NodeUpload>
								</FormModel.Item>
								<FormModel.Item label="父级媒体">
									<Select v-model={form.parent} allowClear show-search placeholder="父级媒体">
										{this.multiple.map(k => {
											return (
												<Select.Option key={k.id} value={k.id} disabled={!k.status}>
													{k.title}
												</Select.Option>
											)
										})}
									</Select>
								</FormModel.Item>
							</div>
						)}
						<FormModel.Item label="分类标签">
							<Select v-model={form.source} allowClear show-search mode="multiple" placeholder="分类标签">
								{this.sources.map(k => {
									return (
										<Select.Option key={k.id} value={k.id} disabled={!k.status}>
											{k.name}
										</Select.Option>
									)
								})}
							</Select>
						</FormModel.Item>
						<FormModel.Item class="app-form-color" label="媒体标题" prop="title">
							<Input.TextArea
								v-model={form.title}
								autoSize={{ minRows: 2, maxRows: 8 }}
								style={{ marginBottom: 0 }}
								allowClear
								placeholder="媒体标题"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item class="app-form-color" label="媒体描述">
							<Input.TextArea
								v-model={form.description}
								autoSize={{ minRows: 2, maxRows: 8 }}
								style={{ marginBottom: 0 }}
								allowClear
								placeholder="媒体描述"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item label="排序号">
							<InputNumber v-model={form.order} placeholder="排序号"></InputNumber>
						</FormModel.Item>
						<FormModel.Item label="媒体状态" prop="status">
							<Switch
								v-model={form.status}
								checked-children="开"
								un-checked-children="关"
								default-checked
							></Switch>
						</FormModel.Item>
					</FormModel>
				</Spin>
				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>取消</Button>
					<Button
						type="primary"
						disabled={this.upload || this.loading}
						loading={this.loading}
						onClick={this.onSubmit}
					>
						确定
					</Button>
				</div>
			</Modal>
		)
	}
}
