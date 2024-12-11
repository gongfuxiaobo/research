import Node from '@/views/form/types/node/Node';
import { DataType, WidgetName, WidgetType } from '@/views/form/types/types';

/**
 * 列表
 */
export default class List extends Node {
  public minLength?: number = undefined; // 元素最小个数
  public maxLength?: number = undefined; // 元素最大个数
  public head?: Node; // 子节点头部
  public tail?: Node; // 子节点尾部

  constructor() {
    super({
      type: DataType.Array,
      widget: WidgetType.List,
      title: WidgetName[WidgetType.List]
    });
  }

  public insertHeadNode(_node?: Node): void {
    this.head = _node;
  }
}
