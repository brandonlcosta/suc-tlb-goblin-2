import "./styles/base.css";

const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 180;
const TRAIL_LENGTH = 420;
const AUTO_SPEED = 26;

type RunPhase = "running" | "complete";

interface GameState {
  distance: number;
  elapsed: number;
  lastTimestamp: number;
  phase: RunPhase;
}

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
const restartButton = document.querySelector<HTMLButtonElement>("#restart-button");

if (!canvas) {
  throw new Error("Missing game canvas.");
}

const context = canvas.getContext("2d");

if (!context) {
  throw new Error("Canvas 2D context is not available.");
}

const ctx: CanvasRenderingContext2D = context;

let state = createInitialState();

restartButton?.addEventListener("click", restart);
window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "r") {
    restart();
  }
});

requestAnimationFrame(tick);

function createInitialState(): GameState {
  return {
    distance: 0,
    elapsed: 0,
    lastTimestamp: performance.now(),
    phase: "running",
  };
}

function restart(): void {
  state = createInitialState();
}

function tick(timestamp: number): void {
  const deltaSeconds = Math.min((timestamp - state.lastTimestamp) / 1000, 0.08);
  state.lastTimestamp = timestamp;

  update(deltaSeconds);
  render();

  requestAnimationFrame(tick);
}

function update(deltaSeconds: number): void {
  if (state.phase !== "running") {
    return;
  }

  state.elapsed += deltaSeconds;
  state.distance = Math.min(state.distance + AUTO_SPEED * deltaSeconds, TRAIL_LENGTH);

  if (state.distance >= TRAIL_LENGTH) {
    state.phase = "complete";
  }
}

function render(): void {
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#12100d";
  ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);

  drawTrail();
  drawRunner();
  drawHud();
}

function drawTrail(): void {
  const scroll = (state.distance * 2) % 24;

  ctx.fillStyle = "#202318";
  ctx.fillRect(0, 28, 96, VIEW_HEIGHT - 28);
  ctx.fillRect(224, 28, 96, VIEW_HEIGHT - 28);

  ctx.fillStyle = "#6f4b2e";
  ctx.fillRect(96, 28, 128, VIEW_HEIGHT - 28);

  ctx.fillStyle = "#3c281b";
  ctx.fillRect(96, 28, 8, VIEW_HEIGHT - 28);
  ctx.fillRect(216, 28, 8, VIEW_HEIGHT - 28);

  ctx.fillStyle = "#b67a31";
  for (let y = 24 - scroll; y < VIEW_HEIGHT; y += 24) {
    ctx.fillRect(114, y, 8, 3);
    ctx.fillRect(198, y + 9, 8, 3);
  }

  ctx.fillStyle = "#2f3a21";
  for (let y = 34 - scroll; y < VIEW_HEIGHT; y += 18) {
    const leftX = 18 + ((Math.floor(y) * 7) % 44);
    const rightX = 236 + ((Math.floor(y) * 5) % 46);
    ctx.fillRect(leftX, y, 10, 5);
    ctx.fillRect(rightX, y + 7, 12, 4);
  }

  ctx.fillStyle = "#d9651b";
  for (let y = 40 - scroll; y < VIEW_HEIGHT; y += 48) {
    ctx.fillRect(88, y, 4, 13);
    ctx.fillRect(228, y + 18, 4, 13);
  }
}

function drawRunner(): void {
  const bob = Math.floor(Math.sin(state.elapsed * 13) * 2);
  const x = 160;
  const y = 128 + bob;
  const stride = Math.floor(state.elapsed * 8) % 2;

  ctx.fillStyle = "#080808";
  ctx.fillRect(x - 5, y - 16, 10, 15);

  ctx.fillStyle = "#eee6cf";
  ctx.fillRect(x - 4, y - 23, 8, 7);

  ctx.fillStyle = "#9cff3a";
  ctx.fillRect(x - 5, y - 18, 10, 3);
  ctx.fillRect(x - 7, y - 10, 3, 8);
  ctx.fillRect(x + 4, y - 10, 3, 8);

  ctx.fillStyle = "#f05a24";
  ctx.fillRect(x - 8, y - 23, 16, 2);

  ctx.fillStyle = "#141414";
  if (stride === 0) {
    ctx.fillRect(x - 6, y - 1, 4, 10);
    ctx.fillRect(x + 2, y - 1, 4, 7);
  } else {
    ctx.fillRect(x - 6, y - 1, 4, 7);
    ctx.fillRect(x + 2, y - 1, 4, 10);
  }
}

function drawHud(): void {
  const progress = Math.floor((state.distance / TRAIL_LENGTH) * 100);

  ctx.fillStyle = "#080807";
  ctx.fillRect(0, 0, VIEW_WIDTH, 28);

  ctx.font = "8px monospace";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#efe7cf";
  ctx.fillText("SUC: THE LONG BURN", 8, 6);
  ctx.fillStyle = "#9cff3a";
  ctx.fillText("FORESTHILL HEAT DROP", 8, 17);

  ctx.fillStyle = "#f05a24";
  ctx.fillText(`PROGRESS ${progress.toString().padStart(3, "0")}%`, 196, 6);
  ctx.fillStyle = "#efe7cf";
  ctx.fillText("R RESTART", 230, 17);

  ctx.fillStyle = "#080807";
  ctx.fillRect(8, VIEW_HEIGHT - 18, 304, 10);
  ctx.fillStyle = "#efe7cf";
  ctx.fillText(
    state.phase === "complete" ? "SHELL LOOP COMPLETE" : "AUTO-RUN PROTOTYPE",
    12,
    VIEW_HEIGHT - 17,
  );
}
