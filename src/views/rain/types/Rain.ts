import Canvas from '@/types/Canvas/Canvas';
import type { Digits, Digit } from '@/views/rain/types/types';

/**
 * 数字雨
 */
export default class Rain extends Canvas {
  public speed: number = 1; // 速度
  public fontSize: number = 16; // 文字大小
  public digits: Digits[] = []; // 数字数据
  public text: number = 10; // 文字
  public opacity: number = 10; // 透明度速度
  public rate: number = 1; // 频率

  constructor(data: {
    id: string; // 画布ID
  }) {
    super(data);
    this.draw();
  }

  /**
   * 绘制
   */
  public draw(): void {
    super.draw();
    this.reset();
    this.initDigit();
    this.requestAnimation();
  }

  /**
   * 重置数据
   */
  public reset(): void {
    this.digits = [];
  }

  /**
   * 初始化数字
   */
  public initDigit(): void {
    const xNum: number = Math.floor(this.width / this.fontSize);
    const yNum: number = Math.floor(this.height / this.fontSize);
    const digits: Digits[] = [];

    for (let x = 0; x < xNum; x++) {
      const list: Digit[] = [];
      for (let y = 0; y < yNum; y++) {
        list.push({
          x: x * this.fontSize + this.fontSize / 2 + this.fontSize,
          y: y * this.fontSize + this.fontSize / 2,
          text: this.getRandomText(),
          opacity: 0,
          index: y,
          speed: this.rate
        });
      }
      digits.push({
        speed: this.speed,
        rate: this.rate,
        index: 0,
        length: yNum,
        isRefresh: false,
        list
      });
    }
    this.digits = digits;
  }

  /**
   * 循环
   */
  public requestAnimation(): void {
    this.clear();
    this.drawDigit();
    super.requestAnimation();
  }

  /**
   * 绘制数字
   */
  public drawDigit(): void {
    this.digits.forEach((item: Digits) => {
      item.list.forEach((digit: Digit) => {
        if (digit.opacity - digit.speed > 0 && item.index % 2 === 0) {
          digit.opacity = digit.opacity - digit.speed;
        }
        if (item.index === digit.index) {
          digit.opacity = this.opacity;
          digit.text = this.getRandomText();
        }
        this.drawText(digit);
      });
      if (item.index + item.speed > item.list.length) {
        item.index = Math.floor(Math.random() * -item.length);
      } else {
        item.index = item.index + item.speed;
      }
    });
  }

  /**
   * 绘制文字
   * @returns
   */
  public drawText(digit: Digit): void {
    if (!this.context) {
      return;
    }
    this.context.font = `bold ${this.fontSize}px sans-serif`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.shadowColor = 'rgba(0, 255, 0, 0.5)';
    this.context.shadowBlur = this.fontSize * 2;
    this.context.fillStyle = `rgba(0, 255, 0, ${this.getDecimal(digit.opacity / this.opacity)})`;
    this.context.fillText(digit.text, digit.x, digit.y);
  }

  /**
   * 获取随机文字
   * @returns
   */
  public getRandomText(): string {
    // return String.fromCharCode(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
    return Math.floor(Math.random() * this.text).toString();
  }

  /**
   * 获取整数
   * @param decimal 小数
   * @param digit 位数
   * @returns
   */
  public getDecimal(decimal: number, digit: number = 1): number {
    return Number(decimal.toFixed(digit));
  }
}
