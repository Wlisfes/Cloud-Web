declare module '*.less' {
	const less: any
	export default less
}

declare module '*.module.less' {
	const lessModule: { readonly [key: string]: string }
	export default lessModule
}

declare module 'ant-design-vue/lib/locale-provider/zh_CN' {
	const zh_CN: any
	export default zh_CN
}

declare module 'vue-avatar' {
	import Vue from 'vue'
	export default class VueAvatar extends Vue {}
}
