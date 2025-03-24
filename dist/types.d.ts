import log from "loglevel";
interface GameOptions {
    debug?: boolean;
}
declare abstract class State {
    abstract update(delta: number): void;
    abstract render(canvas: HTMLCanvasElement): void;
    abstract onEnter(): void;
    abstract onExit(): void;
}
export default class Efb {
    logger: log.Logger;
    options: GameOptions;
    states: State[];
    running: boolean;
    constructor(canvas: HTMLCanvasElement, options?: GameOptions);
    start(): void;
    stop(): void;
    pushState(state: State): void;
    popState(): void;
}

//# sourceMappingURL=types.d.ts.map
