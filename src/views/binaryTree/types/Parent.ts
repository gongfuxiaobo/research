import { EnumAnimationStatusType } from '@/types/Canvas/types';

/**
 * 父类
 */
export default class Parent {
  public canvas?: HTMLCanvasElement; // 画布对象
  public context?: CanvasRenderingContext2D; // 画布的上下文对象
  public width: number = 0; // 画布宽度
  public height: number = 0; // 画布高度
  public halfWidth: number = 0; // 画布宽度半
  public halfHeight: number = 0; // 画布高度半
  public animation?: number; // 动画对象
  public isSetOrigin?: boolean = false; // 是否设置原点
  public status: EnumAnimationStatusType = EnumAnimationStatusType.Start; // 动画状态
  public originX: number = 0; // 原点x坐标
  public originY: number = 0; // 原点y坐标
  public scale: number = 1; // 缩放比例
  public scaleFactor: number = 1.1; // 缩放因子
  public static Min_Scale: number = 0.1; // 最小缩放比例
  public static Max_Scale: number = 4; // 最大缩放比例

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
    this.init();
  }

  /**
   * 初始化
   */
  public init() {
    this.resize();
    this.draw();
    this.listener();
  }

  /**
   * 监听器
   */
  public listener(): void {
    this.canvas?.addEventListener('wheel', (event: WheelEvent) => this.wheel(event));
    window.addEventListener('resize', () => {
      this.redraw();
    });
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
   * 绘制
   */
  public draw(): void {
    if (!this.context) {
      return;
    }
    this.clear();
    this.create();
  }

  /**
   * 重绘
   */
  public redraw(): void {
    this.cancelAnimation();
    this.resize();
    this.draw();
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
    this.originX = this.halfWidth;
    this.originY = this.halfHeight;
  }

  /**
   * 清理画布
   * @returns
   */
  public clear(): void {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  /**
   * 开始动画
   */
  public startAnimation(): void {
    this.status = EnumAnimationStatusType.Start;
  }

  /**
   * 结束动画
   */
  public endAnimation(): void {
    this.status = EnumAnimationStatusType.End;
  }

  /**
   * 设置动画
   */
  public requestAnimation(): void {
    if (this.status === EnumAnimationStatusType.Start) {
      this.animation = requestAnimationFrame(() => this.requestAnimation());
    } else {
      this.startAnimation();
      this.draw();
    }
  }

  /**
   * 关闭动画
   */
  public cancelAnimation(): void {
    if (this.animation) {
      cancelAnimationFrame(this.animation);
      this.animation = undefined;
      this.endAnimation();
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

  /**
   * 鼠标滚动
   */
  public wheel(event: WheelEvent) {
    event.preventDefault();
    if (!this.canvas || !this.context) {
      return;
    }
    if (event.ctrlKey) {
      const rect: DOMRect = this.canvas.getBoundingClientRect();
      const mouseX: number = event.clientX - rect.left;
      const mouseY: number = event.clientY - rect.top;
      if (event.deltaY < 0) {
        if (this.scale * this.scaleFactor <= Parent.Max_Scale) {
          this.scale *= this.scaleFactor;
          this.originX = mouseX - (mouseX - this.originX) * this.scaleFactor;
          this.originY = mouseY - (mouseY - this.originY) * this.scaleFactor;
        }
      } else {
        if (this.scale / this.scaleFactor >= Parent.Min_Scale) {
          this.scale /= this.scaleFactor;
          this.originX = mouseX - (mouseX - this.originX) / this.scaleFactor;
          this.originY = mouseY - (mouseY - this.originY) / this.scaleFactor;
        }
      }
    } else {
      this.originX -= event.deltaX * this.scale;
      this.originY -= event.deltaY * this.scale;
    }
    this.context.setTransform(this.scale, 0, 0, this.scale, this.originX, this.originY);
    this.draw();
  }

  /**
   * 预加载
   */
  public preload() {
    console.log('parent preload');
  }

  /**
   * 创建
   */
  public create() {
    console.log('parent create');
  }

  /**
   * 更新
   */
  public update() {
    console.log('parent update');
  }

  /**
   * 键盘
   */
  public keyload() {
    console.log('parent keyload');
  }
}
