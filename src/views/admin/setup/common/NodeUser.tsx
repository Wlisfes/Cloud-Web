import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Row, Col, Spin, Radio, Select, notification } from 'ant-design-vue'
import { AppCover } from '@/components/common'
import { nodeUidUser, nodeCreateUser, nodeUpdateUser, nodeRoles } from '@/api'
import { HttpStatus, NodeRole } from '@/types'

@Component
export default class NodeUser extends Vue {
	$refs!: { form: FormModel }

	private active: string = 'create'
	private visible: boolean = false
	private loading: boolean = true
	private roles: NodeRole[] = []
	private state = {
		labelCol: { span: 4, style: { width: '85px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 85px)' } },
		form: {
			uid: 0,
			account: '',
			avatar: '',
			nickname: '',
			password: '',
			email: '',
			role: [],
			mobile: '',
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
					this.state.form = Object.assign(this.state.form, {
						uid: uid,
						nickname: data.nickname,
						account: data.account,
						status: data.status,
						avatar: data.avatar,
						email: data.email,
						mobile: data.mobile,
						comment: data.comment,
						role: data.role.map(k => k.id)
					})
				}
				resolve(data)
			} catch (e) {
				rejcect(e)
			}
		})
	}

	/**角色列表**/
	private nodeRoles() {
		return new Promise(async (resolve, reject) => {
			try {
				const { code, data } = await nodeRoles({ page: 1, size: 50 })
				if (code === HttpStatus.OK) {
					this.roles = data.list
				}
				resolve(data)
			} catch (e) {
				reject(e)
			}
		})
	}

	/**创建用户**/
	private async nodeCreateUser() {
		try {
			const { form } = this.state
			const { code, data } = await nodeCreateUser({
				nickname: form.nickname,
				password: form.password,
				role: form.role,
				status: form.status,
				avatar: form.avatar,
				email: form.email,
				mobile: form.mobile,
				comment: form.comment
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

	/**更新用户**/
	private async nodeUpdateUser() {
		try {
			const { form } = this.state
			const { code, data } = await nodeUpdateUser({
				uid: form.uid,
				nickname: form.nickname,
				status: form.status,
				avatar: form.avatar,
				email: form.email,
				mobile: form.mobile,
				comment: form.comment,
				role: form.role
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

	/**初始化组件**/
	public async init(active: 'create' | 'update', uid?: number) {
		try {
			this.loading = true
			this.active = active
			this.visible = true
			await this.nodeRoles()
			if (uid && active === 'update') {
				this.state.form.uid = uid
				await this.nodeUidUser(uid)
			}
			this.loading = false
		} catch (e) {
			this.loading = false
		}
	}

	/**取消重置**/
	private onClose() {
		this.visible = false
		setTimeout(() => {
			this.state.form = Object.assign(this.state.form, {
				uid: 0,
				account: '',
				avatar: '',
				nickname: '',
				password: '',
				email: '',
				role: [],
				mobile: '',
				status: 1
			})
		}, 300)
	}

	/**提交验证**/
	private onSubmit() {
		this.$refs.form.validate(valid => {
			if (valid) {
				this.loading = true
				switch (this.active) {
					case 'create':
						this.nodeCreateUser()
						break
					case 'update':
						this.nodeUpdateUser()
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
						<FormModel.Item label="头像">
							<AppCover
								resize="?x-oss-process=style/resize"
								cover={form.avatar}
								onSubmit={(props: { path: string }) => (form.avatar = props.path)}
							></AppCover>
						</FormModel.Item>

						{this.active === 'create' ? (
							<div>
								<Row type="flex">
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item prop="nickname" label="昵称">
											<Input v-model={form.nickname} placeholder="昵称"></Input>
										</FormModel.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item prop="password" label="密码">
											<Input.Password
												v-model={form.password}
												max-length={20}
												placeholder="密码"
											></Input.Password>
										</FormModel.Item>
									</Col>
								</Row>
								<Row type="flex">
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item prop="email" label="邮箱">
											<Input v-model={form.email} placeholder="邮箱"></Input>
										</FormModel.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item prop="mobile" label="手机号">
											<Input v-model={form.mobile} placeholder="手机号"></Input>
										</FormModel.Item>
									</Col>
								</Row>
								<Row type="flex">
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item prop="role" label="角色">
											<Select
												v-model={form.role}
												mode="multiple"
												allowClear
												placeholder="请选择角色"
											>
												{this.roles.map((k: NodeRole) => (
													<Select.Option key={k.id} disabled={!k.status}>
														{k.name}
													</Select.Option>
												))}
											</Select>
										</FormModel.Item>
									</Col>
									<Col xs={24} sm={12} md={12}></Col>
								</Row>
							</div>
						) : (
							<div>
								<Row type="flex">
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item prop="nickname" label="昵称">
											<Input v-model={form.nickname} placeholder="昵称"></Input>
										</FormModel.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item required label="账号">
											<Input v-model={form.account} disabled placeholder="账号"></Input>
										</FormModel.Item>
									</Col>
								</Row>
								<Row type="flex">
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item prop="email" label="邮箱">
											<Input v-model={form.email} placeholder="邮箱"></Input>
										</FormModel.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item prop="mobile" label="手机号">
											<Input v-model={form.mobile} placeholder="手机号"></Input>
										</FormModel.Item>
									</Col>
								</Row>
								<Row type="flex">
									<Col xs={24} sm={12} md={12}>
										<FormModel.Item prop="role" label="角色">
											<Select
												v-model={form.role}
												mode="multiple"
												allowClear
												placeholder="请选择角色"
											>
												{this.roles.map((k: NodeRole) => (
													<Select.Option key={k.id} disabled={!k.status}>
														{k.name}
													</Select.Option>
												))}
											</Select>
										</FormModel.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										{this.active === 'create' && (
											<FormModel.Item label="密码">
												<Input.Password
													v-model={form.password}
													max-length={20}
													placeholder="密码"
												></Input.Password>
											</FormModel.Item>
										)}
									</Col>
								</Row>
							</div>
						)}

						<FormModel.Item prop="comment" label="备注">
							<Input.TextArea
								v-model={form.comment}
								autoSize={{ minRows: 2, maxRows: 3 }}
								style={{ marginBottom: 0 }}
								placeholder="备注"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item prop="status" label="状态">
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
