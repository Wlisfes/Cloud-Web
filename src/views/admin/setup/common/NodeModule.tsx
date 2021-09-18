import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Select, Switch, Spin, notification } from 'ant-design-vue'
import { nodeModule, nodeUpdateModule, nodeCreateModule, nodeModuleActions } from '@/api'
import { HttpStatus, NodeModule as NodeModuleState } from '@/types'

@Component
export default class NodeModule extends Vue {
	$refs!: { form: FormModel }

	private visible: boolean = false
	private loading: boolean = false
	private active: string = 'create'
	private action: NodeModuleState[] = []
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			id: 0,
			name: '',
			primary: '',
			comment: '',
			status: true,
			action: []
		},
		rules: {
			name: [{ required: true, message: '请输入模块名称', trigger: 'blur' }],
			primary: [{ required: true, message: '请输入唯一标识符', trigger: 'blur' }]
		}
	}

	/**接口权限列表-授权管理端**/
	private async nodeModuleActions() {
		try {
			const { code, data } = await nodeModuleActions({ page: 1, size: 10 })
			if (code === HttpStatus.OK) {
				this.action = data.list
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**模块信息-授权管理端**/
	private async nodeModule(id: number) {
		try {
			const { code, data } = await nodeModule({ id })
			if (code === HttpStatus.OK) {
				this.state.form = Object.assign(this.state.form, {
					name: data.name,
					primary: data.primary,
					comment: data.comment,
					status: data.status === 1,
					action: data.action.map(k => k.id)
				})
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**创建模块-授权管理端**/
	private async nodeCreateModule() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeCreateModule({
				name: form.name,
				primary: form.primary,
				comment: form.comment,
				status: +form.status,
				action: form.action
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

	/**修改模块-授权管理端**/
	private async nodeUpdateModule() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeUpdateModule({
				id: form.id,
				name: form.name,
				primary: form.primary,
				comment: form.comment,
				status: +form.status,
				action: form.action
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
			await this.nodeModuleActions()
			if (id) {
				this.state.form.id = id
				await this.nodeModule(id)
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
				name: '',
				primary: '',
				comment: '',
				status: true,
				action: []
			})
		}, 300)
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				switch (this.active) {
					case 'create':
						this.nodeCreateModule()
						break
					case 'update':
						this.nodeUpdateModule()
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
				width={680}
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin size="large" class="ant-spin-64" spinning={this.loading}>
					<FormModel
						ref="form"
						class="app-form"
						{...{ props: { model: form, rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<FormModel.Item label="模块标识符" prop="primary">
							<Input v-model={form.primary} placeholder="模块标识符"></Input>
						</FormModel.Item>
						<FormModel.Item label="模块名称" prop="name">
							<Input v-model={form.name} placeholder="模块名称"></Input>
						</FormModel.Item>
						<FormModel.Item label="接口权限">
							<Select mode="multiple" v-model={form.action} allowClear placeholder="接口权限">
								{this.action.map(k => (
									<Select.Option disabled={!k.status} key={k.id} value={k.id}>
										{k.name}
									</Select.Option>
								))}
							</Select>
						</FormModel.Item>
						<FormModel.Item label="模块备注">
							<Input.TextArea
								v-model={form.comment}
								autoSize={{ minRows: 2, maxRows: 3 }}
								style={{ marginBottom: 0 }}
								placeholder="模块备注"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item label="模块状态">
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
					<Button type="primary" disabled={this.loading} loading={this.loading} onClick={this.onSubmit}>
						确定
					</Button>
				</div>
			</Modal>
		)
	}
}
