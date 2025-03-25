import log from "loglevel";
import GameOptions from "./types/Options";
import State from "./types/State";
import GameState from "./states/GameState";

const defaultOptions = {
  debug: false,
};

export default class Efb {
  logger = log.getLogger("Efb");
  options: GameOptions;
  states: State[] = [];
  running = false;
  isVisible = true;

  private lastUpdate = 0;

  constructor(
    public canvas: HTMLCanvasElement,
    options: GameOptions = defaultOptions
  ) {
    this.options = { ...defaultOptions, ...options };

    this.handleResize();
    const resizeObserver = new ResizeObserver(() => this.handleResize());
    resizeObserver.observe(this.canvas);

    document.addEventListener("visibilitychange", () => {
      this.isVisible = document.visibilityState === "visible";
      this.logger.debug("Visibility change", this.isVisible);
    });

    this.logger.setLevel(options.debug ? "debug" : "silent");
    this.logger.debug("Efb initialized with options", this.options);
  }

  public start() {
    this.running = true;
    this.logger.debug("Efb is running");

    // Add the first state
    const state = new GameState(this);
    state.onEnter();
    this.states.push(state);

    // Start the game loop
    requestAnimationFrame(this.loop.bind(this));
  }

  public stop() {
    this.running = false;
    this.states = [];
    this.logger.debug("Efb is stopped");
  }

  public getCurrentState() {
    return this.states?.[this.states.length - 1];
  }

  public getPreviousState() {
    return this.states?.[this.states.length - 2];
  }

  public pushState(state: State) {
    const lastState = this.getCurrentState();

    if (lastState) {
      // Exit the last state before entering the new one
      lastState.onExit();
    }

    state.onEnter();
    this.states.push(state);
  }

  public popState() {
    const lastState = this.states.pop();

    if (lastState) {
      // Exit the last state before entering the new one
      lastState.onExit();
    }

    const newState = this.getCurrentState();
    newState.onEnter();
  }

  private handleResize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    this.logger.debug("Canvas resized to", {
      width: this.canvas.width,
      height: this.canvas.height,
    });

    // Resize current state
    try {
      const state = this.getCurrentState();
      state?.handleResize();
    } catch (error) {
      this.logger.error("Error resizing current state", error);
    }
  }

  private loop(currentTime: number) {
    let delta =
      this.lastUpdate > 0 ? (currentTime - this.lastUpdate) / 1000 : 0;
    this.lastUpdate = currentTime;

    // Cancel the loop if the delta is too large (e.g. when tab is inactive)
    if (delta > 1) {
      delta = 0;
    }

    if (!this.running) {
      this.logger.debug("Efb is not running, stopping loop");
      this.stop();
      return;
    }

    if (this.states.length === 0) {
      this.logger.warn("No states to run, stopping loop");
      this.stop();
      return;
    }

    try {
      const state = this.getCurrentState();

      // Update all states
      state.update(delta);

      // Render all states
      if (state.shouldRender && this.isVisible) {
        state.render(this.canvas);
      }

      this.canvas.getContext("2d")?.drawImage(state.canvas, 0, 0);
    } catch (error) {
      this.logger.error("Error in game loop", error);
    }

    // Call the loop again
    requestAnimationFrame(this.loop.bind(this));
  }
}
