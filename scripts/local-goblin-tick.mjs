#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const stateFile = join(root, ".goblin", "state.json");
const pauseFile = join(root, ".goblin", "PAUSED");

function parseArgs(args) {
  const options = {
    autoMerge: false,
    generateIfNeeded: false,
  };

  for (const arg of args) {
    if (arg === "--auto-merge") {
      options.autoMerge = true;
      continue;
    }

    if (arg === "--generate-if-needed") {
      options.generateIfNeeded = true;
      continue;
    }

    throw new Error(`Unknown flag: ${arg}`);
  }

  return options;
}

function commandLine(command, args) {
  return [command, ...args].join(" ");
}

function run(command, args, options = {}) {
  console.log(`\n> ${commandLine(command, args)}`);

  const result = spawnSync(command, args, {
    cwd: root,
    encoding: options.capture ? "utf8" : undefined,
    shell: process.platform === "win32",
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const details = options.capture
      ? [result.stderr, result.stdout].filter(Boolean).join("\n").trim()
      : "";
    throw new Error(
      `${options.errorMessage ?? `Command failed: ${commandLine(command, args)}`}${
        details ? `\n${details}` : ""
      }`,
    );
  }

  return result;
}

function output(command, args, errorMessage) {
  return run(command, args, { capture: true, errorMessage }).stdout.trim();
}

function writeState(action, details = {}) {
  mkdirSync(dirname(stateFile), { recursive: true });
  writeFileSync(
    stateFile,
    `${JSON.stringify(
      {
        action,
        details,
        updatedAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

function assertCleanWorktree(context) {
  const status = output("git", ["status", "--porcelain"], "Could not inspect git status.");

  if (status) {
    throw new Error(`Working tree is dirty ${context}. Refusing to continue.`);
  }
}

function requireGh() {
  run("gh", ["--version"], {
    capture: true,
    errorMessage: "gh is not installed or is not on PATH.",
  });
  run("gh", ["auth", "status"], {
    capture: true,
    errorMessage: "gh is not authenticated. Run gh auth login before ticking.",
  });
}

function prepareMainAndValidate() {
  assertCleanWorktree("before checking out main");
  run("git", ["checkout", "main"], {
    errorMessage: "Could not check out main.",
  });
  assertCleanWorktree("after checking out main");
  run("git", ["pull", "--ff-only", "origin", "main"], {
    errorMessage: "Could not pull latest origin/main.",
  });
  assertCleanWorktree("after pulling origin/main");
  run("npm", ["run", "build"], {
    errorMessage: "npm run build failed.",
  });
  run("npm", ["run", "agent:check"], {
    errorMessage: "npm run agent:check failed.",
  });
}

function parseJsonOutput(command, args, errorMessage) {
  const text = output(command, args, errorMessage);
  return text ? JSON.parse(text) : [];
}

function listOpenAgentPrs() {
  const prs = parseJsonOutput(
    "gh",
    [
      "pr",
      "list",
      "--state",
      "open",
      "--base",
      "main",
      "--limit",
      "100",
      "--json",
      "number,headRefName,title,url",
    ],
    "Could not list open pull requests.",
  );

  return prs.filter((pr) => pr.headRefName?.startsWith("agent/"));
}

function listPromptFiles(queue) {
  const dir = join(root, "prompts", queue);

  return readdirSync(dir)
    .filter((file) => /^\d+-.*\.md$/.test(file))
    .sort((a, b) => {
      const aNumber = Number(a.match(/^(\d+)/)?.[1] ?? 0);
      const bNumber = Number(b.match(/^(\d+)/)?.[1] ?? 0);
      return aNumber - bNumber || a.localeCompare(b);
    });
}

function allPromptNumbers() {
  return ["pending", "completed", "blocked"]
    .flatMap((queue) => listPromptFiles(queue))
    .map((file) => Number(file.match(/^(\d+)/)?.[1] ?? 0))
    .filter((number) => number > 0);
}

function readText(path) {
  return readFileSync(join(root, path), "utf8");
}

function recentRunReports(limit = 5) {
  const dir = join(root, "reports", "runs");

  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .reverse()
    .slice(0, limit)
    .map((file) => ({
      file,
      text: readFileSync(join(dir, file), "utf8"),
    }));
}

function promptFilename(number, slug) {
  return `${String(number).padStart(3, "0")}-${slug}.md`;
}

function writeGenerationFailureReport(reason) {
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 13);
  const reportFile = join(root, "reports", "runs", `${timestamp}-prompt-generation-blocked.md`);
  const report = `# Prompt Generation Blocked

## Prompt Consumed

- None; governor prompt generation was requested because the queue was empty.

## Status

blocked

## Summary

The local goblin tick could not confidently generate a useful next implementation prompt.

## Validation Commands Run

- None; this report was written by the prompt generator after preflight validation had already completed.

## Validation Result

Blocked: ${reason}

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- The prompt queue remains empty.

## Risk Level

Low. No source code or prompt files were changed.

## Next Recommended Prompt

Brandon should add or approve the next small implementation prompt.
`;

  writeFileSync(reportFile, report, "utf8");
  return reportFile;
}

function generatePromptText({ number, completedNumbers, recentReports }) {
  const reportNames = recentReports.map((report) => report.file).join(", ") || "none";
  const completed = completedNumbers.length
    ? completedNumbers.map((value) => String(value).padStart(3, "0")).join(", ")
    : "none";

  return `# Prompt ${String(number).padStart(3, "0")} - Shade and Exposure Zones

## Context

The design bible and mechanics spec call out trail zones such as shade, exposed canyon, descent, climb, crew, technical trail, and heat shimmer. The roadmap also names a first shade/exposure pass as part of making Foresthill Heat Drop more replayable.

Completed prompt numbers reviewed: ${completed}

Recent run reports reviewed: ${reportNames}

## Goal

Add a small shade/exposure zone system to the existing Foresthill Heat Drop mission so the player can feel heat pressure change across the route.

## Why This Matters

Heat is the main boss. Shade should feel like a brief survival window, and exposed canyon should make bad pacing and low hydration more dangerous.

## Scope

- Add a simple deterministic sequence of trail zones for the current mission.
- Include at least shade and exposed zones.
- Make the current zone affect heat gain in a clear, tuneable way.
- Show the current zone in the HUD or existing gameplay UI.
- Keep the implementation local to the existing game structure.

## Out of Scope

- No real maps, GPX, Strava, or external APIs.
- No new mission.
- No procedural terrain system.
- No complex biome simulation.
- No new dependencies.
- No broad rendering rewrite.

## Acceptance Criteria

- The mission alternates through recognizable shade/exposed sections.
- Exposed sections increase heat pressure.
- Shade sections reduce heat pressure or briefly help recovery.
- The current zone is visible to the player.
- Existing controls and restart behavior still work.
- Build passes.

## Validation

\`\`\`bash
npm run build
\`\`\`

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.
`;
}

function generateNextPrompt() {
  const requiredDocs = [
    "GAME.md",
    "ROADMAP.md",
    "docs/BACKLOG.md",
    "docs/MECHANICS_SPEC.md",
  ];
  const missingDocs = requiredDocs.filter((path) => !existsSync(join(root, path)));

  if (missingDocs.length > 0) {
    return {
      generated: false,
      reportFile: writeGenerationFailureReport(`Missing required docs: ${missingDocs.join(", ")}`),
    };
  }

  const game = readText("GAME.md");
  const roadmap = readText("ROADMAP.md");
  const backlog = readText("docs/BACKLOG.md");
  const mechanics = readText("docs/MECHANICS_SPEC.md");

  const hasUsefulSource =
    /Trail Zones/i.test(game) &&
    /shade\/exposure zone pass|shade/i.test(roadmap) &&
    /shade line choice/i.test(backlog) &&
    /### Shade/i.test(mechanics) &&
    /### Exposed/i.test(mechanics);

  if (!hasUsefulSource) {
    return {
      generated: false,
      reportFile: writeGenerationFailureReport(
        "Required docs did not contain enough shade/exposure guidance.",
      ),
    };
  }

  const numbers = allPromptNumbers();
  const nextNumber = Math.max(0, ...numbers) + 1;
  const fileName = promptFilename(nextNumber, "shade-and-exposure-zones");
  const promptPath = join(root, "prompts", "pending", fileName);

  if (existsSync(promptPath)) {
    return {
      generated: false,
      reportFile: writeGenerationFailureReport(`Prompt already exists: ${fileName}`),
    };
  }

  const completedNumbers = listPromptFiles("completed")
    .map((file) => Number(file.match(/^(\d+)/)?.[1] ?? 0))
    .filter((number) => number > 0)
    .sort((a, b) => a - b);
  const promptText = generatePromptText({
    number: nextNumber,
    completedNumbers,
    recentReports: recentRunReports(),
  });

  writeFileSync(promptPath, promptText, "utf8");

  return {
    generated: true,
    fileName,
  };
}

function runGoblinPr(options) {
  const args = ["run", "goblin:pr"];

  if (options.autoMerge) {
    args.push("--", "--auto-merge");
  }

  run("npm", args, {
    errorMessage: "npm run goblin:pr failed.",
  });
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (existsSync(pauseFile)) {
    console.log("Goblin paused");
    return;
  }

  requireGh();
  assertCleanWorktree("before tick startup");
  prepareMainAndValidate();

  const openAgentPrs = listOpenAgentPrs();
  if (openAgentPrs.length > 0) {
    const pr = openAgentPrs[0];
    console.log(`Open agent PR exists: #${pr.number} ${pr.headRefName} ${pr.url}`);
    writeState("open-agent-pr", {
      number: pr.number,
      headRefName: pr.headRefName,
      url: pr.url,
    });
    return;
  }

  const pendingPrompts = listPromptFiles("pending");
  if (pendingPrompts.length > 0) {
    console.log(`Starting next pending prompt: ${pendingPrompts[0]}`);
    writeState("starting-goblin-pr", {
      prompt: pendingPrompts[0],
      autoMerge: options.autoMerge,
    });
    runGoblinPr(options);
    return;
  }

  if (!options.generateIfNeeded) {
    console.log("Prompt queue is empty. Pass --generate-if-needed to create one prompt.");
    writeState("empty-queue", { generated: false });
    return;
  }

  const result = generateNextPrompt();
  if (result.generated) {
    console.log(`Generated next prompt: ${result.fileName}`);
    writeState("generated-prompt", { prompt: result.fileName });
    return;
  }

  console.log(`Prompt generation blocked. Report written: ${result.reportFile}`);
  writeState("prompt-generation-blocked", { reportFile: result.reportFile });
}

try {
  main();
} catch (error) {
  console.error("\nLocal goblin tick refused to continue.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
