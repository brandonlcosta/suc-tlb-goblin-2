#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const defaultMaxRuns = 15;

const state = {
  startTime: new Date(),
  maxRuns: defaultMaxRuns,
  attempts: [],
  successfulRuns: 0,
  failureReason: null,
  stopReason: null,
  commandsRun: [],
};

function parseArgs(args) {
  const options = {
    maxRuns: defaultMaxRuns,
  };

  for (const arg of args) {
    const maxMatch = arg.match(/^--max=(\d+)$/);
    if (maxMatch) {
      options.maxRuns = Number(maxMatch[1]);
      continue;
    }

    throw new Error(`Unknown flag: ${arg}`);
  }

  return options;
}

function resolveNpmCliPath() {
  if (process.env.npm_execpath) return process.env.npm_execpath;

  const candidates = [
    "C:/nvm4w/nodejs/node_modules/npm/bin/npm-cli.js",
    "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js",
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  throw new Error("Could not resolve npm CLI path.");
}

function resolveCommand(command, args) {
  if (command === "npm") {
    return {
      command: process.execPath,
      args: [resolveNpmCliPath(), ...args],
    };
  }

  return { command, args };
}

function commandLine(command, args) {
  return [command, ...args].join(" ");
}

function rememberCommand(command, args) {
  const line = commandLine(command, args);
  state.commandsRun.push(line);
  return line;
}

function run(command, args, options = {}) {
  const line = rememberCommand(command, args);
  console.log(`\n[queue] > ${line}`);

  const resolved = resolveCommand(command, args);
  const result = spawnSync(resolved.command, resolved.args, {
    cwd: root,
    stdio: "inherit",
  });

  if (result.error) {
    throw new Error(
      `${options.errorMessage ?? `Command failed to start: ${line}`}\n${result.error.message}`,
    );
  }

  if (result.status !== 0) {
    throw new Error(
      `${options.errorMessage ?? `Command failed: ${line}`} Exit code: ${result.status}.`,
    );
  }
}

function output(command, args, options = {}) {
  const line = rememberCommand(command, args);
  console.log(`\n[queue] > ${line}`);

  const resolved = resolveCommand(command, args);
  const result = spawnSync(resolved.command, resolved.args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.error) {
    throw new Error(
      `${options.errorMessage ?? `Command failed to start: ${line}`}\n${result.error.message}`,
    );
  }

  if (result.status !== 0) {
    const details = [result.stderr, result.stdout].filter(Boolean).join("\n").trim();
    throw new Error(
      `${options.errorMessage ?? `Command failed: ${line}`}${
        details ? `\n${details}` : ""
      }`,
    );
  }

  return result.stdout.trim();
}

function listPromptFiles(queue) {
  const dir = join(root, "prompts", queue);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => {
      const aNumber = Number(a.match(/^(\d+)/)?.[1] ?? Number.MAX_SAFE_INTEGER);
      const bNumber = Number(b.match(/^(\d+)/)?.[1] ?? Number.MAX_SAFE_INTEGER);
      return aNumber - bNumber || a.localeCompare(b);
    });
}

function queueCounts() {
  return {
    pending: listPromptFiles("pending").length,
    completed: listPromptFiles("completed").length,
    blocked: listPromptFiles("blocked").length,
  };
}

function assertCleanWorktree() {
  const status = output("git", ["status", "--short"], {
    errorMessage: "Could not inspect git status.",
  });

  if (status) {
    throw new Error(
      [
        "Working tree is dirty before a goblin:main run. Refusing to continue.",
        "git status --short output:",
        status,
      ].join("\n"),
    );
  }

  console.log("[queue] Clean worktree confirmed.");
}

function removedPrompts(before, after) {
  const afterSet = new Set(after);
  return before.filter((file) => !afterSet.has(file));
}

function addedPrompts(before, after) {
  const beforeSet = new Set(before);
  return after.filter((file) => !beforeSet.has(file));
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function localTimestamp(date) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join("-") + `-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function reportPath(status) {
  const dir = join(root, "reports", "runs");
  mkdirSync(dir, { recursive: true });

  const label = status === "blocked" ? "goblin-queue-blocked" : "goblin-queue-run";
  const baseName = `${localTimestamp(state.startTime)}-${label}`;
  let candidate = join(dir, `${baseName}.md`);
  let suffix = 2;

  while (existsSync(candidate)) {
    candidate = join(dir, `${baseName}-${suffix}.md`);
    suffix += 1;
  }

  return candidate;
}

function attemptedPromptLines() {
  if (state.attempts.length === 0) return "- None.";

  return state.attempts
    .map((attempt, index) => {
      const detail = attempt.detail ? ` ${attempt.detail}` : "";
      return `- ${index + 1}. \`${attempt.prompt}\` - ${attempt.status}.${detail}`;
    })
    .join("\n");
}

