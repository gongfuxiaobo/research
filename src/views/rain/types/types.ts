/**
 * 数字数据类型
 */
export interface Digits {
  speed: number;
  index: number;
  length: number;
  list: Digit[];
}

/**
 * 数字类型
 */
export interface Digit {
  x: number;
  y: number;
  text: string;
  opacity: number;
  index: number;
  speed: number;
}
