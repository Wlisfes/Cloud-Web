import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Radio, Spin, notification } from 'ant-design-vue'
import { AppEditor, AppCover } from '@/components/common'
import { NodeAppCover } from '@/components/multiple'
import { nodePartner, nodeCreatePartner, nodeUpdatePartner } from '@/api'
import { HttpStatus, NodePoster } from '@/types'

@Component
export default class NodePartner extends Vue {
	$refs!: { formModel: FormModel }

	private loading: boolean = true
	private visible: boolean = false
	private active: string = 'create'
	private labelCol = { span: 4, style: { width: '100px' } }
	private wrapperCol = { span: 20, style: { width: 'calc(100% - 100px)' } }
	private form = {
		id: 0,
		title: '',
		content: '',
		html: '',
		status: 1,
		cover: []
	}
	private rules = {
		title: [{ required: true, message: '请输入日志标题', trigger: 'blur' }],
		content: [{ required: true, message: '请输入日志内容', trigger: 'blur' }]
	}

	/**日志信息-uid**/
	private nodePartner(id: number) {
		return new Promise(async (resolve, rejcect) => {
			try {
				const { code, data } = await nodePartner({ id })
				if (code === HttpStatus.OK) {
					this.form = Object.assign(this.form, {
						id: id,
						title: data.title,
						content: data.content,
						html: data.html,
						status: data.status,
						cover: data.cover || []
					})
				}
				resolve(data)
			} catch (e) {
				rejcect(e)
			}
		})
	}

	/**创建日志**/
	private async nodeCreatePartner() {
		try {
			const { form } = this
			const { code, data } = await nodeCreatePartner({
				title: form.title,
				content: form.content,
				html: form.html,
				status: form.status,
				cover: form.cover.map((k: NodePoster) => k.id)
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

	/**更新日志**/
	private async nodeUpdatePartner() {
		try {
			const { form } = this
			const { code, data } = await nodeUpdatePartner({
				id: form.id,
				title: form.title,
				content: form.content,
				html: form.html,
				status: form.status,
				cover: form.cover.map((k: NodePoster) => k.id)
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

	/**图片回调**/
	private onSubmitCover(props: never) {
		console.log(props)
		if (Array.isArray(props)) {
			this.form.cover = this.form.cover.concat(props)
		} else {
			this.form.cover.push(props)
		}
	}

	/**图片删除回调**/
	private onDeleteCover(index: number) {
		this.form.cover.splice(index, 1)
	}

	/**组件调用**/
	public async init(active: 'create' | 'update', id?: number) {
		try {
			this.loading = true
			this.active = active
			this.visible = true
			if (id) {
				this.form.id = id
				await this.nodePartner(id)
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
			this.form = Object.assign(this.form, {
				id: 0,
				title: '',
				content: '',
				html: '',
				status: 1,
				cover: []
			})
		}, 300)
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.formModel.validate(async valid => {
			if (valid) {
				this.loading = true
				switch (this.active) {
					case 'create':
						this.nodeCreatePartner()
						break
					case 'update':
						this.nodeUpdatePartner()
						break
				}
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this
		return (
			<Modal
				title={this.active === 'create' ? '新增' : '编辑'}
				dialogStyle={{ maxWidth: '95%', padding: '20px 0' }}
				v-model={this.visible}
				width={1080}
				centered
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin class="ant-spin-64" spinning={this.loading}>
					<FormModel
						ref="formModel"
						class="app-form"
						{...{ props: { model: form, rules: rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<FormModel.Item prop="title" label="日志标题">
							<Input v-model={form.title} placeholder="日志标题"></Input>
						</FormModel.Item>
						<FormModel.Item label="封面列表" prop="cover">
							<AppCover
								multiple
								ratio={16 / 9}
								dataSource={form.cover}
								onSubmit={this.onSubmitCover}
								onDelete={this.onDeleteCover}
							></AppCover>
						</FormModel.Item>
						<FormModel.Item prop="status" label="角色状态">
							<Radio.Group v-model={form.status} style={{ marginLeft: '10px' }}>
								<Radio value={1}>启用</Radio>
								<Radio value={0}>禁用</Radio>
							</Radio.Group>
						</FormModel.Item>
						<FormModel.Item label="日志内容" prop="content">
							<AppEditor
								height={480}
								defaultOpen="edit"
								content={form.content}
								onChange={({ content, html }: { content: string; html: string }) => {
									form.html = html
									form.content = content
								}}
							></AppEditor>
						</FormModel.Item>
					</FormModel>
				</Spin>
				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>取消</Button>
					<Button type="primary" disabled={this.loading} onClick={this.onSubmit}>
						确定
					</Button>
				</div>
			</Modal>
		)
	}
}
