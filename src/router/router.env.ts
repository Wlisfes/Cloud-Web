const asyncRoutes: { [key: string]: Function } = {
	['/views/admin/home/Home']: () => import('@/views/admin/home/Home'),
	['/views/admin/setup/User']: () => import('@/views/admin/setup/User'),
	['/views/admin/setup/Role']: () => import('@/views/admin/setup/Role'),
	['/views/admin/setup/Auth']: () => import('@/views/admin/setup/Auth'),
	['/views/admin/cloud/Cloud']: () => import('@/views/admin/cloud/Cloud')
}

export default asyncRoutes
