import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { routeConfig } from '@/router/routeConfig';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/403',
      name: '403',
      component: () => import('@/views/error/error-403.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/error/error-404.vue')
    },
    {
      path: '/',
      name: 'root',
      redirect: '/home',
      children: routeConfig as RouteRecordRaw[]
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ]
});

/** 权限校验 */
router.beforeEach(async (to, from) => {
  if (to.meta?.permission && !(to.meta?.permission as Function)()) {
    return { name: '403' };
  }
});

export default router;
