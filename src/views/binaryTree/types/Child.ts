import Parent from '@/views/binaryTree/types/Parent';

/**
 * 子类
 */
export default class Child extends Parent {
  constructor(data: any) {
    super(data);
    console.log('child init');
  }

  /**
   * 预加载
   */
  public preload() {
    console.log('child preload');
  }

  /**
   * 创建
   */
  public create() {
    console.log('child create');
    this.drawArc({
      x: 100,
      y: 200,
      r: 100,
      color: 'rgba(255, 255, 0)'
    });
    this.drawArc({
      x: 234,
      y: 546,
      r: 50,
      color: 'rgba(0, 255, 255)'
    });
    this.drawArc({
      x: 1000,
      y: 100,
      r: 200,
      color: 'rgba(0, 0, 255)'
    });
    this.drawArc({
      x: 800,
      y: 600,
      r: 20,
      color: 'rgba(0, 255, 0)'
    });
  }

  /**
   * 更新
   */
  public update() {
    console.log('child update');
  }

  /**
   * 键盘
   */
  public keyload() {
    console.log('child keyload');
  }

  /**
   * 绘制圆形
   * @param params 参数
   * @returns
   */
  public drawArc(params: {
    x: number; // 圆心x坐标
    y: number; // 圆心y坐标
    r: number; // 半径
    start?: number; // 开始角度
    end?: number; // 结束角度
    direction?: boolean; // 方向: 1、true 顺时针, 2、false 逆时针
    color: string; // 颜色
  }): void {
    if (!this.context) {
      return;
    }
    const start: number = params.start || 0;
    const end: number = params.end || 2 * Math.PI;
    const direction: boolean = params.direction || false;
    this.context.beginPath();
    this.context.arc(params.x, params.y, params.r, start, end, direction);
    this.context.closePath();
    this.context.fillStyle = params.color;
    this.context.fill();
  }
}
