import Node from '@/views/form/types/node/Node';
import { DataType, WidgetName, WidgetType } from '@/views/form/types/types';

/**
 * 单行文本
 */
export default class InputNode extends Node {
  public defaultValue: string = ''; // 默认值
  public placeholder?: string = '请输入'; // 文本占位符
  public minLength?: number; // 输入最小长度
  public maxLength?: number; // 输入最大长度
  public pattern?: string; // 正则

  constructor(data?: any) {
    super({
      ...data,
      type: DataType.String,
      widget: WidgetType.Input,
      title: WidgetName[WidgetType.Input]
    });
    this.minLength = data?.minLength;
    this.maxLength = data?.maxLength;
    this.pattern = data?.pattern;
  }
}
