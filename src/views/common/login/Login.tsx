import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Button, Input, Checkbox } from 'ant-design-vue'

@Component
export default class Login extends Vue {
	$refs!: { form: FormModel }

	private state = {
		form: {
			username: '',
			password: ''
		},
		rules: {
			username: [{ required: true, message: '请输入用户名、邮箱、手机号', trigger: 'change' }],
			password: [
				{ required: true, message: '请输入密码', trigger: 'change' },
				{ min: 6, message: '密码不能少于6位', trigger: 'blur' }
			]
		}
	}

	protected created() {}

	private onSubmit() {
		this.$refs.form.validate((err, form) => {})
	}

	protected render() {
		const { form, rules } = this.state
		return (
			<div>
				<h1 style={{ textAlign: 'center' }}>欢迎到来、久违了</h1>
				<FormModel ref="form" {...{ props: { model: form, rules } }}>
					<FormModel.Item prop="username">
						<Input v-model={form.username} max-length={20} placeholder="用户名、邮箱、手机号"></Input>
					</FormModel.Item>
					<FormModel.Item prop="password">
						<Input.Password
							v-model={form.password}
							type="password"
							max-length={20}
							placeholder="密码"
						></Input.Password>
					</FormModel.Item>
					<FormModel.Item>
						<Button size="large" type="primary" style={{ width: '100%' }} onClick={this.onSubmit}>
							登录
						</Button>
					</FormModel.Item>
					<FormModel.Item>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Checkbox>
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
