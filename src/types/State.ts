export default abstract class State {
  abstract update(delta: number): void;
  abstract render(canvas: HTMLCanvasElement): void;
  abstract onEnter(): void;
  abstract onExit(): void;
}
