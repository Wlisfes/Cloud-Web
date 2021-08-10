const asyncRoutes: { [key: string]: Function } = {
	['/admin/home/Home']: () => import('@/views/admin/home/Home'),
	['/admin/setup/User']: () => import('@/views/admin/setup/User'),
	['/admin/setup/Role']: () => import('@/views/admin/setup/Role'),
	['/admin/setup/Menu']: () => import('@/views/admin/setup/Menu'),
	['/admin/cloud/Cloud']: () => import('@/views/admin/cloud/Cloud'),
	['/admin/cloud/Source']: () => import('@/views/admin/cloud/Source'),
	['/admin/archive/Source']: () => import('@/views/admin/archive/Source'),
	['/admin/archive/Article']: () => import('@/views/admin/archive/Article')
}

export default asyncRoutes