function commandLines() {
  if (state.commandsRun.length === 0) return "- None.";
  return state.commandsRun.map((command) => `- \`${command}\``).join("\n");
}

function writeReport(status) {
  const counts = queueCounts();
  const report = `# Queue Run Report: Goblin Queue

Date: ${state.startTime.toISOString().slice(0, 10)}

## Start Time

${state.startTime.toISOString()}

## Status

${status}

## Summary

Queue supervisor run for \`npm run goblin:main\`. The runner starts at most one \`goblin:main\` process per pending prompt attempt, validates after each successful process, and stops on the first dirty git state, command failure, queue invariant failure, empty queue, or configured max-run limit.

## Prompts Attempted

${attemptedPromptLines()}

## Successful Runs

${state.successfulRuns}

## Failure Reason

${state.failureReason ?? "None."}

## Stop Reason

${state.stopReason ?? (status === "blocked" ? "Stopped after failure." : "Completed safely.")}

## Final Queue Counts

- Pending: ${counts.pending}
- Completed: ${counts.completed}
- Blocked: ${counts.blocked}

## Commands Run

${commandLines()}

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

${state.failureReason ? `- Queue run stopped before attempting additional prompts: ${state.failureReason}` : "- None from the queue supervisor run."}

## Risk Level

${state.failureReason ? "Medium. The runner stopped on a safety condition and did not continue." : "Low. The runner did not continue past the configured safety bounds."}
`;

  const path = reportPath(status);
  writeFileSync(path, report, "utf8");
  console.log(`\n[queue] Queue run report written: ${path}`);
  return path;
}

function runOnePrompt(promptFile, pendingBefore) {
  const attempt = {
    prompt: promptFile,
    status: "started",
    detail: "",
  };
  state.attempts.push(attempt);

  console.log(`\n[queue] Starting prompt attempt ${state.attempts.length}: ${promptFile}`);

  run("npm", ["run", "goblin:main"], {
    errorMessage: "npm run goblin:main failed.",
  });

  const pendingAfter = listPromptFiles("pending");
  const removed = removedPrompts(pendingBefore, pendingAfter);
  const added = addedPrompts(pendingBefore, pendingAfter);

  if (removed.length !== 1 || removed[0] !== promptFile || added.length > 0) {
    throw new Error(
      [
        "Queue invariant failed after goblin:main.",
        `Expected exactly one consumed prompt: ${promptFile}.`,
        `Removed prompts: ${removed.join(", ") || "none"}.`,
        `Added prompts: ${added.join(", ") || "none"}.`,
      ].join(" "),
    );
  }

  run("npm", ["run", "agent:check"], {
    errorMessage: "npm run agent:check failed after goblin:main.",
  });
  run("npm", ["run", "build"], {
    errorMessage: "npm run build failed after goblin:main.",
  });

  attempt.status = "completed";
  attempt.detail = "Post-run agent:check and build passed.";
  state.successfulRuns += 1;
  console.log(`[queue] Completed prompt attempt: ${promptFile}`);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  state.maxRuns = options.maxRuns;

  console.log("[queue] SUC The Long Burn goblin queue runner");
  console.log(`[queue] Max runs: ${state.maxRuns}`);

  if (state.maxRuns === 0) {
    const counts = queueCounts();
    state.stopReason = "--max=0 requested; no goblin:main runs were started.";
    console.log(
      `[queue] Dry no-op check. Pending: ${counts.pending}, completed: ${counts.completed}, blocked: ${counts.blocked}.`,
    );
    writeReport("completed");
    return;
  }

  while (state.successfulRuns < state.maxRuns) {
    const pendingBefore = listPromptFiles("pending");

    if (pendingBefore.length === 0) {
      state.stopReason = "No .md prompts remain in prompts/pending/.";
      console.log("[queue] Pending queue is empty. Stopping.");
      writeReport("completed");
      return;
    }

    console.log(`[queue] Pending prompts before run: ${pendingBefore.length}`);
    assertCleanWorktree();
    runOnePrompt(pendingBefore[0], pendingBefore);
  }

  state.stopReason = `Maximum run count reached (${state.maxRuns}).`;
  console.log(`[queue] ${state.stopReason}`);
  writeReport("completed");
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  state.failureReason = message;
  state.stopReason = "Stopped immediately after failure.";

  const currentAttempt = state.attempts.at(-1);
  if (currentAttempt && currentAttempt.status === "started") {
    currentAttempt.status = "failed";
    currentAttempt.detail = message;
  }

  console.error("\n[queue] Goblin queue runner stopped.");
  console.error(message);

  try {
    writeReport("blocked");
  } catch (reportError) {
    console.error("[queue] Failed to write queue run report.");
    console.error(reportError instanceof Error ? reportError.message : String(reportError));
  }

  process.exit(1);
}
