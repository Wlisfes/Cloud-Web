import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Row, Col, Spin, Radio, Select } from 'ant-design-vue'
import { AppCover } from '@/components/common'
import { nodeUidUser, createUser, nodeRoles } from '@/api'
import { HttpStatus, NodeRoleResponse } from '@/types'

@Component
export default class NodeUser extends Vue {
	$refs!: { form: FormModel }
	private state = {
		active: 'create',
		visible: false,
		loading: false,
		roles: []
	}
	private common = {
		labelCol: { span: 4, style: { width: '85px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 85px)' } },
		form: {
			account: '',
			avatar: '',
			nickname: '',
			password: '',
			email: null,
			role: null,
			mobile: null,
			comment: '',
			status: 1
		},
		rules: {
			nickname: [{ required: true, message: '请输入角色昵称', trigger: 'blur' }],
			password: [
				{ required: true, message: '请输入密码', trigger: 'change' },
				{ min: 6, message: '密码不能少于6位', trigger: 'blur' }
			],
			role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
			status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
		}
	}

	/**用户信息-uid**/
	private nodeUidUser(uid: number) {
		return new Promise(async (resolve, rejcect) => {
			try {
				const { code, data } = await nodeUidUser({ uid })
				if (code === HttpStatus.OK) {
					this.common.form = Object.assign(this.common.form, {
						account: data.account,
						avatar: data.avatar,
						nickname: data.nickname,
						email: data.email,
						mobile: data.mobile,
						comment: data.comment,
						status: data.status
					})
				}
				resolve(data)
			} catch (e) {
				rejcect(e)
			}
		})
	}

	/**角色列表-不包括子类**/
	private nodeRoles() {
		return new Promise(async (resolve, reject) => {
			try {
				const { code, data } = await nodeRoles({ page: 1, size: 10 })
				if (code === HttpStatus.OK) {
					this.state.roles = data.list as never[]
				}
				resolve(data)
			} catch (e) {
				reject(e)
			}
		})
	}

	/**创建用户**/
	private async createUser() {
		try {
			const { code } = await createUser({ ...this.common.form })
			if (code === HttpStatus.OK) {
			}
		} catch (e) {}
	}

	/**更新用户**/
	private async upadteUser() {
		try {
		} catch (e) {}
	}

	/**初始化组件**/
	public async init(active: 'create' | 'update', uid?: number) {
		try {
			this.state = Object.assign(this.state, { active: active, visible: true, loading: true })
			if (uid && active === 'update') {
				await this.nodeUidUser(uid)
			}
			await this.nodeRoles()
			this.state.loading = false
		} catch (e) {
			this.state.loading = false
		}
	}

	/**取消重置**/
	private onClose() {
		this.state = Object.assign(this.state, { active: 'create', visible: false, loading: true, roles: [] })
		this.common.form = Object.assign(this.common.form, {
			account: '',
			avatar: '',
			nickname: '',
			password: '',
			email: null,
			role: 2,
			mobile: null,
			status: 1
		})
	}

	/**提交验证**/
	private onSubmit() {
		this.$refs.form.validate(valid => {
			if (valid) {
				switch (this.state.active) {
					case 'create':
						this.createUser()
						break
					case 'update':
						this.upadteUser()
						break
				}
			}
		})
	}

	protected render() {
		const { state, common } = this

		return (
			<Modal
				title={state.active === 'create' ? '创建用户' : '更新用户'}
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={state.visible}
				width={880}
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin size="large" spinning={state.loading}>
					<FormModel
						ref="form"
						class="app-form"
						{...{ props: { model: common.form, rules: common.rules } }}
						labelCol={common.labelCol}
						wrapperCol={common.wrapperCol}
					>
						<FormModel.Item label="头像">
							<AppCover
								cover={common.form.avatar}
								onSubmit={(props: { path: string }) => (common.form.avatar = props.path)}
							></AppCover>
						</FormModel.Item>
						<Row type="flex">
							<Col xs={24} sm={12} md={12}>
								<FormModel.Item prop="nickname" label="昵称">
									<Input v-model={common.form.nickname} placeholder="昵称"></Input>
								</FormModel.Item>
							</Col>
							<Col xs={24} sm={12} md={12}>
								{state.active === 'create' ? (
									<FormModel.Item prop="password" label="密码">
										<Input.Password
											v-model={common.form.password}
											max-length={20}
											placeholder="密码"
										></Input.Password>
									</FormModel.Item>
								) : (
									<FormModel.Item required label="账号">
										<Input v-model={common.form.account} disabled placeholder="账号"></Input>
									</FormModel.Item>
								)}
							</Col>
						</Row>
						<Row type="flex">
							<Col xs={24} sm={12} md={12}>
								<FormModel.Item prop="email" label="邮箱">
									<Input v-model={common.form.email} placeholder="邮箱"></Input>
								</FormModel.Item>
							</Col>
							<Col xs={24} sm={12} md={12}>
								<FormModel.Item prop="mobile" label="手机号">
									<Input v-model={common.form.mobile} placeholder="手机号"></Input>
								</FormModel.Item>
							</Col>
						</Row>
						<Row type="flex">
							<Col xs={24} sm={12} md={12}>
								<FormModel.Item prop="role" label="角色">
									<Select v-model={common.form.role} allowClear placeholder="请选择角色">
										{state.roles.map((k: NodeRoleResponse) => (
											<Select.Option key={k.id} disabled={!k.status}>
												{k.name}
											</Select.Option>
										))}
									</Select>
								</FormModel.Item>
							</Col>
							<Col xs={24} sm={12} md={12}></Col>
						</Row>
						<FormModel.Item prop="comment" label="备注">
							<Input.TextArea
								v-model={common.form.comment}
								autoSize={{ minRows: 2, maxRows: 3 }}
								style={{ marginBottom: 0 }}
								placeholder="备注"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item prop="status" label="状态">
							<Radio.Group v-model={common.form.status} style={{ marginLeft: '10px' }}>
								<Radio value={1}>启用</Radio>
								<Radio value={0}>禁用</Radio>
							</Radio.Group>
						</FormModel.Item>
					</FormModel>
				</Spin>
				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>取消</Button>
					<Button type="primary" disabled={state.loading} loading={state.loading} onClick={this.onSubmit}>
						确定
					</Button>
				</div>
			</Modal>
		)
	}
}
