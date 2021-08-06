import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Row, Col, Spin, Radio, Tree, Select, notification } from 'ant-design-vue'
import { nodeRoles, nodeUpdateUserRole, nodeUserUidRole } from '@/api'
import { HttpStatus, NodeRoleResponse } from '@/types'
import { inteRole } from '@/utils/common'

@Component
export default class NodeUserRole extends Vue {
	$refs!: { form: FormModel }
	private visible: boolean = false
	private loading: boolean = true
	private roles: Array<NodeRoleResponse> = []
	private auth: Array<NodeRoleResponse> = []

	private common = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: { uid: 0, primary: '', status: 1, comment: '', role: [] },
		rules: {
			name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
			primary: [{ required: true, message: '请输入角色标识', trigger: 'blur' }]
		}
	}

	/**角色列表-不包括子类**/
	private nodeRoles() {
		return new Promise(async (resolve, rejcect) => {
			try {
				const { code, data } = await nodeRoles({ page: 1, size: 100 })
				if (code === HttpStatus.OK) {
					this.roles = data.list
				}
				resolve(data)
			} catch (e) {
				rejcect(e)
			}
		})
	}

	/**用户角色信息-uid**/
	private nodeUserUidRole(uid: number) {
		return new Promise(async (resolve, rejcect) => {
			try {
				const { code, data } = await nodeUserUidRole({ uid })
				if (code === HttpStatus.OK) {
					this.auth = data.children
					this.common.form = Object.assign(this.common.form, {
						uid,
						comment: data.comment,
						status: data.status,
						primary: data.primary,
						role: inteRole(data.children)
					})
				}
				resolve(data)
			} catch (e) {
				rejcect(e)
			}
		})
	}

	public async init(uid: number) {
		this.visible = true
		await this.nodeUserUidRole(uid)
		await this.nodeRoles()
		this.loading = false
	}

	private onClose() {
		this.visible = false
		setTimeout(() => {
			this.common.form = Object.assign(this.common.form, {
				primary: '',
				status: 1,
				comment: '',
				role: []
			})
		}, 300)
	}

	private onSubmit() {
		this.$refs.form.validate(async valid => {
			this.loading = true
			if (!valid) {
				setTimeout(() => (this.loading = false), 500)
				return
			}

			try {
				const { uid, primary, status, comment, role } = this.common.form
				const { code, data } = await nodeUpdateUserRole({ uid, primary, status, comment, role })
				if (code === HttpStatus.OK) {
					notification.success({ message: data.message, description: '' })
					this.$emit('replay')
					this.onClose()
				}
			} catch (e) {
				this.loading = false
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.common

		return (
			<Modal
				title="权限"
				dialogStyle={{ maxWidth: '95%' }}
				v-model={this.visible}
				width={880}
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
						<FormModel.Item prop="primary" label="角色名称">
							<Select v-model={form.primary}>
								{this.roles.map(k => (
									<Select.Option disabled={k.status === 0} key={k.id} value={k.primary}>
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
						<FormModel.Item prop="role" label="角色权限">
							<Tree
								checkable
								v-model={form.role}
								treeData={this.auth}
								replaceFields={{ children: 'children', title: 'name', value: 'id', key: 'id' }}
							></Tree>
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
