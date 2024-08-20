import Canvas from '@/types/Canvas/Canvas';
import type { Curve } from '@/types/common';

/**
 * 正弦函数曲线
 */
export default class Sin extends Canvas {
  public space: number = 50; // 振幅
  public speed: number = 1; // 速度
  public fontSize: number = 16; // 文字大小
  public left: Curve = {
    v: 1,
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 0,
      y: 0
    }
  }; // 左方向曲线数据
  public right: Curve = {
    v: -1,
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 0,
      y: 0
    }
  }; // 右方向曲线数据
  public status: string = 'init'; // 动画状态

  constructor(data: {
    id: string; // 画布ID
  }) {
    super({
      ...data,
      isSetOrigin: true
    });
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
    this.drawGrid();
    this.drawAxes();
    this.drawOrigin();
    this.drawCoordinates();
    this.status = 'draw';
    this.loop();
  }

  /**
   * 重置数据
   */
  public reset(): void {
    this.right = {
      v: -1,
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      }
    };
    this.left = {
      v: 1,
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      }
    };
  }

  /**
   * 重绘
   */
  public redraw(): void {
    this.status = 'resize';
    this.draw();
  }

  /**
   * 绘制网格
   */
  public drawGrid(): void {
    if (this.context) {
      const xNum: number = Math.floor(this.halfWidth / this.space);
      const yNum: number = Math.floor(this.halfHeight / this.space);
      this.context.strokeStyle = 'rgba(0, 0, 255, 1)';
      this.context.lineWidth = 2;
      // 画纵向网格线
      for (let x = 0; x <= xNum; x++) {
        // 右上
        this.context.beginPath();
        this.context.moveTo(x * this.space, 0);
        this.context.lineTo(x * this.space, -this.halfHeight);
        this.context.stroke();
        // 右下
        this.context.beginPath();
        this.context.moveTo(x * this.space, 0);
        this.context.lineTo(x * this.space, this.halfHeight);
        this.context.stroke();
        // 左上
        this.context.beginPath();
        this.context.moveTo(-x * this.space, 0);
        this.context.lineTo(-x * this.space, -this.halfHeight);
        this.context.stroke();
        // 左下
        this.context.beginPath();
        this.context.moveTo(-x * this.space, 0);
        this.context.lineTo(-x * this.space, this.halfHeight);
        this.context.stroke();
      }
      // 画横向网格线
      for (let y = 0; y <= yNum; y++) {
        // 右下
        this.context.beginPath();
        this.context.moveTo(0, y * this.space);
        this.context.lineTo(this.halfWidth, y * this.space);
        this.context.stroke();
        // 右上
        this.context.beginPath();
        this.context.moveTo(0, -y * this.space);
        this.context.lineTo(this.halfWidth, -y * this.space);
        this.context.stroke();
        // 左下
        this.context.beginPath();
        this.context.moveTo(0, y * this.space);
        this.context.lineTo(-this.halfWidth, y * this.space);
        this.context.stroke();
        // 左上
        this.context.beginPath();
        this.context.moveTo(0, -y * this.space);
        this.context.lineTo(-this.halfWidth, -y * this.space);
        this.context.stroke();
      }
    }
  }

  /**
   * 绘制x和y轴
   * @returns
   */
  public drawAxes(): void {
    if (!this.context) {
      return;
    }
    this.context.shadowColor = 'rgba(0, 255, 0, 0.75)';
    this.context.shadowBlur = 20;
    this.context.strokeStyle = 'rgba(0, 255, 0, 1)';
    this.context.lineWidth = 4;
    // x轴正
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(this.halfWidth, 0);
    this.context.stroke();
    // x轴反
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(-this.halfWidth, 0);
    this.context.stroke();
    // x轴箭头
    this.context.beginPath();
    this.context.moveTo(this.halfWidth, 0);
    this.context.lineTo(this.halfWidth - 8, -4);
    this.context.lineTo(this.halfWidth - 8, 4);
    this.context.closePath();
    this.context.stroke();
    this.context.fillStyle = 'rgba(0, 255, 0, 0.75)';
    this.context.fill();
    // y轴正
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, -this.halfHeight);
    this.context.stroke();
    this.context.beginPath();
    // y轴反
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, this.halfHeight);
    this.context.stroke();
    // y轴箭头
    this.context.beginPath();
    this.context.moveTo(0, -this.halfHeight);
    this.context.lineTo(4, -this.halfHeight + 8);
    this.context.lineTo(-4, -this.halfHeight + 8);
    this.context.closePath();
    this.context.stroke();
    this.context.fillStyle = 'rgba(0, 255, 0, 0.75)';
    this.context.fill();
  }

  /**
   * 循环
   */
  public loop(): void {
    if (this.status === 'draw') {
      this.drawLine(this.right);
      this.drawLine(this.left);
      this.requestAnimation(() => this.loop());
    } else if (this.status === 'end') {
      this.status = 'redraw';
      this.draw();
    }
  }

  /**
   * 绘制曲线
   * @returns
   */
  public drawLine(curve: Curve): void {
    if (!this.context) {
      return;
    }
    if (curve.end.x > this.halfWidth || curve.end.x < -this.halfWidth) {
      this.status = 'end';
    }
    curve.end.x += curve.v * this.speed;
    curve.end.y = -Math.sin((curve.end.x / (this.space * 2)) * Math.PI) * this.space;
    this.context.beginPath();
    this.context.moveTo(curve.start.x, curve.start.y);
    this.context.lineTo(curve.end.x, curve.end.y);
    this.context.shadowColor = 'rgba(255, 0, 0, 0.05)';
    this.context.shadowBlur = 20;
    this.context.strokeStyle = 'rgba(255, 0, 0, 1)';
    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
    this.context.stroke();
    curve.start.x = curve.end.x;
    curve.start.y = curve.end.y;
  }

  /**
   * 绘制原点
   * @returns
   */
  public drawOrigin(): void {
    if (!this.context) {
      return;
    }
    this.context.beginPath();
    this.context.shadowBlur = 0;
    this.context.arc(0, 0, 4, 0, 2 * Math.PI);
    this.context.fillStyle = 'rgba(255, 0, 0, 1)';
    this.context.fill();
  }

  /**
   * 绘制坐标系刻度
   * @returns
   */
  public drawCoordinates(): void {
    if (!this.context) {
      return;
    }
    const xNum: number = Math.floor(this.halfWidth / this.space);
    const yNum: number = Math.floor(this.halfHeight / this.space);
    for (let x = 1; x <= xNum; x++) {
      // 右
      if (x % 2 === 0) {
        this.drawText(`${x}π`, this.space * x, this.fontSize * 2);
        this.drawText(`-${x}π`, -this.space * x, this.fontSize * 2);
      } else {
        this.drawText(`${x}π`, this.space * x, this.fontSize);
        this.drawText('—', this.space * x, this.fontSize * 2);
        this.drawText('2', this.space * x, this.fontSize * 3);
      }
      // 左
      if (x % 2 === 0) {
        this.drawText(`-${x}π`, -this.space * x, this.fontSize * 2);
      } else {
        this.drawText(`${x}π`, -this.space * x, this.fontSize);
        this.drawText('-', -(this.space * x + this.fontSize), this.fontSize * 2);
        this.drawText('—', -this.space * x, this.fontSize * 2);
        this.drawText('2', -this.space * x, this.fontSize * 3);
      }
    }
    for (let y = 1; y <= yNum; y++) {
      // 下
      this.drawText(`${y}`, -this.fontSize, this.space * y);
      // 上
      this.drawText(`${y}`, -this.fontSize, -this.space * y);
    }
  }

  /**
   * 绘制文字
   * @returns
   */
  public drawText(text: string, x: number, y: number): void {
    if (!this.context) {
      return;
    }
    this.context.font = `bold ${this.fontSize}px sans-serif`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'rgba(255, 255, 0, 1)';
    this.context.fillText(text, x, y);
  }
}
