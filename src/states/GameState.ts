import Ball from "../entities/Ball";
import Layer from "../entities/Layer";
import Efs from "../main";
import State from "../types/State";

export default class GameState extends State {
  balls: Ball[] = [];
  ballLayer: Layer;
  trailLayer: Layer;

  constructor(
    private readonly game: Efs,
    private readonly canvas: HTMLCanvasElement
  ) {
    super();

    this.ballLayer = new Layer(canvas, {
      backgroundColor: "#000",
    });
    this.trailLayer = new Layer(canvas, {
      backgroundColor: "#000",
    });

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

        ball1.xSpeed -= 1 * dx * delta;
        ball1.ySpeed -= 1 * dy * delta;
      }
    }

    // bounce the balls
    this.balls.forEach((ball) => {
      if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.xSpeed *= -1;
      }

      if (ball.x > this.canvas.width - ball.radius) {
        ball.x = this.canvas.width - ball.radius;
        ball.xSpeed *= -1;
      }

      if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.ySpeed *= -1;
      }

      if (ball.y > this.canvas.height - ball.radius) {
        ball.y = this.canvas.height - ball.radius;
        ball.ySpeed *= -1;
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
      ctx.filter = "blur(2px) brightness(0.99) hue-rotate(3deg)";
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = "none";

      ctx.drawImage(this.ballLayer.canvas, 0, 0);
    });

    ctx.drawImage(this.trailLayer.canvas, 0, 0);
    ctx.drawImage(this.ballLayer.canvas, 0, 0);
  }
}
