# Full Goblin Task Scheduler Tooling

## Summary

Added Windows Task Scheduler tooling for sandbox direct-main goblin automation without consuming a pending feature prompt.

The direct-main wrapper now reads `git status --porcelain=v1 -z` so deleted files with a leading blank status column, untracked files, and rename/copy entries are parsed safely.

## Files Changed

- `scripts/goblin-main.mjs`
- `scripts/run-goblin-main.ps1`
- `scripts/install-goblin-task.ps1`
- `scripts/uninstall-goblin-task.ps1`
- `scripts/pause-goblin-task.ps1`
- `scripts/resume-goblin-task.ps1`
- `package.json`
- `docs/PROMPT_PIPELINE.md`
- `reports/runs/2026-04-28-full-goblin-task-scheduler.md`

## Validation Commands

- `node --check scripts/goblin-main.mjs`
- `npm run build:goblin`
- `npm run agent:check`
- `powershell -NoProfile -ExecutionPolicy Bypass -Command "$null = [scriptblock]::Create((Get-Content -Raw scripts/run-goblin-main.ps1))"`
- `powershell -NoProfile -ExecutionPolicy Bypass -Command "$null = [scriptblock]::Create((Get-Content -Raw scripts/install-goblin-task.ps1))"`
- `powershell -NoProfile -ExecutionPolicy Bypass -Command "$null = [scriptblock]::Create((Get-Content -Raw scripts/pause-goblin-task.ps1))"`
- `powershell -NoProfile -ExecutionPolicy Bypass -Command "$null = [scriptblock]::Create((Get-Content -Raw scripts/resume-goblin-task.ps1))"`
- `powershell -NoProfile -ExecutionPolicy Bypass -Command "$null = [scriptblock]::Create((Get-Content -Raw scripts/uninstall-goblin-task.ps1))"`

## Validation Result

Passed. `npm run agent:check` still reports `004-heat-hydration-and-quad-damage.md` as the next pending prompt. The only warnings are the existing Brandon-only manual playtest language warnings in pending prompts.

Manual playtest: Not performed; requires Brandon to run locally.

## Risks

- This mode commits directly to `main` and pushes to `origin main`; it is intentionally sandbox-only.
- The scheduled task depends on the local Windows user session, local Git auth, npm availability, and Codex CLI availability for the nested worker.
- If a bad run passes all safeguards, it should be corrected with a normal Git revert commit rather than history rewriting.

## How to Install the Scheduled Task

```powershell
npm run goblin:install-task
```

The task is named `STLB Full Goblin Main` and runs every 15 minutes.

## How to Pause and Resume

```powershell
npm run goblin:pause-task
npm run goblin:resume-task
```

The pause command creates `.goblin/PAUSED` and disables the scheduled task. The resume command removes `.goblin/PAUSED` and enables the scheduled task if it exists.

## Next Recommended Action

Commit this tooling patch, then manually run one direct-main attempt with:

```powershell
npm run goblin:main
```

If that succeeds, install the scheduled task with:

```powershell
npm run goblin:install-task
```
