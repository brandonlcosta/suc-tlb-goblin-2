#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function run(command, args, options = {}) {
  console.log(`\n> ${command} ${args.join(" ")}`);

  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });

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

function timestamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "");
}

function requirePath(path) {
  if (!existsSync(join(root, path))) {
    throw new Error(`Missing required path: ${path}`);
  }
}

requirePath("GAME.md");
requirePath("docs/AI_DEVELOPMENT_RULES.md");
requirePath("prompts/pending");
requirePath("prompts/completed");
requirePath("prompts/blocked");
requirePath("reports/runs");

const beforeStatus = output("git", ["status", "--porcelain"]);
if (beforeStatus) {
  throw new Error(
    "Working tree is not clean. Commit or stash current changes before running automation."
  );
}

const pendingDir = join(root, "prompts", "pending");
const pending = readdirSync(pendingDir)
  .filter((file) => file.endsWith(".md"))
  .sort();

if (pending.length === 0) {
  console.log("No pending prompts. Nothing to do.");
  process.exit(0);
}

const promptFile = pending[0];
const promptPath = `prompts/pending/${promptFile}`;
const promptNumber = promptFile.match(/^(\d+)/)?.[1] ?? "unknown";
const runStamp = timestamp();

console.log(`Consuming prompt: ${promptPath}`);

const workerPrompt = `
You are working in the suc-the-long-burn repo.

This is an automated worker run.

## Required reading

Read:

- GAME.md
- README.md
- ROADMAP.md
- docs/AI_DEVELOPMENT_RULES.md
- docs/MECHANICS_SPEC.md
- docs/VISUAL_STYLE_GUIDE.md
- docs/REPO_STRUCTURE.md
- ${promptPath}

## Task

Consume exactly one prompt:

- ${promptPath}

Do not consume any other pending prompt.

## Reliability rule

Do not open the browser.
Do not run an interactive/manual UI playtest.
Use CLI validation only.

In the run report, write:

Manual playtest: Not performed; requires Brandon to run locally.

## Hard constraints

- Do not edit BC-OS.
- Do not push.
- Do not merge.
- Do not deploy.
- Do not consume more than one prompt.
- Do not add servers, accounts, APIs, Strava, GPX, multiplayer, or external services.
- Do not over-architect.
- Keep this as an incremental browser game.

## Required ending

1. Implement only ${promptPath}.
2. Run npm run build.
3. Move ${promptPath} to prompts/completed/${promptFile} if successful.
4. If blocked, move it to prompts/blocked/${promptFile}.
5. Write a run report in reports/runs/.
6. Final answer must include:
   - prompt consumed
   - summary
   - files changed
   - validation result
   - report path
   - next recommended prompt
`;

mkdirSync(join(root, ".tmp"), { recursive: true });
const tempPromptPath = join(root, ".tmp", `codex-worker-${runStamp}.md`);
writeFileSync(tempPromptPath, workerPrompt, "utf8");

run("codex", [
  "exec",
  "--full-auto",
  "--sandbox",
  "workspace-write",
  "-",
], {
  input: readFileSync(tempPromptPath, "utf8"),
});

run("npm", ["run", "build"]);

const afterStatus = output("git", ["status", "--porcelain"]);
if (!afterStatus) {
  console.log("Codex completed but produced no changes. Nothing to commit.");
  process.exit(0);
}

const stillPending = existsSync(join(root, "prompts", "pending", promptFile));
const completed = existsSync(join(root, "prompts", "completed", promptFile));
const blocked = existsSync(join(root, "prompts", "blocked", promptFile));

if (stillPending || (!completed && !blocked)) {
  throw new Error(
    `Prompt bookkeeping failed for ${promptFile}. Refusing to commit.`
  );
}

const reports = readdirSync(join(root, "reports", "runs"))
  .filter((file) => file.endsWith(".md"))
  .sort();

const hasPromptReport = reports.some((file) =>
  file.includes(promptNumber)
);

if (!hasPromptReport) {
  throw new Error(
    `No run report found for prompt ${promptNumber}. Refusing to commit.`
  );
}

run("git", ["add", "."]);

const commitMessage = completed
  ? `Complete STLB prompt ${promptNumber}`
  : `Block STLB prompt ${promptNumber}`;

run("git", ["commit", "-m", commitMessage]);

console.log(`Committed: ${commitMessage}`);