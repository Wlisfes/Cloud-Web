import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Button, Input, Statistic, notification } from 'ant-design-vue'
import { nodeEmailCode, register } from '@/api'
import { HttpStatus } from '@/types'

@Component
export default class Register extends Vue {
	$refs!: { form: FormModel }

	private state = {
		cation: {
			codeTime: 0,
			loading: false
		},
		loading: false,
		form: {
			username: '',
			nickname: '',
			password: '',
			email: '',
			code: ''
		},
		rules: {
			username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
			nickname: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
			password: [
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ min: 6, message: '密码不能少于6位', trigger: 'blur' }
			],
			email: [
				{ required: true, message: '请输入邮箱', trigger: 'blur' },
				{ type: 'email', message: '邮箱格式错误', trigger: 'blur' }
			],
			code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
		}
	}

	/**邮箱注册验证码**/
	private nodeEmailCode() {
		this.state.cation.loading = true
		this.$refs.form.validateField('email', async valid => {
			if (valid) {
				setTimeout(() => {
					this.state.cation.loading = false
				}, 300)
				return
			}
			try {
				const { code, data } = await nodeEmailCode({ email: this.state.form.email })
				if (code === HttpStatus.OK) {
					notification.success({ message: data.message, description: '' })
					this.state.cation.codeTime = Date.now() + 1000 * 10
					this.state.cation.loading = false
				}
			} catch (e) {
				this.state.cation.loading = false
			}
		})
	}

	/**注册**/
	private onSubmit() {
		this.state.loading = true
		this.$refs.form.validate(async valid => {
			if (!valid) {
				setTimeout(() => {
					this.state.loading = false
				}, 500)
				return
			}
			try {
				const { code, data } = await register({ ...this.state.form })
				if (code === HttpStatus.OK) {
					notification.success({ message: data.message, description: '' })
					this.$router.replace('/main/login')
				}
				this.state.loading = false
			} catch (e) {
				this.state.loading = false
			}
		})
	}

	protected render() {
		const { state } = this
		const { form, rules, cation } = state
		return (
			<div>
				<FormModel ref="form" {...{ props: { model: form, rules } }}>
					<FormModel.Item prop="username">
						<Input v-model={form.username} max-length={20} size="large" placeholder="用户名"></Input>
					</FormModel.Item>
					<FormModel.Item prop="nickname">
						<Input v-model={form.nickname} max-length={40} size="large" placeholder="用户昵称"></Input>
					</FormModel.Item>
					<FormModel.Item prop="password">
						<Input.Password
							v-model={form.password}
							type="password"
							max-length={20}
							size="large"
							placeholder="密码"
						></Input.Password>
					</FormModel.Item>
					<FormModel.Item prop="email">
						<Input v-model={form.email} size="large" placeholder="邮箱"></Input>
					</FormModel.Item>
					<div style={{ display: 'flex' }}>
						<FormModel.Item prop="code" style={{ flex: 1, marginRight: '12px' }}>
							<Input v-model={form.code} max-length={6} size="large" placeholder="验证码"></Input>
						</FormModel.Item>
						<FormModel.Item>
							<Button
								size="large"
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
					<FormModel.Item>
						<Button
							size="large"
							type="primary"
							style={{ width: '100%' }}
							loading={state.loading}
							onClick={this.onSubmit}
						>
							登录
						</Button>
					</FormModel.Item>
					<FormModel.Item>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<a onClick={() => this.$router.replace('/main/login')}>登录账号</a>
						</div>
					</FormModel.Item>
				</FormModel>
			</div>
		)
	}
}
