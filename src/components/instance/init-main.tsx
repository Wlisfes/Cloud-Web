import { Vue, Component } from 'vue-property-decorator'
import { Modal, FormModel, Button, Input, Checkbox, Icon, Statistic, notification } from 'ant-design-vue'
import { nodeEmailCode } from '@/api'
import { HttpStatus } from '@/types'
import { vm } from '@/utils/event'
import store from '@/store'
import style from '@/style/instance/init-main.module.less'

@Component
class RootModal extends Vue {
	$refs!: { formModel: FormModel; cursor: HTMLImageElement }

	private visible: boolean = false
	private loading: boolean = false
	private keep: boolean = false
	private type: boolean = true
	private cation = { codeTime: 0, loading: false }
	private form = {
		account: '',
		password: '',
		code: '',
		nickname: '',
		email: ''
	}
	private rules = {
		account: [{ required: true, message: '请输入用户名、邮箱、手机号', trigger: 'change' }],
		password: [
			{ required: true, message: '请输入密码', trigger: 'change' },
			{ min: 6, message: '密码不能少于6位', trigger: 'blur' }
		],
		code: [{ required: true, message: '请输入验证码', trigger: 'change' }],
		nickname: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
		email: [
			{ required: true, message: '请输入邮箱', trigger: 'blur' },
			{ type: 'email', message: '邮箱格式错误', trigger: 'blur' }
		]
	}

	/**切换**/
	private onCutover() {
		this.type = !this.type
		this.$nextTick(() => {
			this.$refs.formModel.clearValidate(['account', 'password', 'code', 'nickname', 'email'])
		})
	}

	/**刷新验证码**/
	private refCursor() {
		this.$refs.cursor.src = `${process.env.VUE_APP_BASE_API}/api/user/code?time=${Date.now()}`
	}

	/**邮箱注册验证码**/
	private nodeEmailCode() {
		this.cation.loading = true
		this.$refs.formModel.validateField('email', async valid => {
			if (valid) {
				setTimeout(() => {
					this.cation.loading = false
				}, 300)
				return
			}
			try {
				const { code, data } = await nodeEmailCode({ email: this.form.email })
				if (code === HttpStatus.OK) {
					notification.success({ message: data.message, description: '' })
					this.cation.codeTime = Date.now() + 1000 * 60
					this.cation.loading = false
				}
			} catch (e) {
				this.cation.loading = false
			}
		})
	}

	/**组件调用**/
	public async init() {
		this.visible = true
		return this
	}

	/**组件重置**/
	public onClose() {
		this.visible = false
		setTimeout(() => {
			this.loading = false
			this.keep = false
			this.type = true
			this.cation = Object.assign(this.cation, { codeTime: 0, loading: false })
			this.form = Object.assign(this.form, {
				account: '',
				password: '',
				code: '',
				nickname: '',
				email: ''
			})
			vm.$emit('main-close')
		}, 300)
	}

	/**表单提交**/
	public onSubmit(e: Event) {
		e.preventDefault()
		e.stopPropagation()
		this.$refs.formModel.validate(async valid => {
			if (!valid) {
				if (this.type) {
					setTimeout(() => this.refCursor(), 300)
				}
				return
			}

			try {
				this.loading = true
				const { type, form } = this
				if (type) {
					/**登录**/
					await store.dispatch('user/login', {
						account: form.account,
						password: form.password,
						code: form.code
					})
				} else {
					/**注册**/
					await store.dispatch('user/register', {
						email: form.email,
						nickname: form.nickname,
						password: form.password,
						code: form.code
					})
				}
				vm.$emit('main-submit')
			} catch (e) {
				this.type && this.refCursor()
				this.loading = false
			}
		})
	}

