import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, InputNumber, Select } from 'ant-design-vue'
import { Spin, Radio, Switch, TreeSelect, notification } from 'ant-design-vue'
import { nodeCreateMenu, nodeMenuConter } from '@/api'
import { HttpStatus, NodeMenuParameter } from '@/types'
import { ctxFile } from '@/utils/common'

@Component
export default class NodeMenu extends Vue {
	$refs!: { form: FormModel }

	private file: string[] = ctxFile()
	private treeNode: NodeMenuParameter[] = []
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
			keepAlive: true,
			status: true,
			path: '',
			icon: '',
			order: 1,
			parent: null
		},
		rules: {
			name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
			router: [{ required: true, message: '请输入节点路由', trigger: 'blur' }],
			path: [{ required: true, message: '请输入文件路径', trigger: 'blur' }]
		}
	}

	/**目录节点**/
	private async nodeMenuConter() {
		try {
			const { code, data } = await nodeMenuConter()
			if (code === HttpStatus.OK) {
				this.treeNode = data
			}
		} catch (e) {}
	}

	/**创建菜单节点**/
	private async nodeCreateMenu() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeCreateMenu({
				type: form.type,
				name: form.name,
				router: form.router,
				path: form.path,
				keepAlive: +form.keepAlive,
				status: +form.status,
				redirect: form.redirect,
				icon: form.icon,
				order: form.order,
				parent: form.parent
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

	public init() {
		this.nodeMenuConter()
		this.visible = true
	}

	private onClose() {
		this.loading = false
		this.visible = false
	}

	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				this.nodeCreateMenu()
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.state
		return (
			<Modal
				title="title"
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={this.visible}
				width={800}
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
							<Radio.Group v-model={form.type}>
								<Radio value={1}>目录</Radio>
								<Radio value={2}>菜单</Radio>
							</Radio.Group>
						</FormModel.Item>
						{form.type === 1 ? (
							<div>
								<FormModel.Item label="节点名称" prop="name">
									<Input v-model={form.name}></Input>
								</FormModel.Item>
								<FormModel.Item label="节点图标">
									<Input v-model={form.icon}></Input>
								</FormModel.Item>
								<FormModel.Item label="上级节点">
									<TreeSelect
										v-model={form.parent}
										tree-data={this.treeNode}
										show-search
										allow-clear
										tree-default-expand-all
										replaceFields={{ children: 'children', title: 'name', key: 'id', value: 'id' }}
										dropdown-style={{ maxHeight: '300px', overflow: 'auto' }}
									></TreeSelect>
								</FormModel.Item>
								<FormModel.Item label="排序号">
									<InputNumber v-model={form.order}></InputNumber>
								</FormModel.Item>
								<FormModel.Item label="节点状态">
									<Switch
										v-model={form.status}
										checked-children="开"
										un-checked-children="关"
										default-checked
									></Switch>
								</FormModel.Item>
							</div>
						) : (
							<div>
								<FormModel.Item label="节点名称" prop="name">
									<Input v-model={form.name}></Input>
								</FormModel.Item>
								<FormModel.Item label="节点路由" prop="router">
									<Input v-model={form.router}></Input>
								</FormModel.Item>
								<FormModel.Item label="文件路径" prop="path">
									<Select v-model={form.path} allowClear show-search>
										<Select.Option value="Layout">Layout</Select.Option>
										{this.file.map((name, index) => {
											return (
												<Select.Option key={index} value={name}>
													{name}
												</Select.Option>
											)
										})}
									</Select>
								</FormModel.Item>
								<FormModel.Item label="上级节点">
									<TreeSelect
										v-model={form.parent}
										tree-data={this.treeNode}
										show-search
										allow-clear
										tree-default-expand-all
										replaceFields={{ children: 'children', title: 'name', key: 'id', value: 'id' }}
										dropdown-style={{ maxHeight: '300px', overflow: 'auto' }}
									></TreeSelect>
								</FormModel.Item>
								<FormModel.Item label="节点图标">
									<Input v-model={form.icon}></Input>
								</FormModel.Item>
								<FormModel.Item label="排序号">
									<InputNumber v-model={form.order}></InputNumber>
								</FormModel.Item>
								<FormModel.Item label="节点状态">
									<Switch
										v-model={form.status}
										checked-children="开"
										un-checked-children="关"
										default-checked
									></Switch>
								</FormModel.Item>
								<FormModel.Item label="路由缓存">
									<Switch
										v-model={form.keepAlive}
										checked-children="开"
										un-checked-children="关"
										default-checked
									></Switch>
								</FormModel.Item>
							</div>
						)}
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
