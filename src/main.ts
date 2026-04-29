import "./styles/base.css";

const TRAIL_LENGTH = 156;
const BASE_RUN_SPEED = 6.4;
const MIN_RUN_SPEED = 3.4;
const MAX_RUN_SPEED = 13.2;
const BRAKE_TARGET_SPEED = 4.8;
const MOMENTUM_ACCELERATION = 5.4;
const BRAKE_DECELERATION = 9.6;
const STEER_SPEED = 4.2;
const LATERAL_LIMIT = 1.85;
const RUNNER_EDGE_BUFFER = 0.48;
const CAMERA_RESPONSE = 4.8;
const RESOURCE_MAX = 100;
const STARTING_HEAT = 18;
const STARTING_HYDRATION = 100;
const STARTING_QUAD_DAMAGE = 0;
const HEAT_PASSIVE_GAIN = 1.55;
const HEAT_EXPOSURE_GAIN = 2.15;
const HEAT_SPEED_GAIN = 3.4;
const HEAT_DOWNHILL_GAIN = 0.9;
const HEAT_LOW_HYDRATION_GAIN = 2.1;
const HYDRATION_PASSIVE_DRAIN = 1.25;
const HYDRATION_EXPOSURE_DRAIN = 1.05;
const HYDRATION_SPEED_DRAIN = 1.65;
const HYDRATION_HEAT_DRAIN = 1.35;
const QUAD_AGGRESSION_GAIN = 4.8;
const QUAD_BRAKE_RELIEF = 0.38;

type Vec3 = [number, number, number];

interface Mesh {
  positionBuffer: WebGLBuffer;
  colorBuffer: WebGLBuffer;
  vertexCount: number;
}

interface SceneObject {
  mesh: Mesh;
  position: Vec3;
  scale: Vec3;
  rotationY?: number;
}

interface GameState {
  progress: number;
  lateral: number;
  lateralVelocity: number;
  speed: number;
  heat: number;
  hydration: number;
  quadDamage: number;
  failureReason: string | null;
  cameraPosition: Vec3;
  cameraTarget: Vec3;
  lastTimestamp: number;
}

interface InputState {
  left: boolean;
  right: boolean;
  brake: boolean;
}

const canvas = requiredElement(
  document.querySelector<HTMLCanvasElement>("#game-canvas"),
  "Missing game canvas.",
);
const gameShell = requiredElement(
  document.querySelector<HTMLElement>("#game-shell"),
  "Missing game shell.",
);
const restartButton = document.querySelector<HTMLButtonElement>("#restart-button");
const progressText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-progress]"),
  "Missing progress HUD element.",
);
const heatText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-heat]"),
  "Missing heat HUD element.",
);
const hydrationText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-hydration]"),
  "Missing hydration HUD element.",
);
const quadText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-quad]"),
  "Missing quad HUD element.",
);
const statusText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-status]"),
  "Missing status HUD element.",
);
const gl = requiredWebGlContext(canvas);

const vertexShaderSource = `
attribute vec3 aPosition;
attribute vec3 aColor;

uniform mat4 uModel;
uniform mat4 uViewProjection;

varying lowp vec3 vColor;

void main() {
  vColor = aColor;
  gl_Position = uViewProjection * uModel * vec4(aPosition, 1.0);
}
`;

const fragmentShaderSource = `
varying lowp vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1.0);
}
`;

const program = createProgram(vertexShaderSource, fragmentShaderSource);
const positionLocation = gl.getAttribLocation(program, "aPosition");
const colorLocation = gl.getAttribLocation(program, "aColor");
const modelLocation = requiredUniform(program, "uModel");
const viewProjectionLocation = requiredUniform(program, "uViewProjection");

const trailMesh = createTrailMesh();
const terrainMesh = createTerrainMesh();
const cubeMesh = createCubeMesh([0.05, 0.045, 0.04]);
const kitMesh = createCubeMesh([0.01, 0.01, 0.01]);
const skinMesh = createCubeMesh([0.86, 0.76, 0.58]);
const accentMesh = createCubeMesh([0.57, 1, 0.24]);
const rockMesh = createLowPolyRockMesh();
const treeMesh = createPyramidMesh([0.12, 0.18, 0.08]);

