import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', name: 'Login', component: () => import('@/views/Login.vue') },
  {
    path: '/',
    component: () => import('@/layout/AppLayout.vue'),
    children: [
      { path: '/home', name: 'Home', component: () => import('@/views/Home.vue') },
      { path: '/history', name: 'History', component: () => import('@/views/History.vue') },
      { path: '/audit', name: 'Audit', component: () => import('@/views/Audit.vue'), meta: { admin: true } },
      { path: '/log', name: 'Log', component: () => import('@/views/Log.vue'), meta: { admin: true } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const user = useUserStore()
  if (!user.name && to.path !== '/') return '/'
  if (to.meta?.admin && user.role !== 'admin') return '/home'
})

export default router