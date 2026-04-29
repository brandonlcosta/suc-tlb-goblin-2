import "./styles/base.css";

// Balance tuning for the single Cal Street Heat Drop mission.
const TRAIL_LENGTH = 420;
const BASE_RUN_SPEED = 4.2;
const STEADY_MAX_RUN_SPEED = 7.8;
const MIN_RUN_SPEED = 2.1;
const MAX_RUN_SPEED = 9.2;
const BRAKE_TARGET_SPEED = 2.7;
const MOMENTUM_ACCELERATION = 3.6;
const BRAKE_DECELERATION = 7.2;
const STEER_SPEED = 4.2;
const LATERAL_LIMIT = 1.85;
const RUNNER_EDGE_BUFFER = 0.48;
const CAMERA_RESPONSE = 4.8;
const RESOURCE_MAX = 100;
const STARTING_HEAT = 24;
const STARTING_HYDRATION = 86;
const STARTING_QUAD_DAMAGE = 0;
const HEAT_PASSIVE_GAIN = 0.2;
const HEAT_EXPOSURE_GAIN = 0.58;
const HEAT_SPEED_GAIN = 0.82;
const HEAT_DOWNHILL_GAIN = 0.28;
const HEAT_LOW_HYDRATION_GAIN = 0.95;
const HYDRATION_PASSIVE_DRAIN = 0.18;
const HYDRATION_EXPOSURE_DRAIN = 0.24;
const HYDRATION_SPEED_DRAIN = 0.42;
const HYDRATION_HEAT_DRAIN = 0.22;
const QUAD_AGGRESSION_GAIN = 0.82;
const BRAKE_HEAT_RELIEF = 0.62;
const QUAD_BRAKE_RELIEF = 0.28;
const STARTING_COOLING_CHARGES = 0;
const COOLING_DURATION_SECONDS = 13;
const COOLING_HEAT_GAIN_MULTIPLIER = 0.28;
const COOLING_HEAT_DROP_PER_SECOND = 1.05;
const COOLING_IMMEDIATE_HEAT_DROP = 8;
const CREW_ACTION_LIMIT = 2;
const CREW_GEL_SUPPORT_SECONDS = 92;
const CREW_CALM_SUPPORT_SECONDS = 78;
const CREW_GEL_HYDRATION_MULTIPLIER = 0.82;
const CREW_CALM_QUAD_MULTIPLIER = 0.64;
const CREW_WATER_HEAT_DROP = 20;
const LEAVE_FAST_HEAT_PENALTY = 6;
const LEAVE_FAST_HYDRATION_PENALTY = 8;
const ROUTE_MARKER_LEAD_PROGRESS = 0.035;

const PACE_SETTINGS = {
  control: {
    label: "CONTROL",
    key: "1",
    speedMultiplier: 0.66,
    downhillMultiplier: 0.5,
    heatMultiplier: 0.58,
    hydrationMultiplier: 0.68,
    quadMultiplier: 0.46,
    maxSpeed: 5.2,
  },
  steady: {
    label: "STEADY",
    key: "2",
    speedMultiplier: 1,
    downhillMultiplier: 1,
    heatMultiplier: 1,
    hydrationMultiplier: 1,
    quadMultiplier: 1,
    maxSpeed: STEADY_MAX_RUN_SPEED,
  },
  push: {
    label: "PUSH",
    key: "3",
    speedMultiplier: 1.1,
    downhillMultiplier: 1.08,
    heatMultiplier: 1.42,
    hydrationMultiplier: 1.24,
    quadMultiplier: 1.62,
    maxSpeed: 8.5,
  },
  send: {
    label: "SEND",
    key: "4",
    speedMultiplier: 1.2,
    downhillMultiplier: 1.2,
    heatMultiplier: 1.72,
    hydrationMultiplier: 1.58,
    quadMultiplier: 2.22,
    maxSpeed: MAX_RUN_SPEED,
  },
} as const;

type PaceMode = keyof typeof PACE_SETTINGS;

const PACE_BY_KEY: Record<string, PaceMode> = {
  "1": "control",
  "2": "steady",
  "3": "push",
  "4": "send",
};

const CREW_ACTIONS = {
  refill: {
    label: "BOTTLES",
    timeCost: 14,
    shout: "Bottles full. Exposed middle. No hero miles.",
  },
  ice: {
    label: "ICE",
    timeCost: 12,
    shout: "Bandana packed. Use it before the canyon owns you.",
  },
  water: {
    label: "WATER",
    timeCost: 8,
    shout: "Water dump done. One calm minute, then furnace.",
  },
  gels: {
    label: "GELS",
    timeCost: 10,
    shout: "Gels in hand. Eat before the legs start bargaining.",
  },
  calm: {
    label: "CALM",
    timeCost: 9,
    shout: "Breathe. Control early or pay late.",
  },
} as const;

type CrewSupportAction = keyof typeof CREW_ACTIONS;

type RouteZoneKind = "mixed" | "exposed" | "technical" | "shade" | "finish";
type RouteMarkerKind = "exposed" | "technical" | "shade";

interface RouteZone {
  start: number;
  end: number;
  shortLabel: string;
  cue: string;
  kind: RouteZoneKind;
  markerKind?: RouteMarkerKind;
}

const ROUTE_ZONES: readonly RouteZone[] = [
  {
    start: 0,
    end: 0.42,
    shortLabel: "MIXED ROLL",
    cue: "CONTROL EARLY",
    kind: "mixed",
  },
  {
    start: 0.42,
    end: 0.62,
    shortLabel: "EXPOSED SHELF",
    cue: "HEAT AHEAD",
    kind: "exposed",
    markerKind: "exposed",
  },
  {
    start: 0.62,
    end: 0.74,
    shortLabel: "TECH HEAT",
    cue: "BRAKE BEFORE ROCKS",
    kind: "technical",
    markerKind: "technical",
  },
  {
    start: 0.74,
    end: 0.84,
    shortLabel: "SHADE PINCH",
    cue: "SHADE, STILL TECHNICAL",
    kind: "shade",
    markerKind: "shade",
  },
  {
    start: 0.84,
    end: 0.9,
    shortLabel: "SHADE EXIT",
    cue: "RECOVER IF ABLE",
    kind: "shade",
  },
  {
    start: 0.9,
    end: 1.01,
    shortLabel: "FINAL RUNOUT",
    cue: "NO PANIC SEND",
    kind: "finish",
  },
];

type Vec3 = [number, number, number];

type RiskLaneKind = "main" | "shade" | "rocky" | "fast" | "safe";

interface RiskLaneEffect {
  kind: RiskLaneKind;
  label: string;
  status: string;
  heatMultiplier: number;
  hydrationMultiplier: number;
  quadMultiplier: number;
  speedBonus: number;
}

interface RiskLaneCue extends RiskLaneEffect {
  start: number;
  end: number;
  minLateral: number;
  maxLateral: number;
  color: Vec3;
}

interface CoolingUseMoment {
  progress: number;
  heat: number;
}

interface DecisionStats {
  descentSeconds: number;
  paceSeconds: Record<PaceMode, number>;
  brakeSeconds: number;
  coolingUses: number;
  firstCoolingUse: CoolingUseMoment | null;
  riskLaneSeconds: Record<RiskLaneKind, number>;
}

interface ResourcePressure {
  heatChange: number;
  hydrationDrain: number;
  quadGain: number;
}

const DEFAULT_RISK_LANE: RiskLaneEffect = {
  kind: "main",
  label: "MAIN TRAIL",
  status: "MAIN TRAIL - HOLD FORM",
  heatMultiplier: 1,
  hydrationMultiplier: 1,
  quadMultiplier: 1,
  speedBonus: 0,
};

const RISK_LANE_CUES: readonly RiskLaneCue[] = [
  {
    start: 0.18,
    end: 0.32,
    minLateral: -1.75,
    maxLateral: -0.45,
    kind: "shade",
    label: "SHADE CUT",
    status: "SHADE CUT - HEAT RELIEF",
    heatMultiplier: 0.72,
    hydrationMultiplier: 0.94,
    quadMultiplier: 1.04,
    speedBonus: -0.08,
    color: [0.1, 0.32, 0.2],
  },
  {
    start: 0.43,
    end: 0.59,
    minLateral: 0.42,
    maxLateral: 1.78,
    kind: "fast",
    label: "FAST OUTSIDE",
    status: "FAST OUTSIDE - SPEED HEAT",
    heatMultiplier: 1.22,
    hydrationMultiplier: 1.08,
    quadMultiplier: 1.14,
    speedBonus: 0.52,
    color: [0.86, 0.36, 0.09],
  },
  {
    start: 0.58,
    end: 0.72,
    minLateral: -1.68,
    maxLateral: -0.3,
    kind: "rocky",
    label: "ROCKY INSIDE",
    status: "ROCKY INSIDE - QUAD TAX",
    heatMultiplier: 1.02,
    hydrationMultiplier: 1,
    quadMultiplier: 1.5,
    speedBonus: -0.16,
    color: [0.63, 0.46, 0.18],
  },
  {
    start: 0.64,
    end: 0.8,
    minLateral: -0.42,
    maxLateral: 0.48,
    kind: "safe",
    label: "SAFE CENTER",
    status: "SAFE CENTER - QUAD RELIEF",
    heatMultiplier: 0.98,
    hydrationMultiplier: 1,
    quadMultiplier: 0.74,
    speedBonus: -0.22,
    color: [0.46, 0.58, 0.27],
  },
  {
    start: 0.75,
    end: 0.88,
    minLateral: -1.62,
    maxLateral: -0.36,
    kind: "shade",
    label: "SHADE STRIP",
    status: "SHADE STRIP - HEAT RELIEF",
    heatMultiplier: 0.68,
    hydrationMultiplier: 0.9,
    quadMultiplier: 1.06,
    speedBonus: -0.12,
    color: [0.08, 0.36, 0.25],
  },
  {
    start: 0.88,
    end: 0.96,
    minLateral: 0.38,
    maxLateral: 1.54,
    kind: "fast",
    label: "EXPOSED RUNOUT",
    status: "EXPOSED RUNOUT - SPEED HEAT",
    heatMultiplier: 1.18,
    hydrationMultiplier: 1.06,
    quadMultiplier: 1.2,
    speedBonus: 0.42,
    color: [0.9, 0.42, 0.12],
  },
];

