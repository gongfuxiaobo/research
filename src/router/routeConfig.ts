import type { RouteConfig } from '@/router/types';
/** 路由配置 */
export const routeConfig: RouteConfig[] = [
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/home/appHome.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: 'heartBeat',
    name: 'heartBeat',
    component: () => import('@/views/heartBeat/heartBeat.vue'),
    meta: {
      title: '心跳'
    }
  },
  {
    path: 'sin',
    name: 'sin',
    component: () => import('@/views/sin/sin.vue'),
    meta: {
      title: '正弦函数'
    }
  },
  {
    path: 'cos',
    name: 'cos',
    component: () => import('@/views/cos/cos.vue'),
    meta: {
      title: '余弦函数'
    }
  },
  {
    path: 'rain',
    name: 'rain',
    component: () => import('@/views/rain/rain.vue'),
    meta: {
      title: '数字雨'
    }
  },
  {
    path: 'input',
    name: 'input',
    component: () => import('@/views/input/input.vue'),
    meta: {
      title: '输入'
    }
  }
];
