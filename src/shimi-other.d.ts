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

declare module '@bytemd/vue' {
	import Vue from 'vue'
	export class Editor extends Vue {}
	export class Viewer extends Vue {}
}
declare module 'bytemd/lib/locales/zh_Hans.json' {
	const zh_Hans: any = {}
	export default zh_Hans
}