const sceneObjects: SceneObject[] = [
  ...createTrailMarkers(),
  ...createRocks(),
  ...createTrees(),
];

const input: InputState = {
  left: false,
  right: false,
  brake: false,
};

let state = createInitialState();

restartButton?.addEventListener("click", restart);
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (key === "a" || key === "arrowleft") {
    input.left = true;
    event.preventDefault();
  } else if (key === "d" || key === "arrowright") {
    input.right = true;
    event.preventDefault();
  } else if (key === "s" || key === "arrowdown" || key === "shift") {
    input.brake = true;
    event.preventDefault();
  } else if (key === "r") {
    restart();
    event.preventDefault();
  }
});
window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();

  if (key === "a" || key === "arrowleft") {
    input.left = false;
    event.preventDefault();
  } else if (key === "d" || key === "arrowright") {
    input.right = false;
    event.preventDefault();
  } else if (key === "s" || key === "arrowdown" || key === "shift") {
    input.brake = false;
    event.preventDefault();
  }
});

gl.useProgram(program);
gl.enableVertexAttribArray(positionLocation);
gl.enableVertexAttribArray(colorLocation);
gl.enable(gl.DEPTH_TEST);
gl.disable(gl.CULL_FACE);

requestAnimationFrame(tick);

function createInitialState(): GameState {
  const runner = runnerPositionAt(0, 0);
  const camera = desiredCameraFor(runner, 0);

  return {
    progress: 0,
    lateral: 0,
    lateralVelocity: 0,
    speed: BASE_RUN_SPEED,
    heat: STARTING_HEAT,
    hydration: STARTING_HYDRATION,
    quadDamage: STARTING_QUAD_DAMAGE,
    failureReason: null,
    cameraPosition: camera.position,
    cameraTarget: camera.target,
    lastTimestamp: performance.now(),
  };
}

function requiredElement<T extends Element>(element: T | null, message: string): T {
  if (!element) {
    throw new Error(message);
  }

  return element;
}

function requiredWebGlContext(targetCanvas: HTMLCanvasElement): WebGLRenderingContext {
  const context = targetCanvas.getContext("webgl", {
    antialias: false,
    depth: true,
  });

  if (!context) {
    throw new Error("WebGL is not available.");
  }

  return context;
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
  if (state.failureReason || state.progress >= 1) {
    updateCamera(deltaSeconds);
    return;
  }

  const runnerZ = -state.progress * TRAIL_LENGTH;
  const lateralLimit = playableLateralLimitAt(runnerZ);
  const steerDirection = Number(input.right) - Number(input.left);
  const targetVelocity = steerDirection * STEER_SPEED;
  const steeringResponse = Math.min(1, deltaSeconds * (input.brake ? 12 : 9));
  const downhillBoost = downhillMomentumAt(runnerZ);
  const unbrakedTargetSpeed = BASE_RUN_SPEED + downhillBoost;
  const targetSpeed = input.brake
    ? Math.min(BRAKE_TARGET_SPEED, state.speed)
    : unbrakedTargetSpeed;
  const speedResponse = input.brake ? BRAKE_DECELERATION : MOMENTUM_ACCELERATION;

  state.speed += (targetSpeed - state.speed) * Math.min(1, deltaSeconds * speedResponse);
  state.speed = clamp(state.speed, MIN_RUN_SPEED, MAX_RUN_SPEED);

  state.lateralVelocity += (targetVelocity - state.lateralVelocity) * steeringResponse;
  state.lateral = clamp(
    state.lateral + state.lateralVelocity * deltaSeconds,
    -lateralLimit,
    lateralLimit,
  );

  if (
    (state.lateral <= -lateralLimit && state.lateralVelocity < 0) ||
    (state.lateral >= lateralLimit && state.lateralVelocity > 0)
  ) {
    state.lateralVelocity = 0;
  }

  state.progress = Math.min(1, state.progress + (state.speed / TRAIL_LENGTH) * deltaSeconds);
  updateResources(deltaSeconds, runnerZ, downhillBoost);
  updateCamera(deltaSeconds);
}

