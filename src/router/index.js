import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		path: '/vue-qiankun/commit',
		component: () => import('../views/child.vue')
	},
	{
		path: '/vue-qiankun/style',
		component: () => import('../views/style.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router