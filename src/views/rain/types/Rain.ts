import Canvas from '@/types/Canvas/Canvas';
import type { Digits, Digit } from '@/views/rain/types/types';

/**
 * 数字雨
 */
export default class Rain extends Canvas {
  public space: number = 50; // 振幅
  public speed: number = 1; // 速度
  public fontSize: number = 16; // 文字大小
  public status: string = 'draw'; // 动画状态
  public digits: Digits[] = []; // 数字数据
  public text: number = 10; // 文字
  public opacity: number = 10; // 透明度

  constructor(data: {
    id: string; // 画布ID
  }) {
    super(data);
    this.draw();
  }

  /**
   * 绘制
   * @returns
   */
  public draw(): void {
    if (!this.context) {
      return;
    }
    this.clear();
    this.resize();
    this.reset();
    this.initDigit();
    this.loop();
  }

  /**
   * 重置数据
   */
  public reset(): void {
    this.digits = [];
  }

  /**
   * 重绘
   */
  public redraw(): void {
    this.status = 'resize';
    this.draw();
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
          speed: 1
        });
      }
      digits.push({
        speed: 1,
        index: 0,
        length: yNum,
        list
      });
    }
    this.digits = digits;
  }

  /**
   * 循环
   */
  public loop(): void {
    if (this.status === 'draw') {
      this.clear();
      this.drawDigit();
      this.requestAnimation(() => this.loop());
    } else if (this.status === 'resize') {
      this.status = 'draw';
    }
  }

  /**
   * 绘制数字
   */
  public drawDigit(): void {
    this.digits.forEach((item: Digits) => {
      item.list.forEach((digit: Digit) => {
        if (digit.opacity - digit.speed > 0) {
          digit.opacity -= digit.speed;
        }
        if (item.index === digit.index) {
          digit.opacity = this.opacity;
          digit.text = this.getRandomText();
        }
        this.drawText(digit);
      });
      if (item.index + item.speed > item.list.length) {
        item.index = Math.floor(2 * (Math.random() * this.opacity * 2) - this.opacity * 2);
      } else {
        item.index += item.speed;
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
    this.context.fillStyle = `rgba(0, 255, 0, ${digit.opacity / this.opacity})`;
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
}
