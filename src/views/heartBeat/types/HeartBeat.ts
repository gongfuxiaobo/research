import type { Point } from '@/types/common';

/**
 * 心跳
 */
export default class HeartBeat {
  public id: string; // 画布ID
  public canvas?: HTMLCanvasElement; // 画布对象
  public context?: CanvasRenderingContext2D; // 画布的上下文对象
  public width: number = 0; // 画布宽度
  public height: number = 0; // 画布高度
  public animation?: number; // 动画对象
  public start: Point = {
    x: 0,
    y: 500
  }; // 起点
  public end: Point = {
    x: 0,
    y: 500
  }; // 终点
  public current: Point = {
    x: 0,
    y: 500
  }; // 终点
  public a: number = 5;
  public k: number = 0;
  public b: number = 0;
  public t: number = 60;
  public c: number = 500;
  public status: string = 'init';

  constructor(id: string) {
    this.id = id;
    this.init();
  }

  /**
   * 画布初始化
   * @param id
   */
  public init() {
    if (!this.id) {
      return;
    }
    this.canvas = (document.getElementById(this.id) as HTMLCanvasElement) || undefined;
    if (!this.canvas) {
      return;
    }
    this.context = this.canvas?.getContext('2d') || undefined;
    if (!this.context) {
      return;
    }
    this.width = window.innerWidth || 0;
    this.height = window.innerHeight || 0;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.status = 'start';
    this.draw();
  }

  /**
   * 清理画布
   */
  public clear() {
    if (!this.context) {
      return;
    }
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * 销毁画布
   */
  public destroy() {
    if (this.animation) {
      cancelAnimationFrame(this.animation);
      this.animation = undefined;
    }
    if (this.canvas) {
      this.canvas.width = 0;
      this.canvas.height = 0;
      this.canvas = undefined;
      this.context = undefined;
    }
  }

  /**
   * 绘制
   * @returns
   */
  public draw() {
    if (!this.context) {
      return;
    }
    this.loop();
  }

  /**
   * 循环
   */
  public loop() {
    this.setPoint();
    this.drawLine();
    if (this.status === 'end') {
      this.status = 'start';
      return;
    }
    this.animation = requestAnimationFrame(() => this.loop());
  }

  /**
   * 绘制线条
   * @returns
   */
  public drawLine() {
    if (!this.context) {
      return;
    }
    this.context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.beginPath();
    this.context.moveTo(this.start.x, this.start.y);
    this.context.lineTo(this.current.x, this.current.y);
    this.context.strokeStyle = '#00ff00';
    this.context.lineWidth = 2;
    this.context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    this.context.shadowBlur = 10;
    this.context.shadowOffsetX = 5;
    this.context.shadowOffsetY = 5;
    this.context.stroke();
  }

  /**
   * 设置线条
   */
  public setLine() {
    this.k = this.end.x - this.start.x ? (this.end.y - this.start.y) / (this.end.x - this.start.x) : 0;
    this.b = this.start.y - this.k * this.start.x;
  }

  /**
   * 设置点
   * @returns
   */
  public setPoint() {
    if (this.current.x >= this.width) {
      this.start = {
        x: 0,
        y: this.c
      };
      this.end = {
        x: 0,
        y: this.c
      };
      this.current = {
        x: 0,
        y: this.c
      };
      this.context?.clearRect(0, 0, this.width, this.height);
      // this.status = 'end';
      return;
    }
    if (this.current.x >= this.end.x) {
      if (Math.random() < 0.5) {
        this.end.x += this.a;
        this.t = Math.floor(Math.random() * 61 + 60);
        this.end.y = this.end.y > this.c ? this.c - this.t : this.c + this.t;
      } else {
        this.end.x += this.a * Math.floor(Math.random() * 10 + 1);
        this.end.y = this.c;
      }
      this.setLine();
    } else {
      this.start.x = this.current.x;
      this.start.y = this.current.y;
      this.current.x = this.current.x + this.a;
      this.current.y = this.k * this.current.x + this.b;
    }
  }
}
