import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Button, Input, Checkbox, Icon } from 'ant-design-vue'
import { setCookie, getCookie, delCookie } from '@/utils/cookie'
const __KEEP_KEY__ = '__KEEP_KEY__'

@Component
export default class Login extends Vue {
	$refs!: { form: FormModel; cursor: HTMLImageElement }

	private state = {
		loading: false,
		keep: false,
		form: {
			account: '',
			password: '',
			code: ''
		},
		rules: {
			account: [{ required: true, message: '请输入用户名、邮箱、手机号', trigger: 'change' }],
			password: [
				{ required: true, message: '请输入密码', trigger: 'change' },
				{ min: 6, message: '密码不能少于6位', trigger: 'blur' }
			],
			code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
		}
	}

	protected created() {
		const form = getCookie(__KEEP_KEY__)
		if (form) {
			this.state.form.account = form.account
			this.state.form.password = form.password
			this.state.keep = form.keep
		}
	}

	/**刷新验证码**/
	private refCursor() {
		this.$refs.cursor.src = `${process.env.VUE_APP_BASE_API}/api/user/code?time=${Date.now()}`
	}

	/**登录**/
	private onSubmit() {
		this.state.loading = true
		this.$refs.form.validate(async valid => {
			if (!valid) {
				setTimeout(() => {
					this.refCursor()
					this.state.loading = false
				}, 300)
				return
			}

			try {
				const { form, keep } = this.state
				await this.$store.dispatch('user/login', { ...form })
				if (keep) {
					setCookie(__KEEP_KEY__, { keep, account: form.account, password: form.password })
				} else {
					delCookie(__KEEP_KEY__)
				}
				this.$router.push('/')
			} catch (e) {
				this.refCursor()
			}
			this.state.loading = false
		})
	}

	protected render() {
		const { form, rules, loading } = this.state
		return (
			<div>
				<FormModel ref="form" {...{ props: { model: form, rules } }}>
					<FormModel.Item prop="account">
						<Input v-model={form.account} max-length={20} placeholder="账户、邮箱、手机号">
							<Icon slot="prefix" type="user"></Icon>
						</Input>
					</FormModel.Item>
					<FormModel.Item prop="password">
						<Input.Password v-model={form.password} type="password" max-length={20} placeholder="密码">
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
					<FormModel.Item>
						<Button
							size="large"
							type="primary"
							style={{ width: '100%' }}
							loading={loading}
							onClick={this.onSubmit}
						>
							登录
						</Button>
					</FormModel.Item>
					<FormModel.Item>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Checkbox v-model={this.state.keep}>
								<a style={{ color: '#1890ff' }}>记住密码</a>
							</Checkbox>
							<a onClick={() => this.$router.replace('/main/register')}>注册账号</a>
						</div>
					</FormModel.Item>
				</FormModel>
			</div>
		)
	}
}
