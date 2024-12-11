/**
 * 数字数据类型
 */
export interface Digits {
  speed: number; // 速度
  rate: number; // 频率
  index: number; // 索引
  length: number; // 长度
  isRefresh: boolean; // 是否刷新
  list: Digit[]; // 列表
}

/**
 * 数字类型
 */
export interface Digit {
  x: number; // x坐标
  y: number; // y坐标
  text: string; // 文本
  opacity: number; // 透明度
  index: number; // 索引
  speed: number; // 速度
}
