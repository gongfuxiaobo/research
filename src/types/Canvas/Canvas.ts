/**
 * 画布
 */
export default class Canvas {
  public canvas?: HTMLCanvasElement; // 画布对象
  public context?: CanvasRenderingContext2D; // 画布的上下文对象
  public width: number = 0; // 画布宽度
  public height: number = 0; // 画布高度
  public halfWidth: number = 0; // 画布宽度半
  public halfHeight: number = 0; // 画布高度半
  public animation?: number; // 动画对象
  public isSetOrigin?: boolean = false; // 是否设置原点

  constructor(data: {
    id: string; // 画布ID
    isSetOrigin?: boolean; // 是否设置过原点
  }) {
    if (!data.id) {
      throw new Error('画布ID不能为空');
    }
    this.canvas = document.getElementById(data.id) as HTMLCanvasElement;
    if (!this.canvas) {
      throw new Error('画布对象初始化失败');
    }
    this.context = this.canvas?.getContext('2d') as CanvasRenderingContext2D;
    if (!this.context) {
      throw new Error('画布上下文对象初始化失败');
    }
    this.isSetOrigin = data.isSetOrigin;
  }

  /**
   * 重置大小
   * @returns
   */
  public resize(): void {
    if (!this.canvas || !this.context) {
      return;
    }
    this.width = window.innerWidth || 0;
    this.height = window.innerHeight || 0;
    this.halfWidth = this.width / 2 || 0;
    this.halfHeight = this.height / 2 || 0;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.setOrigin();
  }

  /**
   * 设置原点
   * @returns
   */
  public setOrigin(): void {
    if (!this.context || !this.isSetOrigin) {
      return;
    }
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.translate(this.halfWidth, this.halfHeight);
  }

  /**
   * 清理画布
   * @returns
   */
  public clear(): void {
    if (!this.context) {
      return;
    }
    if (this.isSetOrigin) {
      this.context.clearRect(-this.halfWidth, -this.halfHeight, this.width, this.height);
    } else {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  }

  /**
   * 设置动画
   * @param loop 循环方法
   */
  public requestAnimation(loop: Function): void {
    this.cancelAnimation();
    this.animation = requestAnimationFrame(() => loop());
  }

  /**
   * 关闭动画
   */
  public cancelAnimation(): void {
    if (this.animation) {
      cancelAnimationFrame(this.animation);
      this.animation = undefined;
    }
  }

  /**
   * 销毁画布
   */
  public destroy(): void {
    this.cancelAnimation();
    if (this.canvas) {
      this.canvas.width = 0;
      this.canvas.height = 0;
      this.canvas = undefined;
      this.context = undefined;
    }
  }
}
