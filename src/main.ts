import "./styles/base.css";

const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 180;
const HUD_HEIGHT = 28;
const STATUS_HEIGHT = 18;
const HORIZON_Y = 52;
const TRAIL_LENGTH = 420;
const AUTO_SPEED = 26;
const TRAIL_OBJECT_COUNT = 24;
const TRAIL_LINE_COUNT = 18;
const RUNNER_X = VIEW_WIDTH / 2;
const RUNNER_BASE_Y = 143;

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

  drawCanyonBackdrop();
  drawTrail();
  drawRunner();
  drawHud();
}

function drawCanyonBackdrop(): void {
  ctx.fillStyle = "#3b2925";
  ctx.fillRect(0, HUD_HEIGHT, VIEW_WIDTH, HORIZON_Y - HUD_HEIGHT);

  ctx.fillStyle = "#5c3729";
  ctx.fillRect(0, 40, VIEW_WIDTH, 12);

  ctx.fillStyle = "#b85f25";
  ctx.fillRect(252, 32, 14, 14);
  ctx.fillStyle = "#e2a13a";
  ctx.fillRect(256, 36, 6, 6);

  ctx.fillStyle = "#241c18";
  ctx.beginPath();
  ctx.moveTo(0, 49);
  ctx.lineTo(32, 42);
  ctx.lineTo(74, 47);
  ctx.lineTo(116, 39);
  ctx.lineTo(164, 48);
  ctx.lineTo(208, 41);
  ctx.lineTo(250, 48);
  ctx.lineTo(320, 43);
  ctx.lineTo(320, 62);
  ctx.lineTo(0, 62);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#2f3320";
  ctx.fillRect(0, HORIZON_Y, VIEW_WIDTH, VIEW_HEIGHT - HORIZON_Y);
}

function drawTrail(): void {
  drawTrailSurface();
  drawTrailMotionLines();
  drawTrailObjects();
}

function drawTrailSurface(): void {
  drawTrailBand(0, 1, "#6f4b2e");

  for (let i = 0; i < 12; i += 1) {
    const farDepth = i / 12;
    const nearDepth = (i + 1) / 12;
    drawEdgeStrip(farDepth, nearDepth, -1);
    drawEdgeStrip(farDepth, nearDepth, 1);
  }

  drawTrailBand(0.03, 1, "rgba(47, 30, 21, 0.24)", 0.34, 0.46);
  drawTrailBand(0.03, 1, "rgba(47, 30, 21, 0.2)", 0.54, 0.66);
}

function drawTrailMotionLines(): void {
  const scroll = (state.distance * 0.075) % 1;

  for (let i = 0; i < TRAIL_LINE_COUNT; i += 1) {
    const depth = (i + scroll) / TRAIL_LINE_COUNT;

    if (depth < 0.06 || depth > 0.98) {
      continue;
    }

    const y = perspectiveY(depth);
    const center = trailCenter(depth);
    const halfWidth = trailHalfWidth(depth);
    const lineWidth = Math.max(4, Math.floor(halfWidth * 1.08));
    const lineHeight = Math.max(1, Math.floor(depth * 4));

    ctx.fillStyle = i % 2 === 0 ? "#805634" : "#5b3b25";
    ctx.fillRect(
      Math.floor(center - lineWidth / 2),
      Math.floor(y),
      Math.floor(lineWidth),
      lineHeight,
    );
  }

  for (let i = 0; i < 7; i += 1) {
    const depth = ((i * 2 + scroll * 2) % 7) / 7;

    if (depth < 0.12) {
      continue;
    }

    const y = perspectiveY(depth);
    const center = trailCenter(depth);
    const halfWidth = trailHalfWidth(depth);
    const dustWidth = Math.floor(8 + depth * 24);

    ctx.fillStyle = "rgba(226, 161, 58, 0.26)";
    ctx.fillRect(
      Math.floor(center - halfWidth * 0.1 - dustWidth / 2),
      Math.floor(y + depth * 8),
      dustWidth,
      Math.max(1, Math.floor(depth * 3)),
    );
  }
}

