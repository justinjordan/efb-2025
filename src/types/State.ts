export default abstract class State {
  canvas!: HTMLCanvasElement;
  shouldRender = true;

  abstract handleResize(): void;
  abstract update(delta: number): void;
  abstract render(canvas: HTMLCanvasElement): void;
  abstract onEnter(): void;
  abstract onExit(): void;
}
