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
const STARTING_HEAT = 22;
const STARTING_HYDRATION = 88;
const STARTING_QUAD_DAMAGE = 0;
const HEAT_PASSIVE_GAIN = 0.18;
const HEAT_EXPOSURE_GAIN = 0.54;
const HEAT_SPEED_GAIN = 0.74;
const HEAT_DOWNHILL_GAIN = 0.25;
const HEAT_LOW_HYDRATION_GAIN = 0.9;
const HYDRATION_PASSIVE_DRAIN = 0.16;
const HYDRATION_EXPOSURE_DRAIN = 0.24;
const HYDRATION_SPEED_DRAIN = 0.39;
const HYDRATION_HEAT_DRAIN = 0.22;
const QUAD_AGGRESSION_GAIN = 0.84;
const BRAKE_HEAT_RELIEF = 0.56;
const QUAD_BRAKE_RELIEF = 0.2;
const STARTING_COOLING_CHARGES = 0;
const COOLING_DURATION_SECONDS = 14;
const COOLING_HEAT_GAIN_MULTIPLIER = 0.28;
const COOLING_HEAT_DROP_PER_SECOND = 1.12;
const COOLING_IMMEDIATE_HEAT_DROP = 9;
const CREW_ACTION_LIMIT = 2;
const CREW_GEL_SUPPORT_SECONDS = 92;
const CREW_CALM_SUPPORT_SECONDS = 78;
const CREW_GEL_HYDRATION_MULTIPLIER = 0.82;
const CREW_CALM_QUAD_MULTIPLIER = 0.64;
const CREW_WATER_HEAT_DROP = 20;
const LEAVE_FAST_HEAT_PENALTY = 6;
const LEAVE_FAST_HYDRATION_PENALTY = 8;
const SECOND_AID_PROGRESS = 0.765;
const SECOND_AID_WATER_HEAT_DROP = 16;
const SECOND_AID_FUEL_SUPPORT_SECONDS = 58;
const SECOND_AID_STABILITY_SUPPORT_SECONDS = 44;
const SECOND_AID_SKIP_FINAL_PRESSURE_MULTIPLIER = 1.14;
const ROUTE_MARKER_LEAD_PROGRESS = 0.075;
const ROUTE_MARKER_CLOSE_LEAD_PROGRESS = 0.03;
const ROUTE_TRANSITION_PREVIEW_PROGRESS = 0.1;
const ROUTE_TRANSITION_CLOSE_PROGRESS = 0.035;
const RISK_LANE_PREVIEW_PROGRESS = 0.065;
const RISK_LANE_PREVIEW_CLOSE_PROGRESS = 0.025;
const RISK_LANE_APPROACH_LEAD_PROGRESS = 0.045;
const RIVER_CROSSING_START = 0.58;
const RIVER_CROSSING_END = 0.68;
const RIVER_LOG_CHECK_PROGRESS = 0.635;
const RIVER_FEEDBACK_SECONDS = 3.2;
const WATER_ROUTE_SPEED_BONUS = -2.05;
const WATER_ROUTE_MAX_SPEED = 3.55;
const WATER_DRAG_DECELERATION = 7.4;
const WATER_HEAT_RELIEF_PER_SECOND = 0.28;
const WATER_SPLASH_HEAT_DROP = 1.4;
const LOG_ROUTE_SPEED_BONUS = 0.48;
const LOG_LANE_MIN = 0.66;
const LOG_LANE_MAX = 1.52;
const LOG_CENTER = (LOG_LANE_MIN + LOG_LANE_MAX) / 2;
const LOG_BASE_CLEAN_MARGIN = 0.25;
const LOG_BRAKE_MARGIN_BONUS = 0.2;
const LOG_CONTROL_MARGIN_BONUS = 0.08;
const LOG_CLEAN_SPEED_LIMIT = 6.8;
const LOG_MISS_SPEED = 2.45;
const LOG_MISS_QUAD_PENALTY = 5.2;
const LOG_MISS_HEAT_PENALTY = 1.2;

