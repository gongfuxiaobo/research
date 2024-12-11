import type { WidgetType } from '@/views/form/types/types';

/**
 * 菜单类型
 */
export interface MenuItem {
  name: string;
  type?: WidgetType;
  children?: MenuItem[];
}
