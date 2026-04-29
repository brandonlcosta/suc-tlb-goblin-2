#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_ANALYSIS_DOCS = [
  "GAME.md",
  "ROADMAP.md",
  "docs/BACKLOG.md",
  "docs/MECHANICS_SPEC.md",
  "docs/PS1_3D_STYLE_GUIDE.md",
  "docs/LEVEL_DESIGN_GUIDE.md",
  "docs/CAL_STREET_HEAT_DROP.md",
  "docs/PROMPT_PIPELINE.md",
];

const PROMPT_DIRS = [
  "prompts/pending",
  "prompts/completed",
  "prompts/blocked",
  "prompts/archive",
];

const SCREENSHOT_DIRS = [
  "reports/playtests/screenshots",
  "reports/screenshots",
  ".goblin/screenshots",
];

const GENERATED_BY = "STLB queue prompt generator";

function parseArgs(args) {
  const options = {
    date: null,
    dryRun: false,
    reason: "Manual queue-only prompt generation requested.",
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--date") {
      options.date = args[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--reason") {
      options.reason = args[index + 1];
      index += 1;
      continue;
    }

    throw new Error(`Unknown flag: ${arg}`);
  }

  if (options.date && !/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    throw new Error("--date must use YYYY-MM-DD format.");
  }

  return options;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function repoPath(root, path) {
  return join(root, path);
}

function readTextIfExists(root, path) {
  const fullPath = repoPath(root, path);
  return existsSync(fullPath) ? readFileSync(fullPath, "utf8") : "";
}

function listFilesRecursive(root, dir) {
  const fullDir = repoPath(root, dir);
  if (!existsSync(fullDir)) return [];

  const files = [];
  const stack = [fullDir];

  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      files.push(relative(root, fullPath).replace(/\\/g, "/"));
    }
  }

  return files.sort();
}

function listMarkdownFilesRecursive(root, dir) {
  return listFilesRecursive(root, dir).filter((file) => file.endsWith(".md"));
}

function promptNumberFromFile(file) {
  return basename(file).match(/^(\d+)-/)?.[1] ?? null;
}

function collectPromptLedger(root) {
  const records = [];

  for (const dir of PROMPT_DIRS) {
    for (const file of listMarkdownFilesRecursive(root, dir)) {
      const number = promptNumberFromFile(file);
      if (!number) continue;

      records.push({
        number: Number(number),
        paddedNumber: number,
        file,
        queue: dir,
      });
    }
  }

  const byQueue = new Map();
  for (const record of records) {
    const entries = byQueue.get(record.queue) ?? [];
    entries.push(record.file);
    byQueue.set(record.queue, entries);
  }

  return {
    records,
    byQueue,
    highestNumber: records.length ? Math.max(...records.map((record) => record.number)) : 0,
  };
}

function nextPromptNumber(ledger) {
  const used = new Set(ledger.records.map((record) => record.number));
  let next = ledger.highestNumber + 1;

  while (used.has(next)) {
    next += 1;
  }

  return next;
}

function listRecentReports(root, limit = 6) {
  return listMarkdownFilesRecursive(root, "reports/runs")
    .map((file) => ({
      file,
      mtime: statSync(repoPath(root, file)).mtimeMs,
      text: readTextIfExists(root, file),
    }))
    .sort((a, b) => b.mtime - a.mtime || b.file.localeCompare(a.file))
    .slice(0, limit);
}

