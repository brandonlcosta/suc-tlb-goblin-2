#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const commitEnabled = !process.argv.includes("--no-commit");
const baseAllowedChangedPathPatterns = [
  /^src\//,
  /^tests\//,
  /^docs\//,
  /^prompts\//,
  /^reports\//,
  /^index\.html$/,
  /^tsconfig\.json$/,
  /^vite\.config\./,
];
const automationToolingChangedPathPatterns = [
  /^package\.json$/,
  /^package-lock\.json$/,
  /^npm-shrinkwrap\.json$/,
  /^pnpm-lock\.yaml$/,
  /^yarn\.lock$/,
  /^bun\.lockb?$/,
  /^\.github\/workflows\//,
  /^\.github\/codex\/prompts\//,
  /^scripts\//,
  /^AGENTS\.md$/,
  /^\.agents\//,
];
const automationToolingPromptPatterns = [
  /\bautomation\b/i,
  /\btooling\b/i,
  /\bagent\b/i,
  /\bworker\b/i,
  /\bprompt pipeline\b/i,
  /\bpackage\.json\b/i,
  /\bpackage-lock\.json\b/i,
  /\blockfile\b/i,
  /\bnpm script\b/i,
  /\bpackage script\b/i,
  /\bbuild script\b/i,
  /\b(add|install|update|remove|change)\b.{0,40}\bdependency\b/i,
  /\b(add|install|update|remove|change)\b.{0,40}\bdependencies\b/i,
  /\bGitHub workflow\b/i,
  /\.github\/workflows\//i,
  /\.github\/codex\/prompts\//i,
  /\.agents\//i,
  /\bscripts\//i,
];

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

