import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Row, Col, Spin, Radio, Tree } from 'ant-design-vue'
import { nodeRole, updateNodeRole } from '@/api'
import { HttpStatus, NodeRoleResponse } from '@/types'
import { inteRole } from '@/utils/common'

type State = {
	visible: boolean
	loading: boolean
	dataSource: NodeRoleResponse[]
}

@Component
export default class NodeRole extends Vue {
	$refs!: { form: FormModel }
	private state: State = {
		visible: false,
		loading: true,
		dataSource: []
	}
	private common = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: { id: 0, primary: '', name: '', status: 1, comment: '', role: [] },
		rules: {
			name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
			primary: [{ required: true, message: '请输入角色标识', trigger: 'blur' }]
		}
	}

	/**角色信息**/
	public nodeRole(id: number) {
		nodeRole({ id })
			.then(({ code, data }) => {
				if (code === HttpStatus.OK) {
					this.common.form = Object.assign(this.common.form, {
						primary: data.primary,
						name: data.name,
						status: data.status,
						comment: data.comment,
						role: inteRole(data.children)
					})
					this.state.dataSource = data.children
				}
			})
			.finally(() => {
				this.state.loading = false
			})
	}

	public init(id: number) {
		this.nodeRole(id)
		this.common.form.id = id
		this.state.visible = true
	}

	private onClose() {
		this.state.visible = false
		setTimeout(() => {
			this.state = Object.assign(this.state, { loading: true, dataSource: [] })
			this.common.form = Object.assign(this.common.form, {
				primary: '',
				name: '',
				status: 1,
				comment: '',
				role: []
			})
		}, 300)
	}

	private onSubmit() {
		this.$refs.form.validate(async valid => {
			this.state.loading = true
			if (!valid) {
				setTimeout(() => (this.state.loading = false), 500)
				return
			}

			try {
				const { form } = this.common
				const { code } = await updateNodeRole({
					id: form.id,
					status: form.status,
					comment: form.comment,
					role: form.role
				})
				if (code === HttpStatus.OK) {
					this.$emit('replay')
					this.onClose()
				}
			} catch (e) {
				this.state.loading = false
			}
		})
	}

	protected render() {
		const { state, common } = this
		return (
			<Modal
				title="title"
				dialogStyle={{ maxWidth: '95%' }}
				v-model={state.visible}
				width={880}
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin size="large" class="ant-spin-64" spinning={state.loading}>
					<FormModel
						ref="form"
						class="app-form"
						{...{ props: { model: common.form, rules: common.rules } }}
						labelCol={common.labelCol}
						wrapperCol={common.wrapperCol}
					>
						<Row type="flex">
							<Col flex={12}>
								<FormModel.Item prop="name" label="角色名称">
									<Input v-model={common.form.name} disabled placeholder="角色名称"></Input>
								</FormModel.Item>
							</Col>
							<Col flex={12}>
								<FormModel.Item prop="primary" label="角色标识">
									<Input v-model={common.form.primary} disabled placeholder="角色唯一标识"></Input>
								</FormModel.Item>
							</Col>
						</Row>
						<FormModel.Item prop="comment" label="角色备注">
							<Input.TextArea
								v-model={common.form.comment}
								autoSize={{ minRows: 2, maxRows: 3 }}
								style={{ marginBottom: 0 }}
								placeholder="角色备注"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item prop="status" label="角色状态">
							<Radio.Group v-model={common.form.status} style={{ marginLeft: '10px' }}>
								<Radio value={1}>启用</Radio>
								<Radio value={0}>禁用</Radio>
							</Radio.Group>
						</FormModel.Item>
						<FormModel.Item prop="role" label="角色权限">
							<Tree
								checkable
								v-model={common.form.role}
								treeData={state.dataSource}
								replaceFields={{ children: 'children', title: 'name', value: 'id', key: 'id' }}
							></Tree>
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
