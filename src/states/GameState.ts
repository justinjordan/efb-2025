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

  private heldBall: Ball | null = null;
  private mouseDown = false;
  private mouseX = 0;
  private mouseY = 0;

  constructor(private readonly game: Efb) {
    super();

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.game.canvas.width;
    this.canvas.height = this.game.canvas.height;

    this.ballLayer = new Layer(this.canvas);
    this.trailLayer = new Layer(this.canvas);
    this.backgroundLayer = new Layer(this.canvas, { backgroundColor: "#023" });

    for (let i = 0; i < 3; i++) {
      this.balls.push(
        new Ball({
          x: this.canvas.width * Math.random(),
          y: this.canvas.height * Math.random(),
          xSpeed: (300 * Math.random() + 200) * (Math.random() > 0.5 ? 1 : -1),
          ySpeed: (300 * Math.random() + 200) * (Math.random() > 0.5 ? 1 : -1),
        })
      );
    }

    this.handleKeyup = this.handleKeyup.bind(this);
  }

  private handleKeyup(e: KeyboardEvent) {
    if (e.key === "p") {
      this.pauseGame();
    }
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.mouseDown = true;
  };

  private handleMouseUp = (e: MouseEvent) => {
    this.mouseDown = false;
    this.heldBall = null;
  };

  private handleMouseMove = (e: MouseEvent) => {
    const rect = this.game.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  };

  public handleResize() {
    this.ballLayer.handleResize();
    this.trailLayer.handleResize();
    this.backgroundLayer.handleResize();
  }

  public onEnter() {
    document.addEventListener("keyup", this.handleKeyup);
    document.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousemove", this.handleMouseMove);
  }

  public onExit() {
    document.removeEventListener("keyup", this.handleKeyup);
    document.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
  }

  public update(delta: number) {
    this.balls.forEach((ball) => ball.update(delta));

    // Handle ball attraction
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = 0; j < this.balls.length; j++) {
        if (i === j) continue;

        const ball1 = this.balls[i];
        const ball2 = this.balls[j];

        if (ball1 === this.heldBall) continue;

        const dx = ball1.x - ball2.x;
        const dy = ball1.y - ball2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dir = Math.atan2(dy, dx);

        ball1.xSpeed -= 8 * dist * Math.cos(dir) * delta;
        ball1.ySpeed -= 8 * dist * Math.sin(dir) * delta;
      }
    }

    // Handle ball boundaries
    this.balls.forEach((ball) => {
      if (ball === this.heldBall) return;

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

      if (
        !this.heldBall &&
        this.mouseDown &&
        ball.isCollision(this.mouseX, this.mouseY)
      ) {
        this.heldBall = ball;
      }
    });

    // handle mouse drag
    if (this.heldBall) {
      this.heldBall.x = this.mouseX;
      this.heldBall.y = this.mouseY;
      this.heldBall.xSpeed = 0;
      this.heldBall.ySpeed = 0;
    }
  }

  public render() {
    const ctx = this.canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Cannot get 2d context from canvas");
    }

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

    this.trailLayer = new Layer(this.canvas, this.trailLayer).withLayer(
      (canvas, ctx) => {
        ctx.filter = "blur(2px) hue-rotate(5deg) saturate(0.99) opacity(0.99)";
        ctx.drawImage(this.trailLayer.canvas, 0, 0);
        ctx.filter = "none";
      }
    );

    this.backgroundLayer.clear();
    ctx.drawImage(this.backgroundLayer.canvas, 0, 0);
    ctx.drawImage(this.trailLayer.canvas, 0, 0);
    ctx.drawImage(this.ballLayer.canvas, 0, 0);
  }

  private pauseGame() {
    this.game.pushState(new PauseState(this.game));
  }
}
