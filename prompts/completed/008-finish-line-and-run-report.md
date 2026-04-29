# Prompt 008 â€” Finish Line and Run Report

## Goal

Make Cal Street Heat Drop completeable and replayable.

## Files / Directories to Inspect

- `GAME.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `src/`

## Implementation Scope

- Add mission progress.
- Add a finish line/checkpoint.
- Trigger success at finish.
- Add run report screen for success and failure.
- Report should show:
  - result
  - elapsed time
  - max heat
  - lowest hydration
  - final quad damage
  - failure cause if failed
  - verdict line
- Add restart from report.

## Out of Scope

- No saved stats.
- No leaderboard.
- No account system.
- No share feature.

## Acceptance Criteria

- Player can finish.
- Player can fail.
- Report appears for both.
- Report stats are readable.
- Restart works.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Finish once and fail once. Confirm the report describes what happened.