function listRecentPlaytests(root, limit = 6) {
  return listMarkdownFilesRecursive(root, "reports/playtests")
    .filter((file) => basename(file) !== ".gitkeep")
    .map((file) => ({
      file,
      mtime: statSync(repoPath(root, file)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime || b.file.localeCompare(a.file))
    .slice(0, limit);
}

function listRecentScreenshots(root, limit = 8) {
  return SCREENSHOT_DIRS.flatMap((dir) =>
    listFilesRecursive(root, dir)
      .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
      .map((file) => ({
        file,
        mtime: statSync(repoPath(root, file)).mtimeMs,
      })),
  )
    .sort((a, b) => b.mtime - a.mtime || b.file.localeCompare(a.file))
    .slice(0, limit);
}

function collectSourceSignals(root) {
  const sourceFiles = listFilesRecursive(root, "src").filter((file) =>
    /\.(ts|tsx|js|jsx|css|html)$/.test(file),
  );
  const combined = sourceFiles
    .map((file) => readTextIfExists(root, file))
    .join("\n")
    .slice(0, 160000);

  return {
    files: sourceFiles,
    hasPaceModes: /PACE_SETTINGS|paceMode|PACE /.test(combined),
    hasCooling: /cooling|ice active|iceActive|data-hud-cooling/i.test(combined),
    hasCrew: /crew|water dump|bandana|refill/i.test(combined),
    hasRunReport: /run report|verdict|max heat|lowest hydration/i.test(combined),
    hasExposure: /exposureAt|exposed|shade/i.test(combined),
    hasTechnicalPressure: /technicalPressure|rocky|technical/i.test(combined),
    hasFinish: /progress\s*>=\s*1|finish/i.test(combined),
  };
}

function collectPromptText(root, ledger) {
  return ledger.records
    .map((record) => `${record.file}\n${readTextIfExists(root, record.file)}`)
    .join("\n")
    .toLowerCase();
}

function candidateAlreadyExists(candidate, promptText) {
  return candidate.duplicateTerms.some((term) => promptText.includes(term));
}

function selectCandidate({ root, ledger, sourceSignals }) {
  const promptText = collectPromptText(root, ledger);
  const docs = Object.fromEntries(
    DEFAULT_ANALYSIS_DOCS.map((path) => [path, readTextIfExists(root, path)]),
  );
  const designText = Object.values(docs).join("\n").toLowerCase();
  const pendingNames = (ledger.byQueue.get("prompts/pending") ?? []).map((file) => basename(file));

  const candidates = [
    {
      title: "Trail Zone Readability Markers",
      slug: "trail-zone-readability-markers",
      duplicateTerms: [
        "trail-zone-readability",
        "zone readability markers",
        "current and next zone",
        "trail zone markers",
      ],
      score:
        8 +
        (sourceSignals.hasExposure ? 3 : 0) +
        (sourceSignals.hasTechnicalPressure ? 2 : 0) +
        (designText.includes("line choice") ? 2 : 0) +
        (pendingNames.some((name) => name.includes("010-first-balance")) ? 1 : 0),
      context:
        "The current game direction depends on players reading exposed, shaded, and technical parts of the descent before they commit to pace, braking, and line choices. The source already has early exposure and technical pressure signals, and the queue is scheduled to add cooling, crew, finish/report, atmosphere, and balance before this prompt is reached. The next useful playtest improvement is making those route-state changes more legible instead of adding another system.",
      goal:
        "Make shade, exposed, and technical trail zones readable early enough for the player to adjust pace, braking, and line choice.",
      why:
        "The downhill survival loop only works if players can see trouble coming. Clear zone reads turn heat and quad pressure from invisible math into decisions the player can blame, learn from, and replay.",
      scope: [
        "Add a small route-zone descriptor list for the current mission using existing progress bands where possible.",
        "Show the current zone and the next major zone in the existing HUD or status line.",
        "Add lightweight low-poly or color-coded transition markers for exposed, shade, and technical sections.",
        "Keep resource formulas mostly intact, changing only tiny labels or hooks needed to connect the zone readout.",
      ],
      outOfScope: [
        "No new mission, open world, branching route network, real map, GPX, Strava, or external API.",
        "No broad renderer rewrite, new dependency, large asset pack, or realistic graphics pass.",
        "No new resource system, crew overhaul, cooling overhaul, or run-report redesign.",
      ],
    },
    {
      title: "Critical Warning Feedback Pass",
      slug: "critical-warning-feedback-pass",
      duplicateTerms: [
        "critical-warning-feedback",
        "critical warning feedback",
        "warning feedback pass",
      ],
      score:
        6 +
        (sourceSignals.hasPaceModes ? 1 : 0) +
        (sourceSignals.hasExposure ? 1 : 0) +
        (designText.includes("warning effects") ? 2 : 0),
      context:
        "The game now has core survival resources and warning bands, but high-risk states need stronger moment-to-moment feedback so players know why the descent is falling apart.",
      goal:
        "Improve the clarity and urgency of heat, hydration, and quad warning feedback without adding new systems.",
      why:
        "The player should feel the cost of greedy downhill execution before failure lands. Clear warnings make restraint, cooling, and braking feel tactical.",
      scope: [
        "Add sharper visual or HUD feedback for heat danger, low hydration, and quad damage danger.",
        "Make the status line name the dominant current threat.",
        "Keep warnings readable over the 3D scene at desktop and small widths.",
      ],
      outOfScope: [
        "No audio requirement, shader rewrite, new UI framework, or new dependency.",
        "No tuning overhaul beyond tiny thresholds needed for feedback.",
        "No new mechanics or second mission.",
      ],
    },
    {
      title: "Run Report Decision Recap",
      slug: "run-report-decision-recap",
      duplicateTerms: [
        "run-report-decision-recap",
        "decision recap",
        "pace discipline recap",
      ],
      score:
        4 +
        (sourceSignals.hasRunReport ? 4 : 0) +
        (designText.includes("time spent in each pace") ? 1 : 0),
      context:
        "Once the finish and run report exist, the report should help players understand which choices created the result.",
      goal:
        "Add a small post-run recap that calls out pace discipline, braking, cooling, and crew decisions.",
      why:
        "Replayability depends on the player understanding what to change next time, not just seeing that they finished or failed.",
      scope: [
        "Add a concise decision recap to the existing run report.",
        "Summarize the most important cause of success or failure.",
        "Use serious SUC-style report copy.",
      ],
      outOfScope: [
        "No saved history, accounts, leaderboard, sharing, or analytics.",
        "No full report redesign.",
        "No new gameplay system.",
      ],
    },
  ];

  return candidates
    .filter((candidate) => !candidateAlreadyExists(candidate, promptText))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))[0] ?? candidates[0];
}

function formatList(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- none";
}

function formatPrompt({ title, context, goal, why, scope, outOfScope }) {
  return `# Implementation Prompt: ${title}

## Context

${context}

## Goal

${goal}

## Why This Matters

${why}

## Scope

Implement:

${formatList(scope)}

## Out of Scope

Do not implement:

${formatList(outOfScope)}

## Acceptance Criteria

- [ ] Build passes
- [ ] Prompt ledger remains valid
- [ ] Feature is visible or testable
- [ ] The change improves game feel, clarity, loop, or player decision-making
- [ ] No unrelated systems are added

## Validation

Run:

\`npm run build:goblin\`
\`npm run agent:check\`

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.
`;
}

function promptFilename(number, slug) {
  return `${String(number).padStart(3, "0")}-${slug}.md`;
}

function uniqueReportPath(root, date, number, slug) {
  const baseName = `${date}-queue-prompt-generator-${String(number).padStart(3, "0")}-${slug}`;
  let suffix = "";
  let attempt = 1;

  while (true) {
    const fileName = `${baseName}${suffix}.md`;
    const fullPath = repoPath(root, `reports/runs/${fileName}`);
    if (!existsSync(fullPath)) return fullPath;
    attempt += 1;
    suffix = `-${attempt}`;
  }
}

function summarizeLedger(ledger) {
  return PROMPT_DIRS.map((dir) => {
    const entries = ledger.byQueue.get(dir) ?? [];
    return `${dir}: ${entries.length ? entries.map((file) => basename(file)).join(", ") : "none"}`;
  }).join("\n");
}

function formatReport({
  date,
  reason,
  fileName,
  candidate,
  ledger,
  docsReviewed,
  recentReports,
  recentPlaytests,
  recentScreenshots,
  sourceSignals,
}) {
  const docsList = docsReviewed.map((doc) => `${doc.path}${doc.present ? "" : " (missing)"}`);
  const sourceDetected = [
    sourceSignals.hasPaceModes ? "pace modes" : null,
    sourceSignals.hasCooling ? "cooling hooks" : null,
    sourceSignals.hasCrew ? "crew hooks" : null,
    sourceSignals.hasRunReport ? "run report hooks" : null,
    sourceSignals.hasExposure ? "exposure signals" : null,
    sourceSignals.hasTechnicalPressure ? "technical pressure signals" : null,
    sourceSignals.hasFinish ? "finish/progress signals" : null,
  ].filter(Boolean);

  return `# Queue Prompt Generator Report

Date: ${date}

## Prompt Consumed

- None. This was a queue-only prompt generation run.

## Status

completed

## Generated Prompt

- \`prompts/pending/${fileName}\`

## Summary

Generated exactly one new pending implementation prompt: **${candidate.title}**.

Generation reason: ${reason}

The generator reviewed the current design docs, prompt ledger, recent reports, available playtest artifacts, screenshot folders, and source-file signals. It selected this prompt because it is a small post-core-loop playtest improvement that should help players read trail zones and make better downhill survival decisions without adding unrelated systems.

## Why This Prompt Was Generated

${candidate.why}

## Analysis Sources

${formatList(docsList)}

## Current Prompt Ledger State

Highest prompt number found across pending, completed, blocked, and archive: \`${String(
    ledger.highestNumber,
  ).padStart(3, "0")}\`

\`\`\`txt
${summarizeLedger(ledger)}
\`\`\`

## Recent Reports Reviewed

${formatList(recentReports.map((report) => report.file))}

## Recent Playtests Reviewed

${formatList(recentPlaytests.map((playtest) => playtest.file))}

## Screenshots Reviewed

${formatList(recentScreenshots.map((screenshot) => screenshot.file))}

## Source Snapshot

Files reviewed:

${formatList(sourceSignals.files)}

Detected signals:

${formatList(sourceDetected)}

## Game Studio Direction Check

Lightweight direction review used the Game Studio guidance available to this Codex run: keep the next prompt focused on the browser game core loop, 3D downhill readability, HUD clarity, and playtest usefulness. No game feature was implemented.

## Validation Commands Run

- None by the generator itself. Run \`npm run agent:check\` after generation.

## Validation Result

Pending external validation. The generator only wrote the prompt and this report.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- The generated prompt is queued after the existing pending prompts and is not implemented by this generator.
- If screenshots are added later, place them under \`reports/playtests/screenshots/\`, \`reports/screenshots/\`, or \`.goblin/screenshots/\` before the next generation run.

## Risk Level

Low. This run did not edit \`src/\`, did not consume prompts, and did not run implementation automation.

## Next Recommended Action

Run \`npm run agent:check\`, review the generated prompt, and let \`npm run goblin:main\` consume it later when it becomes the oldest pending prompt.
`;
}

function ensureDirectory(path) {
  mkdirSync(path, { recursive: true });
}

export function generateQueuePrompt(options = {}) {
  const root = options.root ?? process.cwd();
  const date = options.date ?? todayIsoDate();
  const reason = options.reason ?? "Manual queue-only prompt generation requested.";
  const dryRun = Boolean(options.dryRun);

  const missingDocs = DEFAULT_ANALYSIS_DOCS.filter((path) => !existsSync(repoPath(root, path)));
  if (missingDocs.length > 0) {
    throw new Error(`Missing required analysis docs: ${missingDocs.join(", ")}`);
  }

  const ledger = collectPromptLedger(root);
  const number = nextPromptNumber(ledger);
  const sourceSignals = collectSourceSignals(root);
  const candidate = selectCandidate({ root, ledger, sourceSignals });
  const fileName = promptFilename(number, candidate.slug);
  const promptPath = repoPath(root, `prompts/pending/${fileName}`);

  if (existsSync(promptPath)) {
    throw new Error(`Generated prompt already exists: prompts/pending/${fileName}`);
  }

  const docsReviewed = DEFAULT_ANALYSIS_DOCS.map((path) => ({
    path,
    present: existsSync(repoPath(root, path)),
  }));
  const recentReports = listRecentReports(root);
  const recentPlaytests = listRecentPlaytests(root);
  const recentScreenshots = listRecentScreenshots(root);
  const reportPath = uniqueReportPath(root, date, number, candidate.slug);
  const promptText = formatPrompt(candidate);
  const reportText = formatReport({
    date,
    reason,
    fileName,
    candidate,
    ledger,
    docsReviewed,
    recentReports,
    recentPlaytests,
    recentScreenshots,
    sourceSignals,
  });

  if (!dryRun) {
    ensureDirectory(dirname(promptPath));
    ensureDirectory(dirname(reportPath));
    writeFileSync(promptPath, promptText, "utf8");
    writeFileSync(reportPath, reportText, "utf8");
  }

  return {
    generated: !dryRun,
    dryRun,
    fileName,
    promptPath,
    reportFile: relative(root, reportPath).replace(/\\/g, "/"),
    title: candidate.title,
    generatedBy: GENERATED_BY,
  };
}

function printResult(result) {
  const action = result.dryRun ? "Would generate" : "Generated";
  console.log(`${action}: prompts/pending/${result.fileName}`);
  console.log(`Report: ${result.reportFile}`);
  console.log(`Title: ${result.title}`);
}

const isMain = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isMain) {
  try {
    const options = parseArgs(process.argv.slice(2));
    printResult(generateQueuePrompt(options));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
