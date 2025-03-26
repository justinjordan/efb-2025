import Layer from "../entities/Layer";
import Efb from "../main";
import State from "../types/State";
import GameState from "./GameState";

export default class LoaderState extends State {
  bytesLoaded: number = 0;
  bytesTotal: number = 10000;
  infoLayer: Layer;
  backgroundLayer: Layer;

  constructor(public game: Efb) {
    super(game);

    this.infoLayer = new Layer(this.canvas);
    this.backgroundLayer = new Layer(this.canvas, { backgroundColor: "#023" });
  }

  onKeyup(e: KeyboardEvent): void {
    if (e.key === "Enter" && this.bytesLoaded >= this.bytesTotal) {
      this.game.pushState(new GameState(this.game)); // Push the game state
    }
  }

  update(delta: number): void {
    if (!this.game.canvas.checkVisibility()) return;

    const duration = 4; // Duration of the loading screen in seconds
    this.bytesLoaded += (this.bytesTotal / duration) * delta; // Simulate loading progress
    if (this.bytesLoaded >= this.bytesTotal) {
      this.bytesLoaded = this.bytesTotal;
    }

    this.infoLayer.withLayer((canvas, ctx) => {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const percentage = Math.floor((100 * this.bytesLoaded) / this.bytesTotal);

      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "Loading...",
        this.canvas.width / 2 - 74,
        this.canvas.height / 2 - 15
      );
      ctx.fillText(
        `${percentage}%`,
        this.canvas.width / 2,
        this.canvas.height / 2 + 15
      );

      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(
        this.canvas.width / 2 - 100,
        this.canvas.height / 2 - 5,
        200,
        10
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.rect(
        this.canvas.width / 2 - 100,
        this.canvas.height / 2 - 5,
        200 * (this.bytesLoaded / this.bytesTotal),
        10
      );
      ctx.fill();

      if (this.bytesLoaded >= this.bytesTotal) {
        ctx.fillStyle = "#0f0";
        ctx.fillText(
          "Hit ENTER to continue.",
          this.canvas.width / 2,
          this.canvas.height / 2 + 35
        );
      }
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.ctx.drawImage(
      this.backgroundLayer.canvas,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.drawImage(
      this.infoLayer.canvas,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
  }
}