function drawTrailObjects(): void {
  const scroll = state.distance * 0.03;
  const scrollFraction = scroll % 1;
  const worldBase = Math.floor(scroll);

  for (let i = 0; i < TRAIL_OBJECT_COUNT; i += 1) {
    const depth = (i + scrollFraction) / TRAIL_OBJECT_COUNT;

    if (depth < 0.08 || depth > 0.98) {
      continue;
    }

    const seed = worldBase + i * 19;
    const side = hashFloat(seed) > 0.5 ? 1 : -1;
    const roll = hashFloat(seed + 3);
    const y = perspectiveY(depth);
    const center = trailCenter(depth);
    const halfWidth = trailHalfWidth(depth);
    const edgeX = center + side * halfWidth;
    const shoulderOffset = 5 + hashFloat(seed + 7) * (9 + depth * 15);
    const x = edgeX + side * shoulderOffset;

    if (roll > 0.8) {
      drawTrailMarker(x, y, depth);
    } else if (roll > 0.48) {
      drawBrush(x, y, depth);
    } else {
      drawRock(x, y, depth);
    }
  }

  for (let i = 0; i < 10; i += 1) {
    const depth = (i + 0.35 + scrollFraction) / 10;

    if (depth < 0.16 || depth > 0.92) {
      continue;
    }

    const seed = worldBase + i * 29;
    const center = trailCenter(depth);
    const halfWidth = trailHalfWidth(depth);
    const lane = hashFloat(seed + 11) * 1.2 - 0.6;
    drawRock(center + lane * halfWidth, perspectiveY(depth), depth * 0.75);
  }
}

function drawRunner(): void {
  const bob = Math.floor(Math.sin(state.elapsed * 13) * 2);
  const x = RUNNER_X;
  const y = RUNNER_BASE_Y + bob;
  const stride = Math.floor(state.elapsed * 8) % 2;

  ctx.fillStyle = "#1c130e";
  ctx.fillRect(x - 16, y + 6, 32, 4);

  ctx.fillStyle = "#080808";
  ctx.fillRect(x - 7, y - 22, 14, 19);

  ctx.fillStyle = "#eee6cf";
  ctx.fillRect(x - 5, y - 32, 10, 9);

  ctx.fillStyle = "#9cff3a";
  ctx.fillRect(x - 7, y - 24, 14, 4);
  ctx.fillRect(x - 11, y - 15, 4, 10);
  ctx.fillRect(x + 7, y - 15, 4, 10);

  ctx.fillStyle = "#f05a24";
  ctx.fillRect(x - 10, y - 33, 20, 3);

  ctx.fillStyle = "#141414";
  if (stride === 0) {
    ctx.fillRect(x - 8, y - 3, 5, 14);
    ctx.fillRect(x + 3, y - 3, 5, 10);
  } else {
    ctx.fillRect(x - 8, y - 3, 5, 10);
    ctx.fillRect(x + 3, y - 3, 5, 14);
  }

  ctx.fillStyle = "#efe7cf";
  ctx.fillRect(x - 9, y + 10, 6, 2);
  ctx.fillRect(x + 3, y + 10, 6, 2);
}

function drawHud(): void {
  const progress = Math.floor((state.distance / TRAIL_LENGTH) * 100);

  ctx.fillStyle = "#080807";
  ctx.fillRect(0, 0, VIEW_WIDTH, HUD_HEIGHT);

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
  ctx.fillRect(8, VIEW_HEIGHT - STATUS_HEIGHT, 304, 10);
  ctx.fillStyle = "#efe7cf";
  ctx.fillText(
    state.phase === "complete" ? "TRAIL SECTION COMPLETE" : "CANYON CORRIDOR V0",
    12,
    VIEW_HEIGHT - STATUS_HEIGHT + 1,
  );
}

function perspectiveY(depth: number): number {
  return HORIZON_Y + (VIEW_HEIGHT - HORIZON_Y) * Math.pow(depth, 1.58);
}

