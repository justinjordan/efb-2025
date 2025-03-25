export default class Layer {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;
  backgroundColor?: string;

  constructor(
    private readonly parentCanvas: HTMLCanvasElement,
    options?: Partial<Layer>
  ) {
    Object.assign(this, options);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) {
      throw new Error("Cannot get 2d context from canvas");
    }

    this.handleResize();
    this.clear();
  }

  public handleResize() {
    this.canvas.width = this.parentCanvas.width;
    this.canvas.height = this.parentCanvas.height;
  }

  public clear() {
    if (!this.backgroundColor || !this.ctx) {
      return;
    }

    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.parentCanvas.width, this.parentCanvas.height);
  }

  withLayer(
    cb: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void
  ) {
    if (!this.ctx) {
      throw new Error("Cannot get 2d context from canvas");
    }

    cb(this.canvas, this.ctx);

    return this;
  }
}
