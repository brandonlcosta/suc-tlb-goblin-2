# Scheduled Task RunLevel Compatibility Fix

## Summary

Updated `scripts/install-goblin-task.ps1` for broader Windows ScheduledTasks compatibility.

The installer now avoids battery-related `New-ScheduledTaskSettingsSet` parameters and uses `-RunLevel Limited` instead of the unsupported `LeastPrivilege` value.

No pending prompt was consumed. The scheduled task was not installed. `npm run goblin:main` was not run.

## Files Changed

- `scripts/install-goblin-task.ps1`
- `reports/runs/2026-04-28-scheduled-task-runlevel-compat-fix.md`

## Validation Commands

- `powershell -NoProfile -ExecutionPolicy Bypass -Command "$null = [scriptblock]::Create((Get-Content -Raw scripts/install-goblin-task.ps1))"`

## Validation Result

Passed.

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- None known.

## Risk Level

Low. This only changes scheduled task registration compatibility settings.

## Next Recommended Action

Retry task installation manually with:

```powershell
npm run goblin:install-task
```
