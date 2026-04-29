# Prompt Pipeline

This repo is designed for a small, repeatable loop: one prompt in, one focused implementation out, one report written.

## Current Queue Direction

As of the 2026-04-28 reset, the active prompt queue has been rebuilt around the PS1-style Cal Street Heat Drop direction. Historical prompts from the previous direction are archived under `prompts/archive/2026-04-28-pre-ps1-cal-street-reset/`.

## Normal Loop

1. Run `npm run agent:check`.
2. Pick the oldest numbered prompt in `prompts/pending/`.
3. Read the required project context.
4. Implement only that prompt.
5. Run `npm run build`.
6. Move the prompt to `prompts/completed/` when validation passes.
7. Move the prompt to `prompts/blocked/` when validation fails or the prompt is unsafe.
8. Write a structured run report in `reports/runs/`.
9. Run `npm run agent:check` again.
10. Recommend the next oldest pending prompt.

`npm run agent:one` is a guarded harness for this loop. It refuses to start from a dirty working tree, asks Codex to consume only the oldest pending prompt, runs validation, checks bookkeeping, and commits only after the safety checks pass.

## Required Context

Every implementation run should read:

- `GAME.md`
- `README.md`
- `ROADMAP.md`
- `docs/AI_DEVELOPMENT_RULES.md`
- `docs/REPO_STRUCTURE.md`
- `docs/BC_OS_INTEGRATION.md`
- the active prompt
- the most recent report in `reports/runs/`

## Queue Rules

- Consume exactly one prompt per run.
- Use the oldest numbered prompt from `prompts/pending/`.
- Prompt names must begin with a sortable number such as `001-`.
- Never skip ahead unless Brandon explicitly says to.
- Never edit later prompts while consuming the current prompt.

## Feature Scope Guard

- Normal feature prompts must not modify `package.json`, lockfiles, build scripts, GitHub workflows, agent scripts, `AGENTS.md`, or `.agents/**`.
- Only automation/tooling prompts may modify those files.
- If a feature prompt seems to require package/script changes, block the prompt and explain why in the run report instead of changing those files.
- Do not change the `build` script.
- Do not add `--emptyOutDir=false`.

## Validation Rules

- `npm run build` must pass before a prompt is marked completed.
- If validation fails, move the prompt to `prompts/blocked/`.
- Manual browser playtesting is not required inside automated Codex runs.
- Run reports must say: `Manual playtest: Not performed; requires Brandon to run locally.`

## Report Rules

Every implementation run must create a report in `reports/runs/` with:

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

## Commit Safety

Automation must refuse to commit if:

- the working tree was dirty before the run
- no pending prompt exists
- more than one prompt was moved
- the consumed prompt remains in `prompts/pending/`
- no matching report was written
- `npm run build` fails
- files outside the expected repo scope were modified

Automation must not push, merge, deploy, rewrite history, or delete user work.

## Local Full Goblin Mode

`npm run goblin:pr` runs the full local one-prompt branch and PR loop. It uses the local Codex CLI through the existing `npm run agent:one` script, so it does not use the GitHub Codex Action and does not require an `OPENAI_API_KEY`.

The command:

1. Refuses to start from a dirty worktree.
2. Checks out `main`.
3. Pulls latest `origin main`.
4. Runs `npm run agent:check`.
5. Finds the oldest numbered pending prompt.
6. Creates an `agent/<prompt-number>-<prompt-slug>` branch.
7. Runs `npm run agent:one`.
8. Runs `npm run build`.
9. Runs `npm run agent:check`.
10. Commits any validated uncommitted work if `agent:one` did not already commit it.
11. Pushes the branch.
12. Opens a PR into `main` with `gh pr create`.

GitHub checks still protect `main`; the command opens a reviewable branch and PR instead of pushing directly to `main`. Direct-to-main automation is intentionally avoided so Brandon can inspect the changed files before merge.

Auto-merge is optional and never the default. To request it explicitly, run:

```bash
npm run goblin:pr -- --auto-merge
```

If the target branch already exists, the command refuses to continue unless reuse is explicit:

```bash
npm run goblin:pr -- --reuse-branch
```

## Local Goblin Watcher

