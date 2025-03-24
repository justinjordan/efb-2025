import log from "loglevel";
import GameOptions from "./types/Options";
import State from "./types/State";
import GameState from "./states/GameState";

const defaultOptions = {
  debug: false,
};

export default class Efs {
  logger = log.getLogger("Efs");
  options: GameOptions;
  states: State[] = [];
  running = false;

  private lastUpdate = 0;
  private isVisible = true;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    options: GameOptions = defaultOptions
  ) {
    this.options = { ...defaultOptions, ...options };

    this.resetCanvas();
    const resizeObserver = new ResizeObserver(() => this.resetCanvas());
    resizeObserver.observe(this.canvas);

    document.addEventListener("visibilitychange", () => {
      this.isVisible = document.visibilityState === "visible";
      this.logger.debug("Visibility change", this.isVisible);
    });

    this.logger.setLevel(options.debug ? "debug" : "silent");
    this.logger.debug("Efs initialized with options", this.options);
  }

  public start() {
    this.running = true;
    this.logger.debug("Efs is running");

    // Add the first state
    const state = new GameState(this, this.canvas);
    state.onEnter();
    this.states.push(state);

    // Start the game loop
    requestAnimationFrame(this.loop.bind(this));
  }

  public stop() {
    this.running = false;
    this.states = [];
    this.logger.debug("Efs is stopped");
  }

  public pushState(state: State) {
    const lastState = this.states[this.states.length - 1];
    lastState.onExit();
    state.onEnter();
    this.states.push(state);
  }

  public popState() {
    const lastState = this.states[this.states.length - 1];
    lastState.onExit();
    this.states.pop();
    const newState = this.states[this.states.length - 1];
    newState.onEnter();
  }

  private resetCanvas() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    const ctx = this.canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Cannot get 2d context from canvas");
    }

    this.logger.debug("Canvas resized to", {
      width: this.canvas.width,
      height: this.canvas.height,
    });
  }

  private loop(currentTime: number) {
    const delta =
      this.lastUpdate > 0 ? (currentTime - this.lastUpdate) / 1000 : 0;
    this.lastUpdate = currentTime;

    if (!this.running) {
      this.logger.debug("Efs is not running, stopping loop");
      this.stop();
      return;
    }

    if (this.states.length === 0) {
      this.logger.warn("No states to run, stopping loop");
      this.stop();
      return;
    }

    try {
      const state = this.states[this.states.length - 1];

      if (this.isVisible) {
        // Update all states
        state.update(delta);

        // Render all states
        state.render(this.canvas);
      }
    } catch (error) {
      this.logger.error("Error in game loop", error);
    }

    // Call the loop again
    requestAnimationFrame(this.loop.bind(this));
  }
}