function render(): void {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.48, 0.55, 0.64, 1);
  gl.clearDepth(1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const runner = runnerPositionAt(state.progress, state.lateral);
  const projection = perspective(
    radians(61),
    canvas.width / canvas.height,
    0.1,
    72,
  );
  const view = lookAt(state.cameraPosition, state.cameraTarget, [0, 1, 0]);
  const viewProjection = multiplyMat4(projection, view);

  gl.uniformMatrix4fv(viewProjectionLocation, false, viewProjection);

  drawMesh(terrainMesh, identityMat4());
  drawMesh(trailMesh, identityMat4());

  for (const object of sceneObjects) {
    drawMesh(
      object.mesh,
      modelMat4(object.position, object.scale, object.rotationY ?? 0),
    );
  }

  drawRunner(runner.x, runner.y, runner.z);
  updateHud();
}

function drawRunner(x: number, groundY: number, z: number): void {
  const stride = Math.sin(performance.now() * 0.015) * 0.16;

  drawMesh(kitMesh, modelMat4([x, groundY + 0.95, z], [0.58, 1.08, 0.34], 0));
  drawMesh(skinMesh, modelMat4([x, groundY + 1.72, z + 0.02], [0.38, 0.38, 0.38], 0));
  drawMesh(accentMesh, modelMat4([x, groundY + 1.16, z - 0.19], [0.66, 0.13, 0.08], 0));
  drawMesh(accentMesh, modelMat4([x - 0.36, groundY + 1.02, z], [0.16, 0.7, 0.14], stride));
  drawMesh(accentMesh, modelMat4([x + 0.36, groundY + 1.02, z], [0.16, 0.7, 0.14], -stride));
  drawMesh(kitMesh, modelMat4([x - 0.2, groundY + 0.24, z], [0.18, 0.62, 0.16], -stride));
  drawMesh(kitMesh, modelMat4([x + 0.2, groundY + 0.24, z], [0.18, 0.62, 0.16], stride));
}

function updateHud(): void {
  const progress = Math.floor(state.progress * 100).toString().padStart(3, "0");
  const speed = state.speed.toFixed(1).padStart(4, "0");

  progressText.textContent = `PROGRESS ${progress}%`;
  setResourceText(heatText, "HEAT", state.heat, heatLevel(state.heat));
  setResourceText(
    hydrationText,
    "HYDRATION",
    state.hydration,
    hydrationLevel(state.hydration),
  );
  setResourceText(quadText, "QUADS", state.quadDamage, quadLevel(state.quadDamage));
  gameShell.dataset.alert = shellAlertLevel();
  statusText.textContent = statusLine(speed);
}

function updateCamera(deltaSeconds: number): void {
  const runner = runnerPositionAt(state.progress, state.lateral);
  const desired = desiredCameraFor(runner, state.lateral);
  const response = Math.min(1, deltaSeconds * CAMERA_RESPONSE);

  state.cameraPosition = lerpVec3(state.cameraPosition, desired.position, response);
  state.cameraTarget = lerpVec3(state.cameraTarget, desired.target, response);
}

function updateResources(deltaSeconds: number, runnerZ: number, downhillBoost: number): void {
  const exposure = exposureAt(state.progress);
  const speedPressure = speedPressureFor(state.speed);
  const downhillPressure = clamp(downhillBoost / (MAX_RUN_SPEED - BASE_RUN_SPEED), 0, 1);
  const heatPressure = state.heat / RESOURCE_MAX;
  const lowHydrationPressure = clamp((45 - state.hydration) / 45, 0, 1);
  const brakeRelief = input.brake ? 0.72 : 1;
  const heatGain =
    (HEAT_PASSIVE_GAIN +
      exposure * HEAT_EXPOSURE_GAIN +
      speedPressure * HEAT_SPEED_GAIN +
      downhillPressure * HEAT_DOWNHILL_GAIN +
      lowHydrationPressure * HEAT_LOW_HYDRATION_GAIN) *
    brakeRelief;
  const hydrationDrain =
    HYDRATION_PASSIVE_DRAIN +
    exposure * HYDRATION_EXPOSURE_DRAIN +
    speedPressure * HYDRATION_SPEED_DRAIN +
    heatPressure * HYDRATION_HEAT_DRAIN;
  const technicalPressure = technicalPressureAt(runnerZ);
  const quadMultiplier = input.brake ? QUAD_BRAKE_RELIEF : 1;
  const quadGain =
    speedPressure *
    (0.5 + downhillPressure * 0.7 + technicalPressure * 0.45) *
    QUAD_AGGRESSION_GAIN *
    quadMultiplier;

  state.heat = clamp(state.heat + heatGain * deltaSeconds, 0, RESOURCE_MAX);
  state.hydration = clamp(
    state.hydration - hydrationDrain * deltaSeconds,
    0,
    RESOURCE_MAX,
  );
  state.quadDamage = clamp(
    state.quadDamage + quadGain * deltaSeconds,
    0,
    RESOURCE_MAX,
  );

  if (state.heat >= RESOURCE_MAX) {
    state.failureReason = "HEAT COLLAPSE";
    state.speed = 0;
    state.lateralVelocity = 0;
  }
}