`npm run goblin:watch` runs a local watcher on Brandon's machine. It polls GitHub with the authenticated `gh` CLI, waits for merged `agent/*` pull requests into `main`, pulls latest `main`, validates the repo, and then starts the next prompt by calling the existing local `npm run goblin:pr` workflow.

The watcher uses local Codex indirectly through `npm run goblin:pr`. It does not use the GitHub Codex Action, does not require an `OPENAI_API_KEY`, does not push directly to `main`, and does not consume prompts directly.

The watcher only runs while the computer is awake and the terminal process is alive. Stop it with `Ctrl+C`.

Default startup only begins watching; it does not immediately start a prompt. To start a prompt immediately when the repo is clean, `main` is current, there is no open `agent/*` PR, and at least one pending prompt exists, run:

```bash
npm run goblin:watch -- --start-if-idle
```

By default, the watcher polls every 60 seconds. Use a custom interval with:

```bash
npm run goblin:watch -- --interval 30
```

Auto-merge remains opt-in. To pass `--auto-merge` through to `npm run goblin:pr` after the watcher starts a PR, run:

```bash
npm run goblin:watch:auto
```

or:

```bash
npm run goblin:watch -- --auto-merge
```

## Codex App Full Goblin Mode

Codex app Automations should use the one-shot tick command, not an infinite loop:

```bash
npm run goblin:tick -- --codex-app --generate-if-needed
```

Schedule the automation at a modest cadence, such as every 10 or 15 minutes at first. The Codex app automation start/pause control should be the normal operator control for the schedule.

Each Codex app tick runs locally, validates the repo, trusts the automation prompt to check GitHub with the GitHub connector, and exits. If a pending prompt exists, the tick starts work only by calling `npm run goblin:pr -- --codex-app`. It does not consume prompts directly, push directly to `main`, deploy, use the GitHub Codex Action, require an `OPENAI_API_KEY`, or call the local `gh` CLI.

Codex app scheduled automation should validate with:

```bash
npm run build:goblin
npm run agent:check
```

`npm run build:goblin` writes to `.goblin/dist/` so automation can verify TypeScript and Vite output without deleting or rewriting the normal `dist/` directory. Terminal and manual validation may still use `npm run build`.

Terminal mode can still use `gh` by omitting `--codex-app`. In normal terminal mode, the tick checks GitHub with the authenticated `gh` CLI and stops when an `agent/*` PR is already open.

GitHub checks still protect `main`. This mode builds through prompts and reviewable PRs, not direct self-mutation of game source.

The repo also has a local pause switch. To pause scheduled ticks from inside the repo:

```bash
npm run goblin:pause
```

To resume:

```bash
npm run goblin:resume
```

This creates or removes `.goblin/PAUSED`. When that file exists, `npm run goblin:tick` prints `Goblin paused` and exits cleanly.

When the queue is empty, `--generate-if-needed` lets the tick create exactly one small structured implementation prompt from the existing design docs, backlog, mechanics spec, completed prompt numbers, and recent run reports. Self-analysis prompt generation only happens when the queue is empty and no `agent/*` PR is open.

Auto-merge is still opt-in. Only use it after several clean manual runs:

```bash
npm run goblin:tick:auto
```

## Codex App Goblin Mode Without gh

Codex app Automations may not be able to spawn the local GitHub CLI. Use Codex app mode when the automation prompt has already checked GitHub state with the GitHub connector:

```bash
npm run goblin:tick -- --codex-app --generate-if-needed
```

or the package shortcut:

```bash
npm run goblin:tick:codex
```

In `--codex-app` mode, the repo scripts do local repo work only. They may use local `git`, `npm`, `node`, and Codex, but they do not call `gh --version`, `gh auth status`, `gh pr create`, `gh pr merge`, or `gh pr list`.

PR creation is handled after the branch is pushed by the Codex app automation using the GitHub connector. The handoff file for that step is:

```txt
.goblin/last-pr-ready.json
```

Terminal mode can still use `gh`. Running `npm run goblin:pr` without `--codex-app` preserves the normal local flow that creates the PR through `gh pr create`.

## BC-OS Boundary

BC-OS may:

- generate new pending prompts
- read run reports
- summarize progress
- recommend the next prompt

BC-OS should not directly edit STLB game source.

STLB owns:

- implementation
- validation
- prompt movement
- run reports
- source changes inside this repo
