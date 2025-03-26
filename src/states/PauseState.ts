import Efb from "../main";
import State from "../types/State";

export default class PauseState extends State {
  constructor(public game: Efb) {
    super(game);

    this.handleKeyup = this.handleKeyup.bind(this);
  }

  onKeyup(e: KeyboardEvent) {
    if (e.key === "p") {
      this.game.popState();
    }
  }

  onEnter() {
    const width = 300;
    const height = 200;

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the pause overlay
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    this.ctx.shadowOffsetX = 5;
    this.ctx.shadowOffsetY = 5;
    this.ctx.shadowBlur = 30;
    this.ctx.roundRect(
      this.canvas.width / 2 - width / 2,
      this.canvas.height / 2 - height / 2,
      width,
      height,
      10
    );
    this.ctx.fill();
    this.ctx.shadowColor = "transparent"; // Reset shadow

    // Draw the pause text
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 24px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      "Paused",
      this.canvas.width / 2,
      this.canvas.height / 2 - 20
    );
    this.ctx.font = "16px sans-serif";
    this.ctx.fillText(
      "Press 'p' to resume",
      this.canvas.width / 2,
      this.canvas.height / 2 + 20
    );
  }

  onResize(): void {
    this.onEnter();
  }

  update(delta: number) {}

  render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render the previous state
    const gameState = this.game.getPreviousState();
    ctx.drawImage(gameState.canvas, 0, 0);

    // Render the pause overlay
    ctx.drawImage(this.canvas, 0, 0);
  }
}