function statusLine(speed: string): string {
  if (state.failureReason) {
    return `${state.failureReason} - PRESS R`;
  }

  if (state.progress >= 1) {
    return "END OF PROTOTYPE SHELL - PRESS R";
  }

  if (state.heat >= 90) {
    return `HEAT CRITICAL ${speed}  S/SHIFT CONTROL`;
  }

  if (state.hydration <= 20) {
    return `BOTTLES LOW ${speed}  S/SHIFT CONTROL`;
  }

  if (state.quadDamage >= 70) {
    return `QUADS COOKED ${speed}  S/SHIFT CONTROL`;
  }

  return `${input.brake ? "CONTROL" : "DESCEND"} ${speed}  A/D STEER  S/SHIFT BRAKE`;
}

function setResourceText(
  element: HTMLElement,
  label: string,
  value: number,
  level: string,
): void {
  element.textContent = `${label} ${Math.round(value).toString().padStart(3, "0")}`;
  element.dataset.resourceLevel = level;
}

function shellAlertLevel(): string {
  if (state.failureReason) {
    return "failure";
  }

  if (state.heat >= 90 || state.hydration <= 10 || state.quadDamage >= 86) {
    return "critical";
  }

  if (state.heat >= 75 || state.hydration <= 29 || state.quadDamage >= 66) {
    return "danger";
  }

  return "stable";
}

function heatLevel(value: number): string {
  if (value >= 90) {
    return "critical";
  }

  if (value >= 75) {
    return "danger";
  }

  if (value >= 50) {
    return "warning";
  }

  return "safe";
}

function hydrationLevel(value: number): string {
  if (value <= 9) {
    return "critical";
  }

  if (value <= 29) {
    return "danger";
  }

  if (value <= 59) {
    return "warning";
  }

  return "safe";
}

function quadLevel(value: number): string {
  if (value >= 86) {
    return "critical";
  }

  if (value >= 66) {
    return "danger";
  }

  if (value >= 36) {
    return "warning";
  }

  return "safe";
}

function exposureAt(progress: number): number {
  if (progress > 0.42 && progress < 0.72) {
    return 1;
  }

  if (progress > 0.74 && progress < 0.9) {
    return 0.38;
  }

  return 0.58;
}

function speedPressureFor(speed: number): number {
  return clamp(
    (speed - BRAKE_TARGET_SPEED) / (MAX_RUN_SPEED - BRAKE_TARGET_SPEED),
    0,
    1,
  );
}

function technicalPressureAt(z: number): number {
  const depth = clamp(-z / TRAIL_LENGTH, 0, 1);

  return depth > 0.62 && depth < 0.84 ? 0.85 : 0.25;
}

function runnerPositionAt(progress: number, lateral: number): {
  x: number;
  y: number;
  z: number;
} {
  const z = -progress * TRAIL_LENGTH;

  return {
    x: trailCenterAt(z) + lateral,
    y: trailHeightAt(z),
    z,
  };
}

function desiredCameraFor(runner: { x: number; y: number; z: number }, lateral: number): {
  position: Vec3;
  target: Vec3;
} {
  const lookAheadZ = runner.z - 13;
  const behindZ = runner.z + 10.5;

  return {
    position: [
      trailCenterAt(behindZ) + lateral * 0.34,
      runner.y + 4.9,
      behindZ,
    ],
    target: [
      trailCenterAt(lookAheadZ) + lateral * 0.26,
      runner.y + 0.95,
      lookAheadZ,
    ],
  };
}