function quoteForCmd(value) {
  const normalized = String(value).replace(/\//g, "\\");

  return `"${normalized.replace(/"/g, '""')}"`;
}

function quoteCmdArg(arg) {
  const value = String(arg).replace(/\//g, "\\");

  if (value.length === 0) return '""';
  if (!/[\s"]/.test(value)) return value;

  return `"${value.replace(/"/g, '""')}"`;
}

function safeIsDirectory(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function findCodexInDirectory(path) {
  for (const name of ["codex.cmd", "codex.exe", "codex"]) {
    const candidate = join(path, name);
    if (existsSync(candidate)) return candidate;
  }

  try {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      if (!/codex|openai/i.test(entry.name)) continue;

      const candidate = join(path, entry.name);
      if (entry.isFile()) return candidate;

      if (entry.isDirectory()) {
        const nested = findCodexInDirectory(candidate);
        if (nested) return nested;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function findCodexCandidate(candidate) {
  if (!candidate) return null;

  if (process.platform === "win32" && !candidate.match(/\.(cmd|bat|exe)$/i)) {
    const cmdShim = `${candidate}.cmd`;
    if (existsSync(cmdShim)) return cmdShim;
  }

  if (!existsSync(candidate)) return null;

  if (safeIsDirectory(candidate)) {
    return findCodexInDirectory(candidate);
  }

  return candidate;
}

function findCodexOnPath() {
  const pathEntries = (process.env.PATH || "")
    .split(process.platform === "win32" ? ";" : ":")
    .filter(Boolean);
  const executableNames =
    process.platform === "win32" ? ["codex.cmd", "codex.exe", "codex"] : ["codex"];

  for (const pathEntry of pathEntries) {
    for (const executableName of executableNames) {
      const candidate = join(pathEntry, executableName);
      if (existsSync(candidate)) return candidate;
    }
  }

  return null;
}

function resolveWindowsCommand(command, args) {
  if (process.platform === "win32" && /\.cmd$/i.test(command)) {
    const commandLine = [quoteForCmd(command), ...args.map(quoteCmdArg)].join(" ");

    return {
      command: "cmd.exe",
      args: ["/d", "/s", "/c", commandLine],
      spawnOptions: { windowsVerbatimArguments: true },
    };
  }

  return { command, args };
}

function codexNotFoundError() {
  return new Error(
    [
      "Codex CLI was not found.",
      `Current PATH: ${process.env.PATH || ""}`,
      "Set CODEX_BIN to the full Codex executable path.",
    ].join("\n"),
  );
}

function resolveCodexCommand(args) {
  if (process.env.CODEX_BIN) {
    const explicitCommand = findCodexCandidate(process.env.CODEX_BIN);
    if (!explicitCommand) {
      throw new Error(
        [
          "Codex CLI was not found at CODEX_BIN.",
          `CODEX_BIN: ${process.env.CODEX_BIN}`,
          `Current PATH: ${process.env.PATH || ""}`,
          "Set CODEX_BIN to the full Codex executable path.",
        ].join("\n"),
      );
    }

    return resolveWindowsCommand(explicitCommand, args);
  }

  if (process.platform === "win32") {
    const candidates = [
      "C:/Users/Brandon/AppData/Roaming/npm/codex.cmd",
      process.env.APPDATA ? `${process.env.APPDATA}/npm/codex.cmd` : null,
      process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}/OpenAI/Codex` : null,
      "C:/Program Files/WindowsApps",
    ];

    for (const candidate of candidates) {
      const codexCommand = findCodexCandidate(candidate);
      if (codexCommand) return resolveWindowsCommand(codexCommand, args);
    }

    const pathCommand = findCodexOnPath();
    if (pathCommand) return resolveWindowsCommand(pathCommand, args);

    throw codexNotFoundError();
  }

  return { command: "codex", args };
}

function resolveCommand(command, args) {
  if (command === "npm") {
    return {
      command: process.execPath,
      args: [resolveNpmCliPath(), ...args],
    };
  }

  if (command === "npx") {
    return {
      command: process.execPath,
      args: [resolveNpmCliPath(), "exec", ...args],
    };
  }

  if (command === "codex") {
    return resolveCodexCommand(args);
  }

  return { command, args };
}

function commandLine(command, args) {
  return [command, ...args].join(" ");
}

function run(command, args, options = {}) {
  console.log(`\n> ${commandLine(command, args)}`);
  const resolved = resolveCommand(command, args);
  if (command === "codex") {
    console.log(`Resolved Codex command: ${commandLine(resolved.command, resolved.args)}`);
  }

  const result = spawnSync(resolved.command, resolved.args, {
    cwd: root,
    stdio: options.input ? ["pipe", "inherit", "inherit"] : "inherit",
    ...resolved.spawnOptions,
    ...options,
  });

  if (options.input && result.stdin) {
    result.stdin.end(options.input);
  }

  if (result.error) {
    throw new Error(
      `Command failed to start: ${commandLine(command, args)}\n${result.error.message}`,
    );
  }

  if (result.status !== 0) {
    throw new Error(`Command failed: ${commandLine(command, args)}`);
  }
}

function output(command, args) {
  const resolved = resolveCommand(command, args);
  const result = spawnSync(resolved.command, resolved.args, {
    cwd: root,
    encoding: "utf8",
    ...resolved.spawnOptions,
  });

  if (result.error) {
    throw new Error(
      `Command failed to start: ${commandLine(command, args)}\n${result.error.message}`,
    );
  }

  if (result.status !== 0) {
    throw new Error(result.stderr || `Command failed: ${commandLine(command, args)}`);
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
    .map((line) => parseStatusPath(line))
    .map((path) => path.split(" -> ").at(-1));
}

function parseStatusPath(line) {
  const normalized = line.replace(/\\/g, "/").replace(/^"|"$/g, "");
  const porcelainMatch = normalized.match(/^.. (.+)$/);
  if (porcelainMatch) {
    return porcelainMatch[1].replace(/^"|"$/g, "");
  }

  const shortMatch = normalized.match(/^[ MADRCU?!] (.+)$/);
  if (shortMatch) {
    return shortMatch[1].replace(/^"|"$/g, "");
  }

  throw new Error(`Could not parse changed path from git status line: ${line}`);
}

function promptAllowsAutomationToolingChanges(promptText) {
  return automationToolingPromptPatterns.some((pattern) => pattern.test(promptText));
}

function assertChangedPathsInScope(paths, promptText) {
  const promptAllowsToolingChanges = promptAllowsAutomationToolingChanges(promptText);
  const outsideScope = paths.filter(
    (path) =>
      !baseAllowedChangedPathPatterns.some((pattern) => pattern.test(path)) &&
      !automationToolingChangedPathPatterns.some((pattern) => pattern.test(path)),
  );
  const restrictedForFeaturePrompt = paths.filter((path) =>
    automationToolingChangedPathPatterns.some((pattern) => pattern.test(path)),
  );

  if (outsideScope.length > 0) {
    throw new Error(`Files outside expected repo scope changed: ${outsideScope.join(", ")}`);
  }

  if (!promptAllowsToolingChanges && restrictedForFeaturePrompt.length > 0) {
    throw new Error(
      [
        "Normal feature prompts must not modify package, lockfile, workflow, agent, or automation files.",
        `Restricted changes found: ${restrictedForFeaturePrompt.join(", ")}`,
        "Move the prompt to blocked and explain why in the run report instead of changing those files.",
      ].join(" "),
    );
  }
}

function readPackageJson() {
  return JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
}

function assertBuildScriptUnchanged(originalBuildScript) {
  const currentBuildScript = readPackageJson().scripts?.build;

  if (currentBuildScript !== originalBuildScript) {
    throw new Error("Do not change the package.json build script during prompt automation.");
  }

  if (String(currentBuildScript).includes("--emptyOutDir=false")) {
    throw new Error("Do not add --emptyOutDir=false to the package.json build script.");
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
const promptText = readFileSync(join(root, promptPath), "utf8");
const originalBuildScript = readPackageJson().scripts?.build;
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
If the prompt appears to require package/script/dependency/tooling changes that are not clearly requested, block it and explain why in the run report instead of changing those files.

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
- Normal feature prompts must not modify package.json, lockfiles, build scripts, GitHub workflows, agent scripts, AGENTS.md, or .agents/**.
- Only automation/tooling prompts may modify package.json, lockfiles, GitHub workflows, agent scripts, AGENTS.md, or .agents/**.
- If a feature prompt seems to require package/script changes, move it to blocked and explain why in the run report instead of changing those files.
- Do not change the build script.
- Do not add --emptyOutDir=false.
`;

run("codex", ["exec", "--full-auto", "--sandbox", "workspace-write", "-"], {
  input: workerPrompt,
});

assertBuildScriptUnchanged(originalBuildScript);
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

assertBuildScriptUnchanged(originalBuildScript);
assertChangedPathsInScope(paths, promptText);

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
