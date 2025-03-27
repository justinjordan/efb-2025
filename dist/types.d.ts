import log from "loglevel";
declare abstract class State {
    game: Efb;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    isActive: boolean;
    constructor(game: Efb);
    onEnter(): void;
    onExit(): void;
    onKeyup(e: KeyboardEvent): void;
    onMouseDown(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
    onMouseMove(e: MouseEvent, mouseX: number, mouseY: number): void;
    onResize(): void;
    beforeRender(): void;
    abstract update(delta: number): void;
    abstract render(ctx: CanvasRenderingContext2D): void;
    handleEnter(): void;
    handleExit(): void;
    handleKeyup(e: KeyboardEvent): void;
    handleResize(): void;
    handleMouseDown(e: MouseEvent): void;
    handleMouseUp(e: MouseEvent): void;
    handleMouseMove(e: MouseEvent): void;
}
declare const defaultOptions: {
    debug: boolean;
    loader: boolean;
};
type GameOptions = Partial<typeof defaultOptions>;
export default class Efb {
    canvas: HTMLCanvasElement;
    logger: log.Logger;
    options: GameOptions;
    states: State[];
    running: boolean;
    constructor(canvas: HTMLCanvasElement, options?: GameOptions);
    publish: (message: PubSubJS.Message, data?: any) => boolean;
    subscribe: (message: PubSubJS.Message, func: PubSubJS.SubscriptionListener<any>) => PubSubJS.Token;
    unsubscribe: (tokenOrFunction: string | PubSubJS.SubscriptionListener<any>) => PubSubJS.Token | boolean;
    start(): void;
    stop(): void;
    getCurrentState(): State;
    getPreviousState(): State;
    pushState(state: State): void;
    popState(): void;
}

//# sourceMappingURL=types.d.ts.map
