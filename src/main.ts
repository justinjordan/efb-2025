import log from "loglevel";
import State from "./types/State";
import GameState from "./states/GameState";
import LoaderState from "./states/LoaderState";

const defaultOptions = {
  debug: false,
  loader: false,
};

type GameOptions = Partial<typeof defaultOptions>;

export default class Efb {
  logger = log.getLogger("Efb");
  options: GameOptions;
  states: State[] = [];
  running = false;

  private lastUpdate = 0;

  constructor(
    public canvas: HTMLCanvasElement,
    options: GameOptions = defaultOptions
  ) {
    this.options = { ...defaultOptions, ...options };

    this.handleResize();
    const resizeObserver = new ResizeObserver(() => this.handleResize());
    resizeObserver.observe(this.canvas);

    this.logger.setLevel(options.debug ? "debug" : "silent");
    this.logger.debug("Efb initialized with options", this.options);
  }

  public start() {
    this.running = true;
    this.logger.debug("Efb is running");

    // Add the first state
    const state = this.options.loader
      ? new LoaderState(this)
      : new GameState(this);
    this.states.push(state);
    state.handleEnter();

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
      lastState.handleExit();
    }

    state.handleEnter();
    this.states.push(state);
  }

  public popState() {
    const lastState = this.states.pop();

    if (lastState) {
      // Exit the last state before entering the new one
      lastState.handleExit();
    }

    const newState = this.getCurrentState();
    newState.handleEnter();
  }

  private handleResize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    this.logger.debug("Canvas resized to", {
      width: this.canvas.width,
      height: this.canvas.height,
    });

    try {
      this.states.forEach((state) => {
        state?.handleResize();
      });
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
      const ctx = this.canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Cannot get 2d context from canvas");
      }

      // Update all states
      state.update(delta);

      // Render the current state
      state.render(ctx);
    } catch (error) {
      this.logger.error("Error in game loop", error);
    }

    // Call the loop again
    requestAnimationFrame(this.loop.bind(this));
  }
}