function drawMesh(mesh: Mesh, model: Float32Array): void {
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.positionBuffer);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorBuffer);
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

  gl.uniformMatrix4fv(modelLocation, false, model);
  gl.drawArrays(gl.TRIANGLES, 0, mesh.vertexCount);
}

function createTrailMesh(): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];
  const segments = 36;
  const trailColorA: Vec3 = [0.43, 0.28, 0.17];
  const trailColorB: Vec3 = [0.56, 0.37, 0.2];
  const exposedColor: Vec3 = [0.64, 0.42, 0.22];
  const shadeColor: Vec3 = [0.33, 0.25, 0.17];
  const edgeColor: Vec3 = [0.22, 0.15, 0.1];
  const shoulderColor: Vec3 = [0.24, 0.18, 0.11];

  for (let index = 0; index < segments; index += 1) {
    const nearZ = -index * (TRAIL_LENGTH / segments) + 5;
    const farZ = -(index + 1) * (TRAIL_LENGTH / segments) + 5;
    const nearCenter = trailCenterAt(nearZ);
    const farCenter = trailCenterAt(farZ);
    const nearWidth = trailWidthAt(nearZ);
    const farWidth = trailWidthAt(farZ);
    const sectionProgress = index / segments;
    const color =
      sectionProgress > 0.42 && sectionProgress < 0.72
        ? exposedColor
        : sectionProgress > 0.74 && index % 3 === 0
          ? shadeColor
          : index % 2 === 0
            ? trailColorA
            : trailColorB;

    addQuad(
      positions,
      colors,
      [nearCenter - nearWidth, trailHeightAt(nearZ), nearZ],
      [nearCenter + nearWidth, trailHeightAt(nearZ), nearZ],
      [farCenter + farWidth, trailHeightAt(farZ), farZ],
      [farCenter - farWidth, trailHeightAt(farZ), farZ],
      color,
    );
    addQuad(
      positions,
      colors,
      [nearCenter - nearWidth - 0.28, trailHeightAt(nearZ) + 0.018, nearZ],
      [nearCenter - nearWidth, trailHeightAt(nearZ) + 0.018, nearZ],
      [farCenter - farWidth, trailHeightAt(farZ) + 0.018, farZ],
      [farCenter - farWidth - 0.28, trailHeightAt(farZ) + 0.018, farZ],
      edgeColor,
    );
    addQuad(
      positions,
      colors,
      [nearCenter + nearWidth, trailHeightAt(nearZ) + 0.018, nearZ],
      [nearCenter + nearWidth + 0.28, trailHeightAt(nearZ) + 0.018, nearZ],
      [farCenter + farWidth + 0.28, trailHeightAt(farZ) + 0.018, farZ],
      [farCenter + farWidth, trailHeightAt(farZ) + 0.018, farZ],
      edgeColor,
    );
    addQuad(
      positions,
      colors,
      [nearCenter - nearWidth - 1.1, trailHeightAt(nearZ) + 0.006, nearZ],
      [nearCenter - nearWidth - 0.3, trailHeightAt(nearZ) + 0.006, nearZ],
      [farCenter - farWidth - 0.3, trailHeightAt(farZ) + 0.006, farZ],
      [farCenter - farWidth - 1.1, trailHeightAt(farZ) + 0.006, farZ],
      shoulderColor,
    );
    addQuad(
      positions,
      colors,
      [nearCenter + nearWidth + 0.3, trailHeightAt(nearZ) + 0.006, nearZ],
      [nearCenter + nearWidth + 1.1, trailHeightAt(nearZ) + 0.006, nearZ],
      [farCenter + farWidth + 1.1, trailHeightAt(farZ) + 0.006, farZ],
      [farCenter + farWidth + 0.3, trailHeightAt(farZ) + 0.006, farZ],
      shoulderColor,
    );
  }

  return createMesh(positions, colors);
}

