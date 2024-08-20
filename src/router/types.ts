import type { Component, Raw } from 'vue';

/** 懒加载类型 */
type Lazy<T> = () => Promise<T>;

/** 路由配置 */
export interface RouteConfig {
  path: string; // 路由路径
  component?: Component | Lazy<Component>; // 路由组件，如果没有，则表示仅用于菜单展示，不能被访问(不接受点击)
  name?: string; // 路由名称，用于页面跳转，可以不命名（不是页面标题）
  meta: {
    title: string; // 页面名称，用于显示菜单和面包屑
    icon?: Raw<Component>; // 菜单图标组件
    permission?: () => boolean; // 权限判断函数，返回true表示有权限，返回false表示无权限
    hideInMenu?: boolean; // 是否在菜单中隐藏
  };
  children?: RouteConfig[]; // 子路由
}