function trailHalfWidth(depth: number): number {
  return 10 + 106 * Math.pow(depth, 1.18);
}

function trailCenter(depth: number): number {
  const bend = Math.sin(state.distance * 0.012 + depth * 2.2) * (1 - depth) * 7;
  return VIEW_WIDTH / 2 + bend;
}

function drawTrailBand(
  farDepth: number,
  nearDepth: number,
  color: string,
  leftFactor = 0,
  rightFactor = 1,
): void {
  const farY = perspectiveY(farDepth);
  const nearY = perspectiveY(nearDepth);
  const farCenter = trailCenter(farDepth);
  const nearCenter = trailCenter(nearDepth);
  const farHalf = trailHalfWidth(farDepth);
  const nearHalf = trailHalfWidth(nearDepth);

  drawQuad(
    farCenter - farHalf + farHalf * 2 * leftFactor,
    farY,
    farCenter - farHalf + farHalf * 2 * rightFactor,
    farY,
    nearCenter - nearHalf + nearHalf * 2 * rightFactor,
    nearY,
    nearCenter - nearHalf + nearHalf * 2 * leftFactor,
    nearY,
    color,
  );
}

function drawEdgeStrip(farDepth: number, nearDepth: number, side: -1 | 1): void {
  const farY = perspectiveY(farDepth);
  const nearY = perspectiveY(nearDepth);
  const farCenter = trailCenter(farDepth);
  const nearCenter = trailCenter(nearDepth);
  const farHalf = trailHalfWidth(farDepth);
  const nearHalf = trailHalfWidth(nearDepth);
  const farEdge = farCenter + side * farHalf;
  const nearEdge = nearCenter + side * nearHalf;
  const farWidth = 2 + farDepth * 3;
  const nearWidth = 2 + nearDepth * 7;

  drawQuad(
    farEdge,
    farY,
    farEdge + side * farWidth,
    farY,
    nearEdge + side * nearWidth,
    nearY,
    nearEdge,
    nearY,
    side === -1 ? "#352316" : "#3c281b",
  );
}

function drawTrailMarker(x: number, y: number, depth: number): void {
  const width = Math.max(1, Math.floor(1 + depth * 3));
  const height = Math.max(5, Math.floor(6 + depth * 14));

  ctx.fillStyle = "#2b2017";
  ctx.fillRect(Math.floor(x), Math.floor(y - height), width, height);
  ctx.fillStyle = "#f05a24";
  ctx.fillRect(Math.floor(x - width), Math.floor(y - height), width * 3, Math.max(2, width));
}

function drawBrush(x: number, y: number, depth: number): void {
  const width = Math.max(3, Math.floor(5 + depth * 13));
  const height = Math.max(2, Math.floor(3 + depth * 8));

  ctx.fillStyle = "#1f2918";
  ctx.fillRect(Math.floor(x - width / 2), Math.floor(y - height), width, height);
  ctx.fillStyle = "#41502a";
  ctx.fillRect(Math.floor(x - width / 3), Math.floor(y - height - 2), Math.floor(width * 0.7), 2);
}

function drawRock(x: number, y: number, depth: number): void {
  const size = Math.max(1, Math.floor(2 + depth * 7));

  ctx.fillStyle = "#2b211b";
  ctx.fillRect(Math.floor(x - size / 2), Math.floor(y - size / 2), size + 1, size);
  ctx.fillStyle = "#816044";
  ctx.fillRect(Math.floor(x - size / 2), Math.floor(y - size / 2), Math.max(1, size - 1), 1);
}

function drawQuad(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  color: string,
): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(Math.floor(x1), Math.floor(y1));
  ctx.lineTo(Math.floor(x2), Math.floor(y2));
  ctx.lineTo(Math.floor(x3), Math.floor(y3));
  ctx.lineTo(Math.floor(x4), Math.floor(y4));
  ctx.closePath();
  ctx.fill();
}

function hashFloat(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}
