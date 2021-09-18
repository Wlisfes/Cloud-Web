import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Switch, Spin, notification } from 'ant-design-vue'
import { nodeModuleAction, nodeUpdateModuleAction, nodeCreateModuleAction } from '@/api'
import { HttpStatus } from '@/types'

@Component
export default class NodeAction extends Vue {
	$refs!: { form: FormModel }

	private visible: boolean = false
	private loading: boolean = false
	private active: string = 'create'
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			id: 0,
			name: '',
			primary: '',
			comment: '',
			status: true
		},
		rules: {
			name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
			primary: [{ required: true, message: '请输入唯一标识符', trigger: 'blur' }]
		}
	}

	/**接口权限信息-授权管理端**/
	private async nodeModuleAction(id: number) {
		try {
			const { code, data } = await nodeModuleAction({ id })
			if (code === HttpStatus.OK) {
				this.state.form = Object.assign(this.state.form, {
					name: data.name,
					primary: data.primary,
					comment: data.comment,
					status: data.status === 1
				})
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**创建接口权限-授权管理端**/
	private async nodeCreateModuleAction() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeCreateModuleAction({
				name: form.name,
				primary: form.primary,
				comment: form.comment,
				status: +form.status
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

	/**修改接口权限-授权管理端**/
	private async nodeUpdateModuleAction() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeUpdateModuleAction({
				id: form.id,
				name: form.name,
				primary: form.primary,
				comment: form.comment,
				status: +form.status
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
			if (id) {
				this.state.form.id = id
				await this.nodeModuleAction(id)
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
				status: true
			})
		}, 300)
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				switch (this.active) {
					case 'create':
						this.nodeCreateModuleAction()
						break
					case 'update':
						this.nodeUpdateModuleAction()
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
						<FormModel.Item label="权限标识符" prop="primary">
							<Input v-model={form.primary} placeholder="权限标识符"></Input>
						</FormModel.Item>
						<FormModel.Item label="权限名称" prop="name">
							<Input v-model={form.name} placeholder="权限名称"></Input>
						</FormModel.Item>
						<FormModel.Item label="权限备注">
							<Input.TextArea
								v-model={form.comment}
								autoSize={{ minRows: 2, maxRows: 3 }}
								style={{ marginBottom: 0 }}
								placeholder="权限备注"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item label="权限状态">
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