	protected render() {
		const { form, rules, cation } = this

		return (
			<Modal
				v-model={this.visible}
				centered
				closable={false}
				maskClosable={false}
				width={480}
				destroyOnClose
				bodyStyle={{ padding: '15px' }}
				dialogStyle={{ maxWidth: '95%' }}
				footer={null}
				onClose={this.onClose}
			>
				<div class={style['app-logo']}>
					<img class={style['app-logo-cover']} src="https://oss.lisfes.cn/cloud/stctic/1625035983457.png" />
					<h1 style={{ marginBottom: 0, fontSize: '24px' }}>欢迎到来</h1>
				</div>
				<FormModel
					class="app-form"
					ref="formModel"
					{...{ props: { model: form, rules } }}
					onSubmit={this.onSubmit}
				>
					{this.type ? (
						<div>
							<FormModel.Item prop="account">
								<Input v-model={form.account} max-length={20} placeholder="账户、邮箱、手机号">
									<Icon slot="prefix" type="user"></Icon>
								</Input>
							</FormModel.Item>
							<FormModel.Item prop="password">
								<Input.Password
									v-model={form.password}
									type="password"
									max-length={20}
									placeholder="密码"
								>
									<Icon slot="prefix" type="lock"></Icon>
								</Input.Password>
							</FormModel.Item>
							<div style={{ display: 'flex' }}>
								<FormModel.Item prop="code" style={{ flex: 1, marginRight: '12px' }}>
									<Input v-model={form.code} max-length={4} placeholder="验证码">
										<Icon slot="prefix" type="alert"></Icon>
									</Input>
								</FormModel.Item>
								<FormModel.Item>
									<img
										ref="cursor"
										style={{
											width: '100px',
											height: '32px',
											cursor: 'pointer',
											display: 'block',
											borderRadius: '2px'
										}}
										src={`${process.env.VUE_APP_BASE_API}/api/user/code`}
										onClick={this.refCursor}
									/>
								</FormModel.Item>
							</div>
							<FormModel.Item style={{ margin: 0 }}>
								<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
									{/* <Checkbox v-model={this.keep}>
										<a style={{ color: '#1890ff' }}>记住密码</a>
									</Checkbox> */}
									<a onClick={this.onCutover}>注册账号</a>
								</div>
							</FormModel.Item>
						</div>
					) : (
						<div>
							<FormModel.Item prop="nickname">
								<Input v-model={form.nickname} max-length={40} placeholder="用户昵称">
									<Icon slot="prefix" type="crown"></Icon>
								</Input>
							</FormModel.Item>
							<FormModel.Item prop="password">
								<Input.Password
									v-model={form.password}
									type="password"
									max-length={20}
									placeholder="密码"
								>
									<Icon slot="prefix" type="lock"></Icon>
								</Input.Password>
							</FormModel.Item>
							<FormModel.Item prop="email">
								<Input v-model={form.email} placeholder="邮箱">
									<Icon slot="prefix" type="mail"></Icon>
								</Input>
							</FormModel.Item>
							<div style={{ display: 'flex' }}>
								<FormModel.Item prop="code" style={{ flex: 1, marginRight: '12px' }}>
									<Input v-model={form.code} max-length={6} placeholder="验证码">
										<Icon slot="prefix" type="alert"></Icon>
									</Input>
								</FormModel.Item>
								<FormModel.Item>
									<Button
										disabled={!!cation.codeTime || !form.email}
										loading={cation.loading}
										onClick={this.nodeEmailCode}
									>
										{cation.codeTime ? (
											<Statistic.Countdown
												value={cation.codeTime}
												format="s 秒后重试"
												valueStyle={{ fontSize: '14px', color: 'rgba(0,0,0,0.25)' }}
												onFinish={() => (cation.codeTime = 0)}
											></Statistic.Countdown>
										) : (
											<span>发送验证码</span>
										)}
									</Button>
								</FormModel.Item>
							</div>
							<FormModel.Item style={{ margin: 0 }}>
								<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
									<a onClick={this.onCutover}>登录账号</a>
								</div>
							</FormModel.Item>
						</div>
					)}
					<FormModel.Item style={{ margin: '10px 0 0' }}>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<Button style={{ marginRight: '10px' }} onClick={this.onClose}>
								取消
							</Button>
							<Button type="primary" loading={this.loading} htmlType="submit">
								{this.type ? '登录' : '注册'}
							</Button>
						</div>
					</FormModel.Item>
				</FormModel>
			</Modal>
		)
	}
}

/**单例模式调用**/
let node: any = null
export function init(): Promise<{ node: RootModal; vm: typeof vm }> {
	return new Promise(resolve => {
		if (!node) {
			const Conter = Vue.extend(RootModal)
			node = new Conter().$mount(document.createElement('div'))
			document.body.appendChild(node.$el)
		}
		resolve({ vm, node: node as RootModal })
	})
}
