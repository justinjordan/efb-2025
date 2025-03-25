import State from "../types/State";

export default class Ball extends State {
  x: number = 0;
  y: number = 0;
  pastPositions: { x: number; y: number }[] = [];
  xSpeed: number = 0;
  ySpeed: number = 0;
  radius: number = 20;
  color: string = "#00f";

  constructor(options?: Partial<Ball>) {
    super();
    Object.assign(this, options);
  }

  onEnter(): void {
    // do nothing
  }

  onExit(): void {
    // do nothing
  }

  handleResize(): void {
    // do nothing
  }

  update(delta: number): void {
    this.pastPositions.push({ x: this.x, y: this.y });
    if (this.pastPositions.length > 1) {
      this.pastPositions.shift();
    }

    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
  }

  render(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Cannot get 2d context from canvas");
    }

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  isCollision(x: number, y: number): boolean {
    const dx = this.x - x;
    const dy = this.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < this.radius;
  }
}
