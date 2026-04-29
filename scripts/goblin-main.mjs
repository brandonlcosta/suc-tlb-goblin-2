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

const forbiddenFeaturePathPatterns = [
  /^\.github\//,
  /^\.agents\//,
  /^AGENTS\.md$/,
  /^scripts\//,
  /^package\.json$/,
  /^package-lock\.json$/,
  /^npm-shrinkwrap\.json$/,
  /^pnpm-lock\.yaml$/,
  /^yarn\.lock$/,
  /^bun\.lockb?$/,
  /^vercel\.json$/,
  /^netlify\.toml$/,
  /^render\.ya?ml$/,
  /^fly\.toml$/,
  /^Dockerfile$/,
  /^docker-compose\.ya?ml$/,
  /^\.dockerignore$/,
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
  /\.github\//i,
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

function run(command, args, options = {}) {
  console.log(`\n> ${commandLine(command, args)}`);
  const resolved = resolveCommand(command, args);
  const result = spawnSync(resolved.command, resolved.args, {
    cwd: root,
    encoding: options.capture ? "utf8" : undefined,
    env: options.env ? { ...process.env, ...options.env } : process.env,
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });

  if (result.error) {
    throw new Error(
      `Command failed to start: ${commandLine(command, args)}\n${result.error.message}`,
    );
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

function output(command, args) {
  return run(command, args, { capture: true }).stdout.trim();
}

function assertCleanWorktree(context) {
  const status = output("git", ["status", "--porcelain"]);

  if (status) {
    throw new Error(`Working tree is dirty ${context}. Refusing to continue.`);
  }
}

function currentBranch() {
  return output("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
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

function promptInfo(promptFile) {
  const match = promptFile.match(/^(\d+)-(.+)\.md$/);

  if (!match) {
    throw new Error(`Prompt filename must start with a sortable number: ${promptFile}`);
  }

  const [, number, rawSlug] = match;
  const slug = rawSlug
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    number,
    slug,
    promptFile,
    pendingPath: `prompts/pending/${promptFile}`,
  };
}

function snapshotReports() {
  const dir = join(root, "reports", "runs");
  const snapshot = new Map();

  for (const file of readdirSync(dir).filter((entry) => entry.endsWith(".md"))) {
    snapshot.set(file, statSync(join(dir, file)).mtimeMs);
  }

  return snapshot;
}

function findFreshMatchingReport(prompt, beforeReports) {
  const dir = join(root, "reports", "runs");

  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .reverse()
    .find((file) => {
      const fullPath = join(dir, file);
      const previousMtime = beforeReports.get(file) ?? 0;
      const isFresh = !beforeReports.has(file) || statSync(fullPath).mtimeMs > previousMtime;

      if (!isFresh) return false;

      const text = readFileSync(fullPath, "utf8");
      return (
        file.includes(prompt.number) ||
        text.includes(prompt.promptFile) ||
        text.includes(`prompts/pending/${prompt.promptFile}`) ||
        text.includes(`prompts/completed/${prompt.promptFile}`) ||
        text.includes(`prompts/blocked/${prompt.promptFile}`)
      );
    });
}

function terminalQueue(promptFile) {
  const completed = existsSync(join(root, "prompts", "completed", promptFile));
  const blocked = existsSync(join(root, "prompts", "blocked", promptFile));

  if (completed === blocked) {
    throw new Error(`Prompt must be in exactly one terminal queue after the run: ${promptFile}`);
  }

  return completed ? "completed" : "blocked";
}

function parseStatusPath(line) {
  const normalized = line.replace(/\\/g, "/").replace(/^"|"$/g, "");
  const porcelainMatch = normalized.match(/^.. (.+)$/);
  if (porcelainMatch) return porcelainMatch[1].replace(/^"|"$/g, "").split(" -> ").at(-1);

  throw new Error(`Could not parse changed path from git status line: ${line}`);
}

function changedPaths() {
  const status = output("git", ["status", "--porcelain"]);
  if (!status) return [];

  return status.split(/\r?\n/).filter(Boolean).map(parseStatusPath);
}

function promptAllowsAutomationToolingChanges(promptText) {
  return automationToolingPromptPatterns.some((pattern) => pattern.test(promptText));
}

function assertFeaturePromptDidNotChangeForbiddenFiles(paths, promptText) {
  if (promptAllowsAutomationToolingChanges(promptText)) return;

  const forbidden = paths.filter((path) =>
    forbiddenFeaturePathPatterns.some((pattern) => pattern.test(path)),
  );

  if (forbidden.length === 0) return;

  throw new Error(
    [
      "Feature prompt changed forbidden automation/config files.",
      `Forbidden changes: ${forbidden.join(", ")}`,
      "Refusing to commit direct-main output.",
    ].join(" "),
  );
}

function changedNonLedgerPaths(paths) {
  return paths.filter(
    (path) => !/^prompts\/(?:completed|blocked|pending)\//.test(path) && !/^reports\/runs\//.test(path),
  );
}

function commitMessage(prompt, queue) {
  const action = queue === "completed" ? "Complete" : "Block";
  return `${action} STLB prompt ${prompt.number}: ${prompt.slug}`;
}

function main() {
  assertCleanWorktree("before starting");

  run("git", ["checkout", "main"], {
    errorMessage: "Could not switch to main.",
  });

  if (currentBranch() !== "main") {
    throw new Error("Not on main after checkout. Refusing to continue.");
  }

  assertCleanWorktree("after checking out main");

  run("git", ["pull", "--ff-only", "origin", "main"], {
    errorMessage: "git pull origin main failed.",
  });

  assertCleanWorktree("after pulling origin main");

  run("npm", ["run", "agent:check"], {
    errorMessage: "npm run agent:check failed before the run.",
  });

  const pendingBefore = listPromptFiles("pending");
  if (pendingBefore.length === 0) {
    throw new Error("No pending prompt exists.");
  }

  const prompt = promptInfo(pendingBefore[0]);
  const promptText = readFileSync(join(root, prompt.pendingPath), "utf8");
  const beforeReports = snapshotReports();
  const headBeforeWorker = output("git", ["rev-parse", "HEAD"]);

  run("npm", ["run", "agent:one", "--", "--no-commit"], {
    env: { GOBLIN_DIRECT_MAIN: "1" },
    errorMessage: "One-prompt implementation worker failed.",
  });

  const headAfterWorker = output("git", ["rev-parse", "HEAD"]);
  if (headAfterWorker !== headBeforeWorker) {
    throw new Error("Worker created a commit in direct-main mode. Refusing to continue.");
  }

  run("npm", ["run", "build:goblin"], {
    errorMessage: "npm run build:goblin failed.",
  });
  run("npm", ["run", "agent:check"], {
    errorMessage: "npm run agent:check failed after the run.",
  });

  const pendingAfter = listPromptFiles("pending");
  const movedPrompts = pendingBefore.filter((file) => !pendingAfter.includes(file));

  if (movedPrompts.length !== 1 || movedPrompts[0] !== prompt.promptFile) {
    throw new Error(
      `Expected exactly one moved prompt (${prompt.promptFile}); found ${
        movedPrompts.join(", ") || "none"
      }.`,
    );
  }

  if (existsSync(join(root, "prompts", "pending", prompt.promptFile))) {
    throw new Error(`Consumed prompt remains in pending: ${prompt.pendingPath}`);
  }

  const queue = terminalQueue(prompt.promptFile);
  const reportFile = findFreshMatchingReport(prompt, beforeReports);
  if (!reportFile) {
    throw new Error(`No matching run report exists for ${prompt.promptFile}.`);
  }

  const paths = changedPaths();
  if (paths.length === 0) {
    throw new Error("Worker produced no tracked changes. Refusing to commit.");
  }

  const nonLedgerPaths = changedNonLedgerPaths(paths);
  if (nonLedgerPaths.length > 0 && (!reportFile || movedPrompts.length !== 1)) {
    throw new Error("Source changes were made without prompt movement and a matching report.");
  }

  assertFeaturePromptDidNotChangeForbiddenFiles(paths, promptText);

  run("git", ["add", "."]);
  run("git", ["commit", "-m", commitMessage(prompt, queue)]);
  run("git", ["push", "origin", "main"]);

  console.log(`\nCommitted and pushed direct-main output for ${prompt.promptFile}.`);
}

try {
  main();
} catch (error) {
  console.error("\nDirect-main goblin mode refused to continue.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
