declare module '*.less' {
	const less: any
	export default less
}

declare module '*.module.less' {
	const lessModule: { readonly [key: string]: string }
	export default lessModule
}
