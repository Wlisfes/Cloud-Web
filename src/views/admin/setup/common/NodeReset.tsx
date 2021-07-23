import { Vue, Component } from 'vue-property-decorator'
import { Modal, Spin, FormModel, Input, Button } from 'ant-design-vue'
import { nodeUidUser } from '@/api'
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
		this.state.loading = false
	}

	/**提交验证**/
	private onSubmit() {}

	protected render() {
		const { state, common } = this

		return (
			<Modal
				title="重置密码"
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={state.visible}
				width={480}
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
						<FormModel.Item prop="password" label="密码">
							<Input.Password
								v-model={common.form.password}
								max-length={20}
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
