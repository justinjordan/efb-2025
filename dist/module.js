import $doaur$loglevel from "loglevel";


class $f94dd35d7e4c47f0$export$2e2bcd8739ae039 {
    constructor(){
        this.shouldRender = true;
    }
}


class $c95e6a7d1d02e936$export$2e2bcd8739ae039 extends (0, $f94dd35d7e4c47f0$export$2e2bcd8739ae039) {
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
    handleResize() {
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
    isCollision(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius;
    }
}


class $185b6a29245bc483$export$2e2bcd8739ae039 {
    constructor(parentCanvas, options){
        this.parentCanvas = parentCanvas;
        Object.assign(this, options);
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        if (!this.ctx) throw new Error("Cannot get 2d context from canvas");
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




class $3c9a1211b363cd3e$export$2e2bcd8739ae039 extends (0, $f94dd35d7e4c47f0$export$2e2bcd8739ae039) {
    constructor(game){
        super(), this.game = game;
        this.canvas = document.createElement("canvas");
        this.handleKeyup = this.handleKeyup.bind(this);
    }
    handleKeyup(e) {
        if (e.key === "p") this.game.popState();
    }
    handleResize() {
        this.shouldRender = true; // Allow rendering on resize
    }
    onEnter() {
        document.addEventListener("keyup", this.handleKeyup);
    }
    onExit() {
        document.removeEventListener("keyup", this.handleKeyup);
    }
    update(delta) {
    // do nothing
    }
    render(canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Cannot get 2d context from canvas");
        this.game.getPreviousState()?.render(canvas);
        const width = 300;
        const height = 200;
        // Draw the pause overlay
        ctx.fillStyle = "#333";
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 30;
        ctx.roundRect(canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, height, 10);
        ctx.fill();
        ctx.shadowColor = "transparent"; // Reset shadow
        // Draw the pause text
        ctx.fillStyle = "#fff";
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Paused", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "16px sans-serif";
        ctx.fillText("Press 'p' to resume", canvas.width / 2, canvas.height / 2 + 20);
        this.shouldRender = false; // Prevents continuous rendering
    }
}


class $06ea7b158ce0d77d$export$2e2bcd8739ae039 extends (0, $f94dd35d7e4c47f0$export$2e2bcd8739ae039) {
    constructor(game){
        super(), this.game = game, this.balls = [], this.heldBall = null, this.mouseDown = false, this.mouseX = 0, this.mouseY = 0, this.handleMouseDown = (e)=>{
            this.mouseDown = true;
        }, this.handleMouseUp = (e)=>{
            this.mouseDown = false;
            this.heldBall = null;
        }, this.handleMouseMove = (e)=>{
            const rect = this.game.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        };
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.game.canvas.width;
        this.canvas.height = this.game.canvas.height;
        this.ballLayer = new (0, $185b6a29245bc483$export$2e2bcd8739ae039)(this.canvas);
        this.trailLayer = new (0, $185b6a29245bc483$export$2e2bcd8739ae039)(this.canvas);
        this.backgroundLayer = new (0, $185b6a29245bc483$export$2e2bcd8739ae039)(this.canvas, {
            backgroundColor: "#023"
        });
        for(let i = 0; i < 3; i++)this.balls.push(new (0, $c95e6a7d1d02e936$export$2e2bcd8739ae039)({
            x: this.canvas.width * Math.random(),
            y: this.canvas.height * Math.random(),
            xSpeed: (300 * Math.random() + 200) * (Math.random() > 0.5 ? 1 : -1),
            ySpeed: (300 * Math.random() + 200) * (Math.random() > 0.5 ? 1 : -1)
        }));
        this.handleKeyup = this.handleKeyup.bind(this);
    }
    handleKeyup(e) {
        if (e.key === "p") this.pauseGame();
    }
    handleResize() {
        this.ballLayer.handleResize();
        this.trailLayer.handleResize();
        this.backgroundLayer.handleResize();
    }
    onEnter() {
        document.addEventListener("keyup", this.handleKeyup);
        document.addEventListener("mousedown", this.handleMouseDown);
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("mousemove", this.handleMouseMove);
    }
    onExit() {
        document.removeEventListener("keyup", this.handleKeyup);
        document.removeEventListener("mousedown", this.handleMouseDown);
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
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
    }
    render() {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Cannot get 2d context from canvas");
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
        this.trailLayer = new (0, $185b6a29245bc483$export$2e2bcd8739ae039)(this.canvas, this.trailLayer).withLayer((canvas, ctx)=>{
            ctx.filter = "blur(2px) hue-rotate(5deg) saturate(0.99) opacity(0.99)";
            ctx.drawImage(this.trailLayer.canvas, 0, 0);
            ctx.filter = "none";
        });
        this.backgroundLayer.clear();
        ctx.drawImage(this.backgroundLayer.canvas, 0, 0);
        ctx.drawImage(this.trailLayer.canvas, 0, 0);
        ctx.drawImage(this.ballLayer.canvas, 0, 0);
    }
    pauseGame() {
        this.game.pushState(new (0, $3c9a1211b363cd3e$export$2e2bcd8739ae039)(this.game));
    }
}


const $b013a5dd6d18443e$var$defaultOptions = {
    debug: false
};
class $b013a5dd6d18443e$export$2e2bcd8739ae039 {
    constructor(canvas, options = $b013a5dd6d18443e$var$defaultOptions){
        this.canvas = canvas;
        this.logger = (0, $doaur$loglevel).getLogger("Efb");
        this.states = [];
        this.running = false;
        this.isVisible = true;
        this.lastUpdate = 0;
        this.options = {
            ...$b013a5dd6d18443e$var$defaultOptions,
            ...options
        };
        this.handleResize();
        const resizeObserver = new ResizeObserver(()=>this.handleResize());
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
        const state = new (0, $06ea7b158ce0d77d$export$2e2bcd8739ae039)(this);
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
    getCurrentState() {
        return this.states?.[this.states.length - 1];
    }
    getPreviousState() {
        return this.states?.[this.states.length - 2];
    }
    pushState(state) {
        const lastState = this.getCurrentState();
        if (lastState) // Exit the last state before entering the new one
        lastState.onExit();
        state.onEnter();
        this.states.push(state);
    }
    popState() {
        const lastState = this.states.pop();
        if (lastState) // Exit the last state before entering the new one
        lastState.onExit();
        const newState = this.getCurrentState();
        newState.onEnter();
    }
    handleResize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.logger.debug("Canvas resized to", {
            width: this.canvas.width,
            height: this.canvas.height
        });
        // Resize current state
        try {
            const state = this.getCurrentState();
            state?.handleResize();
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
            // Update all states
            state.update(delta);
            // Render all states
            if (state.shouldRender && this.isVisible) state.render(this.canvas);
            this.canvas.getContext("2d")?.drawImage(state.canvas, 0, 0);
        } catch (error) {
            this.logger.error("Error in game loop", error);
        }
        // Call the loop again
        requestAnimationFrame(this.loop.bind(this));
    }
}


export {$b013a5dd6d18443e$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
