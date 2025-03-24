import Efb from "../main";
import State from "../types/State";

export default class PauseState extends State {
  constructor(
    private readonly game: Efb,
    private readonly canvas: HTMLCanvasElement
  ) {
    super();

    this.handleKeyup = this.handleKeyup.bind(this);
  }

  private handleKeyup(e: KeyboardEvent) {
    if (e.key === "p") {
      this.game.popState();
    }
  }

  public onEnter() {
    document.addEventListener("keyup", this.handleKeyup);

    const ctx = this.canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Cannot get 2d context from canvas");
    }

    ctx.font = "48px serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Paused", this.canvas.width / 2, this.canvas.height / 2);
  }

  public onExit() {
    document.removeEventListener("keyup", this.handleKeyup);
  }

  public update(delta: number) {
    // do nothing
  }

  public render(canvas: HTMLCanvasElement) {
    // do nothing
  }
}
