const asyncRoutes: { [key: string]: Function } = {
	['/views/admin/home/Home']: () => import('@/views/admin/home/Home'),
	['/views/admin/user/User']: () => import('@/views/admin/user/User'),
	['/views/admin/user/Role']: () => import('@/views/admin/user/Role'),
	['/views/admin/user/Auth']: () => import('@/views/admin/user/Auth'),
	['/views/admin/cloud/Cloud']: () => import('@/views/admin/cloud/Cloud')
}

export default asyncRoutes
