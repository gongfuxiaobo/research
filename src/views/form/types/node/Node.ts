import { DataType, WidgetType } from '@/views/form/types/types';

/**
 * 表单节点
 */
export default abstract class Node {
  public id: string; // 节点ID
  public name: string; // 属性名
  public type: DataType; // 数据类型
  public widget: WidgetType; // 组件类型
  public title?: string; // 名称
  public required?: boolean; // 是否必填
  public description?: string; // 描述
  public prev?: Node; // 上一个节点
  public next?: Node; // 下一个节点
  public parent?: Node; // 父级节点

  constructor(data: any) {
    this.type = data.type;
    this.widget = data.widget;
    this.title = data.title;
    this.required = data.required;
    this.description = data.description;
    this.name = data.name || this.generateName();
    this.id = this.name;
  }

  /**
   * 生成name
   */
  public generateName(): string {
    const time: number = new Date().getTime();
    const random: string = Math.random().toString(36).substring(2);
    return `${this.type}_${time}_${random}`;
  }

  public insertPrevNode(_node?: Node): void {
    this.prev = _node;
  }

  public insertNextNode(_node?: Node): void {
    this.next = _node;
  }

  public insertParentNode(_node?: Node): void {
    this.parent = _node;
  }
}