const PACE_REPORT_ORDER: readonly PaceMode[] = ["control", "steady", "push", "send"];
const PACE_REPORT_LABELS: Record<PaceMode, string> = {
  control: "CTL",
  steady: "STDY",
  push: "PUSH",
  send: "SEND",
};
const RISK_LANE_REPORT_ORDER: readonly RiskLaneKind[] = [
  "main",
  "shade",
  "rocky",
  "fast",
  "safe",
];
const RISK_LANE_REPORT_LABELS: Record<RiskLaneKind, string> = {
  main: "MAIN TRAIL",
  shade: "SHADE LINE",
  rocky: "ROCKY LINE",
  fast: "FAST/EXPOSED",
  safe: "SAFE CENTER",
};

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
  titleActive: boolean;
  routeIntelActive: boolean;
  crewActive: boolean;
  paused: boolean;
  restartConfirmationActive: boolean;
  resumeAfterRestartCancel: boolean;
  crewActionsRemaining: number;
  crewChoices: CrewSupportAction[];
  crewTimeSeconds: number;
  crewMessage: string;
  elapsedSeconds: number;
  progress: number;
  lateral: number;
  lateralVelocity: number;
  speed: number;
  paceMode: PaceMode;
  heat: number;
  hydration: number;
  quadDamage: number;
  maxHeat: number;
  lowestHydration: number;
  coolingCharges: number;
  coolingRemaining: number;
  decisionStats: DecisionStats;
  gelSupportRemaining: number;
  calmSupportRemaining: number;
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

type TouchHoldControl = keyof InputState;

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
const zoneText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-zone]"),
  "Missing zone HUD element.",
);
const laneText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-lane]"),
  "Missing lane HUD element.",
);
const paceText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-pace]"),
  "Missing pace HUD element.",
);
const timeText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-time]"),
  "Missing time HUD element.",
);
const heatText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-heat]"),
  "Missing heat HUD element.",
);
const coolingText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-cooling]"),
  "Missing cooling HUD element.",
);
const hydrationText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-hydration]"),
  "Missing hydration HUD element.",
);
const quadText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-quad]"),
  "Missing quad HUD element.",
);
const crewText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-crew]"),
  "Missing crew HUD element.",
);
const statusText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-status]"),
  "Missing status HUD element.",
);
const pressureRow = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-pressure-row]"),
  "Missing pressure readout row.",
);
const pressureHeatText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-pressure-heat]"),
  "Missing heat pressure readout.",
);
const pressureHydrationText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-pressure-hydration]"),
  "Missing hydration pressure readout.",
);
const pressureQuadText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-pressure-quad]"),
  "Missing quad pressure readout.",
);
const titleOverlay = requiredElement(
  document.querySelector<HTMLElement>("#title-overlay"),
  "Missing title overlay.",
);
const titleStartButton = requiredElement(
  document.querySelector<HTMLButtonElement>("#title-start-button"),
  "Missing title start button.",
);
const routeIntelOverlay = requiredElement(
  document.querySelector<HTMLElement>("#route-intel-overlay"),
  "Missing route intel overlay.",
);
const routeIntelContinueButton = requiredElement(
  document.querySelector<HTMLButtonElement>("#route-intel-continue-button"),
  "Missing route intel continue button.",
);
const crewOverlay = requiredElement(
  document.querySelector<HTMLElement>("#crew-overlay"),
  "Missing crew overlay.",
);
const crewMessageText = requiredElement(
  document.querySelector<HTMLElement>("[data-crew-message]"),
  "Missing crew message element.",
);
const crewCounterText = requiredElement(
  document.querySelector<HTMLElement>("[data-crew-counter]"),
  "Missing crew counter element.",
);
const crewButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-crew-action]"),
);
const reportOverlay = requiredElement(
  document.querySelector<HTMLElement>("#report-overlay"),
  "Missing report overlay.",
);
const reportResultText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-result]"),
  "Missing report result element.",
);
const reportVerdictText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-verdict]"),
  "Missing report verdict element.",
);
const reportElapsedText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-elapsed]"),
  "Missing report elapsed element.",
);
const reportMaxHeatText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-max-heat]"),
  "Missing report max heat element.",
);
const reportLowestHydrationText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-lowest-hydration]"),
  "Missing report lowest hydration element.",
);
const reportFinalQuadsText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-final-quads]"),
  "Missing report final quads element.",
);
const reportFailureText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-failure]"),
  "Missing report failure element.",
);
const reportCrewText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-crew]"),
  "Missing report crew element.",
);
const reportPaceMixText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-pace-mix]"),
  "Missing report pace mix element.",
);
const reportBrakeTimeText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-brake-time]"),
  "Missing report brake time element.",
);
const reportIceTimingText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-ice-timing]"),
  "Missing report ice timing element.",
);
const reportPrimaryLineText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-primary-line]"),
  "Missing report primary line element.",
);
const reportDisciplineText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-discipline]"),
  "Missing report discipline element.",
);
const reportRestartButton = requiredElement(
  document.querySelector<HTMLButtonElement>("#report-restart-button"),
  "Missing report restart button.",
);
const pauseButton = requiredElement(
  document.querySelector<HTMLButtonElement>("#pause-button"),
  "Missing pause button.",
);
const pauseOverlay = requiredElement(
  document.querySelector<HTMLElement>("#pause-overlay"),
  "Missing pause overlay.",
);
const resumeButton = requiredElement(
  document.querySelector<HTMLButtonElement>("#resume-button"),
  "Missing resume button.",
);
const pauseRestartButton = requiredElement(
  document.querySelector<HTMLButtonElement>("#pause-restart-button"),
  "Missing pause restart button.",
);
const restartConfirmation = requiredElement(
  document.querySelector<HTMLElement>("#restart-confirmation"),
  "Missing restart confirmation.",
);
const confirmRestartButton = requiredElement(
  document.querySelector<HTMLButtonElement>("#confirm-restart-button"),
  "Missing confirm restart button.",
);
const cancelRestartButton = requiredElement(
  document.querySelector<HTMLButtonElement>("#cancel-restart-button"),
  "Missing cancel restart button.",
);
const touchControls = requiredElement(
  document.querySelector<HTMLElement>("#touch-controls"),
  "Missing touch controls.",
);
const touchHoldButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-touch-hold]"),
);
const touchPaceButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-touch-pace]"),
);
const touchCoolingButton = requiredElement(
  document.querySelector<HTMLButtonElement>("[data-touch-cooling]"),
  "Missing touch cooling button.",
);
const touchCoolingStatus = requiredElement(
  document.querySelector<HTMLElement>("[data-touch-cooling-status]"),
  "Missing touch cooling status.",
);
const gl = requiredWebGlContext(canvas);

const vertexShaderSource = `
attribute vec3 aPosition;
attribute vec3 aColor;

uniform mat4 uModel;
uniform mat4 uViewProjection;
uniform vec3 uCameraPosition;

varying lowp vec3 vColor;
varying mediump float vDistance;

void main() {
  vec4 worldPosition = uModel * vec4(aPosition, 1.0);

  vColor = aColor;
  vDistance = distance(worldPosition.xyz, uCameraPosition);
  gl_Position = uViewProjection * worldPosition;
}
`;