function createTerrainMesh(): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];
  const ground: Vec3 = [0.18, 0.21, 0.13];
  const canyonLeft: Vec3 = [0.42, 0.24, 0.15];
  const canyonRight: Vec3 = [0.52, 0.3, 0.16];
  const farFog: Vec3 = [0.62, 0.55, 0.45];

  addQuad(positions, colors, [-48, 0.08, 10], [48, 0.08, 10], [46, trailHeightAt(-164), -164], [-46, trailHeightAt(-164), -164], ground);
  addQuad(positions, colors, [-8, 0.05, 8], [-40, 3.6, 0], [-36, trailHeightAt(-164) + 8, -164], [-10, trailHeightAt(-164), -164], canyonLeft);
  addQuad(positions, colors, [8, 0.05, 8], [10, trailHeightAt(-164), -164], [36, trailHeightAt(-164) + 7, -164], [40, 3.1, 0], canyonRight);
  addQuad(positions, colors, [-46, trailHeightAt(-164), -164], [46, trailHeightAt(-164), -164], [34, trailHeightAt(-190) + 7, -190], [-34, trailHeightAt(-190) + 7, -190], farFog);

  return createMesh(positions, colors);
}

function createTrailMarkers(): SceneObject[] {
  const markers: SceneObject[] = [];

  for (let index = 0; index < 22; index += 1) {
    const z = -8 - index * 6.5;
    const side = index % 2 === 0 ? -1 : 1;
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);
    markers.push({
      mesh: cubeMesh,
      position: [center + side * (width + 0.55), trailHeightAt(z) + 0.58, z],
      scale: [0.16, 1.16, 0.16],
    });
  }

  for (const z of [-52, -96, -148]) {
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);
    markers.push(
      {
        mesh: cubeMesh,
        position: [center - width - 0.18, trailHeightAt(z) + 1.2, z],
        scale: [0.22, 2.4, 0.22],
      },
      {
        mesh: cubeMesh,
        position: [center + width + 0.18, trailHeightAt(z) + 1.2, z],
        scale: [0.22, 2.4, 0.22],
      },
      {
        mesh: accentMesh,
        position: [center, trailHeightAt(z) + 2.45, z],
        scale: [width * 2.1, 0.16, 0.16],
      },
    );
  }

  return markers;
}

function createRocks(): SceneObject[] {
  const rocks: SceneObject[] = [];

  for (let index = 0; index < 46; index += 1) {
    const z = -6 - index * 3.4;
    const side = index % 3 === 0 ? -1 : 1;
    const center = trailCenterAt(z);
    const offset = trailWidthAt(z) + 1.1 + ((index * 17) % 9) * 0.28;

    rocks.push({
      mesh: rockMesh,
      position: [center + side * offset, trailHeightAt(z) + 0.2, z],
      scale: [0.5 + (index % 4) * 0.12, 0.36, 0.42 + (index % 5) * 0.08],
      rotationY: index * 0.57,
    });
  }

  return rocks;
}

function createTrees(): SceneObject[] {
  const trees: SceneObject[] = [];

  for (let index = 0; index < 18; index += 1) {
    const z = -14 - index * 8.5;
    const side = index % 4 < 2 ? -1 : 1;
    const center = trailCenterAt(z);

    trees.push({
      mesh: treeMesh,
      position: [center + side * (6.6 + (index % 3) * 0.8), trailHeightAt(z) + 1.3, z],
      scale: [1.15, 2.45 + (index % 2) * 0.45, 1.15],
      rotationY: index * 0.8,
    });
  }

  return trees;
}

function createCubeMesh(color: Vec3): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];
  const x = 0.5;
  const y = 0.5;
  const z = 0.5;

  addQuad(positions, colors, [-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z], color);
  addQuad(positions, colors, [x, -y, -z], [-x, -y, -z], [-x, y, -z], [x, y, -z], shade(color, 0.72));
  addQuad(positions, colors, [-x, y, z], [x, y, z], [x, y, -z], [-x, y, -z], shade(color, 1.14));
  addQuad(positions, colors, [-x, -y, -z], [x, -y, -z], [x, -y, z], [-x, -y, z], shade(color, 0.55));
  addQuad(positions, colors, [-x, -y, -z], [-x, -y, z], [-x, y, z], [-x, y, -z], shade(color, 0.78));
  addQuad(positions, colors, [x, -y, z], [x, -y, -z], [x, y, -z], [x, y, z], shade(color, 0.92));

  return createMesh(positions, colors);
}

