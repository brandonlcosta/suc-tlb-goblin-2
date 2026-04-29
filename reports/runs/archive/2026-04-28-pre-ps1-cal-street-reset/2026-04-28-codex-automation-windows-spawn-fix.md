# Codex Automation Windows Spawn Fix

## Prompt Consumed

- None; this was a local automation tooling fix requested directly by Brandon.

## Status

completed

## Problem

The Codex app scheduled automation failed immediately when `npm run goblin:tick -- --generate-if-needed` reached `gh --version`.

The failure was:

```txt
Local goblin tick refused to continue.
spawnSync C:\WINDOWS\system32\cmd.exe EPERM
```

## Cause

The local goblin scripts used `shell: process.platform === "win32"` in `spawnSync` calls. In the Codex app automation environment, spawning through `cmd.exe` can be blocked, so even simple checks like `gh --version` failed before the scripts could continue.

## Files Changed

- `scripts/local-goblin-tick.mjs`
- `scripts/local-goblin-pr.mjs`
- `scripts/local-goblin-watch.mjs`
- `scripts/auto-run-one.mjs`
- `reports/runs/2026-04-28-codex-automation-windows-spawn-fix.md`

## Summary

Removed shell-based command execution from the local goblin scripts and added Windows command resolution helpers so direct spawns use `npm.cmd` and `npx.cmd` while leaving `git`, `gh`, `node`, and `codex` unchanged.

Command failures now include the command and arguments that failed, including direct spawn startup errors.

## Validation Commands

- `npm run agent:check`
- `node --check scripts/local-goblin-tick.mjs`
- `node --check scripts/local-goblin-pr.mjs`
- `node --check scripts/local-goblin-watch.mjs`
- `node --check scripts/auto-run-one.mjs`
- `npm run build`
- `npm run agent:check`

## Validation Result

Passed.

`npm run agent:check` reported the existing pending prompt manual-playtest warnings and ended with `Ledger OK.`

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- `rg` could not be used in this environment because launching `rg.exe` returned Access denied; PowerShell native search was used instead.
- The Codex app scheduled automation itself was not retried during this run because Brandon explicitly asked not to run `npm run goblin:tick`.

## Risk Level

Low. The change is limited to local automation command spawning and does not touch game features or prompt queue state.

## Next Recommended Action

Retry the Codex app automation schedule so it runs `npm run goblin:tick -- --generate-if-needed` in the Codex app environment and confirms `gh --version` no longer attempts to spawn `cmd.exe`.
