import Efb from "../main";

export default abstract class State {
  public canvas!: HTMLCanvasElement;
  public ctx!: CanvasRenderingContext2D;
  public isActive = false;

  constructor(public game: Efb) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.game.canvas.width;
    this.canvas.height = this.game.canvas.height;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Cannot get 2d context from canvas");
    }
    this.ctx = ctx;

    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  onEnter() {}
  onExit() {}
  onKeyup(e: KeyboardEvent) {}
  onMouseDown(e: MouseEvent) {}
  onMouseUp(e: MouseEvent) {}
  onMouseMove(e: MouseEvent, mouseX: number, mouseY: number) {}
  onResize() {}
  beforeRender() {}

  abstract update(delta: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;

  handleEnter() {
    this.isActive = true;

    document.addEventListener("keyup", this.handleKeyup);
    document.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousemove", this.handleMouseMove);

    this.onEnter();
  }

  handleExit() {
    this.isActive = false;

    document.removeEventListener("keyup", this.handleKeyup);
    document.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousemove", this.handleMouseMove);

    this.onExit();
  }

  handleKeyup(e: KeyboardEvent) {
    this.onKeyup(e);
  }

  handleResize() {
    this.canvas.width = this.game.canvas.width;
    this.canvas.height = this.game.canvas.height;
    this.onResize();
  }

  handleMouseDown(e: MouseEvent) {
    this.onMouseDown(e);
  }

  handleMouseUp(e: MouseEvent) {
    this.onMouseUp(e);
  }

  handleMouseMove(e: MouseEvent) {
    const rect = this.game.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    this.onMouseMove(e, mouseX, mouseY);
  }
}
