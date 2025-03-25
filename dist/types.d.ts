import log from "loglevel";
interface GameOptions {
    debug?: boolean;
}
declare abstract class State {
    canvas: HTMLCanvasElement;
    shouldRender: boolean;
    abstract handleResize(): void;
    abstract update(delta: number): void;
    abstract render(canvas: HTMLCanvasElement): void;
    abstract onEnter(): void;
    abstract onExit(): void;
}
export default class Efb {
    canvas: HTMLCanvasElement;
    logger: log.Logger;
    options: GameOptions;
    states: State[];
    running: boolean;
    isVisible: boolean;
    constructor(canvas: HTMLCanvasElement, options?: GameOptions);
    start(): void;
    stop(): void;
    getCurrentState(): State;
    getPreviousState(): State;
    pushState(state: State): void;
    popState(): void;
}

//# sourceMappingURL=types.d.ts.map
