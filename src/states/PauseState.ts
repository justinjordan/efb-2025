import Efb from "../main";
import State from "../types/State";

export default class PauseState extends State {
  constructor(private readonly game: Efb) {
    super();

    this.canvas = document.createElement("canvas");
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  private handleKeyup(e: KeyboardEvent) {
    if (e.key === "p") {
      this.game.popState();
    }
  }

  public handleResize() {
    this.shouldRender = true; // Allow rendering on resize
  }

  public onEnter() {
    document.addEventListener("keyup", this.handleKeyup);
  }

  public onExit() {
    document.removeEventListener("keyup", this.handleKeyup);
  }

  public update(delta: number) {
    // do nothing
  }

  public render(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Cannot get 2d context from canvas");
    }

    this.game.getPreviousState()?.render(canvas);

    const width = 300;
    const height = 200;

    // Draw the pause overlay
    ctx.fillStyle = "#333";
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 30;
    ctx.roundRect(
      canvas.width / 2 - width / 2,
      canvas.height / 2 - height / 2,
      width,
      height,
      10
    );
    ctx.fill();
    ctx.shadowColor = "transparent"; // Reset shadow

    // Draw the pause text
    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Paused", canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = "16px sans-serif";
    ctx.fillText(
      "Press 'p' to resume",
      canvas.width / 2,
      canvas.height / 2 + 20
    );

    this.shouldRender = false; // Prevents continuous rendering
  }
}
