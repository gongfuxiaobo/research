/**
 * 数据类型枚举
 */
export enum DataType {
  Array = 'Array', // 数组
  Object = 'Object', // 对象
  String = 'String', // 字符串
  Number = 'Number', // 数值
  Boolean = 'Boolean' // 布尔值
}

/**
 * 组件类型枚举
 */
export enum WidgetType {
  Root = 'Root', // 根
  List = 'List', // 列表
  Object = 'Object', // 对象
  Input = 'Input', // 单行文本
  TextArea = 'TextArea', // 多行文本
  Radio = 'Radio', // 单选
  Select = 'Select', // 下拉单选
  InputNumber = 'InputNumber', // 数字输入
  Switch = 'Switch', // 开关
  Checkbox = 'Checkbox', // 勾选
  CheckboxMultiple = 'CheckboxMultiple', // 多选
  SelectMultiple = 'SelectMultiple', // 下拉多选
  Cascader = 'Cascader' // 级联选择
}

/**
 * 组件类型名称
 */
export const WidgetName: Record<WidgetType, string> = {
  [WidgetType.Root]: '根',
  [WidgetType.List]: '列表',
  [WidgetType.Object]: '对象',
  [WidgetType.Input]: '单行文本',
  [WidgetType.TextArea]: '多行文本',
  [WidgetType.Radio]: '单选',
  [WidgetType.Select]: '下拉单选',
  [WidgetType.InputNumber]: '数字输入',
  [WidgetType.Switch]: '开关',
  [WidgetType.Checkbox]: '勾选',
  [WidgetType.CheckboxMultiple]: '多选',
  [WidgetType.SelectMultiple]: '下拉多选',
  [WidgetType.Cascader]: '级联选择'
};
