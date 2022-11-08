import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Client/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        // meta: { verify: true },
        component: () => import('@/views/client/Home/index.vue')
      },
      {
        path: '/secKill',
        name: 'SecKill',
        meta: { verify: true },
        component: () => import('@/views/client/SecKill/index.vue')
      },
      {
        path: '/personal',
        name: 'PersonalCenter',
        meta: { verify: true },
        component: () => import('@/views/client/PersonalCenter/index.vue')
      },
      {
        path: '/order',
        name: 'Order',
        meta: { verify: true },
        component: () => import('@/views/client/Order/index.vue')
      }
    ]
  },
  {
    path: '/staff',
    name: 'staffLayout',
    component: () => import('@/layout/Staff/index.vue'),
    redirect: '/staff/home',
    children: [
      {
        path: '/staff/home',
        name: 'StaffHome',
        meta: { verify: true },
        component: () => import('@/views/staff/Home/index.vue')
      },
      {
        path: '/staff/secKill',
        name: 'StaffSecKill',
        meta: { verify: true },
        component: () => import('@/views/staff/SecKill/index.vue')
      },
      {
        path: '/staff/earlySift',
        name: 'EarlySift',
        meta: { verify: true },
        component: () => import('@/views/staff/EarlySift/index.vue')
      },
      {
        path: '/staff/personal',
        name: 'StaffPersonalCenter',
        meta: { verify: true },
        component: () => import('@/views/client/PersonalCenter/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/client/Login/index.vue')
  },
  {
    path: '/staff/login',
    name: 'StaffLogin',
    component: () => import('@/views/staff/Login/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/client/Register/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
