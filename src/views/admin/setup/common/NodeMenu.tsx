import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, InputNumber, Select } from 'ant-design-vue'
import { Spin, Radio, Switch, TreeSelect, notification } from 'ant-design-vue'
import { nodeCreateMenu, nodeMenuConter, nodeMenu, nodeUpdateMenu, nodeRoles } from '@/api'
import { HttpStatus, NodeMenuParameter, NodeRoleResponse } from '@/types'
import { ctxFile } from '@/utils/common'

@Component
export default class NodeMenu extends Vue {
	$refs!: { form: FormModel }

	private file: string[] = ctxFile()
	private treeNode: NodeMenuParameter[] = []
	private roleNode: NodeRoleResponse[] = []
	private visible: boolean = false
	private loading: boolean = false
	private active: string = 'create'
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			id: 0,
			type: 1,
			role: [],
			name: '',
			router: '',
			keepAlive: true,
			visible: true,
			path: undefined,
			icon: '',
			order: 1,
			parent: null
		},
		rules: {
			role: [{ required: true, message: '请选择节点权限', trigger: 'blur' }],
			name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
			router: [{ required: true, message: '请输入节点路由', trigger: 'blur' }],
			path: [{ required: true, message: '请输入文件路径', trigger: 'blur' }]
		}
	}

	/**角色列表**/
	private async nodeRoles() {
		// try {
		// 	const { code, data } = await nodeRoles({ page: 1, size: 10 })
		// 	if (code === HttpStatus.OK) {
		// 		this.roleNode = data.list
		// 	}
		// 	return data
		// } catch (e) {
		// 	return e
		// }
	}

	/**目录节点**/
	private async nodeMenuConter() {
		try {
			const { code, data } = await nodeMenuConter()
			if (code === HttpStatus.OK) {
				this.treeNode = data
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**菜单信息**/
	private async nodeMenu(id: number) {
		try {
			const { code, data } = await nodeMenu({ id })
			if (code === HttpStatus.OK) {
				this.state.form = Object.assign(this.state.form, {
					type: data.type,
					role: data.role.map(k => k.id),
					name: data.name,
					router: data.router,
					keepAlive: data.keepAlive === 1,
					visible: data.visible === 1,
					path: data.path,
					icon: data.icon,
					order: data.order,
					parent: data.parent?.id || null
				})
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**创建菜单节点**/
	private async nodeCreateMenu() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeCreateMenu({
				type: form.type,
				role: form.role,
				name: form.name,
				router: form.router,
				path: form.path,
				keepAlive: +form.keepAlive,
				visible: +form.visible,
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

	/**修改菜单**/
	private async nodeUpdateMenu() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeUpdateMenu({
				id: form.id,
				type: form.type,
				role: form.role,
				name: form.name,
				router: form.router,
				path: form.path,
				keepAlive: +form.keepAlive,
				visible: +form.visible,
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

	/**组件调用**/
	public async init(active: 'create' | 'update', id?: number) {
		try {
			this.loading = true
			this.active = active
			this.visible = true
			await this.nodeRoles()
			await this.nodeMenuConter()
			if (id) {
				if (active === 'update') {
					this.state.form.id = id
					await this.nodeMenu(id)
				} else {
					this.state.form = Object.assign(this.state.form, {
						parent: id
					})
				}
			}
			this.loading = false
		} catch (e) {
			this.loading = false
		}
	}

	/**组件初始化**/
	private onClose() {
		this.visible = false
		setTimeout(() => {
			this.loading = false
			this.active = 'create'
			this.state.form = Object.assign(this.state.form, {
				id: 0,
				type: 1,
				role: [],
				name: '',
				router: '',
				keepAlive: true,
				status: true,
				path: '',
				icon: '',
				order: 1,
				parent: null
			})
		}, 300)
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				switch (this.active) {
					case 'create':
						this.nodeCreateMenu()
						break
					case 'update':
						this.nodeUpdateMenu()
						break
				}
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.state
		return (
			<Modal
				title={this.active === 'create' ? '新增' : '编辑'}
				dialogStyle={{ maxWidth: '95%' }}
				v-model={this.visible}
				width={680}
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin size="large" class="ant-spin-64" spinning={this.loading}>
					<FormModel
						ref="form"
						class="app-form"
						{...{ props: { model: form, rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<FormModel.Item label="节点类型">
							<Radio.Group v-model={form.type} disabled={this.active === 'update'}>
								<Radio value={1}>目录</Radio>
								<Radio value={2}>菜单</Radio>
							</Radio.Group>
						</FormModel.Item>
						<FormModel.Item label="节点权限" prop="role">
							<Select mode="multiple" v-model={form.role} allowClear placeholder="请选择节点权限">
								{this.roleNode.map(k => {
									return (
										<Select.Option key={k.id} value={k.id}>
											{k.name}
										</Select.Option>
									)
								})}
							</Select>
						</FormModel.Item>
						{form.type === 1 ? (
							<div>
								<FormModel.Item label="节点名称" prop="name">
									<Input v-model={form.name} placeholder="请输入节点名称"></Input>
								</FormModel.Item>
								<FormModel.Item label="节点图标">
									<Input v-model={form.icon} placeholder="请输入节点图标"></Input>
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
										placeholder="请选择上级节点"
									></TreeSelect>
								</FormModel.Item>
								<FormModel.Item label="排序号">
									<InputNumber v-model={form.order} placeholder="0"></InputNumber>
								</FormModel.Item>
								<FormModel.Item label="是否可见">
									<Switch
										v-model={form.visible}
										checked-children="显示"
										un-checked-children="隐藏"
										default-checked
									></Switch>
								</FormModel.Item>
							</div>
						) : (
							<div>
								<FormModel.Item label="节点名称" prop="name">
									<Input v-model={form.name} placeholder="请输入节点名称"></Input>
								</FormModel.Item>
								<FormModel.Item label="节点路由" prop="router">
									<Input v-model={form.router} placeholder="请输入节点路由"></Input>
								</FormModel.Item>
								<FormModel.Item label="文件路径" prop="path">
									<Select v-model={form.path} allowClear show-search placeholder="请选择文件路径">
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
										placeholder="请选择上级节点"
									></TreeSelect>
								</FormModel.Item>
								<FormModel.Item label="节点图标">
									<Input v-model={form.icon} placeholder="请输入节点图标"></Input>
								</FormModel.Item>
								<FormModel.Item label="排序号">
									<InputNumber v-model={form.order} placeholder="0"></InputNumber>
								</FormModel.Item>
								<FormModel.Item label="是否可见">
									<Switch
										v-model={form.visible}
										checked-children="显示"
										un-checked-children="隐藏"
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