function createLowPolyRockMesh(): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];
  const base: Vec3 = [0.34, 0.27, 0.22];
  const top: Vec3 = [0.58, 0.43, 0.3];

  addTriangle(positions, colors, [-0.6, -0.35, 0.45], [0.55, -0.35, 0.38], [0, 0.42, 0.04], top);
  addTriangle(positions, colors, [0.55, -0.35, 0.38], [0.45, -0.35, -0.45], [0, 0.42, 0.04], shade(base, 0.86));
  addTriangle(positions, colors, [0.45, -0.35, -0.45], [-0.5, -0.35, -0.5], [0, 0.42, 0.04], shade(base, 0.7));
  addTriangle(positions, colors, [-0.5, -0.35, -0.5], [-0.6, -0.35, 0.45], [0, 0.42, 0.04], shade(base, 0.78));
  addQuad(positions, colors, [-0.6, -0.35, 0.45], [-0.5, -0.35, -0.5], [0.45, -0.35, -0.45], [0.55, -0.35, 0.38], shade(base, 0.5));

  return createMesh(positions, colors);
}

function createPyramidMesh(color: Vec3): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];

  addTriangle(positions, colors, [-0.55, -0.5, 0.55], [0.55, -0.5, 0.55], [0, 0.6, 0], color);
  addTriangle(positions, colors, [0.55, -0.5, 0.55], [0.55, -0.5, -0.55], [0, 0.6, 0], shade(color, 0.82));
  addTriangle(positions, colors, [0.55, -0.5, -0.55], [-0.55, -0.5, -0.55], [0, 0.6, 0], shade(color, 0.68));
  addTriangle(positions, colors, [-0.55, -0.5, -0.55], [-0.55, -0.5, 0.55], [0, 0.6, 0], shade(color, 0.76));

  return createMesh(positions, colors);
}

function createMesh(positions: number[], colors: number[]): Mesh {
  const positionBuffer = requiredBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colorBuffer = requiredBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return {
    positionBuffer,
    colorBuffer,
    vertexCount: positions.length / 3,
  };
}

function addQuad(
  positions: number[],
  colors: number[],
  a: Vec3,
  b: Vec3,
  c: Vec3,
  d: Vec3,
  color: Vec3,
): void {
  addTriangle(positions, colors, a, b, c, color);
  addTriangle(positions, colors, a, c, d, color);
}

function addTriangle(
  positions: number[],
  colors: number[],
  a: Vec3,
  b: Vec3,
  c: Vec3,
  color: Vec3,
): void {
  positions.push(...a, ...b, ...c);
  colors.push(...color, ...color, ...color);
}

function createShader(type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Unable to create shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) ?? "Unknown shader compile error.";
    gl.deleteShader(shader);
    throw new Error(info);
  }

  return shader;
}

