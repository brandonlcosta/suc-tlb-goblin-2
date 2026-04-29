#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const LOW_QUEUE_THRESHOLD = 3;

function parseArgs(args) {
  const options = {
    onlyIfQueueLow: false,
  };

  for (const arg of args) {
    if (arg === "--only-if-queue-low") {
      options.onlyIfQueueLow = true;
      continue;
    }

    throw new Error(`Unknown flag: ${arg}`);
  }

  return options;
}

function commandLine(command, args) {
  return [command, ...args].join(" ");
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

function run(command, args, options = {}) {
  console.log(`\n> ${commandLine(command, args)}`);
  const resolved = resolveCommand(command, args);
  const result = spawnSync(resolved.command, resolved.args, {
    cwd: root,
    encoding: options.capture ? "utf8" : undefined,
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

function output(command, args, errorMessage) {
  return run(command, args, { capture: true, errorMessage }).stdout.trim();
}

function outputRaw(command, args, errorMessage) {
  return run(command, args, { capture: true, errorMessage }).stdout;
}

function assertCleanWorktree(context) {
  const status = output(
    "git",
    ["status", "--porcelain=v1"],
    "Could not inspect git status.",
  );

  if (status) {
    throw new Error(`Working tree is dirty ${context}. Refusing to continue.`);
  }
}

function currentBranch() {
  return output("git", ["rev-parse", "--abbrev-ref", "HEAD"], "Could not read branch.");
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

function normalizeGitPath(path) {
  return path.replace(/\\/g, "/").replace(/^"|"$/g, "");
}

function gitStatusEntries() {
  const status = outputRaw(
    "git",
    ["status", "--porcelain=v1", "-z"],
    "Could not inspect git status.",
  );

  if (!status) return [];

  const entries = status.split("\0");
  const paths = [];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (!entry) continue;

    if (entry.length < 4 || entry[2] !== " ") {
      throw new Error(`Could not parse git porcelain entry: ${JSON.stringify(entry)}`);
    }

    const statusCode = entry.slice(0, 2);
    const path = normalizeGitPath(entry.slice(3));
    paths.push({ statusCode, path });

    if (statusCode.includes("R") || statusCode.includes("C")) {
      index += 1;
      const originalPath = entries[index];
      if (!originalPath) {
        throw new Error(`Missing original path for git porcelain entry: ${entry}`);
      }
      paths.push({ statusCode, path: normalizeGitPath(originalPath) });
    }
  }

  return paths;
}

function changedPaths() {
  return [...new Set(gitStatusEntries().map((entry) => entry.path))];
}

function newPendingPrompts(before, after) {
  const beforeSet = new Set(before);
  return after.filter((file) => !beforeSet.has(file));
}

function promptInfo(promptFile) {
  const match = promptFile.match(/^(\d+)-(.+)\.md$/);

  if (!match) {
    throw new Error(`Generated prompt filename is not numbered: ${promptFile}`);
  }

  return {
    number: match[1],
    slug: match[2],
    promptFile,
    path: `prompts/pending/${promptFile}`,
  };
}

function isAllowedPromptGenerationDoc(path) {
  return (
    /^docs\/PROMPT_GENERATION(?:-[^/]*)?\.md$/.test(path) ||
    /^docs\/PROMPT_PIPELINE(?:-[^/]*)?\.md$/.test(path) ||
    /^docs\/CODEX_PROMPT_GENERATOR_AUTOMATION(?:-[^/]*)?\.md$/.test(path)
  );
}

function isAllowedPromptGenerationPath(path) {
  return (
    /^prompts\/pending\/\d+-.*\.md$/.test(path) ||
    /^reports\/runs\/.*prompt-generator.*\.md$/i.test(path) ||
    isAllowedPromptGenerationDoc(path)
  );
}

function isForbiddenPromptGenerationPath(path) {
  return (
    path.startsWith("src/") ||
    path.startsWith("prompts/completed/") ||
    path.startsWith("prompts/blocked/") ||
    path.startsWith(".github/") ||
    path.startsWith(".agents/") ||
    path === "AGENTS.md" ||
    path === "package.json" ||
    path === "package-lock.json" ||
    path === "npm-shrinkwrap.json" ||
    path === "pnpm-lock.yaml" ||
    path === "yarn.lock" ||
    path === "bun.lock" ||
    path === "bun.lockb" ||
    path.startsWith("scripts/")
  );
}

function assertPromptGenerationScope(newPrompt) {
  const entries = gitStatusEntries();
  const paths = [...new Set(entries.map((entry) => entry.path))];

  if (paths.length === 0) {
    throw new Error("Prompt generation created a prompt but left no git changes.");
  }

  const forbidden = paths.filter((path) => isForbiddenPromptGenerationPath(path));
  if (forbidden.length > 0) {
    throw new Error(
      `Prompt generation changed forbidden paths: ${forbidden.join(", ")}.`,
    );
  }

  const outsideAllowedScope = paths.filter((path) => !isAllowedPromptGenerationPath(path));
  if (outsideAllowedScope.length > 0) {
    throw new Error(
      `Prompt generation changed paths outside the allowed scope: ${outsideAllowedScope.join(
        ", ",
      )}.`,
    );
  }

  const disallowedStatus = entries.filter((entry) => /[DRC]/.test(entry.statusCode));
  if (disallowedStatus.length > 0) {
    throw new Error(
      `Prompt generation deleted, renamed, or copied files: ${disallowedStatus
        .map((entry) => `${entry.statusCode.trim()} ${entry.path}`)
        .join(", ")}.`,
    );
  }

  const changedPendingPrompts = paths.filter((path) => /^prompts\/pending\/.*\.md$/.test(path));
  const unexpectedPromptChanges = changedPendingPrompts.filter((path) => path !== newPrompt.path);
  if (unexpectedPromptChanges.length > 0) {
    throw new Error(
      `Prompt generation changed pending prompts other than ${newPrompt.promptFile}: ${unexpectedPromptChanges.join(
        ", ",
      )}.`,
    );
  }
}

function prepareMain() {
  assertCleanWorktree("before starting");

  run("git", ["checkout", "main"], {
    errorMessage: "Could not check out main.",
  });

  if (currentBranch() !== "main") {
    throw new Error("Not on main after checkout. Refusing to continue.");
  }

  assertCleanWorktree("after checking out main");

  run("git", ["pull", "--ff-only", "origin", "main"], {
    errorMessage: "git pull --ff-only origin main failed.",
  });

  assertCleanWorktree("after pulling origin main");
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  prepareMain();

  run("npm", ["run", "agent:check"], {
    errorMessage: "npm run agent:check failed before prompt generation.",
  });

  const pendingBefore = listPromptFiles("pending");

  if (options.onlyIfQueueLow && pendingBefore.length > LOW_QUEUE_THRESHOLD) {
    console.log(
      `Pending queue has ${pendingBefore.length} prompts, above the ${LOW_QUEUE_THRESHOLD}-prompt threshold. No prompt generated; goblin:main not run.`,
    );
    return;
  }

  run("npm", ["run", "prompt:generate"], {
    errorMessage: "npm run prompt:generate failed.",
  });

  const pendingAfter = listPromptFiles("pending");
  const generatedPrompts = newPendingPrompts(pendingBefore, pendingAfter);

  if (generatedPrompts.length === 0) {
    const paths = changedPaths();
    if (paths.length > 0) {
      throw new Error(
        `Prompt generation changed files without creating a new prompt: ${paths.join(", ")}.`,
      );
    }

    console.log("No prompt was generated; goblin:main not run.");
    return;
  }

  if (generatedPrompts.length > 1) {
    throw new Error(
      `Prompt generation created more than one prompt: ${generatedPrompts.join(", ")}.`,
    );
  }

  const generatedPrompt = promptInfo(generatedPrompts[0]);

  run("npm", ["run", "agent:check"], {
    errorMessage: "npm run agent:check failed after prompt generation.",
  });

  assertPromptGenerationScope(generatedPrompt);

  const pathsToCommit = changedPaths();
  run("git", ["add", "--", ...pathsToCommit]);
  run("git", [
    "commit",
    "-m",
    `Generate STLB prompt ${generatedPrompt.number}: ${generatedPrompt.slug}`,
  ]);
  run("git", ["push", "origin", "main"], {
    errorMessage: "git push origin main failed after prompt generation.",
  });

  assertCleanWorktree("after committing generated prompt");

  run("npm", ["run", "goblin:main"], {
    errorMessage: "npm run goblin:main failed.",
  });
}

try {
  main();
} catch (error) {
  console.error("\nGenerate-and-run goblin mode refused to continue.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
