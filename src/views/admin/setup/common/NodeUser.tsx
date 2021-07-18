import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Row, Col, Spin, Radio, Tree } from 'ant-design-vue'
import { AppCover } from '@/components/common'
import { nodeUidUser } from '@/api'
import { HttpStatus } from '@/types'

@Component
export default class NodeUser extends Vue {
	$refs!: { form: FormModel }
	private state = {
		visible: false,
		loading: true,
		dataSource: []
	}
	private common = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: { account: '', avatar: '', nickname: '', email: '', mobile: '', comment: '', status: 1 },
		rules: {
			nickname: [{ required: true, message: '请输入角色昵称', trigger: 'blur' }]
		}
	}

	private nodeUidUser(uid: number) {
		this.state.loading = true
		nodeUidUser({ uid })
			.then(({ code, data }) => {
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
			})
			.finally(() => {
				this.state.loading = false
			})
	}

	public init(uid: number) {
		this.nodeUidUser(uid)
		this.state.visible = true
	}

	private onClose() {
		this.state = Object.assign(this.state, { visible: false, loading: true, dataSource: [] })
		this.common.form = Object.assign(this.common.form, {
			account: '',
			avatar: '',
			nickname: '',
			email: '',
			mobile: '',
			status: 1
		})
	}

	private onSubmit() {
		this.$refs.form.validate(async valid => {})
	}

	protected render() {
		const { state, common } = this

		return (
			<Modal
				title="title"
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
							<Col flex={12}>
								<FormModel.Item prop="nickname" label="昵称">
									<Input v-model={common.form.nickname} placeholder="昵称"></Input>
								</FormModel.Item>
							</Col>
							<Col flex={12}>
								<FormModel.Item prop="account" label="账号">
									<Input v-model={common.form.account} disabled placeholder="账号"></Input>
								</FormModel.Item>
							</Col>
						</Row>
						<Row type="flex">
							<Col flex={12}>
								<FormModel.Item prop="email" label="邮箱">
									<Input v-model={common.form.email} placeholder="邮箱"></Input>
								</FormModel.Item>
							</Col>
							<Col flex={12}>
								<FormModel.Item prop="mobile" label="手机号">
									<Input v-model={common.form.mobile} placeholder="手机号"></Input>
								</FormModel.Item>
							</Col>
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