const PACE_SETTINGS = {
  control: {
    label: "CONTROL",
    key: "1",
    speedMultiplier: 0.66,
    downhillMultiplier: 0.5,
    heatMultiplier: 0.58,
    hydrationMultiplier: 0.68,
    quadMultiplier: 0.42,
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
    heatMultiplier: 1.36,
    hydrationMultiplier: 1.24,
    quadMultiplier: 1.64,
    maxSpeed: 8.5,
  },
  send: {
    label: "SEND",
    key: "4",
    speedMultiplier: 1.2,
    downhillMultiplier: 1.2,
    heatMultiplier: 1.66,
    hydrationMultiplier: 1.58,
    quadMultiplier: 2.32,
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

const SECOND_AID_ACTIONS = {
  hydrate: {
    label: "H2O",
    timeCost: 12,
    shout: "Bottles topped. Final descent is still hot.",
  },
  ice: {
    label: "ICE",
    timeCost: 10,
    shout: "Fresh ice packed. Spend it before redline.",
  },
  water: {
    label: "WATER",
    timeCost: 7,
    shout: "Water dump bought a little headroom.",
  },
  fuel: {
    label: "FUEL",
    timeCost: 9,
    shout: "Fuel grabbed. Legs and bottles get a short break.",
  },
  skip: {
    label: "SKIP",
    timeCost: 0,
    shout: "Skipped aid. Saved time. Final push gets no mercy.",
  },
} as const;

type SecondAidAction = keyof typeof SECOND_AID_ACTIONS;

type RouteZoneKind =
  | "mixed"
  | "steep"
  | "switchback"
  | "river"
  | "uphill"
  | "aid"
  | "exposed"
  | "finish";
type RouteMarkerKind =
  | "steep"
  | "switchback"
  | "river"
  | "uphill"
  | "aid"
  | "exposed"
  | "finish";

interface RouteZone {
  start: number;
  end: number;
  shortLabel: string;
  cue: string;
  kind: RouteZoneKind;
  markerKind?: RouteMarkerKind;
  speedBonus: number;
  downhillBoostFloor: number;
  downhillBoostBonus: number;
  heatMultiplier: number;
  hydrationMultiplier: number;
  quadMultiplier: number;
  technicalPressure: number;
  exposure: number;
}

interface RouteTransitionNotice {
  zone: RouteZone;
  remainingProgress: number;
  percentText: string;
  isClose: boolean;
}

const ROUTE_ZONES: readonly RouteZone[] = [
  {
    start: 0,
    end: 0.25,
    shortLabel: "FAST ROLLOUT",
    cue: "SPEED FEELS FREE",
    kind: "mixed",
    speedBonus: 0.18,
    downhillBoostFloor: 0.95,
    downhillBoostBonus: 0.12,
    heatMultiplier: 0.94,
    hydrationMultiplier: 0.96,
    quadMultiplier: 0.86,
    technicalPressure: 0.18,
    exposure: 0.48,
  },
  {
    start: 0.25,
    end: 0.43,
    shortLabel: "STEEP DROP",
    cue: "BRAKE BEFORE GRAVITY",
    kind: "steep",
    markerKind: "steep",
    speedBonus: 0.48,
    downhillBoostFloor: 2.05,
    downhillBoostBonus: 0.62,
    heatMultiplier: 1.12,
    hydrationMultiplier: 1.05,
    quadMultiplier: 1.55,
    technicalPressure: 0.58,
    exposure: 0.82,
  },
  {
    start: 0.43,
    end: RIVER_CROSSING_START,
    shortLabel: "SWITCHBACKS",
    cue: "SET LINE BEFORE TURN",
    kind: "switchback",
    markerKind: "switchback",
    speedBonus: -0.08,
    downhillBoostFloor: 1.05,
    downhillBoostBonus: 0.05,
    heatMultiplier: 1.1,
    hydrationMultiplier: 1.03,
    quadMultiplier: 1.34,
    technicalPressure: 0.92,
    exposure: 0.74,
  },
  {
    start: RIVER_CROSSING_START,
    end: RIVER_CROSSING_END,
    shortLabel: "RIVER CROSSING",
    cue: "WATER SAFE / LOG FAST",
    kind: "river",
    markerKind: "river",
    speedBonus: -0.1,
    downhillBoostFloor: 0.62,
    downhillBoostBonus: -0.18,
    heatMultiplier: 0.94,
    hydrationMultiplier: 0.98,
    quadMultiplier: 0.9,
    technicalPressure: 0.7,
    exposure: 0.5,
  },
  {
    start: RIVER_CROSSING_END,
    end: SECOND_AID_PROGRESS,
    shortLabel: "UPHILL CHECK",
    cue: "EFFORT RISES",
    kind: "uphill",
    markerKind: "uphill",
    speedBonus: -1.18,
    downhillBoostFloor: 0,
    downhillBoostBonus: -0.34,
    heatMultiplier: 1.36,
    hydrationMultiplier: 1.18,
    quadMultiplier: 0.72,
    technicalPressure: 0.3,
    exposure: 0.9,
  },
  {
    start: SECOND_AID_PROGRESS,
    end: 0.8,
    shortLabel: "SECOND AID",
    cue: "RESET OR SKIP",
    kind: "aid",
    markerKind: "aid",
    speedBonus: -0.2,
    downhillBoostFloor: 0.4,
    downhillBoostBonus: -0.22,
    heatMultiplier: 0.88,
    hydrationMultiplier: 0.94,
    quadMultiplier: 0.84,
    technicalPressure: 0.18,
    exposure: 0.52,
  },
  {
    start: 0.8,
    end: 0.9,
    shortLabel: "HOT DESCENT",
    cue: "CURVES KEEP BITING",
    kind: "exposed",
    markerKind: "exposed",
    speedBonus: 0.2,
    downhillBoostFloor: 1.28,
    downhillBoostBonus: 0.24,
    heatMultiplier: 1.18,
    hydrationMultiplier: 1.08,
    quadMultiplier: 1.12,
    technicalPressure: 0.54,
    exposure: 0.86,
  },
  {
    start: 0.9,
    end: 1.01,
    shortLabel: "FINAL PUSH",
    cue: "NO PANIC SEND",
    kind: "finish",
    markerKind: "finish",
    speedBonus: 0.32,
    downhillBoostFloor: 1.55,
    downhillBoostBonus: 0.28,
    heatMultiplier: 1.14,
    hydrationMultiplier: 1.04,
    quadMultiplier: 1.2,
    technicalPressure: 0.5,
    exposure: 0.76,
  },
];

type Vec3 = [number, number, number];

type RiskLaneKind =
  | "main"
  | "shade"
  | "rocky"
  | "fast"
  | "safe"
  | "water"
  | "log";
type ResourceKind = "heat" | "hydration" | "quad";
type ResourceLevel = "safe" | "warning" | "danger" | "critical";
type RiverCrossingOutcome = "unreached" | "water" | "log-clean" | "log-missed";

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

interface RiskLanePreviewNotice {
  cues: readonly RiskLaneCue[];
  remainingProgress: number;
  percentText: string;
  isClose: boolean;
}

interface CoolingUseMoment {
  progress: number;
  heat: number;
}

type TerrainReportKind = "steep" | "switchback" | "uphill";

interface TerrainCostStats {
  seconds: number;
  heat: number;
  hydration: number;
  quad: number;
}

interface DecisionStats {
  descentSeconds: number;
  paceSeconds: Record<PaceMode, number>;
  brakeSeconds: number;
  coolingUses: number;
  firstCoolingUse: CoolingUseMoment | null;
  riskLaneSeconds: Record<RiskLaneKind, number>;
  terrainCosts: Record<TerrainReportKind, TerrainCostStats>;
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

const WATER_RISK_LANE: RiskLaneEffect = {
  kind: "water",
  label: "SAFE WATER",
  status: "SAFE WATER - HARD DRAG / LIGHT COOLING",
  heatMultiplier: 0.84,
  hydrationMultiplier: 0.96,
  quadMultiplier: 0.6,
  speedBonus: WATER_ROUTE_SPEED_BONUS,
};

const LOG_RISK_LANE: RiskLaneEffect = {
  kind: "log",
  label: "FAST LOG",
  status: "FAST LOG - HOLD CENTER",
  heatMultiplier: 1.02,
  hydrationMultiplier: 0.98,
  quadMultiplier: 1.28,
  speedBonus: LOG_ROUTE_SPEED_BONUS,
};

const RISK_LANE_CUES: readonly RiskLaneCue[] = [
  {
    start: 0.12,
    end: 0.24,
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
    start: 0.27,
    end: 0.42,
    minLateral: 0.42,
    maxLateral: 1.78,
    kind: "fast",
    label: "FAST OUTSIDE",
    status: "FAST OUTSIDE - SPEED HEAT",
    heatMultiplier: 1.22,
    hydrationMultiplier: 1.08,
    quadMultiplier: 1.24,
    speedBonus: 0.52,
    color: [0.86, 0.36, 0.09],
  },
  {
    start: 0.44,
    end: 0.6,
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
    start: 0.48,
    end: RIVER_CROSSING_START,
    minLateral: -0.42,
    maxLateral: 0.48,
    kind: "safe",
    label: "SAFE CENTER",
    status: "SAFE CENTER - QUAD RELIEF",
    heatMultiplier: 0.98,
    hydrationMultiplier: 1,
    quadMultiplier: 0.7,
    speedBonus: -0.22,
    color: [0.46, 0.58, 0.27],
  },
  {
    start: RIVER_CROSSING_START,
    end: RIVER_CROSSING_END,
    minLateral: -1.78,
    maxLateral: 0.52,
    ...WATER_RISK_LANE,
    color: [0.08, 0.42, 0.5],
  },
  {
    start: RIVER_CROSSING_START,
    end: RIVER_CROSSING_END,
    minLateral: LOG_LANE_MIN,
    maxLateral: LOG_LANE_MAX,
    ...LOG_RISK_LANE,
    color: [0.48, 0.28, 0.11],
  },
  {
    start: 0.73,
    end: 0.86,
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
    start: 0.86,
    end: 0.97,
    minLateral: 0.38,
    maxLateral: 1.54,
    kind: "fast",
    label: "EXPOSED RUNOUT",
    status: "EXPOSED RUNOUT - SPEED HEAT",
    heatMultiplier: 1.18,
    hydrationMultiplier: 1.06,
    quadMultiplier: 1.34,
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
  "water",
  "log",
];
const RISK_LANE_REPORT_LABELS: Record<RiskLaneKind, string> = {
  main: "MAIN TRAIL",
  shade: "SHADE LINE",
  rocky: "ROCKY LINE",
  fast: "FAST/EXPOSED",
  safe: "SAFE CENTER",
  water: "SAFE WATER",
  log: "FAST LOG",
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
  secondAidActive: boolean;
  paused: boolean;
  restartConfirmationActive: boolean;
  resumeAfterRestartCancel: boolean;
  crewActionsRemaining: number;
  crewChoices: CrewSupportAction[];
  crewTimeSeconds: number;
  crewMessage: string;
  secondAidChoice: SecondAidAction | null;
  secondAidTimeSeconds: number;
  secondAidMessage: string;
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
  riverCrossingOutcome: RiverCrossingOutcome;
  riverCrossingFeedbackSeconds: number;
  gelSupportRemaining: number;
  calmSupportRemaining: number;
  failureReason: string | null;
  heatAudioWarningLevel: number;
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
type AudioCueName =
  | "ice"
  | "heatWarning"
  | "finish"
  | "collapse"
  | "water"
  | "log"
  | "aid";
type AudioContextConstructor = new () => AudioContext;

interface AudioFeedback {
  unlock: () => void;
  play: (cueName: AudioCueName) => void;
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
const supportText = requiredElement(
  document.querySelector<HTMLElement>("[data-hud-support]"),
  "Missing support HUD element.",
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
const secondAidOverlay = requiredElement(
  document.querySelector<HTMLElement>("#second-aid-overlay"),
  "Missing second aid overlay.",
);
const secondAidMessageText = requiredElement(
  document.querySelector<HTMLElement>("[data-second-aid-message]"),
  "Missing second aid message element.",
);
const secondAidButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-second-aid-action]"),
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
const reportSecondAidText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-second-aid]"),
  "Missing report second aid element.",
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
const reportCrossingText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-crossing]"),
  "Missing report crossing element.",
);
const reportTerrainTaxText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-terrain-tax]"),
  "Missing report terrain tax element.",
);
const reportNextRunText = requiredElement(
  document.querySelector<HTMLElement>("[data-report-next-run]"),
  "Missing report next run element.",
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
  float fogBand = floor(fogAmount * 7.0) / 7.0;
  float dither = (mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) - 0.5) * 0.045;
  vec3 canyonHeat = vec3(1.0, 0.31, 0.08);
  vec3 color = mix(vColor, uFogColor, fogBand);

  color = mix(color, canyonHeat, uHeatTint);
  color += dither;
  color = floor(color * 18.0 + vec3(0.5)) / 18.0;
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
const trailAtmosphereMesh = createTrailAtmosphereMesh();
const riskLaneCueMesh = createRiskLaneCueMesh();
const riverWaterMesh = createRiverWaterMesh();
const terrainMesh = createTerrainMesh();
const cubeMesh = createCubeMesh([0.05, 0.045, 0.04]);
const kitMesh = createCubeMesh([0.01, 0.01, 0.01]);
const skinMesh = createCubeMesh([0.86, 0.76, 0.58]);
const accentMesh = createCubeMesh([0.57, 1, 0.24]);
const iceMesh = createCubeMesh([0.42, 0.86, 1]);
const runnerBibMesh = createCubeMesh([0.9, 0.86, 0.68]);
const runnerShoeMesh = createCubeMesh([0.04, 0.04, 0.035]);
const runnerShadowMesh = createCubeMesh([0.02, 0.018, 0.014]);
const rockMesh = createLowPolyRockMesh();
const wetRockMesh = createLowPolyRockMesh([0.12, 0.13, 0.11], [0.24, 0.28, 0.23]);
const treeMesh = createPyramidMesh([0.12, 0.18, 0.08]);
const dryGrassMesh = createPyramidMesh([0.62, 0.46, 0.16]);
const dustStripeMesh = createCubeMesh([0.72, 0.42, 0.14]);
const heatSignMesh = createCubeMesh([0.82, 0.16, 0.08]);
const sunMesh = createCubeMesh([0.94, 0.62, 0.18]);
const crewTableMesh = createCubeMesh([0.46, 0.28, 0.15]);
const crewCoolerMesh = createCubeMesh([0.09, 0.6, 0.82]);
const crewConeMesh = createPyramidMesh([0.96, 0.32, 0.08]);
const crewSignMesh = createCubeMesh([0.88, 0.72, 0.28]);
const crewBodyMesh = createCubeMesh([0.12, 0.15, 0.1]);
const shadeTentMesh = createPyramidMesh([0.19, 0.15, 0.09]);
const finishTapeMesh = createCubeMesh([0.93, 0.9, 0.68]);
const courseStakeMesh = createCubeMesh([0.2, 0.13, 0.07]);
const courseTapeMesh = createCubeMesh([0.95, 0.88, 0.48]);
const markerBoardMesh = createCubeMesh([0.62, 0.38, 0.16]);
const riverLogMesh = createCubeMesh([0.43, 0.22, 0.08]);
const riverFoamMesh = createCubeMesh([0.66, 0.88, 0.84]);
const zoneExposedMesh = createCubeMesh([0.95, 0.25, 0.08]);
const zoneSteepMesh = createCubeMesh([0.95, 0.25, 0.08]);
const zoneSwitchbackMesh = createCubeMesh([0.95, 0.73, 0.18]);
const zoneRiverMesh = createCubeMesh([0.08, 0.5, 0.62]);
const zoneUphillMesh = createCubeMesh([0.86, 0.12, 0.1]);
const zoneAidMesh = createCubeMesh([0.57, 1, 0.24]);

const sceneObjects: SceneObject[] = [
  ...createCrewZoneObjects(),
  ...createAtmosphereObjects(),
  ...createRouteZoneMarkers(),
  ...createRiverCrossingObjects(),
  ...createSecondAidStationObjects(),
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

const audioFeedback = createAudioFeedback();
let state = createInitialState();

window.addEventListener("pointerdown", unlockAudioFeedback, { passive: true });
window.addEventListener("keydown", unlockAudioFeedback);
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
for (const button of secondAidButtons) {
  button.addEventListener("click", () => {
    const actionId = button.dataset.secondAidAction;

    if (actionId) {
      chooseSecondAidAction(actionId);
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
updateSecondAidUi();
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
    secondAidActive: false,
    paused: false,
    restartConfirmationActive: false,
    resumeAfterRestartCancel: false,
    crewActionsRemaining: CREW_ACTION_LIMIT,
    crewChoices: [],
    crewTimeSeconds: 0,
    crewMessage: "Route intel: hot drop, exposed middle, no hero miles.",
    secondAidChoice: null,
    secondAidTimeSeconds: 0,
    secondAidMessage: "Second aid ahead. Reset fast or skip and carry it.",
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
    riverCrossingOutcome: "unreached",
    riverCrossingFeedbackSeconds: 0,
    gelSupportRemaining: 0,
    calmSupportRemaining: 0,
    failureReason: null,
    heatAudioWarningLevel: 0,
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
      water: 0,
      log: 0,
    },
    terrainCosts: {
      steep: createTerrainCostStats(),
      switchback: createTerrainCostStats(),
      uphill: createTerrainCostStats(),
    },
  };
}

function createTerrainCostStats(): TerrainCostStats {
  return {
    seconds: 0,
    heat: 0,
    hydration: 0,
    quad: 0,
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

function createAudioFeedback(): AudioFeedback {
  const audioWindow = window as Window & {
    webkitAudioContext?: AudioContextConstructor;
  };
  const AudioContextClass = window.AudioContext ?? audioWindow.webkitAudioContext;
  let audioContext: AudioContext | null = null;
  let audioUnlocked = false;
  let unavailable = !AudioContextClass;

  const getAudioContext = (): AudioContext | null => {
    if (unavailable || !AudioContextClass) {
      return null;
    }

    if (audioContext) {
      return audioContext;
    }

    try {
      audioContext = new AudioContextClass();
      return audioContext;
    } catch {
      unavailable = true;
      audioContext = null;
      return null;
    }
  };

  const unlock = (): void => {
    const context = getAudioContext();

    if (!context || context.state === "closed") {
      return;
    }

    if (context.state === "running") {
      audioUnlocked = true;
      return;
    }

    void context
      .resume()
      .then(() => {
        audioUnlocked = context.state === "running";
      })
      .catch(() => {
        audioUnlocked = false;
      });
  };

  const play = (cueName: AudioCueName): void => {
    if (!audioUnlocked) {
      return;
    }

    const context = getAudioContext();

    if (!context || context.state !== "running") {
      return;
    }

    try {
      scheduleAudioCue(context, cueName);
    } catch {
      // Audio is optional; gameplay must remain silent-safe if a device rejects a cue.
    }
  };

  return { unlock, play };
}

function unlockAudioFeedback(): void {
  audioFeedback.unlock();
}

function playAudioCue(cueName: AudioCueName): void {
  audioFeedback.play(cueName);
}

function scheduleAudioCue(audioContext: AudioContext, cueName: AudioCueName): void {
  const now = audioContext.currentTime + 0.01;

  if (cueName === "ice") {
    scheduleAudioTone(audioContext, now, 900, 0.1, "triangle", 0.034, 520);
    scheduleAudioTone(audioContext, now + 0.09, 760, 0.12, "sine", 0.026, 440);
    return;
  }

  if (cueName === "heatWarning") {
    scheduleAudioTone(audioContext, now, 420, 0.07, "square", 0.026);
    scheduleAudioTone(audioContext, now + 0.12, 360, 0.08, "square", 0.024);
    return;
  }

  if (cueName === "finish") {
    scheduleAudioTone(audioContext, now, 440, 0.08, "triangle", 0.028, 540);
    scheduleAudioTone(audioContext, now + 0.09, 620, 0.1, "triangle", 0.026, 740);
    return;
  }

  if (cueName === "water") {
    scheduleAudioTone(audioContext, now, 310, 0.08, "sine", 0.022, 210);
    scheduleAudioTone(audioContext, now + 0.06, 520, 0.07, "triangle", 0.018, 360);
    return;
  }

  if (cueName === "log") {
    scheduleAudioTone(audioContext, now, 190, 0.05, "square", 0.024, 150);
    scheduleAudioTone(audioContext, now + 0.08, 240, 0.05, "square", 0.018, 170);
    return;
  }

  if (cueName === "aid") {
    scheduleAudioTone(audioContext, now, 640, 0.06, "triangle", 0.022, 760);
    scheduleAudioTone(audioContext, now + 0.07, 360, 0.07, "sine", 0.018, 420);
    return;
  }

  scheduleAudioTone(audioContext, now, 180, 0.18, "sawtooth", 0.03, 72);
  scheduleAudioTone(audioContext, now + 0.12, 86, 0.2, "sine", 0.026, 44);
}

function scheduleAudioTone(
  audioContext: AudioContext,
  startTime: number,
  frequency: number,
  duration: number,
  oscillatorType: OscillatorType,
  peakGain: number,
  endFrequency = frequency,
): void {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const endTime = startTime + duration;

  oscillator.type = oscillatorType;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(1, endFrequency),
    endTime,
  );

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(endTime + 0.03);
}

function restart(): void {
  state = createInitialState();
  resetTouchHoldControls();
  updateTitleUi();
  updateRouteIntelUi();
  updateCrewUi();
  updateSecondAidUi();
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
    state.secondAidActive ||
    isRunTerminal()
  ) {
    updateCamera(deltaSeconds);
    return;
  }

  state.elapsedSeconds += deltaSeconds;

  const previousProgress = state.progress;
  const runnerZ = -state.progress * TRAIL_LENGTH;
  const lateralLimit = playableLateralLimitAt(runnerZ);
  const steerDirection = Number(input.right) - Number(input.left);
  const targetVelocity = steerDirection * STEER_SPEED;
  const steeringResponse = Math.min(1, deltaSeconds * (input.brake ? 12 : 9));
  const downhillBoost = downhillMomentumAt(runnerZ);
  const pace = PACE_SETTINGS[state.paceMode];
  const routeZone = routeZoneAt(state.progress);
  const riskLane = riskLaneAt(state.progress, state.lateral);
  const laneSpeedBonus = input.brake
    ? Math.min(0, riskLane.speedBonus)
    : riskLane.speedBonus;
  const routeSpeedBonus = input.brake
    ? Math.min(0, routeZone.speedBonus)
    : routeZone.speedBonus;
  const unbrakedTargetSpeed = clamp(
    BASE_RUN_SPEED * pace.speedMultiplier +
      downhillBoost * pace.downhillMultiplier +
      laneSpeedBonus +
      routeSpeedBonus,
    MIN_RUN_SPEED,
    Math.min(
      MAX_RUN_SPEED,
      riskLane.kind === "water" ? WATER_ROUTE_MAX_SPEED : MAX_RUN_SPEED,
      pace.maxSpeed + Math.max(0, laneSpeedBonus) + Math.max(0, routeSpeedBonus),
    ),
  );
  const targetSpeed = input.brake
    ? Math.min(BRAKE_TARGET_SPEED, state.speed)
    : unbrakedTargetSpeed;
  const speedResponse = input.brake
    ? BRAKE_DECELERATION
    : riskLane.kind === "water"
      ? WATER_DRAG_DECELERATION
      : MOMENTUM_ACCELERATION;

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
  updateRiverCrossing(previousProgress, deltaSeconds);

  if (shouldEnterSecondAid(previousProgress)) {
    enterSecondAid();
    updateCamera(deltaSeconds);
    return;
  }

  updateResources(deltaSeconds, runnerZ, downhillBoost);
  updateCooling(deltaSeconds);

  if (state.progress >= 1 && !state.failureReason) {
    finishRun();
  }

  updateCamera(deltaSeconds);
}

function shouldEnterSecondAid(previousProgress: number): boolean {
  return (
    state.secondAidChoice === null &&
    !state.secondAidActive &&
    !state.failureReason &&
    previousProgress < SECOND_AID_PROGRESS &&
    state.progress >= SECOND_AID_PROGRESS
  );
}

function enterSecondAid(): void {
  state.progress = SECOND_AID_PROGRESS;
  state.secondAidActive = true;
  state.secondAidMessage =
    "Second aid. One fast call before the final downhill pressure.";
  state.speed = 0;
  state.lateralVelocity = 0;
  resetTouchHoldControls();
  updateSecondAidUi();
  updatePauseUi();
  updateTouchControlsUi();
}

function recordDecisionStats(deltaSeconds: number, riskLane: RiskLaneEffect): void {
  state.decisionStats.descentSeconds += deltaSeconds;
  state.decisionStats.paceSeconds[state.paceMode] += deltaSeconds;
  state.decisionStats.riskLaneSeconds[riskLane.kind] += deltaSeconds;

  if (input.brake) {
    state.decisionStats.brakeSeconds += deltaSeconds;
  }
}

function updateRiverCrossing(previousProgress: number, deltaSeconds: number): void {
  if (state.riverCrossingFeedbackSeconds > 0) {
    state.riverCrossingFeedbackSeconds = Math.max(
      0,
      state.riverCrossingFeedbackSeconds - deltaSeconds,
    );
  }

  if (
    state.riverCrossingOutcome !== "unreached" ||
    previousProgress >= RIVER_LOG_CHECK_PROGRESS ||
    state.progress < RIVER_LOG_CHECK_PROGRESS
  ) {
    return;
  }

  if (!isInLogLane(state.lateral)) {
    state.riverCrossingOutcome = "water";
    state.riverCrossingFeedbackSeconds = RIVER_FEEDBACK_SECONDS;
    state.heat = clamp(state.heat - WATER_SPLASH_HEAT_DROP, 0, RESOURCE_MAX);
    playAudioCue("water");
    recordRunExtremes();
    return;
  }

  if (isCleanLogAttempt()) {
    state.riverCrossingOutcome = "log-clean";
    state.riverCrossingFeedbackSeconds = RIVER_FEEDBACK_SECONDS;
    playAudioCue("log");
    return;
  }

  state.riverCrossingOutcome = "log-missed";
  state.riverCrossingFeedbackSeconds = RIVER_FEEDBACK_SECONDS;
  playAudioCue("log");
  state.speed = Math.min(state.speed, LOG_MISS_SPEED);
  state.lateralVelocity *= 0.28;
  state.quadDamage = clamp(
    state.quadDamage + LOG_MISS_QUAD_PENALTY,
    0,
    RESOURCE_MAX,
  );
  state.heat = clamp(state.heat + LOG_MISS_HEAT_PENALTY, 0, RESOURCE_MAX);
  recordRunExtremes();
}

function isInRiverCrossing(progress: number): boolean {
  return progress >= RIVER_CROSSING_START && progress < RIVER_CROSSING_END;
}

function isInLogLane(lateral: number): boolean {
  return lateral >= LOG_LANE_MIN && lateral <= LOG_LANE_MAX;
}

function isCleanLogAttempt(): boolean {
  const centerDistance = Math.abs(state.lateral - LOG_CENTER);
  const paceControl =
    state.paceMode === "control"
      ? LOG_CONTROL_MARGIN_BONUS
      : state.paceMode === "steady"
        ? LOG_CONTROL_MARGIN_BONUS * 0.5
        : 0;
  const brakeControl = input.brake ? LOG_BRAKE_MARGIN_BONUS : 0;
  const speedPenalty = Math.max(0, state.speed - LOG_CLEAN_SPEED_LIMIT) * 0.04;
  const cleanMargin = Math.max(
    0.16,
    LOG_BASE_CLEAN_MARGIN + paceControl + brakeControl - speedPenalty,
  );

  return centerDistance <= cleanMargin;
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
  drawMesh(trailAtmosphereMesh, identityMat4());
  drawMesh(riverWaterMesh, identityMat4());
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
  const animationActive = isRunnerAnimationActive();
  const runnerZ = -state.progress * TRAIL_LENGTH;
  const downhillLean = input.brake
    ? 0.06
    : -0.24 *
      clamp(downhillMomentumAt(runnerZ) / 4.8 + state.speed / MAX_RUN_SPEED * 0.18, 0, 1);
  const brakeCrouch = input.brake ? 0.12 : 0;
  const wobbleIntensity = clamp((state.quadDamage - 62) / 38, 0, 1);
  const cycle = animationActive ? state.elapsedSeconds * (7.2 + state.speed * 1.15) : 0;
  const strideAmount = animationActive
    ? (0.1 + state.speed / MAX_RUN_SPEED * 0.18) * (input.brake ? 0.54 : 1)
    : 0;
  const stride = Math.sin(cycle) * strideAmount;
  const oppositeStride = -stride;
  const leftLift = Math.max(0, stride) * 0.22;
  const rightLift = Math.max(0, oppositeStride) * 0.22;
  const wobble =
    animationActive && wobbleIntensity > 0
      ? Math.sin(cycle * 0.72) * 0.08 * wobbleIntensity
      : 0;
  const stumbleDrop =
    animationActive && wobbleIntensity > 0.62
      ? Math.max(0, Math.sin(cycle * 0.54)) * 0.07 * wobbleIntensity
      : 0;
  const runnerX = x + wobble;
  const steeringYaw = clamp(state.lateralVelocity * -0.035, -0.13, 0.13);
  const wobbleYaw =
    animationActive && wobbleIntensity > 0
      ? Math.sin(cycle * 0.48) * 0.13 * wobbleIntensity
      : 0;
  const bodyYaw = steeringYaw + wobbleYaw;
  const bodyZ = z + downhillLean;
  const hipY = groundY + 0.69 - brakeCrouch * 0.55 - stumbleDrop;
  const torsoY = groundY + 1.16 - brakeCrouch - stumbleDrop;
  const headY = groundY + 1.76 - brakeCrouch * 0.72 - stumbleDrop;
  const shoulderWidth = input.brake ? 0.46 : 0.38;
  const legWidth = input.brake ? 0.24 : 0.18;
  const legHeight = input.brake ? 0.5 : 0.64;
  const armBack = input.brake ? 0.16 : 0;

  drawMesh(
    runnerShadowMesh,
    modelMat4([runnerX, groundY + 0.035, z + 0.04], [0.86, 0.035, 0.56], bodyYaw),
  );
  drawMesh(kitMesh, modelMat4([runnerX, hipY, z + 0.01], [0.54, 0.36, 0.32], bodyYaw));
  drawMesh(
    kitMesh,
    modelMat4([runnerX, torsoY, bodyZ], [0.48, 0.76, 0.3], bodyYaw),
  );
  drawMesh(
    accentMesh,
    modelMat4([runnerX, torsoY + 0.16, bodyZ + 0.19], [0.52, 0.08, 0.07], bodyYaw),
  );
  drawMesh(
    runnerBibMesh,
    modelMat4([runnerX, torsoY - 0.12, bodyZ + 0.21], [0.3, 0.22, 0.06], bodyYaw),
  );
  drawMesh(
    accentMesh,
    modelMat4([runnerX, torsoY + 0.08, bodyZ - 0.2], [0.2, 0.44, 0.06], bodyYaw),
  );
  drawMesh(
    skinMesh,
    modelMat4([runnerX, headY, bodyZ - 0.04], [0.34, 0.36, 0.34], bodyYaw),
  );
  drawMesh(
    kitMesh,
    modelMat4([runnerX, headY + 0.22, bodyZ - 0.06], [0.36, 0.12, 0.36], bodyYaw),
  );
  drawMesh(
    accentMesh,
    modelMat4([runnerX, headY + 0.2, bodyZ - 0.28], [0.28, 0.06, 0.16], bodyYaw),
  );

  drawRunnerLimb(
    accentMesh,
    [runnerX - shoulderWidth, torsoY - 0.12, bodyZ + armBack + oppositeStride * 0.56],
    [0.14, 0.6, 0.12],
    bodyYaw + oppositeStride * 0.72 - 0.12,
  );
  drawRunnerLimb(
    accentMesh,
    [runnerX + shoulderWidth, torsoY - 0.12, bodyZ + armBack + stride * 0.56],
    [0.14, 0.6, 0.12],
    bodyYaw + stride * 0.72 + 0.12,
  );
  drawRunnerLimb(
    kitMesh,
    [runnerX - legWidth, groundY + 0.34 + leftLift - brakeCrouch * 0.5, z + stride * 0.72],
    [0.16, legHeight, 0.14],
    bodyYaw + stride * 0.62,
  );
  drawRunnerLimb(
    kitMesh,
    [
      runnerX + legWidth,
      groundY + 0.34 + rightLift - brakeCrouch * 0.5,
      z + oppositeStride * 0.72,
    ],
    [0.16, legHeight, 0.14],
    bodyYaw + oppositeStride * 0.62,
  );
  drawMesh(
    runnerShoeMesh,
    modelMat4(
      [runnerX - legWidth, groundY + 0.08 + leftLift * 0.2, z + stride * 0.9 - 0.04],
      [0.26, 0.1, 0.3],
      bodyYaw,
    ),
  );
  drawMesh(
    runnerShoeMesh,
    modelMat4(
      [
        runnerX + legWidth,
        groundY + 0.08 + rightLift * 0.2,
        z + oppositeStride * 0.9 - 0.04,
      ],
      [0.26, 0.1, 0.3],
      bodyYaw,
    ),
  );

  if (isCoolingActive()) {
    drawMesh(
      iceMesh,
      modelMat4([runnerX, torsoY + 0.18, bodyZ - 0.2], [0.5, 0.12, 0.16], bodyYaw),
    );
    drawMesh(
      iceMesh,
      modelMat4([runnerX, headY + 0.06, bodyZ], [0.22, 0.1, 0.22], bodyYaw),
    );
  }
}

function drawRunnerLimb(mesh: Mesh, position: Vec3, scale: Vec3, rotationY: number): void {
  drawMesh(mesh, modelMat4(position, scale, rotationY));
}

function isRunnerAnimationActive(): boolean {
  return (
    !state.paused &&
    !state.titleActive &&
    !state.routeIntelActive &&
    !state.crewActive &&
    !state.secondAidActive &&
    !isRunTerminal()
  );
}

function updateHud(): void {
  const progress = Math.floor(state.progress * 100).toString().padStart(3, "0");
  const speed = state.speed.toFixed(1).padStart(4, "0");
  const pace = PACE_SETTINGS[state.paceMode];
  const runnerZ = -state.progress * TRAIL_LENGTH;
  const downhillBoost = downhillMomentumAt(runnerZ);

  progressText.textContent = `PROG ${progress}%`;
  setRouteZoneText();
  setRiskLaneText();
  paceText.textContent = `PACE ${pace.label}`;
  paceText.dataset.paceMode = state.paceMode;
  timeText.textContent = `TIME ${formatClock(state.elapsedSeconds)}`;
  setCoolingText();
  setResourceText(
    heatText,
    "heat",
    "HEAT",
    state.heat,
    heatLevel(state.heat),
    heatBandLabel(state.heat),
  );
  setResourceText(
    hydrationText,
    "hydration",
    "H2O",
    state.hydration,
    hydrationLevel(state.hydration),
    hydrationBandLabel(state.hydration),
  );
  setResourceText(
    quadText,
    "quad",
    "QUAD",
    state.quadDamage,
    quadLevel(state.quadDamage),
    quadBandLabel(state.quadDamage),
  );
  setCrewText();
  gameShell.dataset.alert = shellAlertLevel();
  gameShell.dataset.cooling = coolingLevel();
  setPressureReadout(runnerZ, downhillBoost);
  statusText.textContent = statusLine(speed);
  statusText.dataset.statusLevel = resourceStatusLevel();
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
    touchCoolingStatus.textContent = `Cooling ${Math.ceil(state.coolingRemaining)}s`;
    touchCoolingButton.setAttribute("aria-label", "Ice cooling active, heat relief running");
  } else if (coolingState === "ready") {
    touchCoolingStatus.textContent = `Drop heat x${state.coolingCharges}`;
    touchCoolingButton.setAttribute(
      "aria-label",
      `Use ice cooling, ${state.coolingCharges} charge${state.coolingCharges === 1 ? "" : "s"} ready`,
    );
  } else {
    touchCoolingStatus.textContent =
      state.decisionStats.coolingUses > 0 ? "Spent" : "No ice";
    touchCoolingButton.setAttribute(
      "aria-label",
      state.decisionStats.coolingUses > 0 ? "Ice cooling spent" : "No ice charge",
    );
  }
}

function isDescentControlAvailable(): boolean {
  return (
    !state.titleActive &&
    !state.routeIntelActive &&
    !state.crewActive &&
    !state.secondAidActive &&
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
    !state.secondAidActive &&
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

  recordTerrainCosts(deltaSeconds, pressure);

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
  } else {
    updateHeatAudioWarning();
  }
}

function updateHeatAudioWarning(): void {
  if (state.heat < 70) {
    state.heatAudioWarningLevel = 0;
    return;
  }

  const nextWarningLevel = state.heat >= 90 ? 2 : state.heat >= 75 ? 1 : 0;

  if (nextWarningLevel > state.heatAudioWarningLevel) {
    state.heatAudioWarningLevel = nextWarningLevel;
    playAudioCue("heatWarning");
  }
}

function resourcePressureAt(runnerZ: number, downhillBoost: number): ResourcePressure {
  const pace = PACE_SETTINGS[state.paceMode];
  const routeZone = routeZoneAt(state.progress);
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
  let heatGain =
    (HEAT_PASSIVE_GAIN +
      exposure * HEAT_EXPOSURE_GAIN +
      speedPressure * HEAT_SPEED_GAIN +
      downhillPressure * HEAT_DOWNHILL_GAIN +
      lowHydrationPressure * HEAT_LOW_HYDRATION_GAIN) *
    pace.heatMultiplier *
    brakeRelief *
    routeZone.heatMultiplier *
    riskLane.heatMultiplier;
  let hydrationDrain =
    (HYDRATION_PASSIVE_DRAIN +
      exposure * HYDRATION_EXPOSURE_DRAIN +
      speedPressure * HYDRATION_SPEED_DRAIN +
      heatPressure * HYDRATION_HEAT_DRAIN) *
    pace.hydrationMultiplier *
    routeZone.hydrationMultiplier *
    riskLane.hydrationMultiplier;
  const technicalPressure = technicalPressureAt(runnerZ);
  const quadMultiplier = input.brake ? QUAD_BRAKE_RELIEF : 1;
  let quadGain =
    speedPressure *
    (0.5 + downhillPressure * 0.7 + technicalPressure * 0.45) *
    QUAD_AGGRESSION_GAIN *
    pace.quadMultiplier *
    quadMultiplier *
    routeZone.quadMultiplier *
    riskLane.quadMultiplier;

  if (state.gelSupportRemaining > 0) {
    hydrationDrain *= CREW_GEL_HYDRATION_MULTIPLIER;
  }

  if (state.calmSupportRemaining > 0) {
    quadGain *= CREW_CALM_QUAD_MULTIPLIER;
  }

  if (state.secondAidChoice === "skip" && state.progress >= SECOND_AID_PROGRESS) {
    heatGain *= SECOND_AID_SKIP_FINAL_PRESSURE_MULTIPLIER;
    hydrationDrain *= SECOND_AID_SKIP_FINAL_PRESSURE_MULTIPLIER;
    quadGain *= SECOND_AID_SKIP_FINAL_PRESSURE_MULTIPLIER;
  }

  const heatChange =
    (isCoolingActive()
      ? heatGain * COOLING_HEAT_GAIN_MULTIPLIER - COOLING_HEAT_DROP_PER_SECOND
      : heatGain) -
    (riskLane.kind === "water" ? WATER_HEAT_RELIEF_PER_SECOND : 0);

  return {
    heatChange,
    hydrationDrain,
    quadGain,
  };
}

function recordTerrainCosts(
  deltaSeconds: number,
  pressure: ResourcePressure,
): void {
  const zoneKind = routeZoneAt(state.progress).kind;

  if (!isTerrainReportKind(zoneKind)) {
    return;
  }

  const stats = state.decisionStats.terrainCosts[zoneKind];
  stats.seconds += deltaSeconds;
  stats.heat += Math.max(0, pressure.heatChange) * deltaSeconds;
  stats.hydration += pressure.hydrationDrain * deltaSeconds;
  stats.quad += pressure.quadGain * deltaSeconds;
}

function isTerrainReportKind(kind: RouteZoneKind): kind is TerrainReportKind {
  return kind === "steep" || kind === "switchback" || kind === "uphill";
}

function recordRunExtremes(): void {
  state.maxHeat = Math.max(state.maxHeat, state.heat);
  state.lowestHydration = Math.min(state.lowestHydration, state.hydration);
}

function failRun(reason: string): void {
  if (state.failureReason) {
    return;
  }

  state.failureReason = reason;
  playAudioCue("collapse");
  settleRunMotion();
}

function finishRun(): void {
  if (state.failureReason) {
    return;
  }

  state.progress = 1;
  playAudioCue("finish");
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
  playAudioCue("ice");
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
  const transition = nextRouteTransitionAt(state.progress);
  const riskLane = riskLaneAt(state.progress, state.lateral);
  const lanePreview = nextRiskLanePreviewAt(state.progress);

  if (state.titleActive) {
    return "TITLE READY  CAL STREET HEAT DROP";
  }

  if (state.routeIntelActive) {
    return "ROUTE INTEL OPEN  READ THE DROP BEFORE CREW";
  }

  if (state.crewActive) {
    return `ROUTE INTEL HOT DROP  ${state.crewActionsRemaining} CREW PICKS`;
  }

  if (state.secondAidActive) {
    return "SECOND AID OPEN  ONE QUICK CALL BEFORE FINAL PUSH";
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

  const crossingStatus = riverCrossingStatusLine(speed);

  if (crossingStatus) {
    return crossingStatus;
  }

  const resourceWarning = resourceWarningStatusLine(speed);

  if (resourceWarning) {
    return resourceWarning;
  }

  if (isCoolingActive()) {
    if (transition && transition.remainingProgress <= ROUTE_TRANSITION_CLOSE_PROGRESS) {
      return `ICE ACTIVE ${Math.ceil(state.coolingRemaining)}S  HEAT RELIEF  ENTER ${
        transition.zone.shortLabel
      }`;
    }

    return `ICE ACTIVE ${Math.ceil(
      state.coolingRemaining,
    )}S  HEAT GAIN CUT  ${riskLane.label}  ${speed}`;
  }

  if (state.secondAidChoice === "skip" && state.progress >= SECOND_AID_PROGRESS) {
    return `AID SKIPPED - FINAL PRESSURE UP  ${zone.shortLabel} ${speed}`;
  }

  if (state.gelSupportRemaining > 0 || state.calmSupportRemaining > 0) {
    return `${activeSupportStatusLine()}  ${zone.shortLabel} ${speed}`;
  }

  if (lanePreview && riskLane.kind === "main") {
    const previewPrefix = lanePreview.isClose ? "LINE COMMIT" : "NEXT LINE";

    return `${previewPrefix} ${riskLanePreviewLabel(lanePreview)} ${
      lanePreview.percentText
    } - ${riskLanePreviewCue(lanePreview)}  ${speed}`;
  }

  if (transition && transition.remainingProgress <= ROUTE_TRANSITION_PREVIEW_PROGRESS) {
    const transitionPrefix = transition.isClose ? "ENTERING" : "UPCOMING";

    return `${transitionPrefix} ${transition.zone.shortLabel} - ${transition.zone.cue}  ${speed}`;
  }

  return `${input.brake ? "BRAKING" : pace.label} ${speed}  ${
    riskLane.kind === "main" ? zone.cue : riskLane.status
  }`;
}

function riverCrossingStatusLine(speed: string): string | null {
  if (state.riverCrossingFeedbackSeconds > 0) {
    if (state.riverCrossingOutcome === "log-missed") {
      return `LOG MISSED - SPLASHED IN  QUAD TAX  ${speed}`;
    }

    if (state.riverCrossingOutcome === "log-clean") {
      return `LOG CLEAN - FAST CROSSING HELD  ${speed}`;
    }

    if (state.riverCrossingOutcome === "water") {
      return `SAFE WATER - DRAGGED PACE / LIGHT COOLING  ${speed}`;
    }
  }

  if (!isInRiverCrossing(state.progress)) {
    return null;
  }

  const riskLane = riskLaneAt(state.progress, state.lateral);

  if (riskLane.kind === "log") {
    return `${input.brake ? "CONTROLLED" : "FAST"} LOG LINE - HOLD CENTER  ${speed}`;
  }

  return `WATER CROSSING - HARD DRAG / LIGHT COOLING  ${speed}`;
}

function activeSupportStatusLine(): string {
  const supportParts: string[] = [];

  if (state.gelSupportRemaining > 0) {
    supportParts.push(`GELS SAVING H2O ${Math.ceil(state.gelSupportRemaining)}S`);
  }

  if (state.calmSupportRemaining > 0) {
    supportParts.push(`CALM STEADY LEGS ${Math.ceil(state.calmSupportRemaining)}S`);
  }

  return supportParts.join(" / ");
}

function setPressureReadout(runnerZ: number, downhillBoost: number): void {
  if (!isDescentControlAvailable()) {
    pressureRow.hidden = true;
    setPressureChip(pressureHeatText, "HEAT +", "calm");
    setPressureChip(pressureHydrationText, "H2O -", "calm");
    setPressureChip(pressureQuadText, "QUAD +", "calm");
    setSupportChip("SUP NONE", "none");
    return;
  }

  const pressure = resourcePressureAt(runnerZ, downhillBoost);
  const riskLane = riskLaneAt(state.progress, state.lateral);
  pressureRow.hidden = false;

  if (pressure.heatChange < -0.05) {
    setPressureChip(
      pressureHeatText,
      riskLane.kind === "water" ? "WATER RELIEF" : "ICE RELIEF",
      "relief",
    );
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
    setPressureChip(pressureQuadText, "BRAKE SAVES QUAD", "relief");
  } else {
    setPressureChip(
      pressureQuadText,
      pressureLabel("QUAD", "+", pressure.quadGain, 0.28, 0.68, 1.2),
      pressureLevel(pressure.quadGain, 0.28, 0.68, 1.2),
    );
  }

  setSupportReadout();
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

function setSupportReadout(): void {
  if (state.gelSupportRemaining > 0 || state.calmSupportRemaining > 0) {
    setSupportChip(`SUP ${activeSupportSummary()}`, "active");
    return;
  }

  if (
    state.crewChoices.includes("gels") ||
    state.crewChoices.includes("calm") ||
    state.secondAidChoice === "fuel"
  ) {
    setSupportChip("SUP EXPIRED", "expired");
    return;
  }

  if (state.secondAidChoice === "skip") {
    setSupportChip("SUP AID SKIP RISK", "expired");
    return;
  }

  if (state.secondAidChoice) {
    setSupportChip(`SUP AID ${SECOND_AID_ACTIONS[state.secondAidChoice].label}`, "set");
    return;
  }

  if (state.crewChoices.length > 0) {
    setSupportChip(`SUP ${crewChoiceSummary()}`, "set");
    return;
  }

  setSupportChip("SUP NONE", "none");
}

function activeSupportSummary(): string {
  const supportParts: string[] = [];

  if (state.gelSupportRemaining > 0) {
    supportParts.push(`GELS ${Math.ceil(state.gelSupportRemaining)}S`);
  }

  if (state.calmSupportRemaining > 0) {
    supportParts.push(`CALM ${Math.ceil(state.calmSupportRemaining)}S`);
  }

  return supportParts.join(" / ");
}

function setSupportChip(text: string, level: string): void {
  supportText.textContent = text;
  supportText.dataset.supportLevel = level;
}

function setRouteZoneText(): void {
  const currentZone = routeZoneAt(state.progress);
  const transition = nextRouteTransitionAt(state.progress);

  if (transition && transition.remainingProgress <= ROUTE_TRANSITION_PREVIEW_PROGRESS) {
    const transitionPrefix = transition.isClose ? "ENTER" : "NEXT";
    zoneText.textContent = `ZONE ${currentZone.shortLabel} > ${transitionPrefix} ${
      transition.zone.shortLabel
    } ${transition.percentText}`;
    zoneText.dataset.zoneKind = transition.zone.kind;
    zoneText.dataset.zoneTransition = transition.isClose ? "close" : "preview";
    return;
  }

  const nextLabel = transition ? transition.zone.shortLabel : "FINISH";

  zoneText.textContent = `ZONE ${currentZone.shortLabel} > NEXT ${nextLabel}`;
  zoneText.dataset.zoneKind = currentZone.kind;
  zoneText.dataset.zoneTransition = "steady";
}

function setRiskLaneText(): void {
  const riskLane = riskLaneAt(state.progress, state.lateral);

  if (
    state.riverCrossingFeedbackSeconds > 0 &&
    state.riverCrossingOutcome === "log-missed"
  ) {
    laneText.textContent = "LINE LOG MISSED";
    laneText.dataset.laneKind = "log";
    return;
  }

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

  if (isInRiverCrossing(clampedProgress)) {
    return isInLogLane(lateral) ? LOG_RISK_LANE : WATER_RISK_LANE;
  }

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

function nextRouteTransitionAt(progress: number): RouteTransitionNotice | null {
  const nextZone = nextRouteZoneAfter(progress);

  if (!nextZone) {
    return null;
  }

  const remainingProgress = Math.max(0, nextZone.start - clamp(progress, 0, 1));

  return {
    zone: nextZone,
    remainingProgress,
    percentText: `${Math.max(1, Math.ceil(remainingProgress * 100))}%`,
    isClose: remainingProgress <= ROUTE_TRANSITION_CLOSE_PROGRESS,
  };
}

function nextRiskLanePreviewAt(progress: number): RiskLanePreviewNotice | null {
  const clampedProgress = clamp(progress, 0, 1);
  const nextCue = RISK_LANE_CUES.find((cue) => cue.start > clampedProgress);

  if (!nextCue) {
    return null;
  }

  const remainingProgress = nextCue.start - clampedProgress;

  if (remainingProgress > RISK_LANE_PREVIEW_PROGRESS) {
    return null;
  }

  const cues = RISK_LANE_CUES.filter(
    (cue) => Math.abs(cue.start - nextCue.start) < 0.001,
  );

  return {
    cues,
    remainingProgress,
    percentText: `${Math.max(1, Math.ceil(remainingProgress * 100))}%`,
    isClose: remainingProgress <= RISK_LANE_PREVIEW_CLOSE_PROGRESS,
  };
}

function riskLanePreviewLabel(preview: RiskLanePreviewNotice): string {
  const kinds = preview.cues.map((cue) => cue.kind);

  if (kinds.includes("water") && kinds.includes("log")) {
    return "WATER / LOG";
  }

  const [cue] = preview.cues;

  return cue?.label ?? "MAIN TRAIL";
}

function riskLanePreviewCue(preview: RiskLanePreviewNotice): string {
  const kinds = preview.cues.map((cue) => cue.kind);

  if (kinds.includes("water") && kinds.includes("log")) {
    return "SAFE LEFT / LOG RIGHT";
  }

  const cue = preview.cues[0];

  if (!cue) {
    return "HOLD FORM";
  }

  if (cue.kind === "shade") {
    return "LEFT RELIEF";
  }

  if (cue.kind === "rocky") {
    return "LEFT QUAD TAX";
  }

  if (cue.kind === "fast") {
    return "RIGHT SPEED HEAT";
  }

  if (cue.kind === "safe") {
    return "CENTER RELIEF";
  }

  if (cue.kind === "water") {
    return "SAFE DRAG";
  }

  if (cue.kind === "log") {
    return "CENTER THE LOG";
  }

  return "HOLD FORM";
}

function setCoolingText(): void {
  const seconds = Math.ceil(state.coolingRemaining).toString().padStart(2, "0");

  if (isCoolingActive()) {
    coolingText.textContent = `ICE ON ${seconds}S`;
    coolingText.dataset.coolingLevel = "active";
    return;
  }

  if (state.coolingCharges > 0) {
    coolingText.textContent = `ICE READY ${state.coolingCharges}`;
    coolingText.dataset.coolingLevel = "ready";
    return;
  }

  if (state.decisionStats.coolingUses > 0) {
    coolingText.textContent = `ICE SPENT ${state.decisionStats.coolingUses}`;
    coolingText.dataset.coolingLevel = "spent";
    return;
  }

  coolingText.textContent = "ICE EMPTY";
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

  if (state.secondAidActive) {
    crewText.textContent = "SECOND AID OPEN";
    crewText.dataset.crewLevel = "open";
    return;
  }

  if (state.restartConfirmationActive) {
    crewText.textContent = "RESTART?";
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

  if (state.secondAidChoice) {
    const crewLabel =
      state.crewChoices.length === 0
        ? "CREW FAST"
        : `CREW ${crewChoiceSummary()}`;
    crewText.textContent = `${crewLabel} / AID ${secondAidChoiceSummary()} +${formatClock(
      state.secondAidTimeSeconds,
    )}`;
    crewText.dataset.crewLevel = state.secondAidChoice === "skip" ? "risk" : "set";
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
    playAudioCue("aid");
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

  playAudioCue("aid");
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

function chooseSecondAidAction(actionId: string): void {
  if (!state.secondAidActive || !isSecondAidAction(actionId)) {
    return;
  }

  state.secondAidChoice = actionId;
  applySecondAidAction(actionId);
  state.secondAidActive = false;
  state.speed =
    actionId === "skip" ? BASE_RUN_SPEED + 0.75 : Math.max(MIN_RUN_SPEED, BASE_RUN_SPEED * 0.82);
  state.lateralVelocity = 0;
  resetTouchHoldControls();
  updateSecondAidUi();
  updatePauseUi();
  updateTouchControlsUi();
}

function applySecondAidAction(actionId: SecondAidAction): void {
  const action = SECOND_AID_ACTIONS[actionId];

  state.elapsedSeconds += action.timeCost;
  state.secondAidTimeSeconds += action.timeCost;
  state.secondAidMessage = action.shout;

  if (actionId === "hydrate") {
    state.hydration = RESOURCE_MAX;
  } else if (actionId === "ice") {
    state.coolingCharges += 1;
  } else if (actionId === "water") {
    state.heat = clamp(state.heat - SECOND_AID_WATER_HEAT_DROP, 0, RESOURCE_MAX);
  } else if (actionId === "fuel") {
    state.gelSupportRemaining = Math.max(
      state.gelSupportRemaining,
      SECOND_AID_FUEL_SUPPORT_SECONDS,
    );
    state.calmSupportRemaining = Math.max(
      state.calmSupportRemaining,
      SECOND_AID_STABILITY_SUPPORT_SECONDS,
    );
  }

  playAudioCue("aid");
  recordRunExtremes();
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
  updateSecondAidUi();
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
  updateSecondAidUi();
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

function updateSecondAidUi(): void {
  secondAidOverlay.hidden =
    state.titleActive || state.routeIntelActive || state.crewActive || !state.secondAidActive;
  secondAidMessageText.textContent = state.secondAidMessage;

  for (const button of secondAidButtons) {
    button.disabled = !state.secondAidActive;
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

function isSecondAidAction(actionId: string): actionId is SecondAidAction {
  return actionId in SECOND_AID_ACTIONS;
}

function crewChoiceSummary(): string {
  if (state.crewChoices.length === 0) {
    return "CREW SKIPPED";
  }

  return state.crewChoices.map((choice) => CREW_ACTIONS[choice].label).join("+");
}

function crewReportSummary(): string {
  if (state.crewChoices.length === 0) {
    return "CREW SKIPPED / LEFT FAST RISK";
  }

  const choiceLabels = state.crewChoices
    .map((choice) => CREW_ACTIONS[choice].label)
    .join(" + ");
  const supportLabels = state.crewChoices.map(crewSupportReportLabel);

  return `${choiceLabels} / +${formatClock(state.crewTimeSeconds)} / ${supportLabels.join(
    ", ",
  )}`;
}

function crewSupportReportLabel(choice: CrewSupportAction): string {
  if (choice === "refill") {
    return "bottles topped";
  }

  if (choice === "ice") {
    return "ice charge packed";
  }

  if (choice === "water") {
    return "water dump heat drop";
  }

  if (choice === "gels") {
    return "gel support slowed H2O drain";
  }

  return "calm support protected quads";
}

function secondAidChoiceSummary(): string {
  if (!state.secondAidChoice) {
    return "NOT REACHED";
  }

  return SECOND_AID_ACTIONS[state.secondAidChoice].label;
}

function secondAidReportSummary(): string {
  if (!state.secondAidChoice) {
    return "NOT REACHED";
  }

  const action = SECOND_AID_ACTIONS[state.secondAidChoice];

  if (state.secondAidChoice === "skip") {
    return "SKIPPED / +00:00 / final pressure up";
  }

  return `${action.label} / +${formatClock(state.secondAidTimeSeconds)} / ${secondAidSupportReportLabel(
    state.secondAidChoice,
  )}`;
}

function secondAidSupportReportLabel(choice: SecondAidAction): string {
  if (choice === "hydrate") {
    return "hydration topped before final push";
  }

  if (choice === "ice") {
    return "cooling charge reset";
  }

  if (choice === "water") {
    return "water dump heat drop";
  }

  if (choice === "fuel") {
    return "fuel support slowed H2O and steadied quads";
  }

  return "no support taken";
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
  reportCrewText.textContent = crewReportSummary();
  reportSecondAidText.textContent = secondAidReportSummary();
  reportPaceMixText.textContent = paceMixSummary();
  reportBrakeTimeText.textContent = brakeTimeSummary();
  reportIceTimingText.textContent = iceTimingSummary();
  reportPrimaryLineText.textContent = primaryLineSummary();
  reportCrossingText.textContent = crossingSummary();
  reportTerrainTaxText.textContent = terrainTaxSummary();
  reportNextRunText.textContent = nextRunAdvice();
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

function crossingSummary(): string {
  if (state.riverCrossingOutcome === "log-clean") {
    return "FAST LOG / CLEAN";
  }

  if (state.riverCrossingOutcome === "log-missed") {
    return `FAST LOG / MISSED / +${LOG_MISS_QUAD_PENALTY.toFixed(1)} QUAD`;
  }

  if (state.riverCrossingOutcome === "water") {
    return "SAFE WATER / HARD DRAG / LIGHT COOLING";
  }

  return "NOT REACHED";
}

function terrainTaxSummary(): string {
  return [
    terrainCostSegment("STEEP", state.decisionStats.terrainCosts.steep, "quad"),
    terrainCostSegment(
      "SWITCH",
      state.decisionStats.terrainCosts.switchback,
      "quad",
    ),
    terrainCostSegment("UPHILL", state.decisionStats.terrainCosts.uphill, "heat"),
  ].join(" / ");
}

function terrainCostSegment(
  label: string,
  stats: TerrainCostStats,
  focus: "heat" | "quad",
): string {
  if (stats.seconds <= 0) {
    return `${label} --`;
  }

  const value = focus === "heat" ? stats.heat : stats.quad;
  const suffix = focus === "heat" ? "H" : "Q";

  return `${label} +${Math.round(value).toString().padStart(2, "0")}${suffix}`;
}

function nextRunAdvice(): string {
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
    return "Next run: Keep SEND short until the final push.";
  }

  if (pushSendPercent >= 52) {
    return "Next run: Buy the finish before buying speed.";
  }

  if (totalSeconds >= 20 && brakePercent <= 3) {
    return "Next run: Brake before steep drops and turns.";
  }

  if (!firstIce && state.maxHeat >= 78) {
    return "Next run: Spend ice before heat reaches redline.";
  }

  if (firstIce && (firstIce.progress >= 0.68 || firstIce.heat >= 84)) {
    return "Next run: Use cooling earlier, before critical heat.";
  }

  if (
    state.secondAidChoice === "skip" &&
    (state.maxHeat >= 84 || state.lowestHydration <= 30 || state.quadDamage >= 72)
  ) {
    return "Next run: Take second aid when the dashboard is ugly.";
  }

  if (fastLinePercent >= 25) {
    return "Next run: Leave the exposed fast line sooner.";
  }

  if (state.riverCrossingOutcome === "log-missed") {
    return "Next run: Brake and center the log before committing.";
  }

  if (state.riverCrossingOutcome === "water" && pushSendPercent >= 40) {
    return "Next run: Keep the water choice, cut the risky pacing.";
  }

  if (controlSteadyPercent >= 76 && brakePercent >= 8 && fastLinePercent <= 18) {
    return "Next run: Same restraint profile. Spend speed late.";
  }

  return "Next run: Compare pace, brake, ice, line, and aid before retry.";
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
    if (state.secondAidChoice === "skip") {
      return "Skipped aid and paid.";
    }

    if (state.failureReason.includes("HEAT")) {
      return "Canyon tax collected.";
    }

    if (state.failureReason.includes("HYDRATION")) {
      return "Bottles ran dry. The canyon noticed.";
    }

    if (state.failureReason.includes("QUAD")) {
      return "The descent took your quads and kept the receipt.";
    }

    if (state.riverCrossingOutcome === "log-missed") {
      return "The log was faster. Your quads disagree.";
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

  if (state.riverCrossingOutcome === "log-missed") {
    return "The log was faster. Your quads disagree.";
  }

  if (
    state.riverCrossingOutcome === "water" &&
    state.maxHeat < 86 &&
    state.quadDamage < 66
  ) {
    return "Water was slow. Still smarter than detonating.";
  }

  if (state.lowestHydration <= 20) {
    return "Bottles nearly gone. Not pretty. Very SUC.";
  }

  if (
    state.secondAidChoice &&
    state.secondAidChoice !== "skip" &&
    (state.maxHeat >= 82 || state.lowestHydration <= 35 || state.quadDamage >= 64)
  ) {
    return "The second aid stop saved the back half.";
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
  kind: ResourceKind,
  label: string,
  value: number,
  level: ResourceLevel,
  bandLabel: string,
): void {
  element.textContent = `${label} ${Math.round(value)
    .toString()
    .padStart(3, "0")} ${bandLabel}`;
  element.dataset.resourceKind = kind;
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

function resourceStatusLevel(): ResourceLevel {
  if (state.heat >= 90 || state.hydration <= 9 || state.quadDamage >= 86) {
    return "critical";
  }

  if (state.heat >= 75 || state.hydration <= 29 || state.quadDamage >= 66) {
    return "danger";
  }

  if (state.heat >= 50 || state.hydration <= 59 || state.quadDamage >= 36) {
    return "warning";
  }

  return "safe";
}

function resourceWarningStatusLine(speed: string): string | null {
  const criticalWarnings: string[] = [];

  if (state.heat >= 90) {
    criticalWarnings.push("HEAT CRIT");
  }

  if (state.hydration <= 9) {
    criticalWarnings.push("H2O DRY");
  }

  if (state.quadDamage >= 86) {
    criticalWarnings.push("QUADS WRECKED");
  }

  if (criticalWarnings.length > 0) {
    return `${resourceWarningSummary(
      criticalWarnings,
    )} - COLLAPSE NEAR - ${resourceWarningAction()} ${speed}`;
  }

  const dangerWarnings: string[] = [];

  if (state.heat >= 75) {
    dangerWarnings.push("HEAT DANGER");
  }

  if (state.hydration <= 29) {
    dangerWarnings.push("H2O CRITICAL");
  }

  if (state.quadDamage >= 66) {
    dangerWarnings.push("QUADS COOKED");
  }

  if (dangerWarnings.length > 0) {
    return `${resourceWarningSummary(
      dangerWarnings,
    )} - FIX IT NOW - ${resourceWarningAction()} ${speed}`;
  }

  return null;
}

function resourceWarningSummary(warnings: string[]): string {
  if (warnings.length <= 2) {
    return warnings.join(" + ");
  }

  return "HEAT H2O QUAD REDLINE";
}

function resourceWarningAction(): string {
  const actions: string[] = [];

  if (state.heat >= 75) {
    actions.push(state.coolingCharges > 0 && !isCoolingActive() ? "ICE" : "CONTROL");
  }

  if (state.hydration <= 29) {
    actions.push("CONTROL");
  }

  if (state.quadDamage >= 66) {
    actions.push("BRAKE");
  }

  const uniqueActions = Array.from(new Set(actions));

  if (uniqueActions.length === 0) {
    return "HOLD FORM";
  }

  return `${uniqueActions.join("+")} NOW`;
}

function coolingLevel(): string {
  if (isCoolingActive()) {
    return "active";
  }

  return state.coolingCharges > 0 ? "ready" : "spent";
}

function heatLevel(value: number): ResourceLevel {
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

function heatBandLabel(value: number): string {
  if (value >= 90) {
    return "CRIT";
  }

  if (value >= 75) {
    return "DANGER";
  }

  if (value >= 50) {
    return "HOT";
  }

  return "OK";
}

function hydrationLevel(value: number): ResourceLevel {
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

function hydrationBandLabel(value: number): string {
  if (value <= 9) {
    return "DRY";
  }

  if (value <= 29) {
    return "CRIT";
  }

  if (value <= 59) {
    return "LOW";
  }

  return "GOOD";
}

function quadLevel(value: number): ResourceLevel {
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

function quadBandLabel(value: number): string {
  if (value >= 86) {
    return "WRECKED";
  }

  if (value >= 66) {
    return "COOKED";
  }

  if (value >= 36) {
    return "LOADED";
  }

  return "FRESH";
}

function fogColorForRun(): Vec3 {
  const heatPressure = clamp((state.heat - 45) / 55, 0, 1);
  const routeZone = routeZoneAt(state.progress);
  const exposure = exposureAt(state.progress);
  const coolingRelief = isCoolingActive() ? 0.08 : 0;
  const waterRelief = routeZone.kind === "river" ? 0.08 : 0;
  const aidRelief = routeZone.kind === "aid" ? 0.04 : 0;
  const canyonBurn =
    routeZone.kind === "steep" ||
    routeZone.kind === "uphill" ||
    routeZone.kind === "exposed"
      ? 0.05
      : 0;

  return [
    clamp(
      0.52 + heatPressure * 0.2 + exposure * 0.05 + canyonBurn - coolingRelief,
      0,
      1,
    ),
    clamp(
      0.42 + exposure * 0.04 - heatPressure * 0.06 - canyonBurn * 0.35 + aidRelief,
      0,
      1,
    ),
    clamp(0.3 - heatPressure * 0.11 + coolingRelief * 0.8 + waterRelief, 0, 1),
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
  return routeZoneAt(progress).exposure;
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

  return routeZoneAt(depth).technicalPressure;
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
  const steepColor: Vec3 = [0.66, 0.25, 0.1];
  const switchbackColor: Vec3 = [0.56, 0.43, 0.18];
  const riverBankColor: Vec3 = [0.28, 0.28, 0.19];
  const uphillColor: Vec3 = [0.5, 0.19, 0.13];
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
    let color = index % 2 === 0 ? trailColorA : trailColorB;

    if (routeZone.kind === "switchback") {
      color = switchbackColor;
    } else if (routeZone.kind === "steep") {
      color = steepColor;
    } else if (routeZone.kind === "river") {
      color = riverBankColor;
    } else if (routeZone.kind === "uphill") {
      color = uphillColor;
    } else if (routeZone.kind === "exposed") {
      color = exposedColor;
    }

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

function createTrailAtmosphereMesh(): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];
  const marks = 68;
  const dust: Vec3 = [0.56, 0.32, 0.12];
  const darkCrack: Vec3 = [0.15, 0.09, 0.05];
  const hotScrape: Vec3 = [0.76, 0.31, 0.08];
  const switchbackDust: Vec3 = [0.68, 0.49, 0.16];
  const wetStone: Vec3 = [0.08, 0.18, 0.18];
  const uphillBurn: Vec3 = [0.42, 0.13, 0.08];

  for (let index = 0; index < marks; index += 1) {
    const progress = 0.025 + (index / marks) * 0.95;
    const z = -TRAIL_LENGTH * progress;
    const routeZone = routeZoneAt(progress);
    const width = trailWidthAt(z);
    const lateral =
      ((((index * 37) % 100) / 100) - 0.5) * width * 1.34;
    const halfWidth = 0.12 + (index % 4) * 0.055;
    const length = 0.0048 + (index % 5) * 0.0014;
    let color = index % 2 === 0 ? dust : shade(dust, 0.76);

    if (routeZone.kind === "steep") {
      color = index % 3 === 0 ? hotScrape : darkCrack;
    } else if (routeZone.kind === "switchback") {
      color = index % 2 === 0 ? switchbackDust : darkCrack;
    } else if (routeZone.kind === "river") {
      color = index % 2 === 0 ? wetStone : shade(wetStone, 1.35);
    } else if (routeZone.kind === "uphill") {
      color = index % 2 === 0 ? uphillBurn : hotScrape;
    } else if (routeZone.kind === "exposed" || routeZone.kind === "finish") {
      color = index % 2 === 0 ? hotScrape : shade(dust, 1.12);
    }

    addTrailSurfaceQuad(
      positions,
      colors,
      progress,
      length,
      lateral,
      halfWidth,
      shade(color, 0.86 + (index % 3) * 0.08),
      index,
    );
  }

  return createMesh(positions, colors);
}

function addTrailSurfaceQuad(
  positions: number[],
  colors: number[],
  progress: number,
  length: number,
  lateral: number,
  halfWidth: number,
  color: Vec3,
  index: number,
): void {
  const nearProgress = clamp(progress - length * 0.5, 0, 1);
  const farProgress = clamp(progress + length * 0.5, 0, 1);
  const nearZ = -TRAIL_LENGTH * nearProgress;
  const farZ = -TRAIL_LENGTH * farProgress;
  const nearWidth = trailWidthAt(nearZ) - 0.24;
  const farWidth = trailWidthAt(farZ) - 0.24;
  const nearCenter = trailCenterAt(nearZ);
  const farCenter = trailCenterAt(farZ);
  const nearLateral = clamp(
    lateral + Math.sin(index * 1.7) * 0.05,
    -nearWidth + halfWidth,
    nearWidth - halfWidth,
  );
  const farLateral = clamp(
    lateral + Math.cos(index * 1.3) * 0.06,
    -farWidth + halfWidth,
    farWidth - halfWidth,
  );
  const lift = 0.062 + (index % 2) * 0.006;

  addQuad(
    positions,
    colors,
    [nearCenter + nearLateral - halfWidth, trailHeightAt(nearZ) + lift, nearZ],
    [nearCenter + nearLateral + halfWidth, trailHeightAt(nearZ) + lift, nearZ],
    [farCenter + farLateral + halfWidth, trailHeightAt(farZ) + lift, farZ],
    [farCenter + farLateral - halfWidth, trailHeightAt(farZ) + lift, farZ],
    color,
  );
}

function createRiskLaneCueMesh(): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];

  for (const cue of RISK_LANE_CUES) {
    const approachStart = Math.max(0.02, cue.start - RISK_LANE_APPROACH_LEAD_PROGRESS);
    const approachEnd = Math.max(approachStart, cue.start - 0.006);
    const approachSlices = 4;

    for (let index = 0; index < approachSlices; index += 1) {
      const sliceStart =
        approachStart + ((approachEnd - approachStart) * index) / approachSlices;
      const sliceEnd =
        approachStart +
        ((approachEnd - approachStart) * (index + 0.62)) / approachSlices;

      addRiskLaneApproachMarkerSlice(
        positions,
        colors,
        cue,
        sliceStart,
        Math.min(approachEnd, sliceEnd),
        index,
      );
    }

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

function createRiverWaterMesh(): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];
  const slices = 9;
  const waterA: Vec3 = [0.06, 0.36, 0.45];
  const waterB: Vec3 = [0.08, 0.48, 0.56];

  for (let index = 0; index < slices; index += 1) {
    const nearProgress =
      RIVER_CROSSING_START +
      ((RIVER_CROSSING_END - RIVER_CROSSING_START) * index) / slices;
    const farProgress =
      RIVER_CROSSING_START +
      ((RIVER_CROSSING_END - RIVER_CROSSING_START) * (index + 1)) / slices;
    const nearZ = -TRAIL_LENGTH * nearProgress;
    const farZ = -TRAIL_LENGTH * farProgress;
    const nearCenter = trailCenterAt(nearZ);
    const farCenter = trailCenterAt(farZ);
    const nearWidth = trailWidthAt(nearZ) + 1.16;
    const farWidth = trailWidthAt(farZ) + 1.16;
    const color = index % 2 === 0 ? waterA : waterB;

    addQuad(
      positions,
      colors,
      [nearCenter - nearWidth, trailHeightAt(nearZ) + 0.055, nearZ],
      [nearCenter + nearWidth, trailHeightAt(nearZ) + 0.055, nearZ],
      [farCenter + farWidth, trailHeightAt(farZ) + 0.055, farZ],
      [farCenter - farWidth, trailHeightAt(farZ) + 0.055, farZ],
      color,
    );
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

function addRiskLaneApproachMarkerSlice(
  positions: number[],
  colors: number[],
  cue: RiskLaneCue,
  nearProgress: number,
  farProgress: number,
  index: number,
): void {
  const nearZ = -TRAIL_LENGTH * nearProgress;
  const farZ = -TRAIL_LENGTH * farProgress;
  const nearWidth = trailWidthAt(nearZ) - 0.12;
  const farWidth = trailWidthAt(farZ) - 0.12;
  const nearMin = clamp(cue.minLateral, -nearWidth, nearWidth);
  const nearMax = clamp(cue.maxLateral, -nearWidth, nearWidth);
  const farMin = clamp(cue.minLateral, -farWidth, farWidth);
  const farMax = clamp(cue.maxLateral, -farWidth, farWidth);

  if (nearMax <= nearMin || farMax <= farMin) {
    return;
  }

  const nearCenter = trailCenterAt(nearZ);
  const farCenter = trailCenterAt(farZ);
  const lift = 0.072 + (index % 2) * 0.006;
  const color = index % 2 === 0 ? shade(cue.color, 1.16) : shade(cue.color, 0.88);
  const nearLaneWidth = nearMax - nearMin;
  const farLaneWidth = farMax - farMin;
  const nearStripeWidth = clamp(nearLaneWidth * 0.14, 0.06, 0.14);
  const farStripeWidth = clamp(farLaneWidth * 0.14, 0.06, 0.14);

  addRiskLaneApproachStrip(
    positions,
    colors,
    nearCenter,
    farCenter,
    nearZ,
    farZ,
    nearMin,
    nearMin + nearStripeWidth,
    farMin,
    farMin + farStripeWidth,
    lift,
    color,
  );
  addRiskLaneApproachStrip(
    positions,
    colors,
    nearCenter,
    farCenter,
    nearZ,
    farZ,
    nearMax - nearStripeWidth,
    nearMax,
    farMax - farStripeWidth,
    farMax,
    lift,
    color,
  );

  if (nearLaneWidth > 0.72 && farLaneWidth > 0.72 && index % 2 === 0) {
    const nearCenterLine = (nearMin + nearMax) / 2;
    const farCenterLine = (farMin + farMax) / 2;
    const nearDashWidth = clamp(nearLaneWidth * 0.08, 0.05, 0.1);
    const farDashWidth = clamp(farLaneWidth * 0.08, 0.05, 0.1);

    addRiskLaneApproachStrip(
      positions,
      colors,
      nearCenter,
      farCenter,
      nearZ,
      farZ,
      nearCenterLine - nearDashWidth,
      nearCenterLine + nearDashWidth,
      farCenterLine - farDashWidth,
      farCenterLine + farDashWidth,
      lift + 0.006,
      shade(color, 1.18),
    );
  }
}

function addRiskLaneApproachStrip(
  positions: number[],
  colors: number[],
  nearCenter: number,
  farCenter: number,
  nearZ: number,
  farZ: number,
  nearMin: number,
  nearMax: number,
  farMin: number,
  farMax: number,
  lift: number,
  color: Vec3,
): void {
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
  const tentZ = tableZ - 0.1;
  const tentY = trailHeightAt(tentZ);

  objects.push(
    {
      mesh: shadeTentMesh,
      position: [tableCenter, tentY + 2.12, tentZ],
      scale: [2.65, 0.78, 1.38],
      rotationY: 0.08,
    },
    {
      mesh: cubeMesh,
      position: [tableCenter - 1.18, tentY + 1.1, tentZ - 0.62],
      scale: [0.12, 2.02, 0.12],
      rotationY: 0.08,
    },
    {
      mesh: cubeMesh,
      position: [tableCenter + 1.18, tentY + 1.1, tentZ - 0.62],
      scale: [0.12, 2.02, 0.12],
      rotationY: 0.08,
    },
    {
      mesh: cubeMesh,
      position: [tableCenter - 1.18, tentY + 1.1, tentZ + 0.62],
      scale: [0.12, 2.02, 0.12],
      rotationY: 0.08,
    },
    {
      mesh: cubeMesh,
      position: [tableCenter + 1.18, tentY + 1.1, tentZ + 0.62],
      scale: [0.12, 2.02, 0.12],
      rotationY: 0.08,
    },
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

  addCrewSilhouette(objects, tableCenter - 1.42, tableZ + 0.82, 0.28);
  addCrewSilhouette(objects, coolerCenter + 0.78, coolerZ - 0.18, -0.34);

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

function createSecondAidStationObjects(): SceneObject[] {
  const objects: SceneObject[] = [];
  const stationZ = -TRAIL_LENGTH * SECOND_AID_PROGRESS;
  const stationCenter = trailCenterAt(stationZ);
  const stationWidth = trailWidthAt(stationZ);
  const stationY = trailHeightAt(stationZ);
  const sideX = stationCenter + stationWidth + 1.25;
  const leftMarkerX = stationCenter - stationWidth - 0.2;
  const rightMarkerX = stationCenter + stationWidth + 0.2;

  objects.push(
    {
      mesh: shadeTentMesh,
      position: [sideX, stationY + 1.86, stationZ - 0.18],
      scale: [1.85, 0.58, 1.04],
      rotationY: -0.2,
    },
    {
      mesh: cubeMesh,
      position: [sideX - 0.82, stationY + 0.92, stationZ - 0.66],
      scale: [0.1, 1.66, 0.1],
      rotationY: -0.2,
    },
    {
      mesh: cubeMesh,
      position: [sideX + 0.82, stationY + 0.92, stationZ - 0.66],
      scale: [0.1, 1.66, 0.1],
      rotationY: -0.2,
    },
    {
      mesh: crewSignMesh,
      position: [stationCenter, stationY + 2.18, stationZ],
      scale: [2.15, 0.52, 0.12],
      rotationY: -0.1,
    },
    {
      mesh: zoneAidMesh,
      position: [stationCenter, stationY + 0.06, stationZ + 0.34],
      scale: [stationWidth * 1.5, 0.04, 0.42],
      rotationY: 0,
    },
    {
      mesh: cubeMesh,
      position: [leftMarkerX, stationY + 1.02, stationZ],
      scale: [0.16, 2.04, 0.16],
    },
    {
      mesh: cubeMesh,
      position: [rightMarkerX, stationY + 1.02, stationZ],
      scale: [0.16, 2.04, 0.16],
    },
    {
      mesh: crewTableMesh,
      position: [sideX, stationY + 0.78, stationZ - 0.15],
      scale: [1.5, 0.16, 0.66],
      rotationY: -0.2,
    },
    {
      mesh: crewCoolerMesh,
      position: [sideX + 0.86, stationY + 0.42, stationZ + 0.55],
      scale: [0.68, 0.62, 0.54],
      rotationY: -0.26,
    },
    {
      mesh: iceMesh,
      position: [sideX + 0.86, stationY + 0.78, stationZ + 0.55],
      scale: [0.72, 0.12, 0.58],
      rotationY: -0.26,
    },
    {
      mesh: iceMesh,
      position: [sideX - 0.34, stationY + 0.99, stationZ - 0.16],
      scale: [0.34, 0.18, 0.28],
      rotationY: 0.14,
    },
    {
      mesh: accentMesh,
      position: [sideX + 0.28, stationY + 0.96, stationZ + 0.06],
      scale: [0.22, 0.32, 0.2],
      rotationY: 0.34,
    },
  );

  addCrewSilhouette(objects, sideX - 0.92, stationZ + 0.36, -0.25);

  for (const [xOffset, zOffset] of [
    [-stationWidth - 0.45, 1.45],
    [stationWidth + 0.45, 1.45],
    [-stationWidth - 0.38, -1.2],
    [stationWidth + 0.38, -1.2],
  ] as const) {
    objects.push({
      mesh: crewConeMesh,
      position: [
        stationCenter + xOffset,
        trailHeightAt(stationZ + zOffset) + 0.38,
        stationZ + zOffset,
      ],
      scale: [0.36, 0.72, 0.36],
      rotationY: zOffset,
    });
  }

  return objects;
}

function addCrewSilhouette(
  objects: SceneObject[],
  x: number,
  z: number,
  rotationY: number,
): void {
  const y = trailHeightAt(z);

  objects.push(
    {
      mesh: crewBodyMesh,
      position: [x, y + 0.86, z],
      scale: [0.34, 0.68, 0.24],
      rotationY,
    },
    {
      mesh: skinMesh,
      position: [x, y + 1.33, z - 0.02],
      scale: [0.25, 0.28, 0.25],
      rotationY,
    },
    {
      mesh: accentMesh,
      position: [x + Math.sin(rotationY) * 0.24, y + 0.64, z + Math.cos(rotationY) * 0.2],
      scale: [0.11, 0.48, 0.1],
      rotationY: rotationY + 0.28,
    },
  );
}

function createAtmosphereObjects(): SceneObject[] {
  const objects: SceneObject[] = [];
  const signZones = [0.18, 0.31, 0.48, 0.64, 0.78] as const;

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
    const side = index % 2 === 0 ? -1 : 1;
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
      {
        mesh: dustStripeMesh,
        position: [center, y + 0.078, z + 0.72],
        scale: [width * 0.92, 0.035, 0.22],
        rotationY: side * 0.11,
      },
    );
  }

  for (const progress of [0.28, 0.5, 0.72, 0.87] as const) {
    const z = -TRAIL_LENGTH * progress;
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);
    const y = trailHeightAt(z);

    objects.push({
      mesh: dustStripeMesh,
      position: [center, y + 0.082, z - 0.18],
      scale: [width * 1.18, 0.032, 0.34],
      rotationY: progress > 0.6 ? -0.16 : 0.14,
    });
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

function createRiverCrossingObjects(): SceneObject[] {
  const objects: SceneObject[] = [];
  const logSegments = 11;

  for (let index = 0; index < logSegments; index += 1) {
    const progress =
      RIVER_CROSSING_START +
      ((RIVER_CROSSING_END - RIVER_CROSSING_START) * (index + 0.5)) /
        logSegments;
    const z = -TRAIL_LENGTH * progress;
    const center = trailCenterAt(z);
    const y = trailHeightAt(z);

    objects.push({
      mesh: riverLogMesh,
      position: [center + LOG_CENTER, y + 0.22, z],
      scale: [0.34, 0.18, 2.4],
      rotationY: Math.sin(index * 0.7) * 0.08,
    });
  }

  for (let index = 0; index < 7; index += 1) {
    const progress =
      RIVER_CROSSING_START +
      ((RIVER_CROSSING_END - RIVER_CROSSING_START) * (index + 0.5)) / 7;
    const z = -TRAIL_LENGTH * progress;
    const center = trailCenterAt(z);
    const y = trailHeightAt(z);

    objects.push(
      {
        mesh: riverFoamMesh,
        position: [center - 0.92, y + 0.12, z],
        scale: [0.36, 0.05, 0.42],
        rotationY: index * 0.4,
      },
      {
        mesh: riverFoamMesh,
        position: [center + 0.18, y + 0.12, z + 0.55],
        scale: [0.28, 0.05, 0.32],
        rotationY: -index * 0.35,
      },
    );
  }

  for (let index = 0; index < 8; index += 1) {
    const progress =
      RIVER_CROSSING_START +
      ((RIVER_CROSSING_END - RIVER_CROSSING_START) * (index + 0.35)) / 8;
    const z = -TRAIL_LENGTH * progress;
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);
    const y = trailHeightAt(z);
    const side = index % 2 === 0 ? -1 : 1;

    objects.push(
      {
        mesh: wetRockMesh,
        position: [center + side * (width + 0.34 + (index % 3) * 0.2), y + 0.14, z],
        scale: [0.44 + (index % 2) * 0.14, 0.26, 0.36],
        rotationY: index * 0.72,
      },
      {
        mesh: zoneRiverMesh,
        position: [center - 0.34 + (index % 2) * 0.54, y + 0.095, z + 0.18],
        scale: [0.58, 0.032, 0.2],
        rotationY: index % 2 === 0 ? -0.22 : 0.22,
      },
    );
  }

  return objects;
}

function createRouteZoneMarkers(): SceneObject[] {
  const markers: SceneObject[] = [];

  for (const zone of ROUTE_ZONES) {
    if (!zone.markerKind) {
      continue;
    }

    addRouteZoneMarkerCluster(
      markers,
      zone.markerKind,
      Math.max(0.02, zone.start - ROUTE_MARKER_LEAD_PROGRESS),
      0.78,
    );
    addRouteZoneMarkerCluster(
      markers,
      zone.markerKind,
      Math.max(0.02, zone.start - ROUTE_MARKER_CLOSE_LEAD_PROGRESS),
      1,
    );
  }

  return markers;
}

function addRouteZoneMarkerCluster(
  markers: SceneObject[],
  kind: RouteMarkerKind,
  markerProgress: number,
  scaleMultiplier: number,
): void {
  const z = -TRAIL_LENGTH * markerProgress;
  const center = trailCenterAt(z);
  const width = trailWidthAt(z);
  const y = trailHeightAt(z);
  const mesh = routeMarkerMeshFor(kind);
  const sideRotation = kind === "switchback" ? 0.55 : 0.18;
  const stakeHeight = 1.5 * scaleMultiplier;

  for (const side of [-1, 1] as const) {
    const edgeX = center + side * (width + 0.46);
    const tapeX = center + side * (width + 0.2);
    const outwardRotation = side * sideRotation;

    markers.push(
      {
        mesh: courseStakeMesh,
        position: [edgeX, y + stakeHeight * 0.5, z],
        scale: [0.13, stakeHeight, 0.13],
        rotationY: outwardRotation,
      },
      {
        mesh: courseStakeMesh,
        position: [edgeX, y + 0.72 * scaleMultiplier, z + 0.88 * scaleMultiplier],
        scale: [0.1, 1.44 * scaleMultiplier, 0.1],
        rotationY: outwardRotation,
      },
      {
        mesh: courseTapeMesh,
        position: [tapeX, y + 0.72 * scaleMultiplier, z + 0.42 * scaleMultiplier],
        scale: [0.08, 0.045, 1.02 * scaleMultiplier],
        rotationY: side * 0.06,
      },
      {
        mesh,
        position: [edgeX + side * 0.22, y + 1.28 * scaleMultiplier, z - 0.08],
        scale: [0.44, 0.68 * scaleMultiplier, 0.06],
        rotationY: outwardRotation + side * 0.2,
      },
      {
        mesh: markerBoardMesh,
        position: [edgeX + side * 0.14, y + 0.82 * scaleMultiplier, z + 0.38],
        scale: [0.62, 0.32, 0.08],
        rotationY: outwardRotation + side * 0.12,
      },
      {
        mesh,
        position: [edgeX + side * 0.16, y + 0.83 * scaleMultiplier, z + 0.32],
        scale: [0.36, 0.06, 0.09],
        rotationY: outwardRotation + side * 0.12,
      },
    );
  }

  for (let stripe = 0; stripe < 3; stripe += 1) {
    markers.push({
      mesh,
      position: [center, y + 0.074, z + 0.86 + stripe * 0.46],
      scale: [width * (0.46 - stripe * 0.05) * scaleMultiplier, 0.035, 0.12],
      rotationY: stripe % 2 === 0 ? -0.18 : 0.18,
    });
  }
}

function routeMarkerMeshFor(kind: RouteMarkerKind): Mesh {
  if (kind === "steep") {
    return zoneSteepMesh;
  }

  if (kind === "switchback") {
    return zoneSwitchbackMesh;
  }

  if (kind === "river") {
    return zoneRiverMesh;
  }

  if (kind === "uphill") {
    return zoneUphillMesh;
  }

  if (kind === "aid") {
    return zoneAidMesh;
  }

  if (kind === "exposed") {
    return zoneExposedMesh;
  }

  if (kind === "finish") {
    return finishTapeMesh;
  }

  return zoneExposedMesh;
}

function createTrailMarkers(): SceneObject[] {
  const markers: SceneObject[] = [];

  for (let index = 0, z = -8; z > -TRAIL_LENGTH; index += 1, z -= 9.5) {
    const side = index % 2 === 0 ? -1 : 1;
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);
    const y = trailHeightAt(z);
    const markerX = center + side * (width + 0.55);

    markers.push(
      {
        mesh: courseStakeMesh,
        position: [markerX, y + 0.58, z],
        scale: [0.14, 1.16, 0.14],
      },
      {
        mesh: courseTapeMesh,
        position: [markerX - side * 0.12, y + 0.78, z + 0.38],
        scale: [0.08, 0.04, 0.76],
        rotationY: side * 0.08,
      },
      {
        mesh: accentMesh,
        position: [markerX + side * 0.18, y + 1.12, z - 0.06],
        scale: [0.28, 0.46, 0.06],
        rotationY: side * 0.16,
      },
    );
  }

  for (const zone of [0.33, 0.62, 0.95]) {
    const z = -TRAIL_LENGTH * zone;
    const center = trailCenterAt(z);
    const width = trailWidthAt(z);
    const y = trailHeightAt(z);

    for (const side of [-1, 1] as const) {
      const markerX = center + side * (width + 0.28);

      markers.push(
        {
          mesh: courseStakeMesh,
          position: [markerX, y + 1.1, z],
          scale: [0.16, 2.2, 0.16],
          rotationY: side * 0.12,
        },
        {
          mesh: accentMesh,
          position: [markerX + side * 0.25, y + 1.78, z - 0.1],
          scale: [0.44, 0.78, 0.07],
          rotationY: side * 0.24,
        },
        {
          mesh: courseTapeMesh,
          position: [center + side * (width + 0.04), y + 0.76, z + 0.48],
          scale: [0.08, 0.04, 1.02],
          rotationY: side * 0.08,
        },
      );
    }

    markers.push(
      {
        mesh: accentMesh,
        position: [center, y + 0.06, z + 0.32],
        scale: [width * 1.45, 0.04, 0.36],
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
  const objects: SceneObject[] = [];

  for (const side of [-1, 1] as const) {
    const markerX = center + side * (width + 0.36);

    objects.push(
      {
        mesh: courseStakeMesh,
        position: [markerX, groundY + 1.28, z],
        scale: [0.18, 2.56, 0.18],
      },
      {
        mesh: finishTapeMesh,
        position: [markerX + side * 0.25, groundY + 2.02, z - 0.08],
        scale: [0.46, 0.88, 0.07],
        rotationY: side * 0.18,
      },
      {
        mesh: courseTapeMesh,
        position: [center + side * (width + 0.08), groundY + 0.72, z + 0.58],
        scale: [0.08, 0.045, 1.16],
        rotationY: side * 0.05,
      },
      {
        mesh: markerBoardMesh,
        position: [markerX + side * 0.18, groundY + 1.08, z + 0.12],
        scale: [0.68, 0.36, 0.08],
        rotationY: side * 0.2,
      },
      {
        mesh: finishTapeMesh,
        position: [markerX + side * 0.18, groundY + 1.1, z + 0.06],
        scale: [0.42, 0.07, 0.09],
        rotationY: side * 0.2,
      },
    );
  }

  objects.push(
    {
      mesh: finishTapeMesh,
      position: [center, groundY + 0.05, z + 0.32],
      scale: [width * 1.95, 0.04, 0.46],
    },
  );

  return objects;
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

function createLowPolyRockMesh(
  base: Vec3 = [0.34, 0.27, 0.22],
  top: Vec3 = [0.58, 0.43, 0.3],
): Mesh {
  const positions: number[] = [];
  const colors: number[] = [];

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
  const depth = clamp(-z / TRAIL_LENGTH, 0, 1);
  const baseDrop = -depth * 34.5;
  const steepDrop = -smoothRange(depth, 0.23, 0.43) * 8.2;
  const switchbackDrop = -smoothRange(depth, 0.43, RIVER_CROSSING_START) * 3.7;
  const riverDip =
    -smoothRange(depth, RIVER_CROSSING_START - 0.02, RIVER_LOG_CHECK_PROGRESS) *
      1.05 +
    smoothRange(depth, RIVER_LOG_CHECK_PROGRESS, RIVER_CROSSING_END + 0.02) *
      1.05;
  const uphillLift =
    smoothRange(depth, RIVER_CROSSING_END, 0.74) * 5.4 -
    smoothRange(depth, 0.74, 0.82) * 5.4;
  const finalDrop = -smoothRange(depth, 0.76, 1) * 6.2;
  const roughness = Math.sin(z * 0.09) * 0.18;

  return (
    baseDrop +
    steepDrop +
    switchbackDrop +
    riverDip +
    uphillLift +
    finalDrop +
    roughness
  );
}

function trailCenterAt(z: number): number {
  const depth = clamp(-z / TRAIL_LENGTH, 0, 1);
  const broadCurve = Math.sin(depth * Math.PI * 2) * 1.18;
  const trailWander = Math.sin(depth * Math.PI * 5.1) * 0.62;
  const switchbackTurn =
    smoothRange(depth, 0.38, 0.46) * 2.15 -
    smoothRange(depth, 0.46, 0.54) * 4.35 +
    smoothRange(depth, 0.54, RIVER_CROSSING_START) * 2.35;
  const riverBend = smoothRange(depth, RIVER_CROSSING_START, RIVER_CROSSING_END) * 0.55;
  const finalBend = smoothRange(depth, 0.76, 0.9) * 1.2;

  return broadCurve + trailWander + switchbackTurn + riverBend + finalBend;
}

function trailWidthAt(z: number): number {
  const depth = clamp(-z / TRAIL_LENGTH, 0, 1);
  const base = 3.1 - depth * 0.72;
  const switchbackPinch =
    depth > 0.43 && depth < RIVER_CROSSING_START ? 0.48 : 0;
  const riverWiden = isInRiverCrossing(depth) ? 0.54 : 0;
  const uphillPinch = depth > RIVER_CROSSING_END && depth < 0.76 ? 0.22 : 0;
  const finalPinch = depth > 0.82 ? 0.18 : 0;

  return base - switchbackPinch + riverWiden - uphillPinch - finalPinch;
}

function playableLateralLimitAt(z: number): number {
  return Math.min(LATERAL_LIMIT, trailWidthAt(z) - RUNNER_EDGE_BUFFER);
}

function downhillMomentumAt(z: number): number {
  const currentHeight = trailHeightAt(z);
  const aheadHeight = trailHeightAt(z - 10);
  const depth = clamp(-z / TRAIL_LENGTH, 0, 1);
  const routeZone = routeZoneAt(depth);
  const drop = Math.max(0, currentHeight - aheadHeight);

  return clamp(
    drop * 4.2 + routeZone.downhillBoostBonus,
    routeZone.downhillBoostFloor,
    STEADY_MAX_RUN_SPEED - BASE_RUN_SPEED,
  );
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

function smoothRange(value: number, start: number, end: number): number {
  const t = clamp((value - start) / (end - start), 0, 1);

  return t * t * (3 - 2 * t);
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
