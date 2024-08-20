import Canvas from '@/types/Canvas/Canvas';

/**
 * 输入
 */
export default class Input extends Canvas {
  public space: number = 50; // 振幅
  public speed: number = 1; // 速度
  public fontSize: number = 16; // 文字大小
  public text: string[] = ['_']; // 文字内容

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
    this.drawWrappedText();
  }

  /**
   * 重置数据
   */
  public reset(): void {}

  /**
   * 重绘
   */
  public redraw(): void {
    this.draw();
  }

  public drawWrappedText(): void {
    let x: number = 0;
    let y: number = this.fontSize / 2;
    this.clear();
    this.text.forEach((item: string) => {
      const isN: boolean = item === '/n';
      const textWidth: number = isN ? 0 : this.context?.measureText(item)?.width || 0;
      if (x + textWidth > this.width || isN) {
        x = 0;
        y += this.fontSize;
      }
      if (!isN) {
        x += textWidth > this.fontSize / 2 ? textWidth : this.fontSize / 2;
        this.drawText(item, x, y);
      }
    });
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
    this.context.shadowColor = 'rgba(0, 255, 0, 0.5)';
    this.context.shadowBlur = this.fontSize * 2;
    this.context.fillStyle = 'rgba(0, 255, 0, 1)';
    this.context.fillText(text, x, y);
  }

  /**
   * 键盘输入
   * @param event
   */
  public keyDown(event: KeyboardEvent): void {
    // 退格
    if (event.key === 'Backspace') {
      this.removeText();
      this.drawWrappedText();
      return;
    }
    // 回车
    if (event.key === 'Enter') {
      this.addText('/n');
      this.drawWrappedText();
      return;
    }
    if (event.altKey || event.metaKey || event.ctrlKey || event.key.length > 2) {
      return;
    }
    // 字母、数字、特殊字符、空格
    if (/^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(event.key)) {
      this.addText(event.key);
      this.drawWrappedText();
    }
  }

  /**
   * 新增文字
   * @param text
   */
  public addText(text: string) {
    this.text.splice(this.text.length - 1, 0, text);
  }

  /**
   * 删除文字
   */
  public removeText() {
    if (this.text.length > 1) {
      this.text.splice(this.text.length - 2, 1);
    }
  }
}
