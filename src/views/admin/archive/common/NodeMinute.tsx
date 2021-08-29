import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, InputNumber, Modal, Radio, Select } from 'ant-design-vue'
import { Button, Switch, Spin, notification } from 'ant-design-vue'
import { AppCover } from '@/components/common'
import { NodeSource } from '@/types'

@Component
export default class NodeMinute extends Vue {
	$refs!: { form: FormModel }

	private visible: boolean = false
	private loading: boolean = false
	private upload: boolean = false
	private active: string = 'create'
	private sources: NodeSource[] = []
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			id: 0,
			type: 1,
			name: '',
			cover: '',
			description: '',
			status: true,
			order: 0,
			source: [],
			url: '',
			npm: '',
			github: ''
		},
		rules: {
			name: [{ required: true, message: '请输入收录名称', trigger: 'blur' }],
			cover: [{ required: true, message: '请上传收录封面', trigger: 'blur' }],
			status: [{ required: true, message: '请选择收录状态', trigger: 'blur' }],
			key: [{ required: true, message: '请上传收录文件', trigger: 'blur' }]
		}
	}

	/**组件调用**/
	public async init(active: 'create' | 'update', id?: number) {
		try {
			this.loading = true
			this.active = active
			this.visible = true
			// await this.nodeClouds()
			// await this.nodeCloudSources()
			if (id) {
				this.state.form.id = id
				// await this.nodeCloud(id)
			}
			this.loading = false
		} catch (e) {
			this.loading = false
		}
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				switch (this.active) {
					case 'create':
						// this.nodeCreateCloud()
						break
					case 'update':
						// this.nodeUpdateCloud()
						break
				}
			}
		})
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
				// onCancel={this.onClose}
			>
				<Spin size="large" class="ant-spin-64" spinning={this.loading}>
					<FormModel
						ref="form"
						class="app-form"
						{...{ props: { model: form, rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<FormModel.Item label="封面" prop="cover">
							<AppCover
								path="cover"
								ratio={16 / 9}
								cover={form.cover}
								onSubmit={(props: { path: string }) => (form.cover = props.path)}
							></AppCover>
						</FormModel.Item>
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
						<FormModel.Item class="app-form-color" label="收录名称" prop="name">
							<Input.TextArea
								v-model={form.name}
								autoSize={{ minRows: 2, maxRows: 8 }}
								style={{ marginBottom: 0 }}
								allowClear
								placeholder="收录标题"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item class="app-form-color" label="收录描述">
							<Input.TextArea
								v-model={form.description}
								autoSize={{ minRows: 2, maxRows: 8 }}
								style={{ marginBottom: 0 }}
								allowClear
								placeholder="收录描述"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item label="url地址">
							<Input v-model={form.url} placeholder="url地址"></Input>
						</FormModel.Item>
						<FormModel.Item label="npm地址">
							<Input v-model={form.npm} placeholder="npm地址"></Input>
						</FormModel.Item>
						<FormModel.Item label="GitHub地址">
							<Input v-model={form.github} placeholder="GitHub地址"></Input>
						</FormModel.Item>
						<FormModel.Item label="排序号">
							<InputNumber v-model={form.order} placeholder="排序号"></InputNumber>
						</FormModel.Item>
						<FormModel.Item label="收录状态" prop="status">
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
