var $ePUDy$loglevel = require("loglevel");
var $ePUDy$pubsubjs = require("pubsub-js");


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

class $96ef78e216622c6f$export$2e2bcd8739ae039 {
    constructor(options){
        this.x = 0;
        this.y = 0;
        this.pastPositions = [];
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.radius = 20;
        this.color = "#00f";
        Object.assign(this, options);
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
    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Cannot get 2d context from canvas");
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    isCollision(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius;
    }
}


class $565a624516254204$export$2e2bcd8739ae039 {
    constructor(parentCanvas, options){
        this.parentCanvas = parentCanvas;
        Object.assign(this, options);
        this.canvas = document.createElement("canvas");
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Cannot get 2d context from canvas");
        this.ctx = ctx;
        this.handleResize();
        this.clear();
    }
    handleResize() {
        this.canvas.width = this.parentCanvas.width;
        this.canvas.height = this.parentCanvas.height;
    }
    clear() {
        if (!this.backgroundColor || !this.ctx) return;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.parentCanvas.width, this.parentCanvas.height);
    }
    withLayer(cb) {
        if (!this.ctx) throw new Error("Cannot get 2d context from canvas");
        cb(this.canvas, this.ctx);
        return this;
    }
}


class $c6e9585522073c38$export$2e2bcd8739ae039 {
    constructor(game){
        this.game = game;
        this.isActive = false;
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.game.canvas.width;
        this.canvas.height = this.game.canvas.height;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Cannot get 2d context from canvas");
        this.ctx = ctx;
        this.handleEnter = this.handleEnter.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }
    onEnter() {}
    onExit() {}
    onKeyup(e) {}
    onMouseDown(e) {}
    onMouseUp(e) {}
    onMouseMove(e, mouseX, mouseY) {}
    onResize() {}
    beforeRender() {}
    handleEnter() {
        this.isActive = true;
        document.addEventListener("keyup", this.handleKeyup);
        document.addEventListener("mousedown", this.handleMouseDown);
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("mousemove", this.handleMouseMove);
        this.onEnter();
    }
    handleExit() {
        this.isActive = false;
        document.removeEventListener("keyup", this.handleKeyup);
        document.removeEventListener("mousedown", this.handleMouseDown);
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
        this.onExit();
    }
    handleKeyup(e) {
        this.onKeyup(e);
    }
    handleResize() {
        this.canvas.width = this.game.canvas.width;
        this.canvas.height = this.game.canvas.height;
        this.onResize();
    }
    handleMouseDown(e) {
        this.onMouseDown(e);
    }
    handleMouseUp(e) {
        this.onMouseUp(e);
    }
    handleMouseMove(e) {
        const rect = this.game.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.onMouseMove(e, mouseX, mouseY);
    }
}



class $a0a23f93dcace043$export$2e2bcd8739ae039 extends (0, $c6e9585522073c38$export$2e2bcd8739ae039) {
    constructor(game){
        super(game), this.game = game;
        this.handleKeyup = this.handleKeyup.bind(this);
    }
    onKeyup(e) {
        if (e.key === "p") this.game.popState();
    }
    onEnter() {
        const width = 300;
        const height = 200;
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw the pause overlay
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        this.ctx.shadowOffsetX = 5;
        this.ctx.shadowOffsetY = 5;
        this.ctx.shadowBlur = 30;
        this.ctx.roundRect(this.canvas.width / 2 - width / 2, this.canvas.height / 2 - height / 2, width, height, 10);
        this.ctx.fill();
        this.ctx.shadowColor = "transparent"; // Reset shadow
        // Draw the pause text
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "bold 24px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Paused", this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.font = "16px sans-serif";
        this.ctx.fillText("Press 'p' to resume", this.canvas.width / 2, this.canvas.height / 2 + 20);
    }
    onResize() {
        this.onEnter();
    }
    update(delta) {}
    render(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Render the previous state
        const gameState = this.game.getPreviousState();
        ctx.drawImage(gameState.canvas, 0, 0);
        // Render the pause overlay
        ctx.drawImage(this.canvas, 0, 0);
    }
}


