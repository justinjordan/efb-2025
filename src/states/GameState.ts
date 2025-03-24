import Ball from "../entities/Ball";
import Layer from "../entities/Layer";
import Efb from "../main";
import State from "../types/State";
import PauseState from "./PauseState";

export default class GameState extends State {
  balls: Ball[] = [];
  ballLayer: Layer;
  trailLayer: Layer;
  backgroundLayer: Layer;

  constructor(
    private readonly game: Efb,
    private readonly canvas: HTMLCanvasElement
  ) {
    super();

    this.ballLayer = new Layer(canvas);
    this.trailLayer = new Layer(canvas);
    this.backgroundLayer = new Layer(canvas, { backgroundColor: "#000" });

    for (let i = 0; i < 3; i++) {
      this.balls.push(
        new Ball({
          x: canvas.width * Math.random(),
          y: canvas.height * Math.random(),
          xSpeed: (300 * Math.random() + 200) * (Math.random() > 0.5 ? 1 : -1),
          ySpeed: (300 * Math.random() + 200) * (Math.random() > 0.5 ? 1 : -1),
        })
      );
    }

    this.handleKeyup = this.handleKeyup.bind(this);
  }

  private handleKeyup(e: KeyboardEvent) {
    if (e.key === "p") {
      this.game.pushState(new PauseState(this.game, this.canvas));
    }
  }

  public onEnter() {
    document.addEventListener("keyup", this.handleKeyup);
  }

  public onExit() {
    document.removeEventListener("keyup", this.handleKeyup);
  }

  public update(delta: number) {
    this.balls.forEach((ball) => ball.update(delta));

    for (let i = 0; i < this.balls.length; i++) {
      for (let j = 0; j < this.balls.length; j++) {
        if (i === j) continue;

        const ball1 = this.balls[i];
        const ball2 = this.balls[j];

        const dx = ball1.x - ball2.x;
        const dy = ball1.y - ball2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dir = Math.atan2(dy, dx);

        ball1.xSpeed -= 8 * dist * Math.cos(dir) * delta;
        ball1.ySpeed -= 8 * dist * Math.sin(dir) * delta;
      }
    }

    // bounce the balls
    this.balls.forEach((ball) => {
      if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.xSpeed = Math.abs(ball.xSpeed);
      }

      if (ball.x > this.canvas.width - ball.radius) {
        ball.x = this.canvas.width - ball.radius;
        ball.xSpeed = -Math.abs(ball.xSpeed);
      }

      if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.ySpeed = Math.abs(ball.ySpeed);
      }

      if (ball.y > this.canvas.height - ball.radius) {
        ball.y = this.canvas.height - ball.radius;
        ball.ySpeed = -Math.abs(ball.ySpeed);
      }
    });
  }

  public render(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Cannot get 2d context from canvas");
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ballLayer.withLayer((canvas, ctx) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.balls.forEach((ball) => ball.render(canvas));
    });

    this.trailLayer.withLayer((canvas, ctx) => {
      this.balls.forEach((ball) => {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineWidth = ball.radius * 2;
        ctx.strokeStyle = ball.color;
        ball.pastPositions.forEach(({ x, y }) => {
          ctx.lineTo(x, y);
        });
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = ball.color;
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    this.trailLayer = new Layer(canvas, this.trailLayer).withLayer(
      (canvas, ctx) => {
        ctx.filter = "blur(2px) hue-rotate(5deg) saturate(0.99) opacity(0.99)";
        ctx.drawImage(this.trailLayer.canvas, 0, 0);
        ctx.filter = "none";
      }
    );

    ctx.drawImage(this.backgroundLayer.canvas, 0, 0);
    ctx.drawImage(this.trailLayer.canvas, 0, 0);
    ctx.drawImage(this.ballLayer.canvas, 0, 0);
  }
}
