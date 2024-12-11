import Node from '@/views/form/types/node/Node';
import { DataType, WidgetName, WidgetType } from '@/views/form/types/types';

const Text_Area_Rows: number = 3; // 默认行数

/**
 * 多行文本
 */
export default class TextAreaNode extends Node {
  public defaultValue: string = ''; // 默认值
  public placeholder?: string = '请输入'; // 文本占位符
  public minLength?: number; // 输入最小长度
  public maxLength?: number; // 输入最大长度
  public pattern?: string; // 正则
  public rows?: number = Text_Area_Rows; // 行数

  constructor(data?: any) {
    super({
      ...data,
      type: DataType.String,
      widget: WidgetType.TextArea,
      title: WidgetName[WidgetType.TextArea]
    });
    this.minLength = data?.minLength;
    this.maxLength = data?.maxLength;
    this.pattern = data?.pattern;
    this.rows = data?.rows || Text_Area_Rows;
  }
}
