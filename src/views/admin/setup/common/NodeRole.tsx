import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Row, Col } from 'ant-design-vue'

@Component
export default class NodeRole extends Vue {
	$refs!: { form: FormModel }
	private state = {
		visible: false
	}
	private common = {
		form: {
			primary: null,
			name: null,
			status: null
		},
		rules: {}
	}

	public init(props: number) {
		console.log(props)
		this.state.visible = true
	}

	private onClose() {
		this.state.visible = false
	}

	private onSubmit() {}

	protected render() {
		const { state, common } = this

		return (
			<Modal v-model={state.visible} width={800} title="title">
				<FormModel layout="inline" {...{ props: { model: common.form, rules: common.rules } }}>
					<Row type="flex">
						<Col flex={1}>
							<FormModel.Item prop="primary" label="角色名称" style={{ width: '100%' }} required>
								<Input v-model={common.form.primary} placeholder="角色名称"></Input>
							</FormModel.Item>
						</Col>
						<Col flex={1}>
							<FormModel.Item prop="primary" label="角色名称" style={{ width: '100%' }} required>
								<Input v-model={common.form.primary} placeholder="角色名称"></Input>
							</FormModel.Item>
						</Col>
					</Row>
					<FormModel.Item prop="primary" label="角色名称" style={{ width: '100%' }} required>
						<Input v-model={common.form.primary} placeholder="角色名称"></Input>
					</FormModel.Item>
				</FormModel>

				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>取消</Button>
					<Button type="primary" onClick={this.onSubmit}>
						确定
					</Button>
				</div>
			</Modal>
		)
	}
}
