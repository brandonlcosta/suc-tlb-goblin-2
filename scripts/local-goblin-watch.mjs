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
const defaultIntervalSeconds = 60;

function parseArgs(args) {
  const options = {
    autoMerge: false,
    intervalSeconds: defaultIntervalSeconds,
    startIfIdle: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--auto-merge") {
      options.autoMerge = true;
      continue;
    }

    if (arg === "--start-if-idle") {
      options.startIfIdle = true;
      continue;
    }

    if (arg === "--interval") {
      const rawInterval = args[index + 1];
      const intervalSeconds = Number(rawInterval);

      if (!rawInterval || !Number.isFinite(intervalSeconds) || intervalSeconds <= 0) {
        throw new Error("--interval requires a positive number of seconds.");
      }

      options.intervalSeconds = intervalSeconds;
      index += 1;
      continue;
    }

    throw new Error(`Unknown flag: ${arg}`);
  }

  return options;
}

function commandLine(command, args) {
  return [command, ...args].join(" ");
}

function commandFor(name) {
  if (process.platform !== "win32") return name;
  if (name === "npm") return "npm.cmd";
  if (name === "npx") return "npx.cmd";
  return name;
}

function run(command, args, options = {}) {
  console.log(`\n> ${commandLine(command, args)}`);

  const result = spawnSync(commandFor(command), args, {
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
    errorMessage: "gh is not authenticated. Run gh auth login before starting the watcher.",
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

function newestMergedAgentPr() {
  const prs = parseJsonOutput(
    "gh",
    [
      "pr",
      "list",
      "--state",
      "merged",
      "--base",
      "main",
      "--limit",
      "50",
      "--json",
      "number,headRefName,mergedAt,title,url",
    ],
    "Could not list merged pull requests.",
  );

  return prs
    .filter((pr) => pr.headRefName?.startsWith("agent/") && pr.mergedAt)
    .sort((a, b) => new Date(b.mergedAt).getTime() - new Date(a.mergedAt).getTime())[0] ?? null;
}

function oldestPendingPrompt() {
  const pendingDir = join(root, "prompts", "pending");

  return readdirSync(pendingDir)
    .filter((file) => /^\d+-.*\.md$/.test(file))
    .sort((a, b) => {
      const aNumber = Number(a.match(/^(\d+)/)?.[1] ?? 0);
      const bNumber = Number(b.match(/^(\d+)/)?.[1] ?? 0);
      return aNumber - bNumber || a.localeCompare(b);
    })[0] ?? null;
}

function readState() {
  if (!existsSync(stateFile)) {
    return {};
  }

  try {
    return JSON.parse(readFileSync(stateFile, "utf8"));
  } catch (error) {
    throw new Error(
      `Could not read ${stateFile}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function writeState(pr, reason) {
  mkdirSync(dirname(stateFile), { recursive: true });
  writeFileSync(
    stateFile,
    `${JSON.stringify(
      {
        lastHandledMergedPr: pr
          ? {
              number: pr.number,
              headRefName: pr.headRefName,
              mergedAt: pr.mergedAt,
              title: pr.title,
              url: pr.url,
            }
          : null,
        reason,
        updatedAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

function samePr(a, b) {
  return a?.number && b?.number && Number(a.number) === Number(b.number);
}

function canStartNextPrompt() {
  const openAgentPrs = listOpenAgentPrs();
  if (openAgentPrs.length > 0) {
    console.log(
      `Open agent PR already exists (#${openAgentPrs[0].number} from ${openAgentPrs[0].headRefName}); waiting.`,
    );
    return false;
  }

  const pendingPrompt = oldestPendingPrompt();
  if (!pendingPrompt) {
    console.log("No pending prompts remain; waiting.");
    return false;
  }

  console.log(`Next pending prompt is ${pendingPrompt}.`);
  return true;
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

function startNextPrompt(reason, options) {
  console.log(`\nStarting next prompt (${reason}).`);
  prepareMainAndValidate();

  if (!canStartNextPrompt()) {
    return false;
  }

  runGoblinPr(options);
  return true;
}

async function sleep(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function pollOnce(options) {
  const latestMergedPr = newestMergedAgentPr();
  const state = readState();

  if (!latestMergedPr) {
    console.log("No merged agent PR found yet.");
    return;
  }

  if (samePr(latestMergedPr, state.lastHandledMergedPr)) {
    console.log(
      `No new merged agent PR since #${latestMergedPr.number} (${latestMergedPr.headRefName}).`,
    );
    return;
  }

  console.log(
    `Detected merged agent PR #${latestMergedPr.number} (${latestMergedPr.headRefName}) at ${latestMergedPr.mergedAt}.`,
  );

  const started = startNextPrompt(`merged PR #${latestMergedPr.number}`, options);
  writeState(latestMergedPr, started ? "started-next-prompt" : "skipped-start");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  process.on("SIGINT", () => {
    console.log("\nWatcher stopped.");
    process.exit(0);
  });

  assertCleanWorktree("before watcher startup");
  requireGh();
  prepareMainAndValidate();

  const baselinePr = newestMergedAgentPr();
  writeState(baselinePr, "startup-baseline");

  if (baselinePr) {
    console.log(
      `Watching for merged agent PRs after #${baselinePr.number} (${baselinePr.headRefName}).`,
    );
  } else {
    console.log("Watching for the first merged agent PR.");
  }

  if (options.startIfIdle) {
    const started = startNextPrompt("--start-if-idle", options);
    console.log(started ? "Started an idle prompt run." : "Idle start skipped.");
  }

  console.log(`Polling every ${options.intervalSeconds} seconds. Press Ctrl+C to stop.`);

  while (true) {
    await sleep(options.intervalSeconds * 1000);
    await pollOnce(options);
  }
}

main().catch((error) => {
  console.error("\nLocal goblin watcher refused to continue.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
