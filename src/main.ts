import "./styles/base.css";

const TRAIL_LENGTH = 132;
const RUN_SPEED = 7.5;
const STEER_SPEED = 4.2;
const LATERAL_LIMIT = 2.05;

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
  lastTimestamp: number;
}

interface InputState {
  left: boolean;
  right: boolean;
}

const canvas = requiredElement(
  document.querySelector<HTMLCanvasElement>("#game-canvas"),
  "Missing game canvas.",
);
const restartButton = document.querySelector<HTMLButtonElement>("#restart-button");
const progressText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-progress]"),
  "Missing progress HUD element.",
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
  }
});

gl.useProgram(program);
gl.enableVertexAttribArray(positionLocation);
gl.enableVertexAttribArray(colorLocation);
gl.enable(gl.DEPTH_TEST);
gl.disable(gl.CULL_FACE);

requestAnimationFrame(tick);

function createInitialState(): GameState {
  return {
    progress: 0,
    lateral: 0,
    lateralVelocity: 0,
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
  const steerDirection = Number(input.right) - Number(input.left);
  const targetVelocity = steerDirection * STEER_SPEED;
  const response = Math.min(1, deltaSeconds * 9);

  state.lateralVelocity += (targetVelocity - state.lateralVelocity) * response;
  state.lateral = clamp(
    state.lateral + state.lateralVelocity * deltaSeconds,
    -LATERAL_LIMIT,
    LATERAL_LIMIT,
  );

  if (
    (state.lateral <= -LATERAL_LIMIT && state.lateralVelocity < 0) ||
    (state.lateral >= LATERAL_LIMIT && state.lateralVelocity > 0)
  ) {
    state.lateralVelocity = 0;
  }

  state.progress = Math.min(1, state.progress + (RUN_SPEED / TRAIL_LENGTH) * deltaSeconds);
}

function render(): void {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.48, 0.55, 0.64, 1);
  gl.clearDepth(1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const runnerZ = -state.progress * TRAIL_LENGTH;
  const runnerY = trailHeightAt(runnerZ);
  const runnerX = state.lateral;
  const cameraPosition: Vec3 = [
    runnerX * 0.38,
    runnerY + 4.4,
    runnerZ + 9.8,
  ];
  const cameraTarget: Vec3 = [
    runnerX * 0.28,
    runnerY + 1,
    runnerZ - 9,
  ];
  const projection = perspective(
    radians(61),
    canvas.width / canvas.height,
    0.1,
    92,
  );
  const view = lookAt(cameraPosition, cameraTarget, [0, 1, 0]);
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

  drawRunner(runnerX, runnerY, runnerZ);
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
  progressText.textContent = `PROGRESS ${progress}%`;
  statusText.textContent =
    state.progress >= 1 ? "END OF PROTOTYPE SHELL - PRESS R" : "A/D STEER  R RESTART";
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
  const segments = 28;
  const trailColorA: Vec3 = [0.43, 0.28, 0.17];
  const trailColorB: Vec3 = [0.56, 0.37, 0.2];
  const edgeColor: Vec3 = [0.22, 0.15, 0.1];

  for (let index = 0; index < segments; index += 1) {
    const nearZ = -index * (TRAIL_LENGTH / segments) + 5;
    const farZ = -(index + 1) * (TRAIL_LENGTH / segments) + 5;
    const nearWidth = 5.7 - index * 0.035;
    const farWidth = 5.7 - (index + 1) * 0.035;
    const color = index % 2 === 0 ? trailColorA : trailColorB;

    addQuad(
      positions,
      colors,
      [-nearWidth, trailHeightAt(nearZ), nearZ],
      [nearWidth, trailHeightAt(nearZ), nearZ],
      [farWidth, trailHeightAt(farZ), farZ],
      [-farWidth, trailHeightAt(farZ), farZ],
      color,
    );
    addQuad(
      positions,
      colors,
      [-nearWidth - 0.24, trailHeightAt(nearZ) + 0.015, nearZ],
      [-nearWidth, trailHeightAt(nearZ) + 0.015, nearZ],
      [-farWidth, trailHeightAt(farZ) + 0.015, farZ],
      [-farWidth - 0.24, trailHeightAt(farZ) + 0.015, farZ],
      edgeColor,
    );
    addQuad(
      positions,
      colors,
      [nearWidth, trailHeightAt(nearZ) + 0.015, nearZ],
      [nearWidth + 0.24, trailHeightAt(nearZ) + 0.015, nearZ],
      [farWidth + 0.24, trailHeightAt(farZ) + 0.015, farZ],
      [farWidth, trailHeightAt(farZ) + 0.015, farZ],
      edgeColor,
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

  addQuad(positions, colors, [-42, 0.08, 10], [42, 0.08, 10], [42, trailHeightAt(-145), -145], [-42, trailHeightAt(-145), -145], ground);
  addQuad(positions, colors, [-8, 0.05, 8], [-38, 3.6, 0], [-34, trailHeightAt(-142) + 8, -142], [-8, trailHeightAt(-142), -142], canyonLeft);
  addQuad(positions, colors, [8, 0.05, 8], [8, trailHeightAt(-142), -142], [34, trailHeightAt(-142) + 7, -142], [38, 3.1, 0], canyonRight);

  return createMesh(positions, colors);
}

function createTrailMarkers(): SceneObject[] {
  const markers: SceneObject[] = [];

  for (let index = 0; index < 12; index += 1) {
    const z = -10 - index * 10;
    const side = index % 2 === 0 ? -1 : 1;
    markers.push({
      mesh: cubeMesh,
      position: [side * 4.65, trailHeightAt(z) + 0.55, z],
      scale: [0.16, 1.1, 0.16],
    });
  }

  return markers;
}

function createRocks(): SceneObject[] {
  const rocks: SceneObject[] = [];

  for (let index = 0; index < 32; index += 1) {
    const z = -6 - index * 4.1;
    const side = index % 3 === 0 ? -1 : 1;
    const offset = 6.5 + ((index * 17) % 9) * 0.32;

    rocks.push({
      mesh: rockMesh,
      position: [side * offset, trailHeightAt(z) + 0.2, z],
      scale: [0.5 + (index % 4) * 0.12, 0.36, 0.42 + (index % 5) * 0.08],
      rotationY: index * 0.57,
    });
  }

  return rocks;
}

function createTrees(): SceneObject[] {
  const trees: SceneObject[] = [];

  for (let index = 0; index < 10; index += 1) {
    const z = -14 - index * 12;
    const side = index % 2 === 0 ? -1 : 1;

    trees.push({
      mesh: treeMesh,
      position: [side * (9.5 + (index % 3)), trailHeightAt(z) + 1.3, z],
      scale: [1.2, 2.6, 1.2],
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
  return z * 0.07;
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

function radians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