function createProgram(vertexSource: string, fragmentSource: string): WebGLProgram {
  const linkedProgram = gl.createProgram();

  if (!linkedProgram) {
    throw new Error("Unable to create WebGL program.");
  }

  gl.attachShader(linkedProgram, createShader(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(linkedProgram, createShader(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(linkedProgram);

  if (!gl.getProgramParameter(linkedProgram, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(linkedProgram) ?? "Unknown program link error.";
    gl.deleteProgram(linkedProgram);
    throw new Error(info);
  }

  return linkedProgram;
}

function requiredUniform(
  linkedProgram: WebGLProgram,
  name: string,
): WebGLUniformLocation {
  const location = gl.getUniformLocation(linkedProgram, name);

  if (!location) {
    throw new Error(`Missing uniform: ${name}`);
  }

  return location;
}

function requiredBuffer(): WebGLBuffer {
  const buffer = gl.createBuffer();

  if (!buffer) {
    throw new Error("Unable to create WebGL buffer.");
  }

  return buffer;
}

function trailHeightAt(z: number): number {
  return z * 0.095 + Math.sin(z * 0.09) * 0.22;
}

function trailCenterAt(z: number): number {
  const depth = clamp(-z / TRAIL_LENGTH, 0, 1);

  return Math.sin(depth * Math.PI * 2.2) * 2.2 + Math.sin(depth * Math.PI * 5.1) * 0.72;
}

function trailWidthAt(z: number): number {
  const depth = clamp(-z / TRAIL_LENGTH, 0, 1);
  const base = 3.1 - depth * 0.72;
  const technicalPinch = depth > 0.62 && depth < 0.84 ? 0.52 : 0;

  return base - technicalPinch;
}

function playableLateralLimitAt(z: number): number {
  return Math.min(LATERAL_LIMIT, trailWidthAt(z) - RUNNER_EDGE_BUFFER);
}

function downhillMomentumAt(z: number): number {
  const currentHeight = trailHeightAt(z);
  const aheadHeight = trailHeightAt(z - 10);
  const drop = Math.max(0, currentHeight - aheadHeight);

  return clamp(drop * 4.2, 0.8, MAX_RUN_SPEED - BASE_RUN_SPEED);
}

function identityMat4(): Float32Array {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function modelMat4(position: Vec3, scale: Vec3, rotationY: number): Float32Array {
  const cos = Math.cos(rotationY);
  const sin = Math.sin(rotationY);

  return new Float32Array([
    cos * scale[0],
    0,
    -sin * scale[0],
    0,
    0,
    scale[1],
    0,
    0,
    sin * scale[2],
    0,
    cos * scale[2],
    0,
    position[0],
    position[1],
    position[2],
    1,
  ]);
}

function perspective(
  fovyRadians: number,
  aspect: number,
  near: number,
  far: number,
): Float32Array {
  const f = 1 / Math.tan(fovyRadians / 2);
  const rangeInv = 1 / (near - far);

  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (near + far) * rangeInv,
    -1,
    0,
    0,
    near * far * rangeInv * 2,
    0,
  ]);
}

function lookAt(eye: Vec3, center: Vec3, up: Vec3): Float32Array {
  const zAxis = normalize([
    eye[0] - center[0],
    eye[1] - center[1],
    eye[2] - center[2],
  ]);
  const xAxis = normalize(cross(up, zAxis));
  const yAxis = cross(zAxis, xAxis);

  return new Float32Array([
    xAxis[0],
    yAxis[0],
    zAxis[0],
    0,
    xAxis[1],
    yAxis[1],
    zAxis[1],
    0,
    xAxis[2],
    yAxis[2],
    zAxis[2],
    0,
    -dot(xAxis, eye),
    -dot(yAxis, eye),
    -dot(zAxis, eye),
    1,
  ]);
}

function multiplyMat4(a: Float32Array, b: Float32Array): Float32Array {
  const output = new Float32Array(16);
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[4];
  const a11 = a[5];
  const a12 = a[6];
  const a13 = a[7];
  const a20 = a[8];
  const a21 = a[9];
  const a22 = a[10];
  const a23 = a[11];
  const a30 = a[12];
  const a31 = a[13];
  const a32 = a[14];
  const a33 = a[15];
  const b00 = b[0];
  const b01 = b[1];
  const b02 = b[2];
  const b03 = b[3];
  const b10 = b[4];
  const b11 = b[5];
  const b12 = b[6];
  const b13 = b[7];
  const b20 = b[8];
  const b21 = b[9];
  const b22 = b[10];
  const b23 = b[11];
  const b30 = b[12];
  const b31 = b[13];
  const b32 = b[14];
  const b33 = b[15];

  output[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
  output[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
  output[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
  output[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
  output[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
  output[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
  output[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
  output[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
  output[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
  output[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
  output[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
  output[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
  output[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
  output[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
  output[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
  output[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

  return output;
}

function normalize(vector: Vec3): Vec3 {
  const length = Math.hypot(vector[0], vector[1], vector[2]) || 1;

  return [vector[0] / length, vector[1] / length, vector[2] / length];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function shade(color: Vec3, factor: number): Vec3 {
  return [
    clamp(color[0] * factor, 0, 1),
    clamp(color[1] * factor, 0, 1),
    clamp(color[2] * factor, 0, 1),
  ];
}

function lerpVec3(from: Vec3, to: Vec3, amount: number): Vec3 {
  return [
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  ];
}

function radians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
