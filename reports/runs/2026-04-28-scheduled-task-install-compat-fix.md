# Scheduled Task Install Compatibility Fix

## Summary

Updated `scripts/install-goblin-task.ps1` to avoid ScheduledTasks cmdlet battery parameters that are not available on all Windows PowerShell installations.

No pending prompt was consumed. The scheduled task was not installed. `npm run goblin:main` was not run.

## Files Changed

- `scripts/install-goblin-task.ps1`
- `reports/runs/2026-04-28-scheduled-task-install-compat-fix.md`

## Validation Commands

- `powershell -NoProfile -ExecutionPolicy Bypass -Command "$null = [scriptblock]::Create((Get-Content -Raw scripts/install-goblin-task.ps1))"`

## Validation Result

Passed.

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- None known.

## Risk Level

Low. The change only removes optional battery-related scheduled task settings for compatibility.

## Next Recommended Action

Retry task installation manually with:

```powershell
npm run goblin:install-task
```