class $88c64d01b002ea7b$export$2e2bcd8739ae039 extends (0, $c6e9585522073c38$export$2e2bcd8739ae039) {
    constructor(game){
        super(game), this.game = game, this.balls = [], this.heldBall = null, this.mouseDown = false, this.mouseX = 0, this.mouseY = 0;
        this.ballLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(this.canvas);
        this.trailLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(this.canvas);
        this.backgroundLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(this.canvas, {
            backgroundColor: "#023"
        });
        this.balls.push(new (0, $96ef78e216622c6f$export$2e2bcd8739ae039)({
            x: this.canvas.width / 2,
            y: this.canvas.height / 2 - 100,
            xSpeed: 500,
            ySpeed: 0
        }));
        this.balls.push(new (0, $96ef78e216622c6f$export$2e2bcd8739ae039)({
            x: this.canvas.width / 2,
            y: this.canvas.height / 2 + 100,
            xSpeed: -500,
            ySpeed: 0
        }));
        this.handleKeyup = this.handleKeyup.bind(this);
    }
    onKeyup(e) {
        if (e.key === "p") this.game.pushState(new (0, $a0a23f93dcace043$export$2e2bcd8739ae039)(this.game));
        if (e.key === "+" || e.key === "=") this.balls.push(new (0, $96ef78e216622c6f$export$2e2bcd8739ae039)({
            x: this.canvas.width * Math.random(),
            y: this.canvas.height * Math.random(),
            xSpeed: Math.random() * 1000 - 500,
            ySpeed: Math.random() * 1000 - 500
        }));
        if (e.key === "-" || e.key === "_") this.balls.pop();
    }
    onMouseDown(e) {
        this.mouseDown = true;
    }
    onMouseUp(e) {
        this.mouseDown = false;
        this.heldBall = null;
    }
    onMouseMove(e) {
        const rect = this.game.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }
    onResize() {
        this.ballLayer.handleResize();
        this.trailLayer.handleResize();
        this.backgroundLayer.handleResize();
    }
    update(delta) {
        this.balls.forEach((ball)=>ball.update(delta));
        // Handle ball attraction
        for(let i = 0; i < this.balls.length; i++)for(let j = 0; j < this.balls.length; j++){
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
        // Handle ball boundaries
        this.balls.forEach((ball)=>{
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
            if (!this.heldBall && this.mouseDown && ball.isCollision(this.mouseX, this.mouseY)) this.heldBall = ball;
        });
        // handle mouse drag
        if (this.heldBall) {
            this.heldBall.x = this.mouseX;
            this.heldBall.y = this.mouseY;
            this.heldBall.xSpeed = 0;
            this.heldBall.ySpeed = 0;
        }
        this.ballLayer.withLayer((canvas, ctx)=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.balls.forEach((ball)=>ball.draw(canvas));
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
        this.trailLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(this.canvas, this.trailLayer).withLayer((canvas, ctx)=>{
            ctx.filter = "blur(2px) hue-rotate(5deg) saturate(0.99) opacity(0.99)";
            ctx.drawImage(this.trailLayer.canvas, 0, 0);
            ctx.filter = "none";
        });
        this.backgroundLayer.clear();
        this.ctx.drawImage(this.backgroundLayer.canvas, 0, 0);
        this.ctx.drawImage(this.trailLayer.canvas, 0, 0);
        this.ctx.drawImage(this.ballLayer.canvas, 0, 0);
    }
    render(ctx) {
        ctx.drawImage(this.canvas, 0, 0);
    }
}





class $b964b02ff2e11b82$export$2e2bcd8739ae039 extends (0, $c6e9585522073c38$export$2e2bcd8739ae039) {
    constructor(game){
        super(game), this.game = game, this.bytesLoaded = 0, this.bytesTotal = 10000, this.active = false;
        this.infoLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(this.canvas);
        this.backgroundLayer = new (0, $565a624516254204$export$2e2bcd8739ae039)(this.canvas, {
            backgroundColor: "#023"
        });
        PubSub.subscribe("loader:start", ()=>{
            this.active = true; // Activate the loader when the event is triggered
        });
    }
    onKeyup(e) {
        if (e.key === "Enter" && this.bytesLoaded >= this.bytesTotal) this.game.pushState(new (0, $88c64d01b002ea7b$export$2e2bcd8739ae039)(this.game)); // Push the game state
    }
    update(delta) {
        if (this.active) {
            const duration = 4; // Duration of the loading screen in seconds
            this.bytesLoaded += this.bytesTotal / duration * delta; // Simulate loading progress
            if (this.bytesLoaded >= this.bytesTotal) this.bytesLoaded = this.bytesTotal;
        }
        this.infoLayer.withLayer((canvas, ctx)=>{
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            const percentage = Math.floor(100 * this.bytesLoaded / this.bytesTotal);
            ctx.fillStyle = "#fff";
            ctx.font = "12px sans-serif";
            ctx.textBaseline = "middle";
            ctx.textAlign = "left";
            ctx.fillText("Loading...", this.canvas.width / 2 - 100, this.canvas.height / 2 - 15);
            ctx.textAlign = "right";
            ctx.fillText(`${percentage}%`, this.canvas.width / 2 + 100, this.canvas.height / 2 - 15);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.rect(this.canvas.width / 2 - 100, this.canvas.height / 2 - 5, 200, 10);
            ctx.stroke();
            ctx.beginPath();
            ctx.rect(this.canvas.width / 2 - 100, this.canvas.height / 2 - 5, 200 * (this.bytesLoaded / this.bytesTotal), 10);
            ctx.fill();
            if (this.bytesLoaded >= this.bytesTotal) {
                ctx.textAlign = "center";
                ctx.fillStyle = "#0f0";
                ctx.fillText("Press Enter to start", this.canvas.width / 2, this.canvas.height / 2 + 35);
            }
        });
    }
    render(ctx) {
        this.ctx.drawImage(this.backgroundLayer.canvas, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.infoLayer.canvas, 0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
    }
}



const $53ffd25df6034fb9$var$defaultOptions = {
    debug: false,
    loader: false
};
class $53ffd25df6034fb9$export$2e2bcd8739ae039 {
    constructor(canvas, options = $53ffd25df6034fb9$var$defaultOptions){
        this.canvas = canvas;
        this.logger = (0, ($parcel$interopDefault($ePUDy$loglevel))).getLogger("Efb");
        this.states = [];
        this.running = false;
        this.lastUpdate = 0;
        this.publish = (0, ($parcel$interopDefault($ePUDy$pubsubjs))).publish.bind((0, ($parcel$interopDefault($ePUDy$pubsubjs))));
        this.subscribe = (0, ($parcel$interopDefault($ePUDy$pubsubjs))).subscribe.bind((0, ($parcel$interopDefault($ePUDy$pubsubjs))));
        this.unsubscribe = (0, ($parcel$interopDefault($ePUDy$pubsubjs))).unsubscribe.bind((0, ($parcel$interopDefault($ePUDy$pubsubjs))));
        this.options = {
            ...$53ffd25df6034fb9$var$defaultOptions,
            ...options
        };
        this.handleResize();
        const resizeObserver = new ResizeObserver(()=>this.handleResize());
        resizeObserver.observe(this.canvas);
        this.logger.setLevel(options.debug ? "debug" : "silent");
        this.logger.debug("Efb initialized with options", this.options);
    }
    start() {
        this.running = true;
        this.logger.debug("Efb is running");
        // Add the first state
        const state = this.options.loader ? new (0, $b964b02ff2e11b82$export$2e2bcd8739ae039)(this) : new (0, $88c64d01b002ea7b$export$2e2bcd8739ae039)(this);
        this.states.push(state);
        state.handleEnter();
        // Start the game loop
        requestAnimationFrame(this.loop.bind(this));
    }
    stop() {
        this.running = false;
        this.states = [];
        this.logger.debug("Efb is stopped");
    }
    getCurrentState() {
        return this.states?.[this.states.length - 1];
    }
    getPreviousState() {
        return this.states?.[this.states.length - 2];
    }
    pushState(state) {
        const lastState = this.getCurrentState();
        if (lastState) // Exit the last state before entering the new one
        lastState.handleExit();
        state.handleEnter();
        this.states.push(state);
    }
    popState() {
        const lastState = this.states.pop();
        if (lastState) // Exit the last state before entering the new one
        lastState.handleExit();
        const newState = this.getCurrentState();
        newState.handleEnter();
    }
    handleResize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.logger.debug("Canvas resized to", {
            width: this.canvas.width,
            height: this.canvas.height
        });
        try {
            this.states.forEach((state)=>{
                state?.handleResize();
            });
        } catch (error) {
            this.logger.error("Error resizing current state", error);
        }
    }
    loop(currentTime) {
        let delta = this.lastUpdate > 0 ? (currentTime - this.lastUpdate) / 1000 : 0;
        this.lastUpdate = currentTime;
        // Cancel the loop if the delta is too large (e.g. when tab is inactive)
        if (delta > 1) delta = 0;
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
            if (!ctx) throw new Error("Cannot get 2d context from canvas");
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


//# sourceMappingURL=main.js.map
