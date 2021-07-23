import { Vue, Component } from 'vue-property-decorator'
import { Modal, Spin, FormModel, Input, Button, notification } from 'ant-design-vue'
import { nodeUpdatePwsUser } from '@/api'
import { HttpStatus } from '@/types'

@Component
export default class NodeUser extends Vue {
	$refs!: { form: FormModel }
	private state = {
		visible: false,
		loading: false
	}

	private common = {
		labelCol: { span: 4, style: { width: 'auto' } },
		wrapperCol: { span: 20, style: { width: '100%' } },
		form: {
			uid: 0,
			password: ''
		},
		rules: {
			password: [
				{ required: true, message: '请输入密码', trigger: 'change' },
				{ min: 6, message: '密码不能少于6位', trigger: 'blur' }
			]
		}
	}

	/**初始化组件**/
	public async init(uid: number) {
		this.state.visible = true
		this.common.form.uid = uid
	}

	/**取消重置**/
	private onClose() {
		this.state.visible = false
		this.state.loading = false
		this.common.form = Object.assign(this.common.form, {
			uid: 0,
			password: ''
		})
	}

	/**提交验证**/
	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				try {
					this.state.loading = true
					const { code, data } = await nodeUpdatePwsUser({
						uid: this.common.form.uid,
						password: this.common.form.password
					})
					if (code === HttpStatus.OK) {
						notification.success({ message: data.message, description: '' })
						this.$emit('replay')
						this.onClose()
					}
				} catch (e) {
					this.state.loading = false
				}
			}
		})
	}

	protected render() {
		const { state, common } = this

		return (
			<Modal
				title="重置密码"
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={state.visible}
				width={480}
				destroyOnClose
				onClose={this.onClose}
			>
				<Spin size="large" spinning={state.loading}>
					<FormModel
						ref="form"
						class="app-form"
						{...{ props: { model: common.form, rules: common.rules } }}
						labelCol={common.labelCol}
						wrapperCol={common.wrapperCol}
					>
						<FormModel.Item prop="password" label="密码">
							<Input.Password
								v-model={common.form.password}
								max-length={16}
								placeholder="密码"
							></Input.Password>
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
