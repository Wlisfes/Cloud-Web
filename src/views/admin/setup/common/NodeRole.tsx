import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Row, Col, Spin, Radio, Select, notification } from 'ant-design-vue'
import { nodeRole, nodeCreateRole, updateNodeRole, nodeModules } from '@/api'
import { HttpStatus, NodeRoleResponse, NodeModule } from '@/types'

type State = {
	visible: boolean
	loading: boolean
	dataSource: NodeRoleResponse[]
}

@Component
export default class NodeRole extends Vue {
	$refs!: { form: FormModel }

	private loading: boolean = true
	private visible: boolean = false
	private active: string = 'create'
	private nodeModules: NodeModule[] = []
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: { id: 0, primary: '', name: '', status: 1, comment: '', module: [] },
		rules: {
			name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
			primary: [{ required: true, message: '请输入角色标识', trigger: 'blur' }]
		}
	}

	/**模块权限列表-授权管理端**/
	public initNodeModules() {
		return new Promise(async (resolve, reject) => {
			try {
				const { code, data } = await nodeModules({ page: 1, size: 100 })
				if (code === HttpStatus.OK) {
					this.nodeModules = data.list
					resolve(data)
				}
			} catch (e) {
				reject(e)
			}
		})
	}

	/**角色信息**/
	public nodeRole(id: number) {
		return new Promise(async (resolve, reject) => {
			try {
				const { code, data } = await nodeRole({ id })
				if (code === HttpStatus.OK) {
					this.state.form = Object.assign(this.state.form, {
						primary: data.primary,
						name: data.name,
						status: data.status,
						comment: data.comment,
						module: data.module.map(k => k.id)
					})
				}
				resolve(data)
			} catch (e) {
				reject(e)
			}
		})
	}

	/**组件调用**/
	public async init(active: 'create' | 'update', id?: number) {
		try {
			this.loading = true
			this.active = active
			this.visible = true
			await this.initNodeModules()
			if (id) {
				this.state.form.id = id
				await this.nodeRole(id)
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
			this.state.form = Object.assign(this.state.form, {
				id: 0,
				primary: '',
				name: '',
				status: 1,
				comment: '',
				module: []
			})
		}, 300)
	}

	/**创建角色**/
	private async nodeCreateRole() {
		try {
			const { form } = this.state
			const { code, data } = await nodeCreateRole({
				primary: form.primary,
				name: form.name,
				comment: form.comment,
				status: form.status,
				module: form.module
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

	/**修改角色**/
	private async updateNodeRole() {
		try {
			const { form } = this.state
			const { code, data } = await updateNodeRole({
				id: form.id,
				primary: form.primary,
				name: form.name,
				comment: form.comment,
				status: form.status,
				module: form.module
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

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				this.loading = true
				switch (this.active) {
					case 'create':
						this.nodeCreateRole()
						break
					case 'update':
						this.updateNodeRole()
						break
				}
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.state
		return (
			<Modal
				title="title"
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
						{...{ props: { model: form, rules: rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<Row type="flex">
							<Col flex={12}>
								<FormModel.Item prop="name" label="角色名称">
									<Input
										v-model={form.name}
										disabled={this.active === 'update'}
										placeholder="角色名称"
									></Input>
								</FormModel.Item>
							</Col>
							<Col flex={12}>
								<FormModel.Item prop="primary" label="角色标识">
									<Input
										v-model={form.primary}
										disabled={this.active === 'update'}
										placeholder="角色唯一标识"
									></Input>
								</FormModel.Item>
							</Col>
						</Row>
						<FormModel.Item label="权限模块">
							<Select v-model={form.module} mode="multiple" maxTagCount={3} placeholder="权限模块">
								{this.nodeModules.map(k => (
									<Select.Option key={k.id} title={k.name} value={k.id} disabled={!k.status}>
										{k.name}
									</Select.Option>
								))}
							</Select>
						</FormModel.Item>
						<FormModel.Item prop="comment" label="角色备注">
							<Input.TextArea
								v-model={form.comment}
								autoSize={{ minRows: 2, maxRows: 3 }}
								style={{ marginBottom: 0 }}
								placeholder="角色备注"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item prop="status" label="角色状态">
							<Radio.Group v-model={form.status} style={{ marginLeft: '10px' }}>
								<Radio value={1}>启用</Radio>
								<Radio value={0}>禁用</Radio>
							</Radio.Group>
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
