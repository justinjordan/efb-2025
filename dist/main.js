var $ePUDy$loglevel = require("loglevel");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $53ffd25df6034fb9$export$2e2bcd8739ae039);

class $c6e9585522073c38$export$2e2bcd8739ae039 {
}


class $96ef78e216622c6f$export$2e2bcd8739ae039 extends (0, $c6e9585522073c38$export$2e2bcd8739ae039) {
    constructor(options){
        super(), this.x = 0, this.y = 0, this.pastPositions = [], this.xSpeed = 0, this.ySpeed = 0, this.radius = 20, this.color = "#00f";
        Object.assign(this, options);
    }
    onEnter() {
    // do nothing
    }
    onExit() {
    // do nothing
    }
    update(delta) {
        this.pastPositions.push({
            x: this.x,
            y: this.y
        });
        if (this.pastPositions.length > 1) this.pastPositions.shift();
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
    }
    render(canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Cannot get 2d context from canvas");
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}


class $565a624516254204$export$2e2bcd8739ae039 {
    constructor(parentCanvas, options){
        this.parentCanvas = parentCanvas;
        Object.assign(this, options);
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.parentCanvas.width;
        this.canvas.height = this.parentCanvas.height;
        this.ctx = this.canvas.getContext("2d");
        if (!this.ctx) throw new Error("Cannot get 2d context from canvas");
        if (this.backgroundColor) {
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, parentCanvas.width, parentCanvas.height);
        }
    }
    withLayer(cb) {
        if (!this.ctx) throw new Error("Cannot get 2d context from canvas");
        cb(this.canvas, this.ctx);
        return this;
    }
}




class $a0a23f93dcace043$export$2e2bcd8739ae039 extends (0, $c6e9585522073c38$export$2e2bcd8739ae039) {
    constructor(game, canvas){
        super(), this.game = game, this.canvas = canvas;
        this.handleKeyup = this.handleKeyup.bind(this);
    }
    handleKeyup(e) {
        if (e.key === "p") this.game.popState();
    }
    onEnter() {
        document.addEventListener("keyup", this.handleKeyup);
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Cannot get 2d context from canvas");
        ctx.font = "48px serif";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.canvas.width / 2, this.canvas.height / 2);
    }
    onExit() {
        document.removeEventListener("keyup", this.handleKeyup);
    }
    update(delta) {
    // do nothing
    }
    render(canvas) {
    // do nothing
    }
}


class $88c64d01b002ea7b$export$2e2bcd8739ae039 extends (0, $c6e9585522073c38$export$2e2bcd8739ae039) {
    constructor(game, canvas){
        super(), this.game = game, this.canvas = canvas, this.balls = [];
        this.ballLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(canvas);
        this.trailLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(canvas);
        this.backgroundLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(canvas, {
            backgroundColor: "#000"
        });
        for(let i = 0; i < 3; i++)this.balls.push(new (0, $96ef78e216622c6f$export$2e2bcd8739ae039)({
            x: canvas.width * Math.random(),
            y: canvas.height * Math.random(),
            xSpeed: (300 * Math.random() + 200) * (Math.random() > 0.5 ? 1 : -1),
            ySpeed: (300 * Math.random() + 200) * (Math.random() > 0.5 ? 1 : -1)
        }));
        this.handleKeyup = this.handleKeyup.bind(this);
    }
    handleKeyup(e) {
        if (e.key === "p") this.game.pushState(new (0, $a0a23f93dcace043$export$2e2bcd8739ae039)(this.game, this.canvas));
    }
    onEnter() {
        document.addEventListener("keyup", this.handleKeyup);
    }
    onExit() {
        document.removeEventListener("keyup", this.handleKeyup);
    }
    update(delta) {
        this.balls.forEach((ball)=>ball.update(delta));
        for(let i = 0; i < this.balls.length; i++)for(let j = 0; j < this.balls.length; j++){
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
        // bounce the balls
        this.balls.forEach((ball)=>{
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
    render(canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Cannot get 2d context from canvas");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ballLayer.withLayer((canvas, ctx)=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.balls.forEach((ball)=>ball.render(canvas));
        });
        this.trailLayer.withLayer((canvas, ctx)=>{
            this.balls.forEach((ball)=>{
                ctx.beginPath();
                ctx.moveTo(ball.x, ball.y);
                ctx.lineWidth = ball.radius * 2;
                ctx.strokeStyle = ball.color;
                ball.pastPositions.forEach(({ x: x, y: y })=>{
                    ctx.lineTo(x, y);
                });
                ctx.stroke();
                ctx.beginPath();
                ctx.fillStyle = ball.color;
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        });
        this.trailLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(canvas, this.trailLayer).withLayer((canvas, ctx)=>{
            ctx.filter = "blur(2px) hue-rotate(5deg) saturate(0.99) opacity(0.99)";
            ctx.drawImage(this.trailLayer.canvas, 0, 0);
            ctx.filter = "none";
        });
        ctx.drawImage(this.backgroundLayer.canvas, 0, 0);
        ctx.drawImage(this.trailLayer.canvas, 0, 0);
        ctx.drawImage(this.ballLayer.canvas, 0, 0);
    }
}


const $53ffd25df6034fb9$var$defaultOptions = {
    debug: false
};
class $53ffd25df6034fb9$export$2e2bcd8739ae039 {
    constructor(canvas, options = $53ffd25df6034fb9$var$defaultOptions){
        this.canvas = canvas;
        this.logger = (0, ($parcel$interopDefault($ePUDy$loglevel))).getLogger("Efb");
        this.states = [];
        this.running = false;
        this.lastUpdate = 0;
        this.isVisible = true;
        this.options = {
            ...$53ffd25df6034fb9$var$defaultOptions,
            ...options
        };
        this.resetCanvas();
        const resizeObserver = new ResizeObserver(()=>this.resetCanvas());
        resizeObserver.observe(this.canvas);
        document.addEventListener("visibilitychange", ()=>{
            this.isVisible = document.visibilityState === "visible";
            this.logger.debug("Visibility change", this.isVisible);
        });
        this.logger.setLevel(options.debug ? "debug" : "silent");
        this.logger.debug("Efb initialized with options", this.options);
    }
    start() {
        this.running = true;
        this.logger.debug("Efb is running");
        // Add the first state
        const state = new (0, $88c64d01b002ea7b$export$2e2bcd8739ae039)(this, this.canvas);
        state.onEnter();
        this.states.push(state);
        // Start the game loop
        requestAnimationFrame(this.loop.bind(this));
    }
    stop() {
        this.running = false;
        this.states = [];
        this.logger.debug("Efb is stopped");
    }
    pushState(state) {
        const lastState = this.states[this.states.length - 1];
        lastState.onExit();
        state.onEnter();
        this.states.push(state);
    }
    popState() {
        const lastState = this.states[this.states.length - 1];
        lastState.onExit();
        this.states.pop();
        const newState = this.states[this.states.length - 1];
        newState.onEnter();
    }
    resetCanvas() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Cannot get 2d context from canvas");
        this.logger.debug("Canvas resized to", {
            width: this.canvas.width,
            height: this.canvas.height
        });
    }
    loop(currentTime) {
        const delta = this.lastUpdate > 0 ? (currentTime - this.lastUpdate) / 1000 : 0;
        this.lastUpdate = currentTime;
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


//# sourceMappingURL=main.js.map
