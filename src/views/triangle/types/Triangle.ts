import Canvas from '@/types/Canvas/Canvas';
import type { Point } from '@/types/common';

/**
 * 三角形
 */
export default class Triangle extends Canvas {
  public triangle: Point = {
    x: 0,
    y: 0
  }; // 左方向曲线数据
  public linearGradient: CanvasGradient | undefined;

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
    super.draw();
    this.reset();
    this.linearGradient = this.context?.createLinearGradient(0, 0, this.width, this.height);
    this.linearGradient?.addColorStop(0, 'rgba(0, 0, 255, 1)');
    this.linearGradient?.addColorStop(1, 'rgba(135, 206, 255, 0.5)');
    this.drawTriangleList();
  }

  /**
   * 重置数据
   */
  public reset(): void {}

  /**
   * 绘制三角形
   */
  public drawTriangleList(): void {
    if (!this.context) {
      return;
    }
    let x1: number = 0;
    let y1: number = 200;
    let x2: number = 0;
    let y2: number = 300;
    let x3: number = 50;
    let y3: number = 275;
    for (let i = 0; i < 500; i++) {
      this.drawTriangle(x1, y1, x2, y2, x3, y3);
      x2 = x1;
      y2 = y1;
      x1 = x3;
      y1 = y3;
      x3 = x1 + this.getRandom(50, 100);
      y3 = y1 + this.getRandom(-50, 50);
      // console.log(2222, x1, y1, x2, y2, x3, y3);
    }
  }

  /**
   * 绘制三角形
   */
  public drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
    if (!(this.context && this.linearGradient)) {
      return;
    }
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineTo(x3, y3);
    this.context.fillStyle = this.linearGradient;
    this.context.fill();
  }

  /**
   * 获取随机数
   * @param x1 第一个数
   * @param x2 第二个数
   * @returns
   */
  public getRandom(x1: number, x2: number): number {
    const max: number = Math.max(x1, x2);
    const min: number = Math.min(x1, x2);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