const fragmentShaderSource = `
precision mediump float;

varying lowp vec3 vColor;
varying mediump float vDistance;

uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
uniform float uHeatTint;

void main() {
  float fogAmount = smoothstep(uFogNear, uFogFar, vDistance);
  float dither = (mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) - 0.5) * 0.045;
  vec3 canyonHeat = vec3(1.0, 0.31, 0.08);
  vec3 color = mix(vColor, uFogColor, fogAmount);

  color = mix(color, canyonHeat, uHeatTint);
  color += dither;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

const program = createProgram(vertexShaderSource, fragmentShaderSource);
const positionLocation = gl.getAttribLocation(program, "aPosition");
const colorLocation = gl.getAttribLocation(program, "aColor");
const modelLocation = requiredUniform(program, "uModel");
const viewProjectionLocation = requiredUniform(program, "uViewProjection");
const cameraPositionLocation = requiredUniform(program, "uCameraPosition");
const fogColorLocation = requiredUniform(program, "uFogColor");
const fogNearLocation = requiredUniform(program, "uFogNear");
const fogFarLocation = requiredUniform(program, "uFogFar");
const heatTintLocation = requiredUniform(program, "uHeatTint");

const trailMesh = createTrailMesh();
const riskLaneCueMesh = createRiskLaneCueMesh();
const terrainMesh = createTerrainMesh();
const cubeMesh = createCubeMesh([0.05, 0.045, 0.04]);
const kitMesh = createCubeMesh([0.01, 0.01, 0.01]);
const skinMesh = createCubeMesh([0.86, 0.76, 0.58]);
const accentMesh = createCubeMesh([0.57, 1, 0.24]);
const iceMesh = createCubeMesh([0.42, 0.86, 1]);
const rockMesh = createLowPolyRockMesh();
const treeMesh = createPyramidMesh([0.12, 0.18, 0.08]);
const dryGrassMesh = createPyramidMesh([0.62, 0.46, 0.16]);
const heatSignMesh = createCubeMesh([0.82, 0.16, 0.08]);
const sunMesh = createCubeMesh([0.94, 0.62, 0.18]);
const crewTableMesh = createCubeMesh([0.46, 0.28, 0.15]);
const crewCoolerMesh = createCubeMesh([0.09, 0.6, 0.82]);
const crewConeMesh = createPyramidMesh([0.96, 0.32, 0.08]);
const crewSignMesh = createCubeMesh([0.88, 0.72, 0.28]);
const finishTapeMesh = createCubeMesh([0.93, 0.9, 0.68]);
const zoneExposedMesh = createCubeMesh([0.95, 0.25, 0.08]);
const zoneTechnicalMesh = createCubeMesh([0.95, 0.73, 0.18]);
const zoneShadeMesh = createCubeMesh([0.08, 0.42, 0.25]);

const sceneObjects: SceneObject[] = [
  ...createCrewZoneObjects(),
  ...createAtmosphereObjects(),
  ...createRouteZoneMarkers(),
  ...createTrailMarkers(),
  ...createFinishLineObjects(),
  ...createRocks(),
  ...createTrees(),
];

const input: InputState = {
  left: false,
  right: false,
  brake: false,
};

const touchHoldPointerIds: Record<TouchHoldControl, number | null> = {
  left: null,
  right: null,
  brake: null,
};

let state = createInitialState();

restartButton?.addEventListener("click", requestRestart);
reportRestartButton.addEventListener("click", restart);
pauseButton.addEventListener("click", pauseRun);
resumeButton.addEventListener("click", resumeRun);
pauseRestartButton.addEventListener("click", requestRestart);
confirmRestartButton.addEventListener("click", restart);
cancelRestartButton.addEventListener("click", cancelRestartConfirmation);
titleStartButton.addEventListener("click", startMissionIntel);
routeIntelContinueButton.addEventListener("click", continueFromRouteIntel);
for (const button of crewButtons) {
  button.addEventListener("click", () => {
    const actionId = button.dataset.crewAction;

    if (actionId) {
      chooseCrewAction(actionId);
    }
  });
}
for (const button of touchHoldButtons) {
  const holdControl = button.dataset.touchHold;

  if (isTouchHoldControl(holdControl)) {
    bindTouchHoldButton(button, holdControl);
  }
}
for (const button of touchPaceButtons) {
  button.addEventListener("click", (event) => {
    const nextPace = button.dataset.touchPace;

    event.preventDefault();

    if (isDescentControlAvailable() && isPaceMode(nextPace)) {
      setPaceMode(nextPace);
    }
  });
}
touchCoolingButton.addEventListener("click", (event) => {
  event.preventDefault();
  useCooling();
});
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if ((key === "a" || key === "arrowleft") && isDescentControlAvailable()) {
    input.left = true;
    event.preventDefault();
  } else if ((key === "d" || key === "arrowright") && isDescentControlAvailable()) {
    input.right = true;
    event.preventDefault();
  } else if (
    (key === "s" || key === "arrowdown" || key === "shift") &&
    isDescentControlAvailable()
  ) {
    input.brake = true;
    event.preventDefault();
  } else if (key === " " && isDescentControlAvailable()) {
    useCooling();
    event.preventDefault();
  } else if (setPaceForKey(key)) {
    event.preventDefault();
  } else if (key === "p") {
    togglePause();
    event.preventDefault();
  } else if (key === "r") {
    requestRestart();
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

updateTitleUi();
updateRouteIntelUi();
updateCrewUi();
updatePauseUi();
updateTouchControlsUi();
requestAnimationFrame(tick);

function createInitialState(): GameState {
  const runner = runnerPositionAt(0, 0);
  const camera = desiredCameraFor(runner, 0);

  return {
    titleActive: true,
    routeIntelActive: false,
    crewActive: false,
    paused: false,
    restartConfirmationActive: false,
    resumeAfterRestartCancel: false,
    crewActionsRemaining: CREW_ACTION_LIMIT,
    crewChoices: [],
    crewTimeSeconds: 0,
    crewMessage: "Route intel: hot drop, exposed middle, no hero miles.",
    elapsedSeconds: 0,
    progress: 0,
    lateral: 0,
    lateralVelocity: 0,
    speed: 0,
    paceMode: "steady",
    heat: STARTING_HEAT,
    hydration: STARTING_HYDRATION,
    quadDamage: STARTING_QUAD_DAMAGE,
    maxHeat: STARTING_HEAT,
    lowestHydration: STARTING_HYDRATION,
    coolingCharges: STARTING_COOLING_CHARGES,
    coolingRemaining: 0,
    decisionStats: createInitialDecisionStats(),
    gelSupportRemaining: 0,
    calmSupportRemaining: 0,
    failureReason: null,
    cameraPosition: camera.position,
    cameraTarget: camera.target,
    lastTimestamp: performance.now(),
  };
}

function createInitialDecisionStats(): DecisionStats {
  return {
    descentSeconds: 0,
    paceSeconds: {
      control: 0,
      steady: 0,
      push: 0,
      send: 0,
    },
    brakeSeconds: 0,
    coolingUses: 0,
    firstCoolingUse: null,
    riskLaneSeconds: {
      main: 0,
      shade: 0,
      rocky: 0,
      fast: 0,
      safe: 0,
    },
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
  resetTouchHoldControls();
  updateTitleUi();
  updateRouteIntelUi();
  updateCrewUi();
  updatePauseUi();
  updateReportUi();
  updateTouchControlsUi();
}

function requestRestart(): void {
  if (isActiveDescentRun()) {
    openRestartConfirmation(!state.paused);
    return;
  }

  restart();
}

function pauseRun(): void {
  if (!isActiveDescentRun() || state.paused) {
    return;
  }

  state.paused = true;
  state.restartConfirmationActive = false;
  state.resumeAfterRestartCancel = false;
  resetTouchHoldControls();
  updatePauseUi();
  updateTouchControlsUi();
}

function resumeRun(): void {
  if (!state.paused || state.restartConfirmationActive) {
    return;
  }

  state.paused = false;
  state.resumeAfterRestartCancel = false;
  state.lastTimestamp = performance.now();
  resetTouchHoldControls();
  updatePauseUi();
  updateTouchControlsUi();
}

function togglePause(): void {
  if (state.restartConfirmationActive) {
    return;
  }

  if (state.paused) {
    resumeRun();
  } else {
    pauseRun();
  }
}

function openRestartConfirmation(resumeAfterCancel: boolean): void {
  state.paused = true;
  state.restartConfirmationActive = true;
  state.resumeAfterRestartCancel = resumeAfterCancel;
  resetTouchHoldControls();
  updatePauseUi();
  updateTouchControlsUi();
}

function cancelRestartConfirmation(): void {
  if (!state.restartConfirmationActive) {
    return;
  }

  const shouldResume = state.resumeAfterRestartCancel;

  state.restartConfirmationActive = false;
  state.resumeAfterRestartCancel = false;
  state.paused = shouldResume ? false : state.paused;
  state.lastTimestamp = performance.now();
  resetTouchHoldControls();
  updatePauseUi();
  updateTouchControlsUi();
}

function setPaceMode(nextPace: PaceMode): void {
  state.paceMode = nextPace;
  updateTouchControlsUi();
}

function setPaceForKey(key: string): boolean {
  if (!isDescentControlAvailable()) {
    return false;
  }

  const nextPace = PACE_BY_KEY[key];

  if (!nextPace) {
    return false;
  }

  setPaceMode(nextPace);
  return true;
}

function bindTouchHoldButton(
  button: HTMLButtonElement,
  holdControl: TouchHoldControl,
): void {
  button.addEventListener("pointerdown", (event) => {
    if (!isDescentControlAvailable()) {
      return;
    }

    event.preventDefault();
    touchHoldPointerIds[holdControl] = event.pointerId;
    button.setPointerCapture(event.pointerId);
    setTouchHoldControl(holdControl, true);
    updateTouchControlsUi();
  });

  const releaseHold = (event: PointerEvent): void => {
    if (touchHoldPointerIds[holdControl] !== event.pointerId) {
      return;
    }

    event.preventDefault();
    touchHoldPointerIds[holdControl] = null;
    setTouchHoldControl(holdControl, false);
    updateTouchControlsUi();
  };

  button.addEventListener("pointerup", releaseHold);
  button.addEventListener("pointercancel", releaseHold);
  button.addEventListener("lostpointercapture", releaseHold);
  button.addEventListener("blur", () => {
    touchHoldPointerIds[holdControl] = null;
    setTouchHoldControl(holdControl, false);
    updateTouchControlsUi();
  });
  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

function setTouchHoldControl(holdControl: TouchHoldControl, isActive: boolean): void {
  input[holdControl] = isActive;
}

function resetTouchHoldControls(): void {
  for (const holdControl of Object.keys(touchHoldPointerIds) as TouchHoldControl[]) {
    touchHoldPointerIds[holdControl] = null;
    setTouchHoldControl(holdControl, false);
  }
}

function isTouchHoldControl(
  holdControl: string | undefined,
): holdControl is TouchHoldControl {
  return holdControl === "left" || holdControl === "right" || holdControl === "brake";
}

function isPaceMode(nextPace: string | undefined): nextPace is PaceMode {
  return nextPace !== undefined && nextPace in PACE_SETTINGS;
}

function tick(timestamp: number): void {
  const deltaSeconds = Math.min((timestamp - state.lastTimestamp) / 1000, 0.08);
  state.lastTimestamp = timestamp;

  update(deltaSeconds);
  render();

  requestAnimationFrame(tick);
}

function update(deltaSeconds: number): void {
  if (state.paused) {
    return;
  }

  if (
    state.titleActive ||
    state.routeIntelActive ||
    state.crewActive ||
    isRunTerminal()
  ) {
    updateCamera(deltaSeconds);
    return;
  }

  state.elapsedSeconds += deltaSeconds;

  const runnerZ = -state.progress * TRAIL_LENGTH;
  const lateralLimit = playableLateralLimitAt(runnerZ);
  const steerDirection = Number(input.right) - Number(input.left);
  const targetVelocity = steerDirection * STEER_SPEED;
  const steeringResponse = Math.min(1, deltaSeconds * (input.brake ? 12 : 9));
  const downhillBoost = downhillMomentumAt(runnerZ);
  const pace = PACE_SETTINGS[state.paceMode];
  const riskLane = riskLaneAt(state.progress, state.lateral);
  const laneSpeedBonus = input.brake
    ? Math.min(0, riskLane.speedBonus)
    : riskLane.speedBonus;
  const unbrakedTargetSpeed = clamp(
    BASE_RUN_SPEED * pace.speedMultiplier +
      downhillBoost * pace.downhillMultiplier +
      laneSpeedBonus,
    MIN_RUN_SPEED,
    Math.min(MAX_RUN_SPEED, pace.maxSpeed + Math.max(0, laneSpeedBonus)),
  );
  const targetSpeed = input.brake
    ? Math.min(BRAKE_TARGET_SPEED, state.speed)
    : unbrakedTargetSpeed;
  const speedResponse = input.brake ? BRAKE_DECELERATION : MOMENTUM_ACCELERATION;

  recordDecisionStats(deltaSeconds, riskLane);

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
  updateCooling(deltaSeconds);

  if (state.progress >= 1 && !state.failureReason) {
    finishRun();
  }

  updateCamera(deltaSeconds);
}

function recordDecisionStats(deltaSeconds: number, riskLane: RiskLaneEffect): void {
  state.decisionStats.descentSeconds += deltaSeconds;
  state.decisionStats.paceSeconds[state.paceMode] += deltaSeconds;
  state.decisionStats.riskLaneSeconds[riskLane.kind] += deltaSeconds;

  if (input.brake) {
    state.decisionStats.brakeSeconds += deltaSeconds;
  }
}

function render(): void {
  gl.viewport(0, 0, canvas.width, canvas.height);
  const fogColor = fogColorForRun();

  gl.clearColor(fogColor[0] * 0.82, fogColor[1] * 0.9, fogColor[2] * 1.08, 1);
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
  gl.uniform3fv(cameraPositionLocation, new Float32Array(state.cameraPosition));
  gl.uniform3fv(fogColorLocation, new Float32Array(fogColor));
  gl.uniform1f(fogNearLocation, fogNearForRun());
  gl.uniform1f(fogFarLocation, fogFarForRun());
  gl.uniform1f(heatTintLocation, heatTintForRun());

  drawMesh(terrainMesh, identityMat4());
  drawMesh(trailMesh, identityMat4());
  drawMesh(riskLaneCueMesh, identityMat4());

  for (const object of sceneObjects) {
    drawMesh(
      object.mesh,
      modelMat4(object.position, object.scale, object.rotationY ?? 0),
    );
  }

  drawRunner(runner.x, runner.y, runner.z);
  updateHud();
  updateReportUi();
}

function drawRunner(x: number, groundY: number, z: number): void {
  const stride = state.paused ? 0 : Math.sin(performance.now() * 0.015) * 0.16;

  drawMesh(kitMesh, modelMat4([x, groundY + 0.95, z], [0.58, 1.08, 0.34], 0));
  drawMesh(skinMesh, modelMat4([x, groundY + 1.72, z + 0.02], [0.38, 0.38, 0.38], 0));
  drawMesh(accentMesh, modelMat4([x, groundY + 1.16, z - 0.19], [0.66, 0.13, 0.08], 0));
  drawMesh(accentMesh, modelMat4([x - 0.36, groundY + 1.02, z], [0.16, 0.7, 0.14], stride));
  drawMesh(accentMesh, modelMat4([x + 0.36, groundY + 1.02, z], [0.16, 0.7, 0.14], -stride));
  drawMesh(kitMesh, modelMat4([x - 0.2, groundY + 0.24, z], [0.18, 0.62, 0.16], -stride));
  drawMesh(kitMesh, modelMat4([x + 0.2, groundY + 0.24, z], [0.18, 0.62, 0.16], stride));

  if (isCoolingActive()) {
    drawMesh(iceMesh, modelMat4([x, groundY + 1.46, z - 0.18], [0.52, 0.14, 0.18], 0));
    drawMesh(iceMesh, modelMat4([x, groundY + 1.94, z], [0.22, 0.12, 0.22], 0));
  }
}

function updateHud(): void {
  const progress = Math.floor(state.progress * 100).toString().padStart(3, "0");
  const speed = state.speed.toFixed(1).padStart(4, "0");
  const pace = PACE_SETTINGS[state.paceMode];
  const runnerZ = -state.progress * TRAIL_LENGTH;
  const downhillBoost = downhillMomentumAt(runnerZ);

  progressText.textContent = `PROGRESS ${progress}%`;
  setRouteZoneText();
  setRiskLaneText();
  paceText.textContent = `PACE ${pace.label} / KEY ${pace.key}`;
  paceText.dataset.paceMode = state.paceMode;
  timeText.textContent = `TIME ${formatClock(state.elapsedSeconds)}`;
  setCoolingText();
  setResourceText(heatText, "HEAT", state.heat, heatLevel(state.heat));
  setResourceText(
    hydrationText,
    "HYDRATION",
    state.hydration,
    hydrationLevel(state.hydration),
  );
  setResourceText(quadText, "QUADS", state.quadDamage, quadLevel(state.quadDamage));
  setCrewText();
  gameShell.dataset.alert = shellAlertLevel();
  gameShell.dataset.cooling = coolingLevel();
  setPressureReadout(runnerZ, downhillBoost);
  statusText.textContent = statusLine(speed);
  updatePauseUi();
  updateTouchControlsUi();
}

function updateTouchControlsUi(): void {
  const controlsAvailable = isDescentControlAvailable();
  const coolingState = isCoolingActive()
    ? "active"
    : state.coolingCharges > 0
      ? "ready"
      : "spent";

  touchControls.hidden = !controlsAvailable;
  touchControls.dataset.controlState = controlsAvailable ? "active" : "inactive";

  for (const button of touchHoldButtons) {
    const holdControl = button.dataset.touchHold;
    const active =
      controlsAvailable && isTouchHoldControl(holdControl) && input[holdControl];

    button.disabled = !controlsAvailable;
    button.dataset.active = active ? "true" : "false";
    button.setAttribute("aria-pressed", active ? "true" : "false");
  }

  for (const button of touchPaceButtons) {
    const selected = button.dataset.touchPace === state.paceMode;

    button.disabled = !controlsAvailable;
    button.dataset.selected = selected ? "true" : "false";
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  }

  touchCoolingButton.disabled = !controlsAvailable || coolingState !== "ready";
  touchCoolingButton.dataset.coolingState = coolingState;

  if (coolingState === "active") {
    touchCoolingStatus.textContent = `Active ${Math.ceil(state.coolingRemaining)}s`;
    touchCoolingButton.setAttribute("aria-label", "Ice cooling active");
  } else if (coolingState === "ready") {
    touchCoolingStatus.textContent = `Tap ready ${state.coolingCharges}`;
    touchCoolingButton.setAttribute(
      "aria-label",
      `Use ice cooling, ${state.coolingCharges} charge${state.coolingCharges === 1 ? "" : "s"} ready`,
    );
  } else {
    touchCoolingStatus.textContent = "No charge";
    touchCoolingButton.setAttribute("aria-label", "Ice cooling spent");
  }
}

function isDescentControlAvailable(): boolean {
  return (
    !state.titleActive &&
    !state.routeIntelActive &&
    !state.crewActive &&
    !state.paused &&
    !state.restartConfirmationActive &&
    !isRunTerminal()
  );
}

function isActiveDescentRun(): boolean {
  return (
    !state.titleActive &&
    !state.routeIntelActive &&
    !state.crewActive &&
    !isRunTerminal()
  );
}

function updateCamera(deltaSeconds: number): void {
  const runner = runnerPositionAt(state.progress, state.lateral);
  const desired = desiredCameraFor(runner, state.lateral);
  const response = Math.min(1, deltaSeconds * CAMERA_RESPONSE);

  state.cameraPosition = lerpVec3(state.cameraPosition, desired.position, response);
  state.cameraTarget = lerpVec3(state.cameraTarget, desired.target, response);
}

function updateResources(deltaSeconds: number, runnerZ: number, downhillBoost: number): void {
  const pressure = resourcePressureAt(runnerZ, downhillBoost);

  if (state.gelSupportRemaining > 0) {
    state.gelSupportRemaining = Math.max(0, state.gelSupportRemaining - deltaSeconds);
  }

  if (state.calmSupportRemaining > 0) {
    state.calmSupportRemaining = Math.max(0, state.calmSupportRemaining - deltaSeconds);
  }

  state.heat = clamp(state.heat + pressure.heatChange * deltaSeconds, 0, RESOURCE_MAX);
  state.hydration = clamp(
    state.hydration - pressure.hydrationDrain * deltaSeconds,
    0,
    RESOURCE_MAX,
  );
  state.quadDamage = clamp(
    state.quadDamage + pressure.quadGain * deltaSeconds,
    0,
    RESOURCE_MAX,
  );
  recordRunExtremes();

  if (state.heat >= RESOURCE_MAX) {
    failRun("HEAT COLLAPSE");
  } else if (state.hydration <= 0) {
    failRun("DEHYDRATION COLLAPSE");
  } else if (state.quadDamage >= RESOURCE_MAX) {
    failRun("QUAD DAMAGE COLLAPSE");
  }
}

function resourcePressureAt(runnerZ: number, downhillBoost: number): ResourcePressure {
  const pace = PACE_SETTINGS[state.paceMode];
  const riskLane = riskLaneAt(state.progress, state.lateral);
  const exposure = exposureAt(state.progress);
  const speedPressure = speedPressureFor(state.speed);
  const downhillPressure = clamp(
    downhillBoost / (STEADY_MAX_RUN_SPEED - BASE_RUN_SPEED),
    0,
    1,
  );
  const heatPressure = state.heat / RESOURCE_MAX;
  const lowHydrationPressure = clamp((45 - state.hydration) / 45, 0, 1);
  const brakeRelief = input.brake ? BRAKE_HEAT_RELIEF : 1;
  const heatGain =
    (HEAT_PASSIVE_GAIN +
      exposure * HEAT_EXPOSURE_GAIN +
      speedPressure * HEAT_SPEED_GAIN +
      downhillPressure * HEAT_DOWNHILL_GAIN +
      lowHydrationPressure * HEAT_LOW_HYDRATION_GAIN) *
    pace.heatMultiplier *
    brakeRelief *
    riskLane.heatMultiplier;
  let hydrationDrain =
    (HYDRATION_PASSIVE_DRAIN +
      exposure * HYDRATION_EXPOSURE_DRAIN +
      speedPressure * HYDRATION_SPEED_DRAIN +
      heatPressure * HYDRATION_HEAT_DRAIN) *
    pace.hydrationMultiplier *
    riskLane.hydrationMultiplier;
  const technicalPressure = technicalPressureAt(runnerZ);
  const quadMultiplier = input.brake ? QUAD_BRAKE_RELIEF : 1;
  let quadGain =
    speedPressure *
    (0.5 + downhillPressure * 0.7 + technicalPressure * 0.45) *
    QUAD_AGGRESSION_GAIN *
    pace.quadMultiplier *
    quadMultiplier *
    riskLane.quadMultiplier;

  if (state.gelSupportRemaining > 0) {
    hydrationDrain *= CREW_GEL_HYDRATION_MULTIPLIER;
  }

  if (state.calmSupportRemaining > 0) {
    quadGain *= CREW_CALM_QUAD_MULTIPLIER;
  }

  return {
    heatChange: isCoolingActive()
      ? heatGain * COOLING_HEAT_GAIN_MULTIPLIER - COOLING_HEAT_DROP_PER_SECOND
      : heatGain,
    hydrationDrain,
    quadGain,
  };
}

function recordRunExtremes(): void {
  state.maxHeat = Math.max(state.maxHeat, state.heat);
  state.lowestHydration = Math.min(state.lowestHydration, state.hydration);
}

function failRun(reason: string): void {
  state.failureReason = reason;
  settleRunMotion();
}

function finishRun(): void {
  state.progress = 1;
  settleRunMotion();
}

function settleRunMotion(): void {
  state.speed = 0;
  state.lateralVelocity = 0;
  state.coolingRemaining = 0;
  resetTouchHoldControls();
}

function updateCooling(deltaSeconds: number): void {
  if (state.coolingRemaining <= 0) {
    return;
  }

  state.coolingRemaining = Math.max(0, state.coolingRemaining - deltaSeconds);
}

function useCooling(): void {
  if (
    !isDescentControlAvailable() ||
    state.coolingCharges <= 0 ||
    isCoolingActive()
  ) {
    return;
  }

  state.decisionStats.coolingUses += 1;
  if (!state.decisionStats.firstCoolingUse) {
    state.decisionStats.firstCoolingUse = {
      progress: state.progress,
      heat: state.heat,
    };
  }

  state.coolingCharges -= 1;
  state.coolingRemaining = COOLING_DURATION_SECONDS;
  state.heat = clamp(state.heat - COOLING_IMMEDIATE_HEAT_DROP, 0, RESOURCE_MAX);
  updateTouchControlsUi();
}

function isCoolingActive(): boolean {
  return state.coolingRemaining > 0;
}

function isRunTerminal(): boolean {
  return state.failureReason !== null || state.progress >= 1;
}

function statusLine(speed: string): string {
  const pace = PACE_SETTINGS[state.paceMode];
  const zone = routeZoneAt(state.progress);
  const riskLane = riskLaneAt(state.progress, state.lateral);

  if (state.titleActive) {
    return "TITLE READY  CAL STREET HEAT DROP";
  }

  if (state.routeIntelActive) {
    return "ROUTE INTEL OPEN  READ THE DROP BEFORE CREW";
  }

  if (state.crewActive) {
    return `ROUTE INTEL HOT DROP  ${state.crewActionsRemaining} CREW PICKS`;
  }

  if (state.restartConfirmationActive) {
    return "RESTART CONFIRMATION OPEN  RUN HELD";
  }

  if (state.paused) {
    return "PAUSED  RUN CLOCK AND RESOURCES HELD";
  }

  if (state.failureReason) {
    return `${state.failureReason} - RUN REPORT READY`;
  }

  if (state.progress >= 1) {
    return "FINISHED CAL STREET - RUN REPORT READY";
  }

  if (isCoolingActive()) {
    return `ICE ACTIVE ${Math.ceil(state.coolingRemaining)}S  ${riskLane.label}  ${speed}`;
  }

  if (state.gelSupportRemaining > 0 || state.calmSupportRemaining > 0) {
    return `${crewChoiceSummary()}  ${zone.shortLabel} ${speed}`;
  }

  if (state.heat >= 90) {
    return `CANYON HEAT CRITICAL  CONTROL NOW  ${speed}`;
  }

  if (state.hydration <= 20) {
    return `BOTTLES LOW  HEAT DEBT RISING  ${speed}`;
  }

  if (state.quadDamage >= 70) {
    return `QUADS COOKED  DESCENT TAX DUE  ${speed}`;
  }

  return `${input.brake ? "BRAKING" : pace.label} ${speed}  ${
    riskLane.kind === "main" ? zone.cue : riskLane.status
  }`;
}

function setPressureReadout(runnerZ: number, downhillBoost: number): void {
  if (!isDescentControlAvailable()) {
    pressureRow.hidden = true;
    setPressureChip(pressureHeatText, "HEAT +", "calm");
    setPressureChip(pressureHydrationText, "H2O -", "calm");
    setPressureChip(pressureQuadText, "QUAD +", "calm");
    return;
  }

  const pressure = resourcePressureAt(runnerZ, downhillBoost);
  pressureRow.hidden = false;

  if (pressure.heatChange < -0.05) {
    setPressureChip(pressureHeatText, "ICE RELIEF", "relief");
  } else {
    setPressureChip(
      pressureHeatText,
      pressureLabel("HEAT", "+", pressure.heatChange, 0.55, 1.05, 1.65),
      pressureLevel(pressure.heatChange, 0.55, 1.05, 1.65),
    );
  }

  setPressureChip(
    pressureHydrationText,
    pressureLabel("H2O", "-", pressure.hydrationDrain, 0.42, 0.72, 1.05),
    pressureLevel(pressure.hydrationDrain, 0.42, 0.72, 1.05),
  );

  if (input.brake && pressure.quadGain < 0.32) {
    setPressureChip(pressureQuadText, "BRAKE SAVING LEGS", "relief");
  } else {
    setPressureChip(
      pressureQuadText,
      pressureLabel("QUAD", "+", pressure.quadGain, 0.22, 0.55, 0.95),
      pressureLevel(pressure.quadGain, 0.22, 0.55, 0.95),
    );
  }
}

function pressureLabel(
  label: string,
  sign: string,
  value: number,
  warning: number,
  danger: number,
  critical: number,
): string {
  if (value >= critical) {
    return `${label} ${sign}${sign}${sign}`;
  }

  if (value >= danger) {
    return `${label} ${sign}${sign}`;
  }

  if (value >= warning) {
    return `${label} ${sign}`;
  }

  return `${label} =`;
}

function pressureLevel(
  value: number,
  warning: number,
  danger: number,
  critical: number,
): string {
  if (value >= critical) {
    return "critical";
  }

  if (value >= danger) {
    return "danger";
  }

  if (value >= warning) {
    return "warning";
  }

  return "calm";
}

function setPressureChip(element: HTMLElement, text: string, level: string): void {
  element.textContent = text;
  element.dataset.pressureLevel = level;
}

function setRouteZoneText(): void {
  const currentZone = routeZoneAt(state.progress);
  const nextZone = nextRouteZoneAfter(state.progress);
  const nextLabel = nextZone ? nextZone.shortLabel : "FINISH";

  zoneText.textContent = `ZONE ${currentZone.shortLabel} / NEXT ${nextLabel}`;
  zoneText.dataset.zoneKind = currentZone.kind;
}

function setRiskLaneText(): void {
  const riskLane = riskLaneAt(state.progress, state.lateral);

  laneText.textContent = `LINE ${riskLane.label}`;
  laneText.dataset.laneKind = riskLane.kind;
}

function routeZoneAt(progress: number): RouteZone {
  const clampedProgress = clamp(progress, 0, 1);

  return (
    ROUTE_ZONES.find(
      (zone) => clampedProgress >= zone.start && clampedProgress < zone.end,
    ) ?? ROUTE_ZONES[ROUTE_ZONES.length - 1]!
  );
}

function riskLaneAt(progress: number, lateral: number): RiskLaneEffect {
  const clampedProgress = clamp(progress, 0, 1);

  return (
    RISK_LANE_CUES.find(
      (cue) =>
        clampedProgress >= cue.start &&
        clampedProgress < cue.end &&
        lateral >= cue.minLateral &&
        lateral <= cue.maxLateral,
    ) ?? DEFAULT_RISK_LANE
  );
}

function nextRouteZoneAfter(progress: number): RouteZone | null {
  const currentZone = routeZoneAt(progress);

  return ROUTE_ZONES.find((zone) => zone.start > currentZone.start) ?? null;
}

function setCoolingText(): void {
  const seconds = Math.ceil(state.coolingRemaining).toString().padStart(2, "0");

  if (isCoolingActive()) {
    coolingText.textContent = `ICE ACTIVE ${seconds}`;
    coolingText.dataset.coolingLevel = "active";
    return;
  }

  if (state.coolingCharges > 0) {
    coolingText.textContent = `ICE READY ${state.coolingCharges}`;
    coolingText.dataset.coolingLevel = "ready";
    return;
  }

  coolingText.textContent = "ICE SPENT";
  coolingText.dataset.coolingLevel = "spent";
}

function setCrewText(): void {
  if (state.titleActive) {
    crewText.textContent = "TITLE";
    crewText.dataset.crewLevel = "open";
    return;
  }

  if (state.routeIntelActive) {
    crewText.textContent = "ROUTE INTEL";
    crewText.dataset.crewLevel = "open";
    return;
  }

  if (state.crewActive) {
    crewText.textContent = `CREW ${state.crewActionsRemaining} PICKS`;
    crewText.dataset.crewLevel = "open";
    return;
  }

  if (state.restartConfirmationActive) {
    crewText.textContent = "CONFIRM RESTART";
    crewText.dataset.crewLevel = "risk";
    return;
  }

  if (state.paused) {
    crewText.textContent = "PAUSED";
    crewText.dataset.crewLevel = "open";
    return;
  }

  if (state.crewChoices.length === 0) {
    crewText.textContent = "CREW LEFT FAST";
    crewText.dataset.crewLevel = "risk";
    return;
  }

  crewText.textContent = `CREW ${crewChoiceSummary()} +${formatClock(state.crewTimeSeconds)}`;
  crewText.dataset.crewLevel = "set";
}

function chooseCrewAction(actionId: string): void {
  if (state.titleActive || state.routeIntelActive || !state.crewActive) {
    return;
  }

  if (actionId === "leave") {
    const message =
      state.crewChoices.length === 0
        ? "Left fast. No bottles topped. No ice. Brave or dumb."
        : "Crew says go. No more standing around.";
    startDescent(message, true);
    return;
  }

  if (
    !isCrewSupportAction(actionId) ||
    state.crewActionsRemaining <= 0 ||
    state.crewChoices.includes(actionId)
  ) {
    return;
  }

  state.crewChoices.push(actionId);
  state.crewActionsRemaining -= 1;
  applyCrewAction(actionId);

  if (state.crewActionsRemaining <= 0) {
    startDescent("Crew limit spent. Get moving before the heat finds you.", false);
    return;
  }

  updateCrewUi();
}

function applyCrewAction(actionId: CrewSupportAction): void {
  const action = CREW_ACTIONS[actionId];

  state.elapsedSeconds += action.timeCost;
  state.crewTimeSeconds += action.timeCost;
  state.crewMessage = action.shout;

  if (actionId === "refill") {
    state.hydration = RESOURCE_MAX;
  } else if (actionId === "ice") {
    state.coolingCharges += 1;
  } else if (actionId === "water") {
    state.heat = clamp(state.heat - CREW_WATER_HEAT_DROP, 0, RESOURCE_MAX);
  } else if (actionId === "gels") {
    state.gelSupportRemaining = Math.max(
      state.gelSupportRemaining,
      CREW_GEL_SUPPORT_SECONDS,
    );
  } else if (actionId === "calm") {
    state.calmSupportRemaining = Math.max(
      state.calmSupportRemaining,
      CREW_CALM_SUPPORT_SECONDS,
    );
  }

  recordRunExtremes();
}

function startDescent(message: string, leaveFast: boolean): void {
  state.crewActive = false;
  state.crewMessage = message;
  state.speed = BASE_RUN_SPEED + (leaveFast ? 1.05 : 0);

  if (leaveFast && state.crewChoices.length === 0) {
    state.heat = clamp(state.heat + LEAVE_FAST_HEAT_PENALTY, 0, RESOURCE_MAX);
    state.hydration = clamp(
      state.hydration - LEAVE_FAST_HYDRATION_PENALTY,
      0,
      RESOURCE_MAX,
    );
    recordRunExtremes();
  }

  updateCrewUi();
}

function continueFromRouteIntel(): void {
  if (!state.routeIntelActive) {
    return;
  }

  state.routeIntelActive = false;
  state.crewActive = true;
  state.crewMessage = "Two quick crew calls. Then the canyon collects.";
  updateRouteIntelUi();
  updateCrewUi();
  updateTouchControlsUi();
}

function startMissionIntel(): void {
  if (!state.titleActive) {
    return;
  }

  state.titleActive = false;
  state.routeIntelActive = true;
  state.crewMessage = "Route intel: hot drop, exposed middle, no hero miles.";
  updateTitleUi();
  updateRouteIntelUi();
  updateCrewUi();
  updateTouchControlsUi();
}

function updateTitleUi(): void {
  titleOverlay.hidden = !state.titleActive;
}

function updateRouteIntelUi(): void {
  routeIntelOverlay.hidden = state.titleActive || !state.routeIntelActive;
}

function updateCrewUi(): void {
  crewOverlay.hidden = state.titleActive || state.routeIntelActive || !state.crewActive;
  crewMessageText.textContent = state.crewMessage;
  crewCounterText.textContent = `${state.crewActionsRemaining} crew picks available  CREW +${formatClock(
    state.crewTimeSeconds,
  )}`;

  for (const button of crewButtons) {
    const actionId = button.dataset.crewAction;
    const selected =
      actionId !== undefined &&
      isCrewSupportAction(actionId) &&
      state.crewChoices.includes(actionId);

    button.disabled =
      !state.crewActive ||
      (actionId !== "leave" && (selected || state.crewActionsRemaining <= 0));
    button.dataset.selected = selected ? "true" : "false";
  }
}

function updatePauseUi(): void {
  const activeRun = isActiveDescentRun();

  pauseButton.hidden = !activeRun || state.paused;
  pauseOverlay.hidden = !state.paused;
  restartConfirmation.hidden = !state.restartConfirmationActive;
  resumeButton.disabled = state.restartConfirmationActive;
  pauseRestartButton.disabled = state.restartConfirmationActive;
}

function isCrewSupportAction(actionId: string): actionId is CrewSupportAction {
  return actionId in CREW_ACTIONS;
}

function crewChoiceSummary(): string {
  if (state.crewChoices.length === 0) {
    return "CREW SKIPPED";
  }

  return state.crewChoices.map((choice) => CREW_ACTIONS[choice].label).join("+");
}

function updateReportUi(): void {
  reportOverlay.hidden = !isRunTerminal();

  if (!isRunTerminal()) {
    return;
  }

  const failed = state.failureReason !== null;

  reportResultText.textContent = failed ? "FAILED" : "FINISHED";
  reportResultText.dataset.reportResult = failed ? "failed" : "finished";
  reportVerdictText.textContent = verdictLine();
  reportElapsedText.textContent = formatClock(state.elapsedSeconds);
  reportMaxHeatText.textContent = formatReportValue(state.maxHeat);
  reportLowestHydrationText.textContent = formatReportValue(state.lowestHydration);
  reportFinalQuadsText.textContent = formatReportValue(state.quadDamage);
  reportFailureText.textContent = state.failureReason ?? "NONE";
  reportCrewText.textContent = crewChoiceSummary();
  reportPaceMixText.textContent = paceMixSummary();
  reportBrakeTimeText.textContent = brakeTimeSummary();
  reportIceTimingText.textContent = iceTimingSummary();
  reportPrimaryLineText.textContent = primaryLineSummary();
  reportDisciplineText.textContent = disciplineNote();
}

function paceMixSummary(): string {
  const totalSeconds = state.decisionStats.descentSeconds;

  return PACE_REPORT_ORDER.map((mode) => {
    const percent = percentOf(state.decisionStats.paceSeconds[mode], totalSeconds);

    return `${PACE_REPORT_LABELS[mode]} ${percent.toString().padStart(3, "0")}`;
  }).join(" / ");
}

function brakeTimeSummary(): string {
  const brakePercent = percentOf(
    state.decisionStats.brakeSeconds,
    state.decisionStats.descentSeconds,
  );

  return `${formatClock(state.decisionStats.brakeSeconds)} / ${brakePercent
    .toString()
    .padStart(3, "0")}%`;
}

function iceTimingSummary(): string {
  if (!state.decisionStats.firstCoolingUse) {
    return "0 uses / no ice";
  }

  const useCount = state.decisionStats.coolingUses;
  const useLabel = useCount === 1 ? "use" : "uses";
  const progress = Math.round(state.decisionStats.firstCoolingUse.progress * 100)
    .toString()
    .padStart(3, "0");
  const heat = Math.round(state.decisionStats.firstCoolingUse.heat)
    .toString()
    .padStart(3, "0");

  return `${useCount} ${useLabel} / first ${progress}% @ heat ${heat}`;
}

function primaryLineSummary(): string {
  const lineKind = primaryRiskLaneKind();
  const linePercent = percentOf(
    state.decisionStats.riskLaneSeconds[lineKind],
    state.decisionStats.descentSeconds,
  );

  return `${RISK_LANE_REPORT_LABELS[lineKind]} ${linePercent
    .toString()
    .padStart(3, "0")}%`;
}

function disciplineNote(): string {
  const totalSeconds = state.decisionStats.descentSeconds;
  const sendPercent = percentOf(state.decisionStats.paceSeconds.send, totalSeconds);
  const pushSendPercent = percentOf(
    state.decisionStats.paceSeconds.push + state.decisionStats.paceSeconds.send,
    totalSeconds,
  );
  const brakePercent = percentOf(state.decisionStats.brakeSeconds, totalSeconds);
  const fastLinePercent = percentOf(
    state.decisionStats.riskLaneSeconds.fast,
    totalSeconds,
  );
  const controlSteadyPercent = percentOf(
    state.decisionStats.paceSeconds.control + state.decisionStats.paceSeconds.steady,
    totalSeconds,
  );
  const firstIce = state.decisionStats.firstCoolingUse;

  if (sendPercent >= 28) {
    return "Discipline note: SEND got too much oxygen. Control the early drop.";
  }

  if (pushSendPercent >= 52) {
    return "Discipline note: Risk pace dominated. Buy the finish before buying speed.";
  }

  if (totalSeconds >= 20 && brakePercent <= 3) {
    return "Discipline note: Almost no braking. The descent was driving you.";
  }

  if (!firstIce && state.maxHeat >= 78) {
    return "Discipline note: No ice used while heat climbed. Cool before redline.";
  }

  if (firstIce && (firstIce.progress >= 0.68 || firstIce.heat >= 84)) {
    return "Discipline note: Ice came late. Spend cooling before critical heat.";
  }

  if (fastLinePercent >= 25) {
    return "Discipline note: Fast exposed line was home base. Take shade or center sooner.";
  }

  if (controlSteadyPercent >= 76 && brakePercent >= 8 && fastLinePercent <= 18) {
    return "Discipline note: Solid restraint profile. That is how you keep a race alive.";
  }

  return "Discipline note: Mixed execution. Compare pace, brake, ice, and line before retry.";
}

function primaryRiskLaneKind(): RiskLaneKind {
  let primaryKind = RISK_LANE_REPORT_ORDER[0]!;

  for (const laneKind of RISK_LANE_REPORT_ORDER) {
    if (
      state.decisionStats.riskLaneSeconds[laneKind] >
      state.decisionStats.riskLaneSeconds[primaryKind]
    ) {
      primaryKind = laneKind;
    }
  }

  return primaryKind;
}

function percentOf(value: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

function verdictLine(): string {
  if (state.failureReason) {
    if (state.failureReason.includes("HEAT")) {
      return "Canyon tax collected.";
    }

    if (state.failureReason.includes("HYDRATION")) {
      return "Bottles ran dry. The canyon noticed.";
    }

    if (state.failureReason.includes("QUAD")) {
      return "The descent took your quads and kept the receipt.";
    }

    return "Good data. Bad execution.";
  }

  if (state.maxHeat < 70 && state.lowestHydration > 45 && state.quadDamage < 45) {
    return "Controlled the burn.";
  }

  if (state.maxHeat >= 92) {
    return "Finished cooked, but finished.";
  }

  if (state.quadDamage >= 76) {
    return "Cal Street took a chunk out of you.";
  }

  if (state.lowestHydration <= 20) {
    return "Bottles nearly gone. Not pretty. Very SUC.";
  }

  if (
    state.crewChoices.some((choice) => choice === "ice" || choice === "water") &&
    state.maxHeat < 86
  ) {
    return "Crew saved your race.";
  }

  return "You lived. Do it cleaner next time.";
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

function coolingLevel(): string {
  if (isCoolingActive()) {
    return "active";
  }

  return state.coolingCharges > 0 ? "ready" : "spent";
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

function fogColorForRun(): Vec3 {
  const heatPressure = clamp((state.heat - 45) / 55, 0, 1);
  const exposure = exposureAt(state.progress);
  const coolingRelief = isCoolingActive() ? 0.08 : 0;

  return [
    clamp(0.52 + heatPressure * 0.2 + exposure * 0.05 - coolingRelief, 0, 1),
    clamp(0.43 + exposure * 0.04 - heatPressure * 0.06, 0, 1),
    clamp(0.31 - heatPressure * 0.11 + coolingRelief * 0.8, 0, 1),
  ];
}

function fogNearForRun(): number {
  const heatPressure = clamp((state.heat - 65) / 35, 0, 1);

  return 20 - heatPressure * 4;
}

function fogFarForRun(): number {
  const heatPressure = clamp((state.heat - 65) / 35, 0, 1);

  return 58 - heatPressure * 9;
}

function heatTintForRun(): number {
  if (isCoolingActive()) {
    return 0;
  }

  return clamp((state.heat - 68) / 44, 0, 0.32);
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
    (speed - BRAKE_TARGET_SPEED) / (STEADY_MAX_RUN_SPEED - BRAKE_TARGET_SPEED),
    0,
    1.25,
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
  const trailColorA: Vec3 = [0.38, 0.23, 0.13];
  const trailColorB: Vec3 = [0.5, 0.31, 0.15];
  const exposedColor: Vec3 = [0.72, 0.39, 0.15];
  const shadeColor: Vec3 = [0.22, 0.22, 0.13];
  const technicalColor: Vec3 = [0.56, 0.43, 0.18];
  const edgeColor: Vec3 = [0.14, 0.09, 0.06];
  const shoulderColor: Vec3 = [0.35, 0.22, 0.09];

  for (let index = 0; index < segments; index += 1) {
    const nearZ = -index * (TRAIL_LENGTH / segments) + 5;
    const farZ = -(index + 1) * (TRAIL_LENGTH / segments) + 5;
    const nearCenter = trailCenterAt(nearZ);
    const farCenter = trailCenterAt(farZ);
    const nearWidth = trailWidthAt(nearZ);
    const farWidth = trailWidthAt(farZ);
    const sectionProgress = index / segments;
    const routeZone = routeZoneAt(sectionProgress);
    const color =
      routeZone.kind === "technical"
        ? technicalColor
        : routeZone.kind === "exposed"
        ? exposedColor
        : routeZone.kind === "shade" && index % 2 === 0
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

function createRiskLaneCueMesh(): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];

  for (const cue of RISK_LANE_CUES) {
    const slices = Math.max(2, Math.ceil((cue.end - cue.start) * 54));

    for (let index = 0; index < slices; index += 1) {
      const sliceStart = cue.start + ((cue.end - cue.start) * index) / slices;
      const sliceEnd =
        cue.start + ((cue.end - cue.start) * (index + 0.76)) / slices;

      addRiskLaneCueSlice(
        positions,
        colors,
        cue,
        sliceStart,
        Math.min(cue.end, sliceEnd),
        index,
      );
    }
  }

  return createMesh(positions, colors);
}

function addRiskLaneCueSlice(
  positions: number[],
  colors: number[],
  cue: RiskLaneCue,
  nearProgress: number,
  farProgress: number,
  index: number,
): void {
  const nearZ = -TRAIL_LENGTH * nearProgress;
  const farZ = -TRAIL_LENGTH * farProgress;
  const nearWidth = trailWidthAt(nearZ) - 0.16;
  const farWidth = trailWidthAt(farZ) - 0.16;
  const nearMin = clamp(cue.minLateral, -nearWidth, nearWidth);
  const nearMax = clamp(cue.maxLateral, -nearWidth, nearWidth);
  const farMin = clamp(cue.minLateral, -farWidth, farWidth);
  const farMax = clamp(cue.maxLateral, -farWidth, farWidth);

  if (nearMax <= nearMin || farMax <= farMin) {
    return;
  }

  const nearCenter = trailCenterAt(nearZ);
  const farCenter = trailCenterAt(farZ);
  const lift = 0.04 + (index % 2) * 0.004;
  const color = index % 2 === 0 ? cue.color : shade(cue.color, 0.78);

  addQuad(
    positions,
    colors,
    [nearCenter + nearMin, trailHeightAt(nearZ) + lift, nearZ],
    [nearCenter + nearMax, trailHeightAt(nearZ) + lift, nearZ],
    [farCenter + farMax, trailHeightAt(farZ) + lift, farZ],
    [farCenter + farMin, trailHeightAt(farZ) + lift, farZ],
    color,
  );
}

function createTerrainMesh(): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];
  const ground: Vec3 = [0.26, 0.2, 0.11];
  const canyonLeft: Vec3 = [0.5, 0.25, 0.12];
  const canyonRight: Vec3 = [0.62, 0.31, 0.13];
  const farFog: Vec3 = [0.58, 0.42, 0.25];
  const heatShelf: Vec3 = [0.78, 0.43, 0.13];
  const terrainEndZ = -TRAIL_LENGTH - 8;
  const terrainFarZ = -TRAIL_LENGTH - 34;
  const heatShelfStartZ = -TRAIL_LENGTH * 0.5;
  const heatShelfNearZ = -TRAIL_LENGTH * 0.57;
  const heatShelfFarZ = -TRAIL_LENGTH * 0.82;
  const heatShelfBackZ = -TRAIL_LENGTH * 0.78;

  addQuad(
    positions,
    colors,
    [-48, 0.08, 10],
    [48, 0.08, 10],
    [46, trailHeightAt(terrainEndZ), terrainEndZ],
    [-46, trailHeightAt(terrainEndZ), terrainEndZ],
    ground,
  );
  addQuad(
    positions,
    colors,
    [-8, 0.05, 8],
    [-40, 3.6, 0],
    [-36, trailHeightAt(terrainEndZ) + 8, terrainEndZ],
    [-10, trailHeightAt(terrainEndZ), terrainEndZ],
    canyonLeft,
  );
  addQuad(
    positions,
    colors,
    [8, 0.05, 8],
    [10, trailHeightAt(terrainEndZ), terrainEndZ],
    [36, trailHeightAt(terrainEndZ) + 7, terrainEndZ],
    [40, 3.1, 0],
    canyonRight,
  );
  addQuad(
    positions,
    colors,
    [-46, trailHeightAt(terrainEndZ), terrainEndZ],
    [46, trailHeightAt(terrainEndZ), terrainEndZ],
    [34, trailHeightAt(terrainFarZ) + 7, terrainFarZ],
    [-34, trailHeightAt(terrainFarZ) + 7, terrainFarZ],
    farFog,
  );
  addQuad(
    positions,
    colors,
    [-28, trailHeightAt(heatShelfStartZ) + 4.2, heatShelfStartZ],
    [-9, trailHeightAt(heatShelfNearZ) + 1.2, heatShelfNearZ],
    [-12, trailHeightAt(heatShelfFarZ) + 0.8, heatShelfFarZ],
    [-35, trailHeightAt(heatShelfBackZ) + 5.8, heatShelfBackZ],
    heatShelf,
  );

  return createMesh(positions, colors);
}

function createCrewZoneObjects(): SceneObject[] {
  const objects: SceneObject[] = [];
  const tableZ = 1.2;
  const tableCenter = trailCenterAt(tableZ) - 2.95;
  const tableY = trailHeightAt(tableZ);
  const coolerZ = -0.5;
  const coolerCenter = trailCenterAt(coolerZ) + 3.2;
  const coolerY = trailHeightAt(coolerZ);
  const signZ = -2.6;
  const signCenter = trailCenterAt(signZ);
  const signY = trailHeightAt(signZ);

  objects.push(
    {
      mesh: crewTableMesh,
      position: [tableCenter, tableY + 0.82, tableZ],
      scale: [1.95, 0.18, 0.8],
      rotationY: 0.08,
    },
    {
      mesh: crewTableMesh,
      position: [tableCenter - 0.78, tableY + 0.42, tableZ - 0.28],
      scale: [0.14, 0.7, 0.14],
      rotationY: 0.08,
    },
    {
      mesh: crewTableMesh,
      position: [tableCenter + 0.78, tableY + 0.42, tableZ - 0.28],
      scale: [0.14, 0.7, 0.14],
      rotationY: 0.08,
    },
    {
      mesh: crewTableMesh,
      position: [tableCenter - 0.78, tableY + 0.42, tableZ + 0.28],
      scale: [0.14, 0.7, 0.14],
      rotationY: 0.08,
    },
    {
      mesh: crewTableMesh,
      position: [tableCenter + 0.78, tableY + 0.42, tableZ + 0.28],
      scale: [0.14, 0.7, 0.14],
      rotationY: 0.08,
    },
    {
      mesh: iceMesh,
      position: [tableCenter - 0.38, tableY + 1.03, tableZ],
      scale: [0.42, 0.2, 0.32],
      rotationY: 0.2,
    },
    {
      mesh: accentMesh,
      position: [tableCenter + 0.42, tableY + 1.01, tableZ + 0.12],
      scale: [0.24, 0.34, 0.24],
      rotationY: 0.4,
    },
    {
      mesh: crewCoolerMesh,
      position: [coolerCenter, coolerY + 0.46, coolerZ],
      scale: [0.9, 0.72, 0.68],
      rotationY: -0.24,
    },
    {
      mesh: iceMesh,
      position: [coolerCenter, coolerY + 0.86, coolerZ],
      scale: [0.98, 0.14, 0.72],
      rotationY: -0.24,
    },
    {
      mesh: crewSignMesh,
      position: [signCenter, signY + 1.72, signZ],
      scale: [2.35, 0.7, 0.12],
    },
    {
      mesh: cubeMesh,
      position: [signCenter - 1.05, signY + 0.9, signZ],
      scale: [0.14, 1.55, 0.14],
    },
    {
      mesh: cubeMesh,
      position: [signCenter + 1.05, signY + 0.9, signZ],
      scale: [0.14, 1.55, 0.14],
    },
  );

  for (const [xOffset, z] of [
    [-2.35, 2.8],
    [2.35, 2.8],
    [-2.15, -3.7],
    [2.15, -3.7],
  ] as const) {
    const center = trailCenterAt(z);

    objects.push({
      mesh: crewConeMesh,
      position: [center + xOffset, trailHeightAt(z) + 0.42, z],
      scale: [0.42, 0.84, 0.42],
      rotationY: z,
    });
  }

  return objects;
}

function createAtmosphereObjects(): SceneObject[] {
  const objects: SceneObject[] = [];
  const signZones = [0.25, 0.49, 0.74] as const;

  objects.push({
    mesh: sunMesh,
    position: [
      12.5,
      trailHeightAt(-TRAIL_LENGTH * 0.4) + 16.8,
      -TRAIL_LENGTH * 0.4,
    ],
    scale: [3.4, 3.4, 0.08],
    rotationY: -0.3,
  });

  for (let index = 0; index < signZones.length; index += 1) {
    const z = -TRAIL_LENGTH * signZones[index];
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);
    const side = index === 1 ? 1 : -1;
    const x = center + side * (width + 0.88);
    const y = trailHeightAt(z);

    objects.push(
      {
        mesh: cubeMesh,
        position: [x, y + 0.85, z],
        scale: [0.14, 1.7, 0.14],
      },
      {
        mesh: heatSignMesh,
        position: [x + side * 0.28, y + 1.62, z],
        scale: [0.72, 0.34, 0.08],
        rotationY: side * 0.2,
      },
    );
  }

  for (let index = 0, z = -10; z > -TRAIL_LENGTH; index += 1, z -= 6.2) {
    const side = index % 2 === 0 ? -1 : 1;
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);

    objects.push({
      mesh: dryGrassMesh,
      position: [
        center + side * (width + 1.35 + (index % 3) * 0.48),
        trailHeightAt(z) + 0.36,
        z,
      ],
      scale: [0.24 + (index % 2) * 0.08, 0.72 + (index % 3) * 0.14, 0.2],
      rotationY: index * 0.6,
    });
  }

  return objects;
}

function createRouteZoneMarkers(): SceneObject[] {
  const markers: SceneObject[] = [];

  for (const zone of ROUTE_ZONES) {
    if (!zone.markerKind) {
      continue;
    }

    const markerProgress = Math.max(0.02, zone.start - ROUTE_MARKER_LEAD_PROGRESS);
    const z = -TRAIL_LENGTH * markerProgress;
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);
    const y = trailHeightAt(z);
    const mesh = routeMarkerMeshFor(zone.markerKind);
    const sideRotation = zone.markerKind === "technical" ? 0.55 : 0.18;

    markers.push(
      {
        mesh,
        position: [center - width - 0.42, y + 1.08, z],
        scale: [0.2, 2.16, 0.2],
        rotationY: -sideRotation,
      },
      {
        mesh,
        position: [center + width + 0.42, y + 1.08, z],
        scale: [0.2, 2.16, 0.2],
        rotationY: sideRotation,
      },
      {
        mesh,
        position: [center, y + 2.22, z],
        scale: [width * 2.16, 0.16, 0.18],
        rotationY: 0,
      },
      {
        mesh,
        position: [center - width * 0.48, y + 0.09, z + 0.5],
        scale: [0.92, 0.05, 0.22],
        rotationY: -0.18,
      },
      {
        mesh,
        position: [center + width * 0.48, y + 0.09, z + 0.5],
        scale: [0.92, 0.05, 0.22],
        rotationY: 0.18,
      },
    );
  }

  return markers;
}

function routeMarkerMeshFor(kind: RouteMarkerKind): Mesh {
  if (kind === "exposed") {
    return zoneExposedMesh;
  }

  if (kind === "technical") {
    return zoneTechnicalMesh;
  }

  return zoneShadeMesh;
}

function createTrailMarkers(): SceneObject[] {
  const markers: SceneObject[] = [];

  for (let index = 0, z = -8; z > -TRAIL_LENGTH; index += 1, z -= 9.5) {
    const side = index % 2 === 0 ? -1 : 1;
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);
    markers.push({
      mesh: cubeMesh,
      position: [center + side * (width + 0.55), trailHeightAt(z) + 0.58, z],
      scale: [0.16, 1.16, 0.16],
    });
  }

  for (const zone of [0.33, 0.62, 0.95]) {
    const z = -TRAIL_LENGTH * zone;
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

function createFinishLineObjects(): SceneObject[] {
  const z = -TRAIL_LENGTH;
  const center = trailCenterAt(z);
  const width = trailWidthAt(z);
  const groundY = trailHeightAt(z);

  return [
    {
      mesh: cubeMesh,
      position: [center - width - 0.36, groundY + 1.28, z],
      scale: [0.2, 2.56, 0.2],
    },
    {
      mesh: cubeMesh,
      position: [center + width + 0.36, groundY + 1.28, z],
      scale: [0.2, 2.56, 0.2],
    },
    {
      mesh: finishTapeMesh,
      position: [center, groundY + 2.5, z],
      scale: [width * 2.18, 0.16, 0.14],
    },
    {
      mesh: finishTapeMesh,
      position: [center, groundY + 0.05, z + 0.32],
      scale: [width * 1.95, 0.04, 0.46],
    },
  ];
}

function createRocks(): SceneObject[] {
  const rocks: SceneObject[] = [];

  for (let index = 0, z = -6; z > -TRAIL_LENGTH; index += 1, z -= 5) {
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

  for (let index = 0, z = -14; z > -TRAIL_LENGTH; index += 1, z -= 12.5) {
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

  return clamp(drop * 4.2, 0.8, STEADY_MAX_RUN_SPEED - BASE_RUN_SPEED);
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

function formatClock(seconds: number): string {
  const wholeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(wholeSeconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (wholeSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function formatReportValue(value: number): string {
  return `${Math.round(value).toString().padStart(3, "0")}/100`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
