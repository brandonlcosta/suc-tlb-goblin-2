#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const requiredDirs = [
  "prompts/pending",
  "prompts/completed",
  "prompts/blocked",
  "reports/runs",
  "reports/playtests",
];
const requiredGitkeeps = [
  "prompts/completed/.gitkeep",
  "prompts/blocked/.gitkeep",
  "reports/runs/.gitkeep",
  "reports/playtests/.gitkeep",
];

const errors = [];
const warnings = [];

function repoPath(path) {
  return join(root, path);
}

function readMdFiles(dir) {
  const fullDir = repoPath(dir);

  if (!existsSync(fullDir)) {
    return [];
  }

  return readdirSync(fullDir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => ({
      dir,
      file,
      path: `${dir}/${file}`,
      number: file.match(/^(\d+)-/)?.[1] ?? null,
      text: readFileSync(join(fullDir, file), "utf8"),
    }));
}

function reportIssue(kind, message) {
  kind === "error" ? errors.push(message) : warnings.push(message);
}

for (const dir of requiredDirs) {
  if (!existsSync(repoPath(dir))) {
    reportIssue("error", `Missing required directory: ${dir}`);
  }
}

for (const file of requiredGitkeeps) {
  if (!existsSync(repoPath(file))) {
    reportIssue("error", `Missing .gitkeep: ${file}`);
  }
}

if (!existsSync(repoPath("package.json"))) {
  reportIssue("error", "Missing package.json.");
} else {
  const pkg = JSON.parse(readFileSync(repoPath("package.json"), "utf8"));

  if (!pkg.scripts?.build) {
    reportIssue("error", "Missing package script: build");
  }

  if (!pkg.scripts?.["agent:check"]) {
    reportIssue("error", "Missing package script: agent:check");
  }
}

const pending = readMdFiles("prompts/pending");
const completed = readMdFiles("prompts/completed");
const blocked = readMdFiles("prompts/blocked");
const reports = readMdFiles("reports/runs");
const prompts = [...pending, ...completed, ...blocked];
const byNumber = new Map();

for (const prompt of prompts) {
  if (!prompt.number) {
    reportIssue("error", `Prompt filename must start with a sortable number: ${prompt.path}`);
    continue;
  }

  const entries = byNumber.get(prompt.number) ?? [];
  entries.push(prompt);
  byNumber.set(prompt.number, entries);
}

for (const [number, entries] of byNumber) {
  if (entries.length > 1) {
    reportIssue(
      "error",
      `Duplicate prompt number ${number}: ${entries.map((entry) => entry.path).join(", ")}`,
    );
  }
}

const pendingNumbers = new Set(pending.map((prompt) => prompt.number).filter(Boolean));
const completedNumbers = new Set(completed.map((prompt) => prompt.number).filter(Boolean));
const blockedNumbers = new Set(blocked.map((prompt) => prompt.number).filter(Boolean));

for (const number of pendingNumbers) {
  if (completedNumbers.has(number)) {
    reportIssue("error", `Prompt ${number} is completed but still exists in pending.`);
  }
}

const completedList = [...completedNumbers].map(Number).sort((a, b) => a - b);
const pendingList = [...pendingNumbers].map(Number).sort((a, b) => a - b);

if (completedList.length > 0 && pendingList.length > 0) {
  const maxCompleted = completedList.at(-1);
  const oldestPending = pendingList[0];

  if (oldestPending < maxCompleted) {
    reportIssue(
      "error",
      `Prompts appear consumed out of order: completed ${String(maxCompleted).padStart(3, "0")} exists while pending ${String(oldestPending).padStart(3, "0")} remains.`,
    );
  }
}

for (const prompt of completed) {
  const hasReport = reports.some(
    (report) =>
      report.file.includes(prompt.number) ||
      report.text.includes(prompt.file) ||
      report.text.includes(`prompts/pending/${prompt.file}`) ||
      report.text.includes(`prompts/completed/${prompt.file}`),
  );

  if (!hasReport) {
    reportIssue("error", `Completed prompt has no matching run report: ${prompt.path}`);
  }
}

for (const prompt of blocked) {
  const hasExplanation =
    /blocked|failed|failure|reason|known issues|validation result/i.test(prompt.text) &&
    prompt.text.trim().length > 80;

  if (!hasExplanation) {
    reportIssue("error", `Blocked prompt has no explanation: ${prompt.path}`);
  }
}

for (const report of reports) {
  const promptMatch = report.text.match(/prompts\/(?:pending|completed|blocked)\/(\d+)-[^\s`)]+\.md/);

  if (!promptMatch) {
    continue;
  }

  const number = promptMatch[1];

  if (!completedNumbers.has(number) && !blockedNumbers.has(number)) {
    reportIssue(
      "error",
      `Run report references prompt ${number}, but that prompt is not completed or blocked: ${report.path}`,
    );
  }
}

for (const prompt of pending) {
  if (/open the game|manual playtest|browser|interactive/i.test(prompt.text)) {
    reportIssue(
      "warning",
      `Pending prompt contains manual/browser playtest language; automation must treat it as Brandon-only: ${prompt.path}`,
    );
  }
}

if (!existsSync(repoPath("scripts/auto-run-one.mjs"))) {
  reportIssue("warning", "Missing optional automation harness: scripts/auto-run-one.mjs");
}

console.log("Prompt ledger check");
console.log(`Pending: ${pending.map((prompt) => prompt.file).join(", ") || "none"}`);
console.log(`Completed: ${completed.map((prompt) => prompt.file).join(", ") || "none"}`);
console.log(`Blocked: ${blocked.map((prompt) => prompt.file).join(", ") || "none"}`);

if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("\nErrors:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("\nLedger OK.");

