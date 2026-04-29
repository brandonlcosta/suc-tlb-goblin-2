#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const allowedFlags = new Set(["--auto-merge", "--reuse-branch"]);
const autoMerge = args.includes("--auto-merge");
const reuseBranch = args.includes("--reuse-branch");
const unknownFlag = args.find((arg) => !allowedFlags.has(arg));

function commandFor(name) {
  if (process.platform !== "win32") return name;
  if (name === "npm") return "npm.cmd";
  if (name === "npx") return "npx.cmd";
  return name;
}

function commandLine(command, commandArgs) {
  return [command, ...commandArgs].join(" ");
}

function run(command, commandArgs, options = {}) {
  console.log(`\n> ${commandLine(command, commandArgs)}`);

  const result = spawnSync(commandFor(command), commandArgs, {
    cwd: root,
    encoding: options.capture ? "utf8" : undefined,
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });

  if (result.error) {
    throw new Error(
      `Command failed to start: ${commandLine(command, commandArgs)}\n${result.error.message}`,
    );
  }

  if (result.status !== 0) {
    const details = options.capture
      ? [result.stderr, result.stdout].filter(Boolean).join("\n").trim()
      : "";
    throw new Error(
      `${options.errorMessage ?? `Command failed: ${commandLine(command, commandArgs)}`}${
        details ? `\n${details}` : ""
      }`,
    );
  }

  return result;
}

function output(command, commandArgs) {
  return run(command, commandArgs, { capture: true }).stdout.trim();
}

function commandStatus(command, commandArgs) {
  const result = spawnSync(commandFor(command), commandArgs, {
    cwd: root,
    stdio: "ignore",
  });

  if (result.error) {
    throw new Error(
      `Command failed to start: ${commandLine(command, commandArgs)}\n${result.error.message}`,
    );
  }

  return result.status;
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

function assertNotMain(action) {
  if (currentBranch() === "main") {
    throw new Error(`Refusing to ${action} while on main.`);
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
    branchName: `agent/${number}-${slug}`,
    title: `Complete STLB prompt ${number}: ${slug}`,
  };
}

function localBranchExists(branchName) {
  return commandStatus("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branchName}`]) === 0;
}

function remoteBranchExists(branchName) {
  const result = run("git", ["ls-remote", "--heads", "origin", branchName], {
    capture: true,
    errorMessage: `Could not check remote branch existence for ${branchName}.`,
  });

  return result.stdout.trim().length > 0;
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

      if (!isFresh) {
        return false;
      }

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

function writePrBody(prompt, queue, reportFile) {
  const body = [
    `Consumed prompt path: ${prompt.pendingPath}`,
    "",
    "Validation summary:",
    "- `npm run agent:one` completed successfully.",
    "- `npm run build` completed successfully.",
    "- `npm run agent:check` completed successfully.",
    `- Prompt terminal queue: \`prompts/${queue}/${prompt.promptFile}\``,
    `- Run report: \`reports/runs/${reportFile}\``,
    "",
    "manual playtest: not performed; requires Brandon to run locally.",
    "",
    "Reminder: inspect the files before merge.",
  ].join("\n");

  const bodyFile = join(root, ".git", "local-goblin-pr-body.md");
  writeFileSync(bodyFile, body, "utf8");
  return bodyFile;
}

function main() {
  if (unknownFlag) {
    throw new Error(`Unknown flag: ${unknownFlag}`);
  }

  assertCleanWorktree("before starting");

  run("git", ["checkout", "main"], {
    errorMessage: "main cannot be checked out.",
  });
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
  const localExists = localBranchExists(prompt.branchName);
  const remoteExists = remoteBranchExists(prompt.branchName);

  if ((localExists || remoteExists) && !reuseBranch) {
    throw new Error(
      `Branch already exists: ${prompt.branchName}. Pass --reuse-branch to use it intentionally.`,
    );
  }

  run("gh", ["--version"], {
    capture: true,
    errorMessage: "gh is not installed or is not on PATH.",
  });
  run("gh", ["auth", "status"], {
    errorMessage: "gh is not authenticated.",
  });

  if (reuseBranch && localExists) {
    run("git", ["checkout", prompt.branchName], {
      errorMessage: `Could not check out existing branch ${prompt.branchName}.`,
    });
  } else if (reuseBranch && remoteExists) {
    run("git", ["checkout", "-b", prompt.branchName, "--track", `origin/${prompt.branchName}`], {
      errorMessage: `Could not check out remote branch ${prompt.branchName}.`,
    });
  } else {
    run("git", ["checkout", "-b", prompt.branchName], {
      errorMessage: `Could not create branch ${prompt.branchName}.`,
    });
  }
  assertCleanWorktree("after branch checkout");
  assertNotMain("run prompt automation");

  const headBeforeRun = output("git", ["rev-parse", "HEAD"]);
  const beforeReports = snapshotReports();

  run("npm", ["run", "agent:one"], {
    errorMessage: "npm run agent:one failed.",
  });

  run("npm", ["run", "build"], {
    errorMessage: "npm run build failed.",
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
    throw new Error(`Consumed prompt is still in pending: ${prompt.pendingPath}`);
  }

  const queue = terminalQueue(prompt.promptFile);
  const reportFile = findFreshMatchingReport(prompt, beforeReports);
  if (!reportFile) {
    throw new Error(`No matching run report exists for ${prompt.promptFile}.`);
  }

  const statusAfterValidation = output("git", ["status", "--porcelain"]);
  if (statusAfterValidation) {
    assertNotMain("commit prompt work");
    run("git", ["add", "."]);
    run("git", ["commit", "-m", prompt.title]);
  } else {
    const headAfterValidation = output("git", ["rev-parse", "HEAD"]);
    if (headAfterValidation !== headBeforeRun) {
      console.log("\nPrompt work was already committed by npm run agent:one.");
    } else {
      console.log("\nNo uncommitted changes remained after validation.");
    }
  }

  assertCleanWorktree("before pushing");
  assertNotMain("push prompt branch");
  run("git", ["push", "-u", "origin", prompt.branchName]);

  const bodyFile = writePrBody(prompt, queue, reportFile);
  try {
    run("gh", [
      "pr",
      "create",
      "--base",
      "main",
      "--head",
      prompt.branchName,
      "--title",
      prompt.title,
      "--body-file",
      bodyFile,
    ]);
  } finally {
    if (existsSync(bodyFile)) {
      unlinkSync(bodyFile);
    }
  }

  if (autoMerge) {
    run("gh", ["pr", "merge", "--auto", "--squash"]);
  }

  console.log(`\nOpened PR for ${prompt.branchName}.`);
}

try {
  main();
} catch (error) {
  console.error("\nLocal full goblin mode refused to continue.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
