import Node from '@/views/form/types/node/Node';
import { DataType, WidgetName, WidgetType } from '@/views/form/types/types';

/**
 * 对象
 */
export default class ObjectNode extends Node {
  public head?: Node; // 子节点头部
  public tail?: Node; // 子节点尾部

  constructor() {
    super({
      type: DataType.Object,
      widget: WidgetType.Object,
      title: WidgetName[WidgetType.Object]
    });
  }

  public insertHeadNode(_node?: Node): void {
    this.head = _node;
  }
}
