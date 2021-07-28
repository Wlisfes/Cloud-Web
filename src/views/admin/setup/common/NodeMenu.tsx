import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, InputNumber, Col, Spin, Radio, Switch, TreeSelect } from 'ant-design-vue'

@Component
export default class NodeMenu extends Vue {
	$refs!: { form: FormModel }

	private visible: boolean = false
	private loading: boolean = false
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			type: 1,
			name: '',
			router: '',
			redirect: '',
			keepAlive: 1,
			ststus: true,
			path: '',
			icon: '',
			order: 1,
			parent: null
		},
		rules: {
			name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
			primary: [{ required: true, message: '请输入角色标识', trigger: 'blur' }]
		}
	}

	public init() {
		this.visible = true
	}

	private onClose() {
		this.visible = false
	}

	private onSubmit() {
		this.$refs.form.validate(async valid => {})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.state
		return (
			<Modal
				title="title"
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={this.visible}
				width={600}
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin size="large" spinning={this.loading}>
					<FormModel
						ref="form"
						class="app-form"
						{...{ props: { model: form, rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<FormModel.Item prop="status" label="节点类型">
							<Radio.Group V-model={form.type}>
								<Radio value={1}>目录</Radio>
								<Radio value={2}>菜单</Radio>
								<Radio value={3}>权限</Radio>
							</Radio.Group>
						</FormModel.Item>
						<FormModel.Item label="节点名称" prop="name">
							<Input v-model={form.name}></Input>
						</FormModel.Item>
						<FormModel.Item label="上级节点">
							<TreeSelect
								v-model={form.parent}
								show-search
								allow-clear
								tree-default-expand-all
								dropdown-style={{ maxHeight: '300px', overflow: 'auto' }}
							>
								<TreeSelect.TreeNode key="1" value="parent 1" title="parent 1">
									<TreeSelect.TreeNode
										key="1-1"
										value="parent 1-1-1"
										title="parent 1-1-2"
									></TreeSelect.TreeNode>
									<TreeSelect.TreeNode
										key="1-2"
										value="parent 1-2-1"
										title="parent 1-2-2"
									></TreeSelect.TreeNode>
								</TreeSelect.TreeNode>
								<TreeSelect.TreeNode key="2" value="parent 2" title="parent 2">
									<TreeSelect.TreeNode
										key="2-1"
										value="parent 2-1-1"
										title="parent 2-1-2"
									></TreeSelect.TreeNode>
									<TreeSelect.TreeNode
										key="2-2"
										value="parent 2-2-1"
										title="parent 2-2-2"
									></TreeSelect.TreeNode>
								</TreeSelect.TreeNode>
							</TreeSelect>
						</FormModel.Item>
						<FormModel.Item label="节点状态">
							<Switch
								v-model={form.ststus}
								checked-children="开"
								un-checked-children="关"
								default-checked
							></Switch>
						</FormModel.Item>
						<FormModel.Item label="节点图标">
							<Input v-model={form.icon}></Input>
						</FormModel.Item>
						<FormModel.Item label="排序号">
							<InputNumber v-model={form.order}></InputNumber>
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
