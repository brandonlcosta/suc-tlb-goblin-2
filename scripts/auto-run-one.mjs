#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const commitEnabled = !process.argv.includes("--no-commit");
const allowedChangedPathPatterns = [
  /^src\//,
  /^tests\//,
  /^docs\//,
  /^prompts\//,
  /^reports\//,
  /^index\.html$/,
  /^package\.json$/,
  /^package-lock\.json$/,
  /^tsconfig\.json$/,
  /^vite\.config\./,
];

function run(command, args, options = {}) {
  console.log(`\n> ${command} ${args.join(" ")}`);

  const result = spawnSync(command, args, {
    cwd: root,
    stdio: options.input ? ["pipe", "inherit", "inherit"] : "inherit",
    shell: process.platform === "win32",
    ...options,
  });

  if (options.input && result.stdin) {
    result.stdin.end(options.input);
  }

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

function output(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || `Command failed: ${command} ${args.join(" ")}`);
  }

  return result.stdout.trim();
}

function requirePath(path) {
  if (!existsSync(join(root, path))) {
    throw new Error(`Missing required path: ${path}`);
  }
}

function listPromptFiles(queue) {
  return readdirSync(join(root, "prompts", queue))
    .filter((file) => /^\d+-.*\.md$/.test(file))
    .sort((a, b) => {
      const aNumber = Number(a.match(/^(\d+)/)?.[1] ?? 0);
      const bNumber = Number(b.match(/^(\d+)/)?.[1] ?? 0);
      return aNumber - bNumber || a.localeCompare(b);
    });
}

function changedPaths() {
  const porcelain = output("git", ["status", "--porcelain"]);

  if (!porcelain) {
    return [];
  }

  return porcelain
    .split(/\r?\n/)
    .map((line) => line.slice(3).replace(/\\/g, "/").replace(/^"|"$/g, ""))
    .map((path) => path.split(" -> ").at(-1));
}

function assertChangedPathsInScope(paths) {
  const outsideScope = paths.filter(
    (path) => !allowedChangedPathPatterns.some((pattern) => pattern.test(path)),
  );

  if (outsideScope.length > 0) {
    throw new Error(`Files outside expected repo scope changed: ${outsideScope.join(", ")}`);
  }
}

function latestPromptReport(promptNumber, promptFile) {
  return readdirSync(join(root, "reports", "runs"))
    .filter((file) => file.endsWith(".md"))
    .sort()
    .reverse()
    .find((file) => {
      const text = readFileSync(join(root, "reports", "runs", file), "utf8");
      return (
        file.includes(promptNumber) ||
        text.includes(promptFile) ||
        text.includes(`prompts/pending/${promptFile}`) ||
        text.includes(`prompts/completed/${promptFile}`) ||
        text.includes(`prompts/blocked/${promptFile}`)
      );
    });
}

for (const path of [
  "GAME.md",
  "README.md",
  "ROADMAP.md",
  "docs/AI_DEVELOPMENT_RULES.md",
  "docs/REPO_STRUCTURE.md",
  "docs/BC_OS_INTEGRATION.md",
  "prompts/pending",
  "prompts/completed",
  "prompts/blocked",
  "reports/runs",
]) {
  requirePath(path);
}

const beforeStatus = output("git", ["status", "--porcelain"]);
if (beforeStatus) {
  throw new Error("Working tree is dirty before the run. Refusing to start automation.");
}

run("npm", ["run", "agent:check"]);

const pendingBefore = listPromptFiles("pending");
if (pendingBefore.length === 0) {
  throw new Error("No pending prompt exists. Refusing to run.");
}

const promptFile = pendingBefore[0];
const promptNumber = promptFile.match(/^(\d+)/)?.[1];
const promptPath = `prompts/pending/${promptFile}`;
const workerPrompt = `
You are working in the suc-the-long-burn repo.

This is an automated one-prompt worker run.

## Required reading

Read:

- GAME.md
- README.md
- ROADMAP.md
- docs/AI_DEVELOPMENT_RULES.md
- docs/REPO_STRUCTURE.md
- docs/BC_OS_INTEGRATION.md
- ${promptPath}
- the most recent report in reports/runs/

## Task

Consume exactly one prompt: ${promptPath}

Implement only that prompt. Do not consume any other pending prompt. Do not skip ahead.

## Automation safety

Do not open the browser.
Do not run an interactive/manual UI playtest.
Use CLI validation only.
Run npm run build before marking the prompt completed.

If validation passes, move ${promptPath} to prompts/completed/${promptFile}.
If validation fails or the scope is unsafe, move it to prompts/blocked/${promptFile}.

Write a structured run report in reports/runs/ with:

- prompt consumed
- status: completed or blocked
- summary
- files changed
- validation commands run
- validation result
- manual playtest notes
- known issues
- risk level
- next recommended prompt

The manual playtest line must be:
Manual playtest: Not performed; requires Brandon to run locally.

## Hard constraints

- Do not edit BC-OS.
- Do not push.
- Do not merge.
- Do not deploy.
- Do not add accounts, servers, Strava, GPX, multiplayer, or real external APIs.
- Do not consume multiple prompts.
- Do not run an interactive browser session during automation.
`;

run("codex", ["exec", "--full-auto", "--sandbox", "workspace-write", "-"], {
  input: workerPrompt,
});

run("npm", ["run", "build"]);
run("npm", ["run", "agent:check"]);

const pendingAfter = listPromptFiles("pending");
const movedPrompts = pendingBefore.filter((file) => !pendingAfter.includes(file));
if (movedPrompts.length !== 1 || movedPrompts[0] !== promptFile) {
  throw new Error(`Expected exactly one moved prompt (${promptFile}); found ${movedPrompts.join(", ") || "none"}.`);
}

if (existsSync(join(root, "prompts", "pending", promptFile))) {
  throw new Error(`Consumed prompt remains in pending: ${promptPath}`);
}

const completed = existsSync(join(root, "prompts", "completed", promptFile));
const blocked = existsSync(join(root, "prompts", "blocked", promptFile));
if (completed === blocked) {
  throw new Error(`Prompt must be in exactly one terminal queue: ${promptFile}`);
}

const report = latestPromptReport(promptNumber, promptFile);
if (!report) {
  throw new Error(`No matching run report was written for ${promptFile}.`);
}

const paths = changedPaths();
if (paths.length === 0) {
  throw new Error("Worker produced no tracked changes. Refusing to commit.");
}

assertChangedPathsInScope(paths);

if (!commitEnabled) {
  console.log("\nSafety checks passed. --no-commit was provided, so changes are left uncommitted.");
  process.exit(0);
}

run("git", ["add", "."]);

const commitMessage = completed
  ? `Complete STLB prompt ${promptNumber}`
  : `Block STLB prompt ${promptNumber}`;

run("git", ["commit", "-m", commitMessage]);

console.log(`Committed: ${commitMessage}`);
