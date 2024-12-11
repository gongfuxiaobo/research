import type K8s from '@/views/k8s/types/K8s';

/**
 * 资源
 */
export default class Resource {
  public canvas?: HTMLCanvasElement; // 画布对象
  public context?: CanvasRenderingContext2D; // 画布的上下文对象
  public width: number = 0; // 画布宽度
  public height: number = 0; // 画布高度
  public list: K8s[]; // k8s列表
  public originX: number = 0; // 原点x坐标
  public originY: number = 0; // 原点y坐标
  public scale: number = 1; // 缩放比例
  public scaleFactor: number = 1.1; // 缩放因子
  public static Min_Scale: number = 0.1; // 最小缩放比例
  public static Max_Scale: number = 4; // 最大缩放比例
  public fontFamily?: string = 'Arial'; // 字体
  public nodeWidth: number = 300; // 盒子宽度
  public nodeHeight: number = 68; // 盒子高度
  public nodeRadius: number = 4; // 盒子圆角
  public nodeGap: number = 40; // 盒子间隔
  public elementGap: number = 16; // 元素间隔

  constructor(data: {
    id: string; // 画布ID
    list: K8s[]; // k8s列表
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
    this.list = data.list ?? [];
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
    // window.addEventListener('resize', () => {
    //   this.redraw(this.list);
    // });
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
        if (this.scale * this.scaleFactor <= Resource.Max_Scale) {
          this.scale *= this.scaleFactor;
          this.originX = mouseX - (mouseX - this.originX) * this.scaleFactor;
          this.originY = mouseY - (mouseY - this.originY) * this.scaleFactor;
        }
      } else {
        if (this.scale / this.scaleFactor >= Resource.Min_Scale) {
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
   * 重置大小
   * @returns
   */
  public resize(): void {
    if (!this.canvas || !this.context) {
      return;
    }
    this.width = window.innerWidth || 0;
    this.height = window.innerHeight || 0;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  /**
   * 绘制
   */
  public draw(): void {
    if (!this.context || !this.list.length) {
      return;
    }
    this.clear();
    console.log('list: ', this.list);
    let x = 0;
    let y = 0;
    this.list.forEach((item: K8s) => {
      const height: number = item.number * this.nodeHeight + (item.number - 1) * this.nodeGap;
      this.drawNode(item, x, y + (height - this.nodeHeight) / 2);
      y += height + this.nodeGap;
    });
  }

  /**
   * 重绘
   * @param list k8s列表
   */
  public redraw(list: K8s[]): void {
    this.list = list ?? [];
    this.resize();
    this.draw();
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
   * 销毁画布
   */
  public destroy(): void {
    if (this.canvas) {
      this.canvas.width = 0;
      this.canvas.height = 0;
      this.canvas = undefined;
      this.context = undefined;
    }
  }

  public drawNode(k8s: K8s, x: number, y: number): void {
    if (!this.context) {
      return;
    }
    this.drawBox({ x, y, width: this.nodeWidth, height: this.nodeHeight, radius: this.nodeRadius, color: '#ffffff' });
    const imageX: number = x + this.elementGap;
    const imageY: number = y + this.elementGap;
    this.drawText({ text: k8s.image, x: imageX, y: imageY, font: `bold 16px`, color: '#000000' });
    const imageWidth: number = this.context.measureText(k8s.image).width;
    const imageHeight: number = 16;
    const statusX: number = imageX + imageWidth + this.elementGap / 2;
    const statusY: number = imageY;
    this.drawText({ text: k8s.status, x: statusX, y: statusY, font: `bold 14px`, color: '#00ff00' });
    const descX: number = x + this.elementGap;
    const descY: number = imageY + imageHeight + this.elementGap / 2;
    this.drawText({ text: k8s.desc, x: descX, y: descY, font: `normal 12px`, color: '#9ca3af' });
    const btnWidth: number = 20;
    const btnHeight: number = 20;
    const btnX: number = x + this.nodeWidth - btnWidth - this.elementGap;
    const btnY: number = y + (this.nodeHeight - btnHeight) / 2;
    this.drawBox({ x: btnX, y: btnY, width: btnWidth, height: btnHeight, color: '#ff0000' });
    let childX = x + this.nodeWidth + this.nodeGap;
    let childHeight = k8s.number * this.nodeHeight + (k8s.number - 1) * this.nodeGap;
    let childY = y - (childHeight - this.nodeHeight) / 2;
    k8s.children?.forEach((item: K8s) => {
      const height: number = item.number * this.nodeHeight + (item.number - 1) * this.nodeGap;
      this.drawNode(item, childX, childY + (height - this.nodeHeight) / 2);
      this.drawLine({ startX: childX, startY: childY + (height - this.nodeHeight) / 2, endX: x, endY: y });
      childY += height + this.nodeGap;
    });
  }

  public drawBox(params: { x: number; y: number; width: number; height: number; radius?: number; color: string }): void {
    if (!this.context) {
      return;
    }
    if (params.radius) {
      this.context.beginPath();
      this.context.moveTo(params.x + params.radius, params.y);
      this.context.lineTo(params.x + params.width - params.radius, params.y);
      this.context.quadraticCurveTo(params.x + params.width, params.y, params.x + params.width, params.y + params.radius);
      this.context.lineTo(params.x + params.width, params.y + params.height - params.radius);
      this.context.quadraticCurveTo(params.x + params.width, params.y + params.height, params.x + params.width - params.radius, params.y + params.height);
      this.context.lineTo(params.x + params.radius, params.y + params.height);
      this.context.quadraticCurveTo(params.x, params.y + params.height, params.x, params.y + params.height - params.radius);
      this.context.lineTo(params.x, params.y + params.radius);
      this.context.quadraticCurveTo(params.x, params.y, params.x + params.radius, params.y);
      this.context.closePath();
      this.context.strokeStyle = '#f9f9f9';
      this.context.lineWidth = 1;
      this.context.stroke();
      this.context.fillStyle = params.color;
      this.context.fill();
    } else {
      this.context.fillStyle = params.color;
      this.context.fillRect(params.x, params.y, params.width, params.height);
    }
  }

  public drawText(params: { text: string; x: number; y: number; maxWidth?: number; lineHeight?: number; font: string; fontSize?: number; color: string }) {
    if (!this.context) {
      return;
    }
    this.context.font = `${params.font} ${this.fontFamily}`;
    // this.context.textAlign = 'center';
    this.context.textBaseline = 'top';
    this.context.fillStyle = params.color;
    this.context.fillText(params.text, params.x, params.y);
    // let words: string[] = params.text.split(' ');
    // let line: string = '';
    // let testLine: string = '';
    // let metrics: TextMetrics;
    // let testWidth: number;
    // for (let n = 0; n < words.length; n++) {
    //   testLine = line + words[n] + ' ';
    //   metrics = this.context.measureText(testLine);
    //   testWidth = metrics.width;
    //   if (testWidth > params.maxWidth && n > 0) {
    //     this.context.fillText(line, params.x, params.y);
    //     line = words[n] + ' ';
    //     params.y += params.lineHeight;
    //   } else {
    //     line = testLine;
    //   }
    // }
    // this.context.fillText(line, params.x, params.y);
  }

  public drawLine(params: { startX: number; startY: number; endX: number; endY: number }): void {
    if (!this.context) {
      return;
    }
    this.context.beginPath();
    this.context.moveTo(params.startX, params.startY + this.nodeHeight / 2);
    this.context.lineTo(params.startX - this.nodeGap / 2, params.startY + this.nodeHeight / 2);
    this.context.lineTo(params.endX + this.nodeWidth + this.nodeGap / 2, params.endY + this.nodeHeight / 2);
    this.context.lineTo(params.endX + this.nodeWidth, params.endY + this.nodeHeight / 2);
    this.context.strokeStyle = '#f9f9f9';
    this.context.lineWidth = 2;
    this.context.stroke();
  }
}
